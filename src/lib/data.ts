/**
 * Seed data for the FreelanceKar app UI.
 *
 * This is mock data standing in for the backend. Every shape here maps to the
 * "Data needed from the backend" section of the design handoff, so swapping in
 * real API responses should not require changing component code.
 */

export type Package = {
  name: string;
  terms: string;
  price: string;
  amount: number;
};

export type Pro = {
  id: string;
  name: string;
  first: string;
  headline: string;
  tagline: string;
  services: string;
  rating: number;
  jobs: number;
  distance: string;
  km: number;
  price: string;
  base: number;
  note: string;
  replyIn: string;
  years: string;
  match: number;
  verified: boolean;
  remote: boolean;
  languages: string[];
  reviewer: string;
  review: string;
  packages: Package[];
};

export const PROS: Pro[] = [
  {
    id: "nikita",
    name: "Nikita Sahu",
    first: "Nikita",
    headline: "Reels · 2.2 km",
    tagline: "Content creator · Nagpur · On-site & remote",
    services: "Reel editing · Social media",
    rating: 4.9,
    jobs: 88,
    distance: "2.2 km",
    km: 2.2,
    price: "₹1,400 / reel",
    base: 1400,
    note: "Replies in ~10 min",
    replyIn: "10m",
    years: "3 yrs",
    match: 96,
    verified: true,
    remote: true,
    languages: ["Hindi", "English"],
    reviewer: "Café Mitti, Nagpur",
    review:
      "Shot and edited 12 reels for our launch week. Understood the brief the first time and delivered a day early.",
    packages: [
      { name: "Instagram reel editing", terms: "Fixed package · 48 hr delivery", price: "₹1,400", amount: 1400 },
      { name: "Social media handling", terms: "Monthly retainer · 12 posts", price: "₹14,000", amount: 14000 },
      { name: "Shoot + edit day", terms: "Per day · travel extra", price: "₹6,000", amount: 6000 },
    ],
  },
  {
    id: "aarambh",
    name: "Studio Aarambh",
    first: "Aarambh",
    headline: "Social media · 4.6 km",
    tagline: "Studio of 3 · Sitabuldi, Nagpur",
    services: "Social media · Photography · Ads",
    rating: 4.8,
    jobs: 210,
    distance: "4.6 km",
    km: 4.6,
    price: "From ₹12,000",
    base: 12000,
    note: "Team of 3 · studio in Sitabuldi",
    replyIn: "25m",
    years: "5 yrs",
    match: 91,
    verified: true,
    remote: false,
    languages: ["Hindi", "English"],
    reviewer: "Kalash Jewellers",
    review:
      "Handled our festive campaign end to end — shoot, edits and the ad spend. Reporting every Monday without being asked.",
    packages: [
      { name: "Social media handling", terms: "Monthly retainer · 16 posts", price: "₹12,000", amount: 12000 },
      { name: "Product photography", terms: "Per day · 40 SKUs", price: "₹9,000", amount: 9000 },
      { name: "Meta ads management", terms: "Monthly · ad spend separate", price: "₹8,000", amount: 8000 },
    ],
  },
  {
    id: "faizan",
    name: "Faizan Ali",
    first: "Faizan",
    headline: "Video editing · 7 km",
    tagline: "Editor & voice artist · Nagpur · Remote only",
    services: "Video editing · Voiceover",
    rating: 4.7,
    jobs: 45,
    distance: "7 km",
    km: 7,
    price: "₹900 / reel",
    base: 900,
    note: "Remote only",
    replyIn: "1 hr",
    years: "2 yrs",
    match: 88,
    verified: false,
    remote: true,
    languages: ["Hindi", "English", "Marathi"],
    reviewer: "Vidarbha Tutorials",
    review:
      "Edited 30 lecture videos with clean captions. Fast turnaround and never argued about revisions.",
    packages: [
      { name: "Reel / short editing", terms: "Fixed package · 24 hr delivery", price: "₹900", amount: 900 },
      { name: "Long-form video edit", terms: "Per video · up to 20 min", price: "₹2,500", amount: 2500 },
      { name: "Hindi voiceover", terms: "Per 500 words", price: "₹1,200", amount: 1200 },
    ],
  },
  {
    id: "priya",
    name: "Priya Deshmukh",
    first: "Priya",
    headline: "Reel editor · 3.1 km",
    tagline: "Content creator · Nagpur · On-site & remote",
    services: "Reel editing · Social media · Photography",
    rating: 4.9,
    jobs: 142,
    distance: "3.1 km",
    km: 3.1,
    price: "₹1,500 / reel",
    base: 1500,
    note: "Replies in ~15 min",
    replyIn: "15m",
    years: "4 yrs",
    match: 94,
    verified: true,
    remote: true,
    languages: ["Hindi", "English", "Marathi"],
    reviewer: "Café Mitti, Nagpur",
    review: "Made our page look like a real brand. Twelve reels a month, always on schedule.",
    packages: [
      { name: "Instagram reel editing", terms: "Fixed package · 48 hr delivery", price: "₹1,500", amount: 1500 },
      { name: "Social media handling", terms: "Monthly retainer · 12 posts", price: "₹12,000", amount: 12000 },
      { name: "Event & product photography", terms: "Per day · travel extra", price: "₹7,500", amount: 7500 },
    ],
  },
  {
    id: "rohit",
    name: "Rohit Kumawat",
    first: "Rohit",
    headline: "Drone shoots · 6 km",
    tagline: "Wedding films & drone · Nagpur",
    services: "Drone shoots · Wedding films",
    rating: 4.7,
    jobs: 63,
    distance: "6 km",
    km: 6,
    price: "₹8,000 / day",
    base: 8000,
    note: "Free on 18–21 Aug",
    replyIn: "40m",
    years: "3 yrs",
    match: 85,
    verified: true,
    remote: false,
    languages: ["Hindi", "Marathi"],
    reviewer: "Sharma Weddings",
    review: "Drone work lifted the whole film. Turned up early both days with backup batteries.",
    packages: [
      { name: "Drone shoot", terms: "Per day · 4K footage", price: "₹8,000", amount: 8000 },
      { name: "Wedding film", terms: "2 days · edit included", price: "₹35,000", amount: 35000 },
      { name: "Event coverage", terms: "Per day · photo + video", price: "₹12,000", amount: 12000 },
    ],
  },
];

