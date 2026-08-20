import Foundation

/// Seed / mock data standing in for a backend. Mirrors src/lib/data.ts exactly,
/// including copy, so swapping in real API responses later shouldn't require
/// touching any view code.
enum Seed {

    static let pros: [Pro] = [
        Pro(id: "nikita", name: "Nikita Sahu", first: "Nikita", headline: "Reels · 2.2 km",
            tagline: "Content creator · Nagpur · On-site & remote",
            services: "Reel editing · Social media", rating: 4.9, jobs: 88, distance: "2.2 km", km: 2.2,
            price: "₹1,400 / reel", base: 1400, note: "Replies in ~10 min", replyIn: "10m", years: "3 yrs",
            match: 96, verified: true, remote: true, languages: ["Hindi", "English"],
            reviewer: "Café Mitti, Nagpur",
            review: "Shot and edited 12 reels for our launch week. Understood the brief the first time and delivered a day early.",
            packages: [
                Package(name: "Instagram reel editing", terms: "Fixed package · 48 hr delivery", price: "₹1,400", amount: 1400),
                Package(name: "Social media handling", terms: "Monthly retainer · 12 posts", price: "₹14,000", amount: 14000),
                Package(name: "Shoot + edit day", terms: "Per day · travel extra", price: "₹6,000", amount: 6000),
            ]),
        Pro(id: "aarambh", name: "Studio Aarambh", first: "Aarambh", headline: "Social media · 4.6 km",
            tagline: "Studio of 3 · Sitabuldi, Nagpur",
            services: "Social media · Photography · Ads", rating: 4.8, jobs: 210, distance: "4.6 km", km: 4.6,
            price: "From ₹12,000", base: 12000, note: "Team of 3 · studio in Sitabuldi", replyIn: "25m", years: "5 yrs",
            match: 91, verified: true, remote: false, languages: ["Hindi", "English"],
            reviewer: "Kalash Jewellers",
            review: "Handled our festive campaign end to end — shoot, edits and the ad spend. Reporting every Monday without being asked.",
            packages: [
                Package(name: "Social media handling", terms: "Monthly retainer · 16 posts", price: "₹12,000", amount: 12000),
                Package(name: "Product photography", terms: "Per day · 40 SKUs", price: "₹9,000", amount: 9000),
                Package(name: "Meta ads management", terms: "Monthly · ad spend separate", price: "₹8,000", amount: 8000),
            ]),
        Pro(id: "faizan", name: "Faizan Ali", first: "Faizan", headline: "Video editing · 7 km",
            tagline: "Editor & voice artist · Nagpur · Remote only",
            services: "Video editing · Voiceover", rating: 4.7, jobs: 45, distance: "7 km", km: 7,
            price: "₹900 / reel", base: 900, note: "Remote only", replyIn: "1 hr", years: "2 yrs",
            match: 88, verified: false, remote: true, languages: ["Hindi", "English", "Marathi"],
            reviewer: "Vidarbha Tutorials",
            review: "Edited 30 lecture videos with clean captions. Fast turnaround and never argued about revisions.",
            packages: [
                Package(name: "Reel / short editing", terms: "Fixed package · 24 hr delivery", price: "₹900", amount: 900),
                Package(name: "Long-form video edit", terms: "Per video · up to 20 min", price: "₹2,500", amount: 2500),
                Package(name: "Hindi voiceover", terms: "Per 500 words", price: "₹1,200", amount: 1200),
            ]),
        Pro(id: "priya", name: "Priya Deshmukh", first: "Priya", headline: "Reel editor · 3.1 km",
            tagline: "Content creator · Nagpur · On-site & remote",
            services: "Reel editing · Social media · Photography", rating: 4.9, jobs: 142, distance: "3.1 km", km: 3.1,
            price: "₹1,500 / reel", base: 1500, note: "Replies in ~15 min", replyIn: "15m", years: "4 yrs",
            match: 94, verified: true, remote: true, languages: ["Hindi", "English", "Marathi"],
            reviewer: "Café Mitti, Nagpur",
            review: "Made our page look like a real brand. Twelve reels a month, always on schedule.",
            packages: [
                Package(name: "Instagram reel editing", terms: "Fixed package · 48 hr delivery", price: "₹1,500", amount: 1500),
                Package(name: "Social media handling", terms: "Monthly retainer · 12 posts", price: "₹12,000", amount: 12000),
                Package(name: "Event & product photography", terms: "Per day · travel extra", price: "₹7,500", amount: 7500),
            ]),
        Pro(id: "rohit", name: "Rohit Kumawat", first: "Rohit", headline: "Drone shoots · 6 km",
            tagline: "Wedding films & drone · Nagpur",
            services: "Drone shoots · Wedding films", rating: 4.7, jobs: 63, distance: "6 km", km: 6,
            price: "₹8,000 / day", base: 8000, note: "Free on 18–21 Aug", replyIn: "40m", years: "3 yrs",
            match: 85, verified: true, remote: false, languages: ["Hindi", "Marathi"],
            reviewer: "Sharma Weddings",
            review: "Drone work lifted the whole film. Turned up early both days with backup batteries.",
            packages: [
                Package(name: "Drone shoot", terms: "Per day · 4K footage", price: "₹8,000", amount: 8000),
                Package(name: "Wedding film", terms: "2 days · edit included", price: "₹35,000", amount: 35000),
                Package(name: "Event coverage", terms: "Per day · photo + video", price: "₹12,000", amount: 12000),
            ]),
    ]

