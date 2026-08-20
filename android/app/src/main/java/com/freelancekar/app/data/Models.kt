package com.freelancekar.app.data

/**
 * Data model mirrors src/lib/types.ts and src/lib/data.ts from the Next.js
 * reference implementation. This is mock/seed data standing in for a backend.
 */

data class Package(
    val name: String,
    val terms: String,
    val price: String,
    val amount: Int,
)

data class Pro(
    val id: String,
    val name: String,
    val first: String,
    val headline: String,
    val tagline: String,
    val services: String,
    val rating: Double,
    val jobs: Int,
    val distance: String,
    val km: Double,
    val price: String,
    val base: Int,
    val note: String,
    val replyIn: String,
    val years: String,
    val match: Int,
    val verified: Boolean,
    val remote: Boolean,
    val languages: List<String>,
    val reviewer: String,
    val review: String,
    val packages: List<Package>,
)

enum class BookingStatus { AWAITING, IN_PROGRESS, DELIVERED, APPROVED }

data class Review(val stars: Int, val text: String)

data class Issue(
    val ref: String,
    val reason: String,
    val text: String,
    val status: String, // "open" | "responded"
)

data class Booking(
    val id: String,
    val proId: String,
    val name: String,
    val first: String,
    val service: String,
    val amount: String,
    val amountNum: Int,
    val status: BookingStatus,
    val review: Review? = null,
    val issue: Issue? = null,
)

data class Message(val from: String, val text: String, val ts: String) // from: "me" | "them"

data class Quote(
    val amount: Int,
    val days: String,
    val service: String,
    val msg: String,
    val status: String, // pending | accepted | declined
)

data class Thread(
    val id: String,
    val name: String,
    val first: String,
    val proId: String,
    val last: String,
    val ts: String,
    val msgs: List<Message>,
    val quote: Quote? = null,
    val orderRef: String? = null,
)

data class ServiceRow(val cat: Int, val type: Int, val amount: String)

data class JobRequest(val id: String, val title: String, val budget: String, val meta: String)

data class Payment(
    val id: String,
    val client: String,
    val service: String,
    val amount: Int,
    val status: String, // awaiting | received
    val via: String,
    val whenText: String,
)

data class NotifTarget(val type: String, val id: String) // order | thread

data class Notif(
    val id: String,
    val title: String,
    val body: String,
    val ts: String,
    val unread: Boolean,
    val target: NotifTarget? = null,
)

data class Gig(
    val id: String,
    val client: String,
    val service: String,
    val amount: String,
    val status: String, // IN PROGRESS | DELIVERED
)

data class Kyc(val aadhaar: Boolean = false, val pan: Boolean = false, val selfie: Boolean = false) {
    val count get() = listOf(aadhaar, pan, selfie).count { it }
}

data class FilterSet(
    val budget: String = "any",
    val dist: String = "any",
    val mode: String = "any",
    val lang: String = "any",
    val availNow: Boolean = false,
)

enum class Sort { MATCH, NEAR, PRICE, RATING }

enum class Screen {
    HOME, EXPLORE, RESULTS, PROFILE, CHATS, THREAD, ORDER, NOTIFS, YOU,
    FONB, FDASH, FEARN, FGIGS, FME,
}
