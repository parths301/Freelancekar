import Foundation
import SwiftUI

/// The whole app runs off one store, mirroring the web reference's single
/// reducer (src/lib/store.tsx). Async behaviour (booking clock, chat replies,
/// support responses, payment confirm) is simulated with Task.sleep here;
/// swapping in real network calls means replacing the bodies of these
/// actions, not the views.
@MainActor
final class AppStore: ObservableObject {
    @Published var state = AppState()

    private var toastTask: Task<Void, Never>?
    private var searchTask: Task<Void, Never>?
    private var replyTask: Task<Void, Never>?

    // MARK: - Navigation helpers

    func go(_ screen: Screen) {
        state.screen = screen
    }

    func flash(_ msg: String) {
        state.toast = msg
        toastTask?.cancel()
        toastTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.toast)
            guard !Task.isCancelled else { return }
            self?.state.toast = ""
        }
    }

    func notify(_ title: String, _ body: String, target: NotifTarget? = nil) {
        let n = Notif(id: "n\(state.notifs.count)-\(title.prefix(8))", title: title, body: body, ts: "now", unread: true, target: target)
        state.notifs.insert(n, at: 0)
    }

    private func patchBooking(_ id: String, _ mutate: (inout Booking) -> Void) {
        if let i = state.bookings.firstIndex(where: { $0.id == id }) {
            mutate(&state.bookings[i])
        }
    }

    private func patchThread(_ id: String, _ mutate: (inout ChatThread) -> Void) {
        if let i = state.threads.firstIndex(where: { $0.id == id }) {
            mutate(&state.threads[i])
        }
    }

    /// Booking clock: freelancer accepts, then delivers.
    private func runBooking(order: String, first: String) {
        Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.accept)
            guard let self else { return }
            self.patchBooking(order) { $0.status = .in_progress }
            self.flash("\(first) confirmed the booking")
            self.notify("\(first) confirmed your booking", "Order \(order) — work has started.", target: NotifTarget(type: .order, id: order))
        }
        Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.deliver)
            guard let self else { return }
            self.patchBooking(order) { $0.status = .delivered }
            self.flash("\(first) marked the work delivered — confirm and rate")
            self.notify("\(first) delivered the work", "Check the files and pay \(first) directly if you haven’t.", target: NotifTarget(type: .order, id: order))
        }
    }

    private func addThread(_ pro: Pro, _ last: String, quote: Quote? = nil, orderRef: String? = nil) {
        let existingMsgs = state.threads.first { $0.id == pro.id }?.msgs ?? []
        var msgs = existingMsgs
        msgs.append(ChatMessage(from: .me, text: last, ts: "9:41"))
        let t = ChatThread(id: pro.id, name: pro.name, first: pro.first, proId: pro.id, last: last, ts: "now", msgs: msgs, quote: quote, orderRef: orderRef)
        state.threads.removeAll { $0.id == pro.id }
        state.threads.insert(t, at: 0)
    }

    func openThread(_ id: String) {
        state.threadId = id
        state.draft = ""
        state.screen = .thread
    }

    func openOrder(_ id: String) {
        state.viewOrder = id
        state.screen = .order
    }

    func search(_ label: String) {
        state.searchLabel = label
        state.sort = .match
        state.searching = true
        state.screen = .results
        searchTask?.cancel()
        searchTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.search)
            guard !Task.isCancelled else { return }
            self?.state.searching = false
        }
    }

    private func finishPublish() {
        let valid = Selectors.validSvcRows(state)
        let rejected = !state.kycSelfie
        let wasOnboarded = state.onboarded
        state.onboarded = true
        state.onbErrorMsg = ""
        state.kycRejected = rejected
        state.freelancerMode = true
        state.screen = .fdash
        flash(wasOnboarded ? "Services updated" : "Profile live in \(Seed.cities[state.fCityIdx]) · \(valid.count) services")
        if rejected {
            Task { [weak self] in
                try? await Task.sleep(nanoseconds: TIMING.profileLive)
                self?.notify("Verification incomplete", "Your live selfie is missing, so the verified badge is on hold.")
            }
        } else if !wasOnboarded {
            Task { [weak self] in
                try? await Task.sleep(nanoseconds: TIMING.profileLive)
                guard let self else { return }
                self.notify("Profile is live", "You’re now visible to clients in \(Seed.cities[self.state.fCityIdx]).")
            }
        }
    }

    // MARK: - Discovery

    func setQuery(_ q: String) { state.query = q }
    func setBrief(_ b: String) { state.brief = b }

    func runSearch() {
        let q = state.query.trimmingCharacters(in: .whitespaces)
        let b = state.brief.trimmingCharacters(in: .whitespaces)
        let label = (!q.isEmpty ? q : (!b.isEmpty ? b : "Reel editor"))
        search(String(label.prefix(60)))
    }

    func setSort(_ sort: Sort) { state.sort = sort }

    func openCity() { state.cityOpen = true; state.citySearch = "" }
    func closeCity() { state.cityOpen = false }
    func setCitySearch(_ v: String) { state.citySearch = v }

    func pickPlace(_ cityName: String, _ loc: String) {
        state.cityIdx = Seed.cities.firstIndex(of: cityName) ?? 0
        state.locality = loc
        state.cityOpen = false
        state.citySearch = ""
        flash(loc.isEmpty ? "Showing freelancers in \(cityName)" : "Showing freelancers near \(loc)")
    }

    func useCurrentLocation() {
        state.cityIdx = 0
        state.locality = "Dharampeth"
        state.cityOpen = false
        state.citySearch = ""
        flash("Located you in Dharampeth, Nagpur")
    }

    // MARK: - Filters

    func openFilters() { state.filters = state.applied; state.filtersOpen = true }
    func closeFilters() { state.filtersOpen = false }

    func setFilter(_ key: WritableKeyPath<FilterSet, String>, _ value: String) {
        state.filters[keyPath: key] = value
    }
    func toggleAvailNow() { state.filters.availNow.toggle() }
    func resetFilters() { state.filters = FilterSet() }
    func applyFilters() { state.applied = state.filters; state.filtersOpen = false }
    func clearAll() {
        state.applied = FilterSet()
        state.filters = FilterSet()
        state.sort = .match
        flash("Filters cleared")
    }

    // MARK: - Profile

    func openPro(_ id: String) { state.activeId = id; state.svcIdx = 0; state.screen = .profile }
    func pickService(_ idx: Int) { state.svcIdx = idx }

    func toggleSave(_ proId: String, _ first: String) {
        let on = state.saved.contains(proId)
        if on { state.saved.removeAll { $0 == proId } } else { state.saved.append(proId) }
        flash(on ? "Removed from saved" : "Saved \(first)")
    }

    func messagePro(_ pro: Pro) {
        addThread(pro, "Hi, are you free this week?")
        openThread(pro.id)
    }

    func messageFromResults(_ pro: Pro) {
        addThread(pro, "You: hi, are you free this week?")
        flash("Message sent to \(pro.first)")
    }

    // MARK: - Hire sheet

    func openHire(_ proId: String? = nil) {
        state.hire = 1
        state.hireNote = ""
        state.hireError = false
        if let proId { state.activeId = proId; state.svcIdx = 0 }
    }
    func closeHire() { state.hire = 0; state.paying = false }
    func setHireNote(_ v: String) { state.hireNote = v; state.hireError = false }
    func setHireDate(_ i: Int) { state.hireDateIdx = i }
    func toDetails() { state.hire = 1 }

    func toPay() {
        if state.hireNote.trimmingCharacters(in: .whitespaces).count < 8 {
            state.hireError = true
            return
        }
        state.hire = 2
    }

    func setMethod(_ i: Int) { state.methodIdx = i }
    func retryPay() { state.payRetried = true; state.hire = 2 }
    func payWithUpi() {
        state.payRetried = true
        state.methodIdx = 0
        state.hire = 2
        flash("UPI selected — instant, no charges")
    }

    func payNow(_ pro: Pro, _ pkgName: String, _ pkgAmount: Int) {
        if state.paying { return }
        state.paying = true
        let ref = "FK-\(48210 + state.bookings.count * 7)"
        Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.payConfirm)
            guard let self else { return }
            if self.state.methodIdx == 1 && !self.state.payRetried {
                self.state.hire = 4
                self.state.paying = false
                self.flash("Card declined — nothing was charged")
                self.notify("Payment failed", "Your bank declined the card. \(pro.first) is not booked yet.")
                return
            }
            self.state.hire = 3
            self.state.paying = false
            self.state.bookings.insert(Booking(id: ref, proId: pro.id, name: pro.name, first: pro.first, service: pkgName, amount: money(pkgAmount), amountNum: pkgAmount, status: .awaiting, review: nil), at: 0)
            self.addThread(pro, "Booked \(pkgName) — \(money(pkgAmount)) to pay directly.")
            self.notify("Booking confirmed", "Order \(ref) with \(pro.name). Pay \(money(pkgAmount)) directly.", target: NotifTarget(type: .order, id: ref))
            self.runBooking(order: ref, first: pro.first)
        }
    }

    func afterBookChat() { state.hire = 0; go(.chats) }
    func afterBookHome() { state.hire = 0; go(.home) }

    // MARK: - Chats

    func setDraft(_ v: String) { state.draft = v }

    func sendMsg() {
        guard let tid = state.threadId, let t = state.threads.first(where: { $0.id == tid }) else { return }
        let text = state.draft.trimmingCharacters(in: .whitespaces)
        guard !text.isEmpty else { return }
        patchThread(t.id) { th in
            th.msgs.append(ChatMessage(from: .me, text: text, ts: "9:43"))
            th.last = "You: \(text)"
            th.ts = "now"
        }
        state.draft = ""
        state.typing = true
        replyTask?.cancel()
        replyTask = Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.chatReply)
            guard let self, !Task.isCancelled else { return }
            let fm = self.state.freelancerMode
            let reply = fm ? "Sounds good — when can you start?" : "Yes, I can do that. I’ll send a quote in a few minutes."
            self.state.typing = false
            self.patchThread(t.id) { th in
                th.msgs.append(ChatMessage(from: .them, text: reply, ts: "9:44"))
                th.last = reply
                th.ts = "now"
            }
            self.notify("\(t.first.isEmpty ? t.name : t.first) replied", reply, target: NotifTarget(type: .thread, id: t.id))
        }
    }

    func acceptQuote() {
        guard let tid = state.threadId, let t = state.threads.first(where: { $0.id == tid }), let q = t.quote else { return }
        let order = "FK-\(48310 + state.bookings.count * 7)"
        let first = t.first.isEmpty ? (t.name.components(separatedBy: " ").first ?? t.name) : t.first
        patchThread(t.id) { th in
            th.quote?.status = .accepted
            th.orderRef = order
            th.msgs.append(ChatMessage(from: .me, text: "Accepted your quote — \(money(q.amount)). Booking confirmed, no platform fee.", ts: "9:42"))
        }
        state.bookings.insert(Booking(id: order, proId: t.id, name: t.name, first: first, service: q.service, amount: money(q.amount), amountNum: q.amount, status: .awaiting, review: nil), at: 0)
        flash("Booking confirmed · order \(order)")
        runBooking(order: order, first: first)
    }

    func declineQuote() {
        guard let tid = state.threadId, let t = state.threads.first(where: { $0.id == tid }), t.quote != nil else { return }
        patchThread(t.id) { th in
            th.quote?.status = .declined
            th.msgs.append(ChatMessage(from: .me, text: "Thanks — going with someone else this time.", ts: "9:42"))
        }
        flash("Quote declined")
    }

    func openOrderFromThread() {
        guard let tid = state.threadId, let b = state.bookings.first(where: { $0.proId == tid }) else { return }
        openOrder(b.id)
    }

    // MARK: - Orders, reviews, disputes

    func openReview() { state.reviewOpen = true; state.reviewStars = 0; state.reviewText = ""; state.reviewError = false }
    func closeReview() { state.reviewOpen = false }
    func setReviewStars(_ n: Int) { state.reviewStars = n; state.reviewError = false }
    func setReviewText(_ v: String) { state.reviewText = v }

    func submitReview(_ booking: Booking) {
        if state.reviewStars == 0 { state.reviewError = true; return }
        let stars = state.reviewStars
        let text = state.reviewText.trimmingCharacters(in: .whitespaces)
        patchBooking(booking.id) {
            $0.status = .approved
            $0.review = Review(stars: stars, text: text.isEmpty ? "Good work, would hire again." : text)
        }
        state.reviewOpen = false
        flash("Job closed · \(booking.amount) marked paid to \(booking.first)")
        notify("Job closed out", "\(booking.amount) marked paid to \(booking.first). Your review is live on their profile.", target: NotifTarget(type: .order, id: booking.id))
    }

    func openIssue() { state.issueOpen = true; state.issueText = ""; state.issueError = false; state.issueReason = 0 }
    func closeIssue() { state.issueOpen = false }
    func setIssueReason(_ i: Int) { state.issueReason = i }
    func setIssueText(_ v: String) { state.issueText = v; state.issueError = false }

    func submitIssue(_ booking: Booking) {
        if state.issueText.trimmingCharacters(in: .whitespaces).count < 10 { state.issueError = true; return }
        let reason = Seed.issueReasons[state.issueReason]
        let ref = "SUP-\(2140 + state.bookings.count * 3)"
        let text = state.issueText.trimmingCharacters(in: .whitespaces)
        patchBooking(booking.id) { $0.issue = Issue(ref: ref, reason: reason, text: text, status: .open) }
        state.issueOpen = false
        flash("Issue raised · \(ref)")
        notify("Issue raised · \(ref)", "\(reason) on order \(booking.id). Support replies within 24 hours.", target: NotifTarget(type: .order, id: booking.id))
        Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.supportReply)
            guard let self else { return }
            self.patchBooking(booking.id) { $0.issue?.status = .responded }
            let first = booking.first.isEmpty ? "the freelancer" : booking.first
            self.notify("Support replied · \(ref)", "We’ve contacted \(first) and paused their listing while this is open.", target: NotifTarget(type: .order, id: booking.id))
            self.flash("Support replied to \(ref)")
        }
    }

    func openHelp() {
        guard let b = state.bookings.first else {
            flash("No orders yet — raise an issue from an order once you book")
            return
        }
        openOrder(b.id)
        state.issueOpen = true
        state.issueText = ""
        state.issueError = false
        state.issueReason = 0
    }

    // MARK: - Notifications

    func openNotifs() { go(.notifs) }
    func closeNotifs() { go(state.freelancerMode ? .fdash : .home) }

    func markAllRead() {
        for i in state.notifs.indices { state.notifs[i].unread = false }
        flash("All caught up")
    }

    func openNotif(_ id: String) {
        guard let idx = state.notifs.firstIndex(where: { $0.id == id }) else { return }
        let n = state.notifs[idx]
        state.notifs[idx].unread = false
        guard let target = n.target else { return }
        if target.type == .order { openOrder(target.id) } else { openThread(target.id) }
    }

    // MARK: - Mode switching

    func startFreelancer() {
        state.freelancerMode = true
        state.onbStep = state.onboarded ? 4 : 1
        state.onbErrorMsg = ""
        state.screen = state.onboarded ? .fdash : .fonb
    }

    func backToClient() {
        state.freelancerMode = false
        state.screen = .you
    }

    // MARK: - Onboarding

    func setPhone(_ v: String) {
        let filtered = v.filter { $0.isNumber || $0 == " " }
        state.phone = String(filtered.prefix(11))
        state.onbErrorMsg = ""
    }
    func setOtp(_ v: String) {
        let filtered = v.filter { $0.isNumber }
        state.otp = String(filtered.prefix(4))
        state.onbErrorMsg = ""
    }
    func setFName(_ v: String) { state.fName = v; state.onbErrorMsg = "" }
    func setFCity(_ i: Int) { state.fCityIdx = i }
    func setFRadius(_ i: Int) { state.fRadiusIdx = i }
    func setFBio(_ v: String) { state.fBio = v }

    func toggleKyc(_ key: KycKey) {
        switch key {
        case .aadhaar: state.kycAadhaar.toggle()
        case .pan: state.kycPan.toggle()
        case .selfie: state.kycSelfie.toggle()
        }
        state.onbErrorMsg = ""
    }
    func toggleBank() { state.bank.toggle() }

    func updRow(_ i: Int, cat: Int? = nil, type: Int? = nil, amount: String? = nil) {
        guard state.svcRows.indices.contains(i) else { return }
        if let cat { state.svcRows[i].cat = cat }
        if let type { state.svcRows[i].type = type }
        if let amount { state.svcRows[i].amount = amount }
        state.onbErrorMsg = ""
    }

    func addSvcRow() {
        let n = state.svcRows.count
        state.svcRows.append(ServiceRow(cat: (n * 3) % Seed.svcCats.count, type: 0, amount: ""))
        state.onbErrorMsg = ""
    }

    func removeSvcRow(_ i: Int) {
        guard state.svcRows.count > 1, state.svcRows.indices.contains(i) else { return }
        state.svcRows.remove(at: i)
    }

    func onbBack() {
        if state.onbStep == 1 { go(.you); return }
        state.onbStep -= 1
        state.onbErrorMsg = ""
    }

    func onbNext() {
        switch state.onbStep {
        case 1:
            let digits = state.phone.filter { $0.isNumber }
            if digits.count < 10 { state.onbErrorMsg = "Enter a 10-digit mobile number."; return }
            if !state.otpSent {
                state.otpSent = true
                state.onbErrorMsg = ""
                flash("OTP sent to +91 \(state.phone)")
                return
            }
            if state.otp != "1234" { state.onbErrorMsg = "That code didn’t match. Use 1234 in this demo."; return }
            state.onbStep = 2
            state.onbErrorMsg = ""
        case 2:
            if state.fName.trimmingCharacters(in: .whitespaces).count < 2 { state.onbErrorMsg = "Add the name clients should see."; return }
            state.onbStep = 3
            state.onbErrorMsg = ""
        case 3:
            if state.kycCount < 2 { state.onbErrorMsg = "Upload at least Aadhaar and a selfie to get verified."; return }
            state.onbStep = 4
            state.onbErrorMsg = ""
        default:
            let valid = Selectors.validSvcRows(state)
            if valid.isEmpty { state.onbErrorMsg = "Add a price for at least one service."; return }
            if state.subscribed || state.onboarded { finishPublish(); return }
            state.onbStep = 5
            state.onbErrorMsg = ""
        }
    }

    func subscribeAndPublish(_ planIdx: Int) {
        let name = planIdx == 1 ? "Pro" : "Starter"
        let price = planIdx == 1 ? "₹799/mo" : "₹299/mo"
        state.subscribed = true
        state.planIdx = planIdx
        finishPublish()
        Task { [weak self] in
            try? await Task.sleep(nanoseconds: TIMING.subscribed)
            self?.flash("Subscribed to \(name) · \(price) via Razorpay")
        }
    }

    func fixKyc() { state.onbStep = 3; state.onbErrorMsg = ""; go(.fonb) }
    func addMoreServices() { state.onbStep = 4; state.onbErrorMsg = ""; go(.fonb) }

    // MARK: - Freelancer working state

    func toggleAvailable() {
        let was = state.available
        state.available.toggle()
        flash(was ? "Hidden from new searches" : "You’re visible in \(Seed.cities[state.fCityIdx]) again")
    }

    func passRequest(_ id: String) {
        state.reqs.removeAll { $0.id == id }
        flash("Passed on this job")
    }

    func openQuote(_ id: String) {
        state.quoteFor = id
        state.quoteAmount = ""
        state.quoteDayIdx = 1
        state.quoteMsg = ""
        state.quoteError = false
    }
    func closeQuote() { state.quoteFor = nil }
    func setQuoteAmount(_ v: String) {
        state.quoteAmount = String(v.filter { $0.isNumber }.prefix(7))
        state.quoteError = false
    }
    func setQuoteDay(_ i: Int) { state.quoteDayIdx = i }
    func setQuoteMsg(_ v: String) { state.quoteMsg = v; state.quoteError = false }

    func sendQuote() {
        let amount = Int(state.quoteAmount) ?? 0
        if amount < 100 || state.quoteMsg.trimmingCharacters(in: .whitespaces).count < 8 {
            state.quoteError = true
            return
        }
        guard let req = state.reqs.first(where: { $0.id == state.quoteFor }) else { return }
        state.reqs.removeAll { $0.id == state.quoteFor }
        state.quoteFor = nil
        state.quotesSent += 1
        let service = Seed.svcCats[state.svcRows.first?.cat ?? 0]
        let metaFirst = req.meta.components(separatedBy: " · ").first ?? req.meta
        let thread = ChatThread(
            id: "q-\(req.id)", name: req.title, first: "the client", proId: "q-\(req.id)",
            last: "You quoted \(money(amount)) · \(Seed.dayLabels[state.quoteDayIdx])", ts: "now",
            msgs: [ChatMessage(from: .them, text: "\(req.title). \(metaFirst). Budget \(req.budget).", ts: "9:12")],
            quote: Quote(amount: amount, days: Seed.dayLabels[state.quoteDayIdx], service: service, msg: state.quoteMsg.trimmingCharacters(in: .whitespaces), status: .pending)
        )
        state.threads.insert(thread, at: 0)
        flash("Quote sent · \(money(amount))")
        notify("Quote sent · \(money(amount))", "\(req.title) — the client can see it now.", target: NotifTarget(type: .thread, id: "q-\(req.id)"))
    }

    func markGigDelivered(_ id: String) {
        guard let g = state.fGigs.first(where: { $0.id == id }) else { return }
        if g.status == .DELIVERED {
            flash("Client confirms delivery directly with you")
            return
        }
        if let i = state.fGigs.firstIndex(where: { $0.id == id }) {
            state.fGigs[i].status = .DELIVERED
        }
        flash("Marked delivered — \(g.amount) collected directly from the client")
    }

    func remindPayment(_ client: String) { flash("Reminder sent to \(client)") }

    func markPaymentReceived(_ id: String) {
        guard let i = state.payments.firstIndex(where: { $0.id == id }) else { return }
        let p = state.payments[i]
        state.payments[i].status = .received
        state.payments[i].via = "UPI · today"
        state.payments[i].when = ""
        flash("\(money(p.amount)) from \(p.client) marked received")
        notify("Payment received", "\(money(p.amount)) from \(p.client) — recorded in your August total.")
    }

    func managePlan() { flash("Plan managed in Razorpay · cancel anytime") }
    func pickPlan(_ i: Int) { state.planIdx = i }
}

enum KycKey { case aadhaar, pan, selfie }
