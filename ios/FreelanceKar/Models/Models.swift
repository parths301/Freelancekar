import Foundation

// MARK: - Navigation

enum Screen: Equatable {
    case home, explore, results, profile, chats, thread, order, notifs, you
    case fonb, fdash, fearn, fgigs, fme
}

enum Sort: String { case match, near, price, rating }

struct FilterSet: Equatable {
    var budget: String = "any"
    var dist: String = "any"
    var mode: String = "any"
    var lang: String = "any"
    var availNow: Bool = false
}

enum BookingStatus: String { case awaiting, in_progress, delivered, approved }

struct Review: Equatable { var stars: Int; var text: String }

struct Issue: Equatable {
    var ref: String
    var reason: String
    var text: String
    var status: IssueStatus
}
enum IssueStatus: String { case open, responded }

struct Booking: Identifiable, Equatable {
    var id: String
    var proId: String
    var name: String
    var first: String
    var service: String
    var amount: String
    var amountNum: Int
    var status: BookingStatus
    var review: Review?
    var issue: Issue?
}

struct ChatMessage: Identifiable, Equatable {
    let id = UUID()
    var from: MessageSender
    var text: String
    var ts: String
}
enum MessageSender { case me, them }

struct Quote: Equatable {
    var amount: Int
    var days: String
    var service: String
    var msg: String
    var status: QuoteStatus
}
enum QuoteStatus: String { case pending, accepted, declined }

struct ChatThread: Identifiable, Equatable {
    var id: String
    var name: String
    var first: String
    var proId: String
    var last: String
    var ts: String
    var msgs: [ChatMessage]
    var quote: Quote?
    var orderRef: String?
}

struct ServiceRow: Identifiable, Equatable {
    let id = UUID()
    var cat: Int
    var type: Int
    var amount: String
}

// MARK: - Seed data types

struct Package: Identifiable, Equatable {
    var id: String { name }
    var name: String
    var terms: String
    var price: String
    var amount: Int
}

struct Pro: Identifiable, Equatable {
    var id: String
    var name: String
    var first: String
    var headline: String
    var tagline: String
    var services: String
    var rating: Double
    var jobs: Int
    var distance: String
    var km: Double
    var price: String
    var base: Int
    var note: String
    var replyIn: String
    var years: String
    var match: Int
    var verified: Bool
    var remote: Bool
    var languages: [String]
    var reviewer: String
    var review: String
    var packages: [Package]
}

struct JobRequest: Identifiable, Equatable {
    var id: String
    var title: String
    var budget: String
    var meta: String
}

enum PaymentStatus: String { case awaiting, received }

struct Payment: Identifiable, Equatable {
    var id: String
    var client: String
    var service: String
    var amount: Int
    var status: PaymentStatus
    var via: String
    var when: String
}

struct NotifTarget: Equatable {
    enum Kind: String { case order, thread }
    var type: Kind
    var id: String
}

struct Notif: Identifiable, Equatable {
    var id: String
    var title: String
    var body: String
    var ts: String
    var unread: Bool
    var target: NotifTarget?
}

enum GigStatus: String { case IN_PROGRESS = "IN PROGRESS", DELIVERED = "DELIVERED" }

struct Gig: Identifiable, Equatable {
    var id: String
    var client: String
    var service: String
    var amount: String
    var status: GigStatus
}

struct Plan: Equatable {
    var name: String
    var price: String
    var note: String
}
