package com.freelancekar.app.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.freelancekar.app.data.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.update

/**
 * Single app-wide state holder. Mirrors src/lib/store.tsx: one AppState,
 * a set of action functions, and simulated async behaviour (search delay,
 * booking accept/deliver timers, chat replies, support responses, payment
 * confirm) using coroutine delays instead of real network calls.
 */
class AppViewModel : ViewModel() {

    private val _state = MutableStateFlow(AppState())
    val state: StateFlow<AppState> = _state

    private fun set(fn: (AppState) -> AppState) = _state.update(fn)

    private var toastToken = 0L

    private fun flash(msg: String) {
        val token = ++toastToken
        set { it.copy(toast = msg, toastToken = token) }
        viewModelScope.launch {
            delay(Timing.TOAST)
            set { if (it.toastToken == token) it.copy(toast = "") else it }
        }
    }

    private fun notify(title: String, body: String, target: NotifTarget? = null) {
        set { s ->
            val n = Notif(
                id = "n${s.notifs.size}-${title.take(8)}",
                title = title, body = body, ts = "now", unread = true, target = target,
            )
            s.copy(notifs = listOf(n) + s.notifs)
        }
    }

    private fun patchBooking(id: String, fn: (Booking) -> Booking) {
        set { s -> s.copy(bookings = s.bookings.map { if (it.id == id) fn(it) else it }) }
    }

    private fun patchThread(id: String, fn: (Thread) -> Thread) {
        set { s -> s.copy(threads = s.threads.map { if (it.id == id) fn(it) else it }) }
    }

    private fun runBooking(order: String, first: String) {
        viewModelScope.launch {
            delay(Timing.ACCEPT)
            patchBooking(order) { it.copy(status = BookingStatus.IN_PROGRESS) }
            flash("$first confirmed the booking")
            notify("$first confirmed your booking", "Order $order — work has started.", NotifTarget("order", order))
        }
        viewModelScope.launch {
            delay(Timing.DELIVER)
            patchBooking(order) { it.copy(status = BookingStatus.DELIVERED) }
            flash("$first marked the work delivered — confirm and rate")
            notify("$first delivered the work", "Check the files and pay $first directly if you haven't.", NotifTarget("order", order))
        }
    }

    private fun addThread(pro: Pro, last: String, quote: Quote? = null, orderRef: String? = null) {
        set { s ->
            val existing = s.threads.find { it.id == pro.id }
            val msgs = (existing?.msgs ?: emptyList()) + Message("me", last, "9:41")
            val t = Thread(
                id = pro.id, name = pro.name, first = pro.first, proId = pro.id,
                last = last, ts = "now", msgs = msgs, quote = quote, orderRef = orderRef,
            )
            s.copy(threads = listOf(t) + s.threads.filter { it.id != pro.id })
        }
    }

    private fun openThread(id: String) {
        set { it.copy(threadId = id, draft = "", screen = Screen.THREAD) }
    }

    private fun openOrder(id: String) {
        set { it.copy(viewOrder = id, screen = Screen.ORDER) }
    }

    private var searchJob: kotlinx.coroutines.Job? = null

    private fun search(label: String) {
        set { it.copy(searchLabel = label, sort = Sort.MATCH, searching = true, screen = Screen.RESULTS) }
        searchJob?.cancel()
        searchJob = viewModelScope.launch {
            delay(Timing.SEARCH)
            set { it.copy(searching = false) }
        }
    }

    private fun finishPublish() {
        val s = _state.value
        val valid = s.svcRows.filter { it.amount.trim().isNotEmpty() }
        val rejected = !s.kyc.selfie
        val wasOnboarded = s.onboarded
        set { it.copy(onboarded = true, onbErrorMsg = "", kycRejected = rejected, freelancerMode = true, screen = Screen.FDASH) }
        flash(if (wasOnboarded) "Services updated" else "Profile live in ${CITIES[s.fCityIdx]} · ${valid.size} services")
        if (rejected) {
            viewModelScope.launch {
                delay(Timing.PROFILE_LIVE)
                notify("Verification incomplete", "Your live selfie is missing, so the verified badge is on hold.")
            }
        } else if (!wasOnboarded) {
            viewModelScope.launch {
                delay(Timing.PROFILE_LIVE)
                notify("Profile is live", "You're now visible to clients in ${CITIES[s.fCityIdx]}.")
            }
        }
    }

