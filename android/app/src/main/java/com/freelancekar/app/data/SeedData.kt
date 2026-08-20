package com.freelancekar.app.data

val PROS: List<Pro> = listOf(
    Pro(
        id = "nikita", name = "Nikita Sahu", first = "Nikita",
        headline = "Reels · 2.2 km", tagline = "Content creator · Nagpur · On-site & remote",
        services = "Reel editing · Social media", rating = 4.9, jobs = 88,
        distance = "2.2 km", km = 2.2, price = "₹1,400 / reel", base = 1400,
        note = "Replies in ~10 min", replyIn = "10m", years = "3 yrs", match = 96,
        verified = true, remote = true, languages = listOf("Hindi", "English"),
        reviewer = "Café Mitti, Nagpur",
        review = "Shot and edited 12 reels for our launch week. Understood the brief the first time and delivered a day early.",
        packages = listOf(
            Package("Instagram reel editing", "Fixed package · 48 hr delivery", "₹1,400", 1400),
            Package("Social media handling", "Monthly retainer · 12 posts", "₹14,000", 14000),
            Package("Shoot + edit day", "Per day · travel extra", "₹6,000", 6000),
        ),
    ),
    Pro(
        id = "aarambh", name = "Studio Aarambh", first = "Aarambh",
        headline = "Social media · 4.6 km", tagline = "Studio of 3 · Sitabuldi, Nagpur",
        services = "Social media · Photography · Ads", rating = 4.8, jobs = 210,
        distance = "4.6 km", km = 4.6, price = "From ₹12,000", base = 12000,
        note = "Team of 3 · studio in Sitabuldi", replyIn = "25m", years = "5 yrs", match = 91,
        verified = true, remote = false, languages = listOf("Hindi", "English"),
        reviewer = "Kalash Jewellers",
        review = "Handled our festive campaign end to end — shoot, edits and the ad spend. Reporting every Monday without being asked.",
        packages = listOf(
            Package("Social media handling", "Monthly retainer · 16 posts", "₹12,000", 12000),
            Package("Product photography", "Per day · 40 SKUs", "₹9,000", 9000),
            Package("Meta ads management", "Monthly · ad spend separate", "₹8,000", 8000),
        ),
    ),
    Pro(
        id = "faizan", name = "Faizan Ali", first = "Faizan",
        headline = "Video editing · 7 km", tagline = "Editor & voice artist · Nagpur · Remote only",
        services = "Video editing · Voiceover", rating = 4.7, jobs = 45,
        distance = "7 km", km = 7.0, price = "₹900 / reel", base = 900,
        note = "Remote only", replyIn = "1 hr", years = "2 yrs", match = 88,
        verified = false, remote = true, languages = listOf("Hindi", "English", "Marathi"),
        reviewer = "Vidarbha Tutorials",
        review = "Edited 30 lecture videos with clean captions. Fast turnaround and never argued about revisions.",
        packages = listOf(
            Package("Reel / short editing", "Fixed package · 24 hr delivery", "₹900", 900),
            Package("Long-form video edit", "Per video · up to 20 min", "₹2,500", 2500),
            Package("Hindi voiceover", "Per 500 words", "₹1,200", 1200),
        ),
    ),
    Pro(
        id = "priya", name = "Priya Deshmukh", first = "Priya",
        headline = "Reel editor · 3.1 km", tagline = "Content creator · Nagpur · On-site & remote",
        services = "Reel editing · Social media · Photography", rating = 4.9, jobs = 142,
        distance = "3.1 km", km = 3.1, price = "₹1,500 / reel", base = 1500,
        note = "Replies in ~15 min", replyIn = "15m", years = "4 yrs", match = 94,
        verified = true, remote = true, languages = listOf("Hindi", "English", "Marathi"),
        reviewer = "Café Mitti, Nagpur",
        review = "Made our page look like a real brand. Twelve reels a month, always on schedule.",
        packages = listOf(
            Package("Instagram reel editing", "Fixed package · 48 hr delivery", "₹1,500", 1500),
            Package("Social media handling", "Monthly retainer · 12 posts", "₹12,000", 12000),
            Package("Event & product photography", "Per day · travel extra", "₹7,500", 7500),
        ),
    ),
    Pro(
        id = "rohit", name = "Rohit Kumawat", first = "Rohit",
        headline = "Drone shoots · 6 km", tagline = "Wedding films & drone · Nagpur",
        services = "Drone shoots · Wedding films", rating = 4.7, jobs = 63,
        distance = "6 km", km = 6.0, price = "₹8,000 / day", base = 8000,
        note = "Free on 18–21 Aug", replyIn = "40m", years = "3 yrs", match = 85,
        verified = true, remote = false, languages = listOf("Hindi", "Marathi"),
        reviewer = "Sharma Weddings",
        review = "Drone work lifted the whole film. Turned up early both days with backup batteries.",
        packages = listOf(
            Package("Drone shoot", "Per day · 4K footage", "₹8,000", 8000),
            Package("Wedding film", "2 days · edit included", "₹35,000", 35000),
            Package("Event coverage", "Per day · photo + video", "₹12,000", 12000),
        ),
    ),
)

