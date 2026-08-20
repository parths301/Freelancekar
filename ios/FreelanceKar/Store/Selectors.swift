import Foundation

/// Derived/filter/sort logic. Mirrors src/lib/selectors.ts.
enum Selectors {

    static func cityOf(_ s: AppState) -> String { Seed.cities[s.cityIdx] }
    static func placeLabel(_ s: AppState) -> String { s.locality.isEmpty ? cityOf(s) : s.locality }

    static func activePro(_ s: AppState) -> Pro {
        Seed.pros.first { $0.id == s.activeId } ?? Seed.pros[0]
    }

    static func selectedPackage(_ s: AppState) -> Package {
        let pro = activePro(s)
        let idx = min(s.svcIdx, pro.packages.count - 1)
        return pro.packages[idx]
    }

    static func selectResults(_ s: AppState) -> [Pro] {
        let f = s.applied
        var results = Seed.pros.filter { p in
            if f.budget != "any", let b = Int(f.budget), p.base > b { return false }
            if f.dist != "any", let d = Int(f.dist), p.km > Double(d) { return false }
            if f.mode == "remote", !p.remote { return false }
            if f.mode == "onsite", p.id == "faizan" { return false }
            if f.lang != "any", !p.languages.contains(f.lang) { return false }
            if f.availNow, p.km > 6 { return false }
            return true
        }

        switch s.sort {
        case .near:
            results = results.sorted { $0.km < $1.km }
        case .price:
            results = results.filter { $0.base <= 15000 }.sorted { $0.base < $1.base }
        case .rating:
            results = results.filter { $0.rating >= 4.8 }
        case .match:
            results = results.sorted { $0.match > $1.match }
        }
        return results
    }

    static func filterCount(_ s: AppState) -> Int {
        var c = 0
        if s.applied.budget != "any" { c += 1 }
        if s.applied.dist != "any" { c += 1 }
        if s.applied.mode != "any" { c += 1 }
        if s.applied.lang != "any" { c += 1 }
        if s.applied.availNow { c += 1 }
        return c
    }

    struct CityRow: Identifiable {
        var id: String { key }
        var key: String
        var name: String
        var sub: String
        var count: String
        var icon: String
        var on: Bool
        var city: String
        var locality: String
    }

    static func selectCityRows(_ s: AppState) -> [CityRow] {
        let q = s.citySearch.trimmingCharacters(in: .whitespaces).lowercased()
        let city = cityOf(s)
        let cities: [CityRow] = Seed.cities.filter { q.isEmpty || $0.lowercased().contains(q) }.map { c in
            CityRow(key: "city-\(c)", name: c, sub: "All localities", count: Seed.cityCounts[c] ?? "",
                    icon: "◉", on: city == c && s.locality.isEmpty, city: c, locality: "")
        }
        let locs: [CityRow] = Seed.localities.filter { (n, c, _) in
            q.isEmpty || n.lowercased().contains(q) || c.lowercased().contains(q)
        }.map { (n, c, ct) in
            CityRow(key: "loc-\(n)", name: n, sub: c, count: String(ct), icon: "◌",
                    on: s.locality == n, city: c, locality: n)
        }
        return cities + locs
    }

    static func currentThread(_ s: AppState) -> ChatThread? {
        s.threads.first { $0.id == s.threadId }
    }

    static func currentBooking(_ s: AppState) -> Booking? {
        s.bookings.first { $0.id == s.viewOrder }
    }

    static let bookingStatusLabel: [BookingStatus: String] = [
        .awaiting: "AWAITING CONFIRMATION",
        .in_progress: "IN PROGRESS",
        .delivered: "DELIVERED · CONFIRM & RATE",
        .approved: "COMPLETED",
    ]

    static let orderStatusLabel: [BookingStatus: String] = [
        .awaiting: "AWAITING CONFIRMATION",
        .in_progress: "IN PROGRESS",
        .delivered: "DELIVERED",
        .approved: "COMPLETED",
    ]

    static let orderSteps: [(String, String)] = [
        ("Booking confirmed", "Pay the freelancer directly, no platform fee"),
        ("Freelancer confirmed", "Work has started"),
        ("Work delivered", "Review the files and pay if you haven’t already"),
        ("Marked complete", "Job closed out"),
    ]

    static func toPayTotal(_ s: AppState) -> String {
        money(s.bookings.filter { $0.status != .approved }.reduce(0) { $0 + $1.amountNum })
    }

    // Freelancer side

    static func validSvcRows(_ s: AppState) -> [ServiceRow] {
        s.svcRows.filter { !$0.amount.trimmingCharacters(in: .whitespaces).isEmpty }
    }

    static func profileStrength(_ s: AppState) -> Int {
        min(100, 30 + validSvcRows(s).count * 12 + s.kycCount * 8 + (s.bank ? 6 : 0) + (s.fBio.trimmingCharacters(in: .whitespaces).isEmpty ? 0 : 6))
    }

    static func strengthNote(_ s: AppState) -> String {
        let city = Seed.cities[s.fCityIdx]
        if s.kycCount < 3 { return "Finish verification to rank higher in \(city)" }
        if validSvcRows(s).count < 3 { return "Add one more service to appear in more searches" }
        return "Strong profile — you’ll show up near the top in \(city)"
    }

    struct MyService { var name: String; var terms: String; var price: String }

    static func myServices(_ s: AppState) -> [MyService] {
        let city = Seed.cities[s.fCityIdx]
        let rows = validSvcRows(s)
        if rows.isEmpty {
            return [MyService(name: "No services yet", terms: "Add one to start getting requests", price: "—")]
        }
        return rows.map { r in
            MyService(name: Seed.svcCats[r.cat], terms: "\(Seed.svcTypes[r.type].0) · \(city)",
                       price: "\(money(Int(r.amount) ?? 0)) \(Seed.svcTypes[r.type].1)")
        }
    }

    struct PaymentTotals { var due: [Payment]; var got: [Payment]; var payDue: Int; var payGot: Int; var payTotal: Int }

    static func paymentTotals(_ s: AppState) -> PaymentTotals {
        let due = s.payments.filter { $0.status == .awaiting }
        let got = s.payments.filter { $0.status == .received }
        let payDue = due.reduce(0) { $0 + $1.amount }
        let payGot = got.reduce(0) { $0 + $1.amount }
        return PaymentTotals(due: due, got: got, payDue: payDue, payGot: payGot, payTotal: payDue + payGot)
    }

    static func planName(_ s: AppState) -> String { s.planIdx == 1 ? "Pro" : "Starter" }
    static func planPrice(_ s: AppState) -> String { s.planIdx == 1 ? "₹799/mo" : "₹299/mo" }

    static func unreadCount(_ s: AppState) -> Int { s.notifs.filter { $0.unread }.count }
}