    // Navigation ------------------------------------------------------------
    fun go(screen: Screen) = set { it.copy(screen = screen) }

    // Discovery ---------------------------------------------------------------
    fun searchPublic(label: String) = search(label)
    fun setQuery(q: String) = set { it.copy(query = q) }
    fun setBrief(b: String) = set { it.copy(brief = b) }
    fun runSearch() {
        val s = _state.value
        val label = (s.query.trim().ifEmpty { s.brief.trim() }.ifEmpty { "Reel editor" }).take(60)
        search(label)
    }
    fun setSort(sort: Sort) = set { it.copy(sort = sort) }
    fun openCity() = set { it.copy(cityOpen = true, citySearch = "") }
    fun closeCity() = set { it.copy(cityOpen = false) }
    fun setCitySearch(q: String) = set { it.copy(citySearch = q) }
    fun pickPlace(cityName: String, loc: String) {
        set { it.copy(cityIdx = CITIES.indexOf(cityName).coerceAtLeast(0), locality = loc, cityOpen = false, citySearch = "") }
        flash(if (loc.isNotEmpty()) "Showing freelancers near $loc" else "Showing freelancers in $cityName")
    }
    fun useCurrentLocation() {
        set { it.copy(cityIdx = 0, locality = "Dharampeth", cityOpen = false, citySearch = "") }
        flash("Located you in Dharampeth, Nagpur")
    }

    // Filters -------------------------------------------------------------
    fun openFilters() = set { it.copy(filtersOpen = true, filters = it.applied) }
    fun closeFilters() = set { it.copy(filtersOpen = false) }
    fun setFilter(key: String, value: String) = set { s ->
        s.copy(filters = when (key) {
            "budget" -> s.filters.copy(budget = value)
            "dist" -> s.filters.copy(dist = value)
            "mode" -> s.filters.copy(mode = value)
            "lang" -> s.filters.copy(lang = value)
            else -> s.filters
        })
    }
    fun toggleAvailNow() = set { it.copy(filters = it.filters.copy(availNow = !it.filters.availNow)) }
    fun resetFilters() = set { it.copy(filters = FilterSet()) }
    fun applyFilters() = set { it.copy(applied = it.filters, filtersOpen = false) }
    fun clearAll() {
        set { it.copy(applied = FilterSet(), filters = FilterSet(), sort = Sort.MATCH) }
        flash("Filters cleared")
    }

    // Profile ---------------------------------------------------------------
    fun openPro(id: String) = set { it.copy(activeId = id, svcIdx = 0, screen = Screen.PROFILE) }
    fun pickService(i: Int) = set { it.copy(svcIdx = i) }
    fun toggleSave(proId: String, first: String) {
        val on = _state.value.saved.contains(proId)
        set { s -> s.copy(saved = if (on) s.saved - proId else s.saved + proId) }
        flash(if (on) "Removed from saved" else "Saved $first")
    }
    fun messagePro(pro: Pro) {
        addThread(pro, "Hi, are you free this week?")
        openThread(pro.id)
    }
    fun messageFromResults(pro: Pro) {
        addThread(pro, "You: hi, are you free this week?")
        flash("Message sent to ${pro.first}")
    }