/** Home category tiles: [icon, label, canned search query]. */
export const CATS: [string, string, string][] = [
  ["▶", "Reels & video", "Reel editor"],
  ["◎", "Social media", "Social media handling"],
  ["◫", "Photo & wedding", "Photographer"],
  ["◈", "Graphic design", "Logo & branding"],
  ["✎", "Content writing", "Content writer"],
  ["⌘", "Web & apps", "Web developer"],
  ["◍", "Voiceover", "Hindi voiceover"],
  ["◭", "Ads & marketing", "Meta ads expert"],
  ["₹", "GST & accounts", "GST filing"],
];

export const CITIES = ["Nagpur", "Indore", "Jabalpur", "Nashik"] as const;

export const CITY_COUNTS: Record<string, string> = {
  Nagpur: "2,140",
  Indore: "1,860",
  Jabalpur: "640",
  Nashik: "910",
};

/** [locality, parent city, freelancer count] */
export const LOCALITIES: [string, string, number][] = [
  ["Dharampeth", "Nagpur", 312],
  ["Sitabuldi", "Nagpur", 268],
  ["Civil Lines", "Nagpur", 195],
  ["Manish Nagar", "Nagpur", 164],
  ["Wardha Road", "Nagpur", 221],
  ["Vijay Nagar", "Indore", 298],
  ["Palasia", "Indore", 241],
  ["Rau", "Indore", 132],
  ["Napier Town", "Jabalpur", 148],
  ["Wright Town", "Jabalpur", 121],
  ["College Road", "Nashik", 176],
  ["Gangapur Road", "Nashik", 203],
];

