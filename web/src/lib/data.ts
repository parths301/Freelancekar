/**
 * Marketing-site content data.
 *
 * Kept consistent with the app's real taxonomy in the root project's
 * src/lib/data.ts (categories, cities, plans). This file adds the
 * marketing-only bits (city stats, rate tables, FAQs) that the app itself
 * doesn't need.
 */

export type City = {
  slug: string;
  name: string;
  state: string;
  count: string;
  isLaunchCity: boolean;
  blurb: string;
  localities: [string, number][];
};

/** Home category tiles, matching the app's CATS taxonomy. */
export const CATEGORIES: { icon: string; label: string; query: string; count: number }[] = [
  { icon: "▶", label: "Reels & video", query: "Reel editor", count: 88 },
  { icon: "◎", label: "Social media", query: "Social media handling", count: 64 },
  { icon: "◫", label: "Photo & wedding", query: "Photographer", count: 52 },
  { icon: "◈", label: "Graphic design", query: "Logo & branding", count: 47 },
  { icon: "✎", label: "Content writing", query: "Content writer", count: 38 },
  { icon: "⌘", label: "Web & apps", query: "Web developer", count: 29 },
  { icon: "◍", label: "Voiceover", query: "Hindi voiceover", count: 21 },
  { icon: "◭", label: "Ads & marketing", query: "Meta ads expert", count: 24 },
  { icon: "₹", label: "GST & accounts", query: "GST filing", count: 17 },
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

export const PLANS: {
  key: "starter" | "pro";
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  featured: boolean;
  features: string[];
}[] = [
  {
    key: "starter",
    name: "Starter",
    price: 299,
    priceLabel: "₹299",
    tagline: "For freelancers just getting listed and taking their first leads.",
    featured: false,
    features: [
      "Up to 2 services listed",
      "Appear in search & category pages",
      "Unlimited quotes & leads",
      "Clients pay you directly, no platform fee",
      "Standard support",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: 799,
    priceLabel: "₹799",
    tagline: "For freelancers who want to rank higher and win more work.",
    featured: true,
    features: [
      "Unlimited services listed",
      "Priority placement in results",
      "Verified badge boost",
      "Featured profile badge",
      "Priority WhatsApp support",
    ],
  },
];

/** Sample top-rated freelancers shown on the homepage, matching the app's PROS seed data. */
export const FEATURED_PROS: {
  name: string;
  services: string;
  rating: number;
  jobs: number;
  area: string;
}[] = [
  { name: "Priya Deshmukh", services: "Reel editing · Photography · Retainers", rating: 4.9, jobs: 142, area: "Civil Lines, Nagpur" },
  { name: "Studio Aarambh", services: "Social media · Product shoots · Meta ads", rating: 4.8, jobs: 210, area: "Sitabuldi, Nagpur" },
  { name: "Rohit Kumawat", services: "Drone shoots · Wedding films · Events", rating: 4.7, jobs: 63, area: "Wardha Road, Nagpur" },
];

export const CITIES: City[] = [
  {
    slug: "nagpur",
    name: "Nagpur",
    state: "Maharashtra",
    count: "2,140",
    isLaunchCity: true,
    blurb:
      "FreelanceKar's launch city. The deepest bench of verified freelancers, from Dharampeth to Wardha Road.",
    localities: [
      ["Dharampeth", 312],
      ["Sitabuldi", 268],
      ["Wardha Road", 221],
      ["Civil Lines", 195],
      ["Manish Nagar", 164],
      ["Hingna", 88],
    ],
  },
  {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    count: "1,860",
    isLaunchCity: false,
    blurb: "One of our fastest-growing cities — strong in social media, design and product photography.",
    localities: [
      ["Vijay Nagar", 298],
      ["Palasia", 241],
      ["Rau", 132],
      ["Bhawarkuan", 157],
      ["Sudama Nagar", 96],
    ],
  },
  {
    slug: "jabalpur",
    name: "Jabalpur",
    state: "Madhya Pradesh",
    count: "640",
    isLaunchCity: false,
    blurb: "A smaller but active market — content writers, GST filers and video editors lead the way.",
    localities: [
      ["Napier Town", 148],
      ["Wright Town", 121],
      ["Vijay Nagar", 97],
      ["Gorakhpur", 73],
      ["Adhartal", 58],
    ],
  },
  {
    slug: "nashik",
    name: "Nashik",
    state: "Maharashtra",
    count: "910",
    isLaunchCity: false,
    blurb: "Wedding season keeps this city busy — photographers, drone shoots and event coverage in demand.",
    localities: [
      ["College Road", 176],
      ["Gangapur Road", 203],
      ["Indira Nagar", 134],
      ["Panchavati", 112],
      ["Satpur", 79],
    ],
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/** Rate ranges shown on city pages — what freelancers are actually quoting. */
export const RATE_TABLE: { job: string; unit: string; range: string }[] = [
  { job: "Instagram reel edit", unit: "Per reel · 48 hr delivery", range: "₹900 – ₹2,500" },
  { job: "Social media handling", unit: "Monthly retainer · 12–16 posts", range: "₹10,000 – ₹18,000" },
  { job: "Shoot + edit day", unit: "Per day · travel extra", range: "₹6,000 – ₹12,000" },
  { job: "Wedding highlight film", unit: "Per event · 2 days", range: "₹25,000 – ₹45,000" },
  { job: "Drone coverage", unit: "Per day · 4K footage", range: "₹7,000 – ₹10,000" },
  { job: "Logo & brand kit", unit: "Fixed package", range: "₹3,500 – ₹9,000" },
  { job: "GST filing", unit: "Per filing", range: "₹800 – ₹2,000" },
];

export function cityFaqs(cityName: string): { q: string; a: string }[] {
  return [
    {
      q: "How fast will I get quotes?",
      a: `Most jobs posted in ${cityName} get a first quote within an hour, and three to five quotes the same day.`,
    },
    {
      q: "What does it cost me?",
      a: "Nothing. You pay the freelancer their quoted price directly by UPI or cash — FreelanceKar adds no fee and never handles the money.",
    },
    {
      q: "Can I hire someone in my locality only?",
      a: "Yes. Filter by distance or search a locality directly — every freelancer lists the radius they travel, so on-site work stays nearby.",
    },
    {
      q: "Are the freelancers verified?",
      a: "Aadhaar and a live selfie are checked before anyone can list services. Documents are never shown to clients.",
    },
  ];
}
