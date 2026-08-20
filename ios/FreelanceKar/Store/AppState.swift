import Foundation

/// Mirrors src/lib/types.ts's AppState shape field-for-field.
struct AppState {
    // Navigation
    var screen: Screen = .home
    var freelancerMode: Bool = false

    // Discovery
    var cityIdx: Int = 0
    var locality: String = ""
    var cityOpen: Bool = false
    var citySearch: String = ""
    var query: String = ""
    var brief: String = ""
    var searchLabel: String = ""
    var searching: Bool = false
    var sort: Sort = .match
    var filters = FilterSet()
    var applied = FilterSet()
    var filtersOpen: Bool = false

    // Freelancer detail & hiring
    var activeId: String? = nil
    var svcIdx: Int = 0
    var saved: [String] = []
    var hire: Int = 0 // 0 closed, 1 details, 2 pay, 3 success, 4 failure
    var hireNote: String = ""
    var hireDateIdx: Int = 0
    var hireError: Bool = false
    var methodIdx: Int = 0
    var paying: Bool = false
    var payRetried: Bool = false

    // Orders & messaging
    var bookings: [Booking] = []
    var viewOrder: String? = nil
    var threads: [ChatThread] = []
    var threadId: String? = nil
    var draft: String = ""
    var typing: Bool = false

    // Disputes & reviews
    var issueOpen: Bool = false
    var issueReason: Int = 0
    var issueText: String = ""
    var issueError: Bool = false
    var reviewOpen: Bool = false
    var reviewStars: Int = 0
    var reviewText: String = ""
    var reviewError: Bool = false

    // Notifications
    var notifs: [Notif] = Seed.seedNotifs

    // Freelancer onboarding & account
    var onbStep: Int = 1
    var phone: String = ""
    var otpSent: Bool = false
    var otp: String = ""
    var onbErrorMsg: String = ""
    var fName: String = ""
    var fCityIdx: Int = 0
    var fRadiusIdx: Int = 1
    var fBio: String = ""
    var kycAadhaar: Bool = false
    var kycPan: Bool = false
    var kycSelfie: Bool = false
    var bank: Bool = false
    var svcRows: [ServiceRow] = [ServiceRow(cat: 0, type: 0, amount: "")]
    var onboarded: Bool = false
    var subscribed: Bool = false
    var planIdx: Int = 1
    var kycRejected: Bool = false

    // Freelancer working state
    var available: Bool = true
    var reqs: [JobRequest] = Seed.reqs
    var quotesSent: Int = 0
    var quoteFor: String? = nil
    var quoteAmount: String = ""
    var quoteDayIdx: Int = 1
    var quoteMsg: String = ""
    var quoteError: Bool = false
    var fGigs: [Gig] = Seed.seedGigs
    var payments: [Payment] = Seed.payments

    // UI
    var toast: String = ""

    var kycCount: Int { [kycAadhaar, kycPan, kycSelfie].filter { $0 }.count }
}

/// Perceived rhythm of the prototype (src/lib/store.tsx TIMING) — keep these
/// values when wiring real network calls.
enum TIMING {
    static let search: UInt64 = 750_000_000
    static let payConfirm: UInt64 = 1_100_000_000
    static let accept: UInt64 = 3_200_000_000
    static let deliver: UInt64 = 9_000_000_000
    static let chatReply: UInt64 = 1_600_000_000
    static let supportReply: UInt64 = 4_500_000_000
    static let toast: UInt64 = 2_200_000_000
    static let profileLive: UInt64 = 1_200_000_000
    static let subscribed: UInt64 = 600_000_000
}