export const SVC_CATS = [
  "Reels & video editing",
  "Social media handling",
  "Photography & shoots",
  "Graphic design",
  "Content writing",
  "Voiceover & dubbing",
  "Ads & marketing",
  "Web development",
  "Accounting & GST",
  "Tutoring",
  "Drone & event coverage",
  "Data entry / VA",
];

/** [label, unit suffix] */
export const SVC_TYPES: [string, string][] = [
  ["Fixed", "/ project"],
  ["Per day", "/ day"],
  ["Monthly", "/ month"],
];

export type JobRequest = { id: string; title: string; budget: string; meta: string };

export const REQS: JobRequest[] = [
  { id: "r1", title: "8 reels / month — café", budget: "₹15k", meta: "Dharampeth · 3.1 km · posted 20 min ago" },
  { id: "r2", title: "Product shoot — 40 SKUs", budget: "On quote", meta: "Sitabuldi · 5.4 km · posted 1 hr ago" },
  { id: "r3", title: "Wedding highlight edit", budget: "₹22k", meta: "Civil Lines · 2 km · posted 3 hr ago" },
];

export type Payment = {
  id: string;
  client: string;
  service: string;
  amount: number;
  status: "awaiting" | "received";
  via: string;
  when: string;
};

export const PAYMENTS: Payment[] = [
  { id: "p1", client: "Kalash Jewellers", service: "Reel editing · 6 reels", amount: 9000, status: "awaiting", via: "", when: "Due 19 Aug" },
  { id: "p2", client: "Café Mitti", service: "Social media · August", amount: 12000, status: "awaiting", via: "", when: "Due on approval" },
  { id: "p3", client: "Vidarbha Tutorials", service: "Long-form edits · 12 videos", amount: 15000, status: "received", via: "UPI · 12 Aug", when: "" },
  { id: "p4", client: "Sharma Weddings", service: "Wedding highlight edit", amount: 12200, status: "received", via: "Cash · 6 Aug", when: "" },
];

export const ISSUE_REASONS = [
  "Work not delivered",
  "Not what was agreed",
  "Freelancer unreachable",
  "Asked for more money",
  "Something else",
];

export type Notif = {
  id: string;
  title: string;
  body: string;
  ts: string;
  unread: boolean;
  target: { type: "order" | "thread"; id: string } | null;
};

export const SEED_NOTIFS: Notif[] = [
  {
    id: "n1",
    title: "12 new freelancers in Nagpur",
    body: "Reel editors, designers and GST filers verified this week.",
    ts: "2h",
    unread: true,
    target: null,
  },
  {
    id: "n2",
    title: "Welcome to FreelanceKar",
    body: "Pay freelancers directly — FreelanceKar never touches your money.",
    ts: "1d",
    unread: false,
    target: null,
  },
];

export type Gig = {
  id: string;
  client: string;
  service: string;
  amount: string;
  status: "IN PROGRESS" | "DELIVERED";
};

export const SEED_GIGS: Gig[] = [
  { id: "g1", client: "Kalash Jewellers", service: "Reel editing · 6 reels", amount: "₹9,000", status: "IN PROGRESS" },
  { id: "g2", client: "Café Mitti", service: "Social media · August", amount: "₹12,000", status: "DELIVERED" },
];

export const PLANS: { name: string; price: string; note: string }[] = [
  { name: "Starter", price: "₹299/mo", note: "Up to 2 services listed · standard placement" },
  { name: "Pro", price: "₹799/mo", note: "Unlimited services · priority placement · verified badge boost" },
];

export const DAY_LABELS = ["24 hr", "3 days", "1 week", "2 weeks"];
export const DATE_LABELS = ["Tomorrow", "This week", "Pick date"];
export const RADIUS_LABELS = ["5 km", "10 km", "25 km", "Anywhere"];

export const SUGGESTION_CHIPS = [
  "Wedding shoot",
  "GST filing",
  "Logo design",
  "Hindi voiceover",
  "Reel editing",
];

export const PAY_METHODS: [string, string, string][] = [
  ["◉", "UPI · GPay / PhonePe", "Instant, no charges"],
  ["▭", "Card", "Visa · Mastercard · RuPay"],
  ["⌾", "Net banking", "All major banks"],
];