    // Hire sheet --------------------------------------------------------------
    fun openHire(proId: String? = null) = set {
        it.copy(hire = 1, hireNote = "", hireError = false,
            activeId = proId ?: it.activeId, svcIdx = if (proId != null) 0 else it.svcIdx)
    }
    fun closeHire() = set { it.copy(hire = 0, paying = false) }
    fun setHireNote(v: String) = set { it.copy(hireNote = v, hireError = false) }
    fun setHireDate(i: Int) = set { it.copy(hireDateIdx = i) }
    fun toDetails() = set { it.copy(hire = 1) }
    fun toPay() {
        if (_state.value.hireNote.trim().length < 8) {
            set { it.copy(hireError = true) }
            return
        }
        set { it.copy(hire = 2) }
    }
    fun setMethod(i: Int) = set { it.copy(methodIdx = i) }
    fun retryPay() = set { it.copy(payRetried = true, hire = 2) }
    fun payWithUpi() {
        set { it.copy(payRetried = true, methodIdx = 0, hire = 2) }
        flash("UPI selected — instant, no charges")
    }
    fun payNow(pro: Pro, pkgName: String, pkgAmount: Int) {
        val s = _state.value
        if (s.paying) return
        set { it.copy(paying = true) }
        val ref = "FK-${48210 + s.bookings.size * 7}"
        viewModelScope.launch {
            delay(Timing.PAY_CONFIRM)
            val now = _state.value
            if (now.methodIdx == 1 && !now.payRetried) {
                set { it.copy(hire = 4, paying = false) }
                flash("Card declined — nothing was charged")
                notify("Payment failed", "Your bank declined the card. ${pro.first} is not booked yet.")
                return@launch
            }
            set { st ->
                st.copy(
                    hire = 3, paying = false,
                    bookings = listOf(
                        Booking(
                            id = ref, proId = pro.id, name = pro.name, first = pro.first,
                            service = pkgName, amount = money(pkgAmount), amountNum = pkgAmount,
                            status = BookingStatus.AWAITING, review = null,
                        )
                    ) + st.bookings,
                )
            }
            addThread(pro, "Booked $pkgName — ${money(pkgAmount)} to pay directly.")
            notify("Booking confirmed", "Order $ref with ${pro.name}. Pay ${money(pkgAmount)} directly.", NotifTarget("order", ref))
            runBooking(ref, pro.first)
        }
    }
    fun afterBookChat() {
        set { it.copy(hire = 0) }
        go(Screen.CHATS)
    }
    fun afterBookHome() {
        set { it.copy(hire = 0) }
        go(Screen.HOME)
    }

    // Chats -----------------------------------------------------------------
    fun openThreadPublic(id: String) = openThread(id)
    fun setDraft(v: String) = set { it.copy(draft = v) }

    private var replyJob: kotlinx.coroutines.Job? = null

    fun sendMsg() {
        val s = _state.value
        val t = s.threads.find { it.id == s.threadId } ?: return
        val text = s.draft.trim()
        if (text.isEmpty()) return
        patchThread(t.id) { it.copy(msgs = it.msgs + Message("me", text, "9:43"), last = "You: $text", ts = "now") }
        set { it.copy(draft = "", typing = true) }
        replyJob?.cancel()
        replyJob = viewModelScope.launch {
            delay(Timing.CHAT_REPLY)
            val fm = _state.value.freelancerMode
            val reply = if (fm) "Sounds good — when can you start?" else "Yes, I can do that. I'll send a quote in a few minutes."
            set { it.copy(typing = false) }
            patchThread(t.id) { it.copy(msgs = it.msgs + Message("them", reply, "9:44"), last = reply, ts = "now") }
            notify("${t.first.ifEmpty { t.name }} replied", reply, NotifTarget("thread", t.id))
        }
    }
    fun acceptQuote() {
        val s = _state.value
        val t = s.threads.find { it.id == s.threadId } ?: return
        val q = t.quote ?: return
        val order = "FK-${48310 + s.bookings.size * 7}"
        val first = t.first.ifEmpty { t.name.split(" ").first() }
        patchThread(t.id) {
            it.copy(
                quote = q.copy(status = "accepted"), orderRef = order,
                msgs = it.msgs + Message("me", "Accepted your quote — ${money(q.amount)}. Booking confirmed, no platform fee.", "9:42"),
            )
        }
        set { st ->
            st.copy(bookings = listOf(
                Booking(order, t.id, t.name, first, q.service, money(q.amount), q.amount, BookingStatus.AWAITING, null),
            ) + st.bookings)
        }
        flash("Booking confirmed · order $order")
        runBooking(order, first)
    }
    fun declineQuote() {
        val s = _state.value
        val t = s.threads.find { it.id == s.threadId } ?: return
        val q = t.quote ?: return
        patchThread(t.id) {
            it.copy(quote = q.copy(status = "declined"),
                msgs = it.msgs + Message("me", "Thanks — going with someone else this time.", "9:42"))
        }
        flash("Quote declined")
    }
    fun openOrderFromThread() {
        val s = _state.value
        val b = s.bookings.find { it.proId == s.threadId }
        if (b != null) openOrder(b.id)
    }

