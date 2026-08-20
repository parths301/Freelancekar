package com.freelancekar.app.data

/** Mirrors src/lib/types.ts AppState — the single app-wide state shape. */
data class AppState(
    // Navigation
    val screen: Screen = Screen.HOME,
    val freelancerMode: Boolean = false,

    // Discovery
    val cityIdx: Int = 0,
    val locality: String = "",
    val cityOpen: Boolean = false,
    val citySearch: String = "",
    val query: String = "",
    val brief: String = "",
    val searchLabel: String = "",
    val searching: Boolean = false,
    val sort: Sort = Sort.MATCH,
    val filters: FilterSet = FilterSet(),
    val applied: FilterSet = FilterSet(),
    val filtersOpen: Boolean = false,

    // Freelancer detail & hiring
    val activeId: String? = null,
    val svcIdx: Int = 0,
    val saved: List<String> = emptyList(),
    val hire: Int = 0, // 0 closed, 1 details, 2 pay, 3 success, 4 failure
    val hireNote: String = "",
    val hireDateIdx: Int = 0,
    val hireError: Boolean = false,
    val methodIdx: Int = 0,
    val paying: Boolean = false,
    val payRetried: Boolean = false,

    // Orders & messaging
    val bookings: List<Booking> = emptyList(),
    val viewOrder: String? = null,
    val threads: List<Thread> = emptyList(),
    val threadId: String? = null,
    val draft: String = "",
    val typing: Boolean = false,

    // Disputes & reviews
    val issueOpen: Boolean = false,
    val issueReason: Int = 0,
    val issueText: String = "",
    val issueError: Boolean = false,
    val reviewOpen: Boolean = false,
    val reviewStars: Int = 0,
    val reviewText: String = "",
    val reviewError: Boolean = false,

    // Notifications
    val notifs: List<Notif> = SEED_NOTIFS,

    // Freelancer onboarding & account
    val onbStep: Int = 1,
    val phone: String = "",
    val otpSent: Boolean = false,
    val otp: String = "",
    val onbErrorMsg: String = "",
    val fName: String = "",
    val fCityIdx: Int = 0,
    val fRadiusIdx: Int = 1,
    val fBio: String = "",
    val kyc: Kyc = Kyc(),
    val bank: Boolean = false,
    val svcRows: List<ServiceRow> = listOf(ServiceRow(0, 0, "")),
    val onboarded: Boolean = false,
    val subscribed: Boolean = false,
    val planIdx: Int = 1,
    val kycRejected: Boolean = false,

    // Freelancer working state
    val available: Boolean = true,
    val reqs: List<JobRequest> = REQS,
    val quotesSent: Int = 0,
    val quoteFor: String? = null,
    val quoteAmount: String = "",
    val quoteDayIdx: Int = 1,
    val quoteMsg: String = "",
    val quoteError: Boolean = false,
    val fGigs: List<Gig> = SEED_GIGS,
    val payments: List<Payment> = PAYMENTS,

    // UI
    val toast: String = "",
    val toastToken: Long = 0L,
)

/** Timing constants mirroring src/lib/store.tsx's TIMING object (milliseconds). */
object Timing {
    const val SEARCH = 750L
    const val PAY_CONFIRM = 1100L
    const val ACCEPT = 3200L
    const val DELIVER = 9000L
    const val CHAT_REPLY = 1600L
    const val SUPPORT_REPLY = 4500L
    const val TOAST = 2200L
    const val PROFILE_LIVE = 1200L
    const val SUBSCRIBED = 600L
}