/** icon, label, canned search query */
val CATS: List<Triple<String, String, String>> = listOf(
    Triple("▶", "Reels & video", "Reel editor"),
    Triple("◎", "Social media", "Social media handling"),
    Triple("◫", "Photo & wedding", "Photographer"),
    Triple("◈", "Graphic design", "Logo & branding"),
    Triple("✎", "Content writing", "Content writer"),
    Triple("⌘", "Web & apps", "Web developer"),
    Triple("◍", "Voiceover", "Hindi voiceover"),
    Triple("◭", "Ads & marketing", "Meta ads expert"),
    Triple("₹", "GST & accounts", "GST filing"),
)

val CITIES = listOf("Nagpur", "Indore", "Jabalpur", "Nashik")

val CITY_COUNTS = mapOf(
    "Nagpur" to "2,140", "Indore" to "1,860", "Jabalpur" to "640", "Nashik" to "910",
)

/** locality, parent city, freelancer count */
val LOCALITIES: List<Triple<String, String, Int>> = listOf(
    Triple("Dharampeth", "Nagpur", 312),
    Triple("Sitabuldi", "Nagpur", 268),
    Triple("Civil Lines", "Nagpur", 195),
    Triple("Manish Nagar", "Nagpur", 164),
    Triple("Wardha Road", "Nagpur", 221),
    Triple("Vijay Nagar", "Indore", 298),
    Triple("Palasia", "Indore", 241),
    Triple("Rau", "Indore", 132),
    Triple("Napier Town", "Jabalpur", 148),
    Triple("Wright Town", "Jabalpur", 121),
    Triple("College Road", "Nashik", 176),
    Triple("Gangapur Road", "Nashik", 203),
)

val SVC_CATS = listOf(
    "Reels & video editing", "Social media handling", "Photography & shoots",
    "Graphic design", "Content writing", "Voiceover & dubbing", "Ads & marketing",
    "Web development", "Accounting & GST", "Tutoring", "Drone & event coverage",
    "Data entry / VA",
)

/** label, unit suffix */
val SVC_TYPES: List<Pair<String, String>> = listOf(
    "Fixed" to "/ project", "Per day" to "/ day", "Monthly" to "/ month",
)

val REQS: List<JobRequest> = listOf(
    JobRequest("r1", "8 reels / month — café", "₹15k", "Dharampeth · 3.1 km · posted 20 min ago"),
    JobRequest("r2", "Product shoot — 40 SKUs", "On quote", "Sitabuldi · 5.4 km · posted 1 hr ago"),
    JobRequest("r3", "Wedding highlight edit", "₹22k", "Civil Lines · 2 km · posted 3 hr ago"),
)

val PAYMENTS: List<Payment> = listOf(
    Payment("p1", "Kalash Jewellers", "Reel editing · 6 reels", 9000, "awaiting", "", "Due 19 Aug"),
    Payment("p2", "Café Mitti", "Social media · August", 12000, "awaiting", "", "Due on approval"),
    Payment("p3", "Vidarbha Tutorials", "Long-form edits · 12 videos", 15000, "received", "UPI · 12 Aug", ""),
    Payment("p4", "Sharma Weddings", "Wedding highlight edit", 12200, "received", "Cash · 6 Aug", ""),
)

val ISSUE_REASONS = listOf(
    "Work not delivered", "Not what was agreed", "Freelancer unreachable",
    "Asked for more money", "Something else",
)

val SEED_NOTIFS: List<Notif> = listOf(
    Notif(
        id = "n1", title = "12 new freelancers in Nagpur",
        body = "Reel editors, designers and GST filers verified this week.",
        ts = "2h", unread = true, target = null,
    ),
    Notif(
        id = "n2", title = "Welcome to FreelanceKar",
        body = "Pay freelancers directly — FreelanceKar never touches your money.",
        ts = "1d", unread = false, target = null,
    ),
)

val SEED_GIGS: List<Gig> = listOf(
    Gig("g1", "Kalash Jewellers", "Reel editing · 6 reels", "₹9,000", "IN PROGRESS"),
    Gig("g2", "Café Mitti", "Social media · August", "₹12,000", "DELIVERED"),
)

data class Plan(val name: String, val price: String, val note: String)

val PLANS: List<Plan> = listOf(
    Plan("Starter", "₹299/mo", "Up to 2 services listed · standard placement"),
    Plan("Pro", "₹799/mo", "Unlimited services · priority placement · verified badge boost"),
)

val DAY_LABELS = listOf("24 hr", "3 days", "1 week", "2 weeks")
val DATE_LABELS = listOf("Tomorrow", "This week", "Pick date")
val RADIUS_LABELS = listOf("5 km", "10 km", "25 km", "Anywhere")

val SUGGESTION_CHIPS = listOf(
    "Wedding shoot", "GST filing", "Logo design", "Hindi voiceover", "Reel editing",
)

/** icon, label, note */
val PAY_METHODS: List<Triple<String, String, String>> = listOf(
    Triple("◉", "UPI · GPay / PhonePe", "Instant, no charges"),
    Triple("▭", "Card", "Visa · Mastercard · RuPay"),
    Triple("⌾", "Net banking", "All major banks"),
)