    // Orders, reviews, disputes ----------------------------------------------
    fun openOrderPublic(id: String) = openOrder(id)
    fun openReview() = set { it.copy(reviewOpen = true, reviewStars = 0, reviewText = "", reviewError = false) }
    fun closeReview() = set { it.copy(reviewOpen = false) }
    fun setReviewStars(n: Int) = set { it.copy(reviewStars = n, reviewError = false) }
    fun setReviewText(v: String) = set { it.copy(reviewText = v) }
    fun submitReview(booking: Booking) {
        val s = _state.value
        if (s.reviewStars == 0) {
            set { it.copy(reviewError = true) }
            return
        }
        patchBooking(booking.id) {
            it.copy(status = BookingStatus.APPROVED,
                review = Review(s.reviewStars, s.reviewText.trim().ifEmpty { "Good work, would hire again." }))
        }
        set { it.copy(reviewOpen = false) }
        flash("Job closed · ${booking.amount} marked paid to ${booking.first}")
        notify("Job closed out", "${booking.amount} marked paid to ${booking.first}. Your review is live on their profile.", NotifTarget("order", booking.id))
    }
    fun openIssue() = set { it.copy(issueOpen = true, issueText = "", issueError = false, issueReason = 0) }
    fun closeIssue() = set { it.copy(issueOpen = false) }
    fun setIssueReason(i: Int) = set { it.copy(issueReason = i) }
    fun setIssueText(v: String) = set { it.copy(issueText = v, issueError = false) }
    fun submitIssue(booking: Booking) {
        val s = _state.value
        if (s.issueText.trim().length < 10) {
            set { it.copy(issueError = true) }
            return
        }
        val reason = ISSUE_REASONS[s.issueReason]
        val ref = "SUP-${2140 + s.bookings.size * 3}"
        val issue = Issue(ref, reason, s.issueText.trim(), "open")
        patchBooking(booking.id) { it.copy(issue = issue) }
        set { it.copy(issueOpen = false) }
        flash("Issue raised · $ref")
        notify("Issue raised · $ref", "$reason on order ${booking.id}. Support replies within 24 hours.", NotifTarget("order", booking.id))
        viewModelScope.launch {
            delay(Timing.SUPPORT_REPLY)
            patchBooking(booking.id) { it.copy(issue = issue.copy(status = "responded")) }
            notify("Support replied · $ref", "We've contacted ${booking.first.ifEmpty { "the freelancer" }} and paused their listing while this is open.", NotifTarget("order", booking.id))
            flash("Support replied to $ref")
        }
    }
    fun openHelp() {
        val s = _state.value
        val b = s.bookings.firstOrNull()
        if (b == null) {
            flash("No orders yet — raise an issue from an order once you book")
            return
        }
        openOrder(b.id)
        set { it.copy(issueOpen = true, issueText = "", issueError = false, issueReason = 0) }
    }

    // Notifications ----------------------------------------------------------
    fun openNotifs() = go(Screen.NOTIFS)
    fun closeNotifs() = go(if (_state.value.freelancerMode) Screen.FDASH else Screen.HOME)
    fun markAllRead() {
        set { s -> s.copy(notifs = s.notifs.map { it.copy(unread = false) }) }
        flash("All caught up")
    }
    fun openNotif(id: String) {
        val n = _state.value.notifs.find { it.id == id }
        set { s -> s.copy(notifs = s.notifs.map { if (it.id == id) it.copy(unread = false) else it }) }
        val target = n?.target ?: return
        if (target.type == "order") openOrder(target.id) else openThread(target.id)
    }

