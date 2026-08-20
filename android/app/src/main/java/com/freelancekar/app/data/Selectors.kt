package com.freelancekar.app.data

/** Derived/filter/sort logic — mirrors src/lib/selectors.ts. */

fun cityOf(s: AppState): String = CITIES[s.cityIdx]
fun placeLabel(s: AppState): String = s.locality.ifEmpty { cityOf(s) }

fun activePro(s: AppState): Pro = PROS.find { it.id == s.activeId } ?: PROS[0]

fun selectedPackage(s: AppState): Package {
    val pro = activePro(s)
    val idx = minOf(s.svcIdx, pro.packages.size - 1)
    return pro.packages[idx]
}

fun selectResults(s: AppState): List<Pro> {
    val f = s.applied
    var results = PROS.filter { p ->
        if (f.budget != "any" && p.base > f.budget.toInt()) return@filter false
        if (f.dist != "any" && p.km > f.dist.toInt()) return@filter false
        if (f.mode == "remote" && !p.remote) return@filter false
        if (f.mode == "onsite" && p.id == "faizan") return@filter false
        if (f.lang != "any" && f.lang !in p.languages) return@filter false
        if (f.availNow && p.km > 6) return@filter false
        true
    }
    results = when (s.sort) {
        Sort.NEAR -> results.sortedBy { it.km }
        Sort.PRICE -> results.filter { it.base <= 15000 }.sortedBy { it.base }
        Sort.RATING -> results.filter { it.rating >= 4.8 }
        Sort.MATCH -> results.sortedByDescending { it.match }
    }
    return results
}

fun filterCount(s: AppState): Int {
    val a = s.applied
    var n = 0
    if (a.budget != "any") n++
    if (a.dist != "any") n++
    if (a.mode != "any") n++
    if (a.lang != "any") n++
    if (a.availNow) n++
    return n
}

data class CityRow(
    val key: String, val name: String, val sub: String, val count: String,
    val icon: String, val on: Boolean, val city: String, val locality: String,
)

fun selectCityRows(s: AppState): List<CityRow> {
    val q = s.citySearch.trim().lowercase()
    val city = cityOf(s)
    val cities = CITIES.filter { q.isEmpty() || it.lowercase().contains(q) }.map { c ->
        CityRow(
            key = "city-$c", name = c, sub = "All localities", count = CITY_COUNTS[c] ?: "",
            icon = "◉", on = city == c && s.locality.isEmpty(), city = c, locality = "",
        )
    }
    val locs = LOCALITIES.filter { (n, c, _) ->
        q.isEmpty() || n.lowercase().contains(q) || c.lowercase().contains(q)
    }.map { (n, c, ct) ->
        CityRow(
            key = "loc-$n", name = n, sub = c, count = ct.toString(), icon = "◌",
            on = s.locality == n, city = c, locality = n,
        )
    }
    return cities + locs
}

fun currentThread(s: AppState): Thread? = s.threads.find { it.id == s.threadId }
fun currentBooking(s: AppState): Booking? = s.bookings.find { it.id == s.viewOrder }

val BOOKING_STATUS_LABEL = mapOf(
    BookingStatus.AWAITING to "AWAITING CONFIRMATION",
    BookingStatus.IN_PROGRESS to "IN PROGRESS",
    BookingStatus.DELIVERED to "DELIVERED · CONFIRM & RATE",
    BookingStatus.APPROVED to "COMPLETED",
)

val ORDER_STATUS_LABEL = mapOf(
    BookingStatus.AWAITING to "AWAITING CONFIRMATION",
    BookingStatus.IN_PROGRESS to "IN PROGRESS",
    BookingStatus.DELIVERED to "DELIVERED",
    BookingStatus.APPROVED to "COMPLETED",
)

val ORDER_STEPS: List<Pair<String, String>> = listOf(
    "Booking confirmed" to "Pay the freelancer directly, no platform fee",
    "Freelancer confirmed" to "Work has started",
    "Work delivered" to "Review the files and pay if you haven't already",
    "Marked complete" to "Job closed out",
)

fun toPayTotal(s: AppState): String =
    money(s.bookings.filter { it.status != BookingStatus.APPROVED }.sumOf { it.amountNum })

fun kycCount(s: AppState): Int = s.kyc.count
fun validSvcRows(s: AppState): List<ServiceRow> = s.svcRows.filter { it.amount.trim().isNotEmpty() }

fun profileStrength(s: AppState): Int {
    val v = 30 + validSvcRows(s).size * 12 + kycCount(s) * 8 +
        (if (s.bank) 6 else 0) + (if (s.fBio.trim().isNotEmpty()) 6 else 0)
    return minOf(100, v)
}

fun strengthNote(s: AppState): String {
    val city = CITIES[s.fCityIdx]
    return when {
        kycCount(s) < 3 -> "Finish verification to rank higher in $city"
        validSvcRows(s).size < 3 -> "Add one more service to appear in more searches"
        else -> "Strong profile — you'll show up near the top in $city"
    }
}

data class MyService(val name: String, val terms: String, val price: String)

fun myServices(s: AppState): List<MyService> {
    val city = CITIES[s.fCityIdx]
    val rows = validSvcRows(s)
    if (rows.isEmpty()) return listOf(MyService("No services yet", "Add one to start getting requests", "—"))
    return rows.map { r ->
        MyService(
            name = SVC_CATS[r.cat],
            terms = "${SVC_TYPES[r.type].first} · $city",
            price = "${money(r.amount.toIntOrNull() ?: 0)} ${SVC_TYPES[r.type].second}",
        )
    }
}

data class PaymentTotals(
    val due: List<Payment>, val got: List<Payment>, val payDue: Int, val payGot: Int, val payTotal: Int,
)

fun paymentTotals(s: AppState): PaymentTotals {
    val due = s.payments.filter { it.status == "awaiting" }
    val got = s.payments.filter { it.status == "received" }
    val payDue = due.sumOf { it.amount }
    val payGot = got.sumOf { it.amount }
    return PaymentTotals(due, got, payDue, payGot, payDue + payGot)
}

fun planName(s: AppState): String = if (s.planIdx == 1) "Pro" else "Starter"
fun planPrice(s: AppState): String = if (s.planIdx == 1) "₹799/mo" else "₹299/mo"

fun unreadCount(s: AppState): Int = s.notifs.count { it.unread }