    /// [icon, label, canned search query]
    static let cats: [(String, String, String)] = [
        ("▶", "Reels & video", "Reel editor"),
        ("◎", "Social media", "Social media handling"),
        ("◫", "Photo & wedding", "Photographer"),
        ("◈", "Graphic design", "Logo & branding"),
        ("✎", "Content writing", "Content writer"),
        ("⌘", "Web & apps", "Web developer"),
        ("◍", "Voiceover", "Hindi voiceover"),
        ("◭", "Ads & marketing", "Meta ads expert"),
        ("₹", "GST & accounts", "GST filing"),
    ]

    static let cities = ["Nagpur", "Indore", "Jabalpur", "Nashik"]

    static let cityCounts: [String: String] = [
        "Nagpur": "2,140", "Indore": "1,860", "Jabalpur": "640", "Nashik": "910",
    ]

    /// [locality, parent city, freelancer count]
    static let localities: [(String, String, Int)] = [
        ("Dharampeth", "Nagpur", 312),
        ("Sitabuldi", "Nagpur", 268),
        ("Civil Lines", "Nagpur", 195),
        ("Manish Nagar", "Nagpur", 164),
        ("Wardha Road", "Nagpur", 221),
        ("Vijay Nagar", "Indore", 298),
        ("Palasia", "Indore", 241),
        ("Rau", "Indore", 132),
        ("Napier Town", "Jabalpur", 148),
        ("Wright Town", "Jabalpur", 121),
        ("College Road", "Nashik", 176),
        ("Gangapur Road", "Nashik", 203),
    ]

    static let svcCats = [
        "Reels & video editing", "Social media handling", "Photography & shoots",
        "Graphic design", "Content writing", "Voiceover & dubbing", "Ads & marketing",
        "Web development", "Accounting & GST", "Tutoring", "Drone & event coverage", "Data entry / VA",
    ]

    /// [label, unit suffix]
    static let svcTypes: [(String, String)] = [("Fixed", "/ project"), ("Per day", "/ day"), ("Monthly", "/ month")]

    static let reqs: [JobRequest] = [
        JobRequest(id: "r1", title: "8 reels / month — café", budget: "₹15k", meta: "Dharampeth · 3.1 km · posted 20 min ago"),
        JobRequest(id: "r2", title: "Product shoot — 40 SKUs", budget: "On quote", meta: "Sitabuldi · 5.4 km · posted 1 hr ago"),
        JobRequest(id: "r3", title: "Wedding highlight edit", budget: "₹22k", meta: "Civil Lines · 2 km · posted 3 hr ago"),
    ]

    static let payments: [Payment] = [
        Payment(id: "p1", client: "Kalash Jewellers", service: "Reel editing · 6 reels", amount: 9000, status: .awaiting, via: "", when: "Due 19 Aug"),
        Payment(id: "p2", client: "Café Mitti", service: "Social media · August", amount: 12000, status: .awaiting, via: "", when: "Due on approval"),
        Payment(id: "p3", client: "Vidarbha Tutorials", service: "Long-form edits · 12 videos", amount: 15000, status: .received, via: "UPI · 12 Aug", when: ""),
        Payment(id: "p4", client: "Sharma Weddings", service: "Wedding highlight edit", amount: 12200, status: .received, via: "Cash · 6 Aug", when: ""),
    ]

    static let issueReasons = [
        "Work not delivered", "Not what was agreed", "Freelancer unreachable", "Asked for more money", "Something else",
    ]

    static let seedNotifs: [Notif] = [
        Notif(id: "n1", title: "12 new freelancers in Nagpur",
              body: "Reel editors, designers and GST filers verified this week.", ts: "2h", unread: true, target: nil),
        Notif(id: "n2", title: "Welcome to FreelanceKar",
              body: "Pay freelancers directly — FreelanceKar never touches your money.", ts: "1d", unread: false, target: nil),
    ]

    static let seedGigs: [Gig] = [
        Gig(id: "g1", client: "Kalash Jewellers", service: "Reel editing · 6 reels", amount: "₹9,000", status: .IN_PROGRESS),
        Gig(id: "g2", client: "Café Mitti", service: "Social media · August", amount: "₹12,000", status: .DELIVERED),
    ]

    static let plans: [Plan] = [
        Plan(name: "Starter", price: "₹299/mo", note: "Up to 2 services listed · standard placement"),
        Plan(name: "Pro", price: "₹799/mo", note: "Unlimited services · priority placement · verified badge boost"),
    ]

    static let dayLabels = ["24 hr", "3 days", "1 week", "2 weeks"]
    static let dateLabels = ["Tomorrow", "This week", "Pick date"]
    static let radiusLabels = ["5 km", "10 km", "25 km", "Anywhere"]

    static let suggestionChips = ["Wedding shoot", "GST filing", "Logo design", "Hindi voiceover", "Reel editing"]

    /// [icon, name, note]
    static let payMethods: [(String, String, String)] = [
        ("◉", "UPI · GPay / PhonePe", "Instant, no charges"),
        ("▭", "Card", "Visa · Mastercard · RuPay"),
        ("⌾", "Net banking", "All major banks"),
    ]
}

/// Rupee amounts always use Indian digit grouping — ₹1,40,000, never ₹140,000.
func money(_ n: Int) -> String {
    "₹" + formatIndianGrouping(n)
}

private func formatIndianGrouping(_ n: Int) -> String {
    let negative = n < 0
    var s = String(abs(n))
    guard s.count > 3 else { return (negative ? "-" : "") + s }
    let last3 = String(s.suffix(3))
    s.removeLast(3)
    var groups: [String] = []
    while s.count > 2 {
        groups.insert(String(s.suffix(2)), at: 0)
        s.removeLast(2)
    }
    if !s.isEmpty { groups.insert(s, at: 0) }
    let joined = groups.joined(separator: ",") + "," + last3
    return (negative ? "-" : "") + joined
}