    // Mode switching -----------------------------------------------------
    fun startFreelancer() {
        val s = _state.value
        set { it.copy(freelancerMode = true, onbStep = if (s.onboarded) 4 else 1, onbErrorMsg = "",
            screen = if (s.onboarded) Screen.FDASH else Screen.FONB) }
    }
    fun backToClient() = set { it.copy(freelancerMode = false, screen = Screen.YOU) }

    // Onboarding --------------------------------------------------------------
    fun setPhone(v: String) = set { it.copy(phone = v.filter { c -> c.isDigit() || c == ' ' }.take(11), onbErrorMsg = "") }
    fun setOtp(v: String) = set { it.copy(otp = v.filter { c -> c.isDigit() }.take(4), onbErrorMsg = "") }
    fun setFName(v: String) = set { it.copy(fName = v, onbErrorMsg = "") }
    fun setFCity(i: Int) = set { it.copy(fCityIdx = i) }
    fun setFRadius(i: Int) = set { it.copy(fRadiusIdx = i) }
    fun setFBio(v: String) = set { it.copy(fBio = v) }
    fun toggleKyc(key: String) = set { s ->
        val k = s.kyc
        val nk = when (key) {
            "aadhaar" -> k.copy(aadhaar = !k.aadhaar)
            "pan" -> k.copy(pan = !k.pan)
            "selfie" -> k.copy(selfie = !k.selfie)
            else -> k
        }
        s.copy(kyc = nk, onbErrorMsg = "")
    }
    fun toggleBank() = set { it.copy(bank = !it.bank) }
    fun updRow(i: Int, cat: Int? = null, type: Int? = null, amount: String? = null) = set { s ->
        s.copy(svcRows = s.svcRows.mapIndexed { x, r ->
            if (x == i) r.copy(cat = cat ?: r.cat, type = type ?: r.type, amount = amount ?: r.amount) else r
        }, onbErrorMsg = "")
    }
    fun addSvcRow() = set { s ->
        s.copy(svcRows = s.svcRows + ServiceRow((s.svcRows.size * 3) % SVC_CATS.size, 0, ""), onbErrorMsg = "")
    }
    fun removeSvcRow(i: Int) = set { s ->
        s.copy(svcRows = if (s.svcRows.size > 1) s.svcRows.filterIndexed { x, _ -> x != i } else s.svcRows)
    }
    fun onbBack() {
        val s = _state.value
        if (s.onbStep == 1) {
            go(Screen.YOU)
            return
        }
        set { it.copy(onbStep = it.onbStep - 1, onbErrorMsg = "") }
    }
    fun onbNext() {
        val s = _state.value
        if (s.onbStep == 1) {
            val digits = s.phone.filter { it.isDigit() }
            if (digits.length < 10) {
                set { it.copy(onbErrorMsg = "Enter a 10-digit mobile number.") }
                return
            }
            if (!s.otpSent) {
                set { it.copy(otpSent = true, onbErrorMsg = "") }
                flash("OTP sent to +91 ${s.phone}")
                return
            }
            if (s.otp != "1234") {
                set { it.copy(onbErrorMsg = "That code didn't match. Use 1234 in this demo.") }
                return
            }
            set { it.copy(onbStep = 2, onbErrorMsg = "") }
            return
        }
        if (s.onbStep == 2) {
            if (s.fName.trim().length < 2) {
                set { it.copy(onbErrorMsg = "Add the name clients should see.") }
                return
            }
            set { it.copy(onbStep = 3, onbErrorMsg = "") }
            return
        }
        if (s.onbStep == 3) {
            if (kycCount(s) < 2) {
                set { it.copy(onbErrorMsg = "Upload at least Aadhaar and a selfie to get verified.") }
                return
            }
            set { it.copy(onbStep = 4, onbErrorMsg = "") }
            return
        }
        val valid = s.svcRows.filter { it.amount.trim().isNotEmpty() }
        if (valid.isEmpty()) {
            set { it.copy(onbErrorMsg = "Add a price for at least one service.") }
            return
        }
        if (s.subscribed || s.onboarded) {
            finishPublish()
            return
        }
        set { it.copy(onbStep = 5, onbErrorMsg = "") }
    }
    fun subscribeAndPublish(planIdx: Int) {
        val name = if (planIdx == 1) "Pro" else "Starter"
        val price = if (planIdx == 1) "₹799/mo" else "₹299/mo"
        set { it.copy(subscribed = true, planIdx = planIdx) }
        finishPublish()
        viewModelScope.launch {
            delay(Timing.SUBSCRIBED)
            flash("Subscribed to $name · $price via Razorpay")
        }
    }
    fun fixKyc() {
        set { it.copy(onbStep = 3, onbErrorMsg = "") }
        go(Screen.FONB)
    }
    fun addMoreServices() {
        set { it.copy(onbStep = 4, onbErrorMsg = "") }
        go(Screen.FONB)
    }

    // Freelancer working state ------------------------------------------------
    fun toggleAvailable() {
        val was = _state.value.available
        set { it.copy(available = !it.available) }
        flash(if (was) "Hidden from new searches" else "You're visible in ${CITIES[_state.value.fCityIdx]} again")
    }
    fun passRequest(id: String) {
        set { s -> s.copy(reqs = s.reqs.filter { it.id != id }) }
        flash("Passed on this job")
    }
    fun openQuote(id: String) = set { it.copy(quoteFor = id, quoteAmount = "", quoteDayIdx = 1, quoteMsg = "", quoteError = false) }
    fun closeQuote() = set { it.copy(quoteFor = null) }
    fun setQuoteAmount(v: String) = set { it.copy(quoteAmount = v.filter { c -> c.isDigit() }.take(7), quoteError = false) }
    fun setQuoteDay(i: Int) = set { it.copy(quoteDayIdx = i) }
    fun setQuoteMsg(v: String) = set { it.copy(quoteMsg = v, quoteError = false) }
    fun sendQuote() {
        val s = _state.value
        val amount = s.quoteAmount.filter { it.isDigit() }.toIntOrNull() ?: 0
        if (amount < 100 || s.quoteMsg.trim().length < 8) {
            set { it.copy(quoteError = true) }
            return
        }
        val req = s.reqs.find { it.id == s.quoteFor } ?: return
        val newThread = Thread(
            id = "q-${req.id}", name = req.title, first = "the client", proId = "q-${req.id}",
            last = "You quoted ${money(amount)} · ${DAY_LABELS[s.quoteDayIdx]}", ts = "now",
            msgs = listOf(Message("them", "${req.title}. ${req.meta.split(" · ").first()}. Budget ${req.budget}.", "9:12")),
            quote = Quote(amount, DAY_LABELS[s.quoteDayIdx], SVC_CATS[s.svcRows[0].cat], s.quoteMsg.trim(), "pending"),
        )
        set { st ->
            st.copy(
                reqs = st.reqs.filter { it.id != st.quoteFor },
                quoteFor = null,
                quotesSent = st.quotesSent + 1,
                threads = listOf(newThread) + st.threads,
            )
        }
        flash("Quote sent · ${money(amount)}")
        notify("Quote sent · ${money(amount)}", "${req.title} — the client can see it now.", NotifTarget("thread", "q-${req.id}"))
    }
    fun markGigDelivered(id: String) {
        val g = _state.value.fGigs.find { it.id == id } ?: return
        if (g.status == "DELIVERED") {
            flash("Client confirms delivery directly with you")
            return
        }
        set { s -> s.copy(fGigs = s.fGigs.map { if (it.id == id) it.copy(status = "DELIVERED") else it }) }
        flash("Marked delivered — ${g.amount} collected directly from the client")
    }
    fun remindPayment(client: String) = flash("Reminder sent to $client")
    fun markPaymentReceived(id: String) {
        val p = _state.value.payments.find { it.id == id } ?: return
        set { s -> s.copy(payments = s.payments.map { if (it.id == id) it.copy(status = "received", via = "UPI · today", whenText = "") else it }) }
        flash("${money(p.amount)} from ${p.client} marked received")
        notify("Payment received", "${money(p.amount)} from ${p.client} — recorded in your August total.")
    }
    fun managePlan() = flash("Plan managed in Razorpay · cancel anytime")
    fun pickPlan(i: Int) = set { it.copy(planIdx = i) }
}
