import { CITIES, CITY_COUNTS, LOCALITIES, PROS, SVC_CATS, SVC_TYPES, type Pro } from "./data";
import { money } from "./format";
import type { AppState, Booking } from "./types";

export const cityOf = (s: AppState) => CITIES[s.cityIdx];
export const placeLabel = (s: AppState) => s.locality || cityOf(s);

export const activePro = (s: AppState): Pro =>
  PROS.find((p) => p.id === s.activeId) ?? PROS[0];

export const selectedPackage = (s: AppState) => {
  const pro = activePro(s);
  return pro.packages[Math.min(s.svcIdx, pro.packages.length - 1)];
};

/**
 * Filtering and sorting as prototyped. Replace with server-side query params —
 * but keep the first result's lime highlight, which is a ranking affordance.
 */
export function selectResults(s: AppState): Pro[] {
  const f = s.applied;
  let results = PROS.filter((p) => {
    if (f.budget !== "any" && p.base > parseInt(f.budget, 10)) return false;
    if (f.dist !== "any" && p.km > parseInt(f.dist, 10)) return false;
    if (f.mode === "remote" && !p.remote) return false;
    if (f.mode === "onsite" && p.id === "faizan") return false;
    if (f.lang !== "any" && !p.languages.includes(f.lang)) return false;
    if (f.availNow && p.km > 6) return false;
    return true;
  });

  if (s.sort === "near") results = [...results].sort((a, b) => a.km - b.km);
  else if (s.sort === "price")
    results = results.filter((p) => p.base <= 15000).sort((a, b) => a.base - b.base);
  else if (s.sort === "rating") results = results.filter((p) => p.rating >= 4.8);
  else results = [...results].sort((a, b) => b.match - a.match);

  return results;
}

export const filterCount = (s: AppState) =>
  (["budget", "dist", "mode", "lang"] as const).filter((k) => s.applied[k] !== "any").length +
  (s.applied.availNow ? 1 : 0);

export type CityRow = {
  key: string;
  name: string;
  sub: string;
  count: string;
  icon: string;
  on: boolean;
  city: string;
  locality: string;
};

export function selectCityRows(s: AppState): CityRow[] {
  const q = s.citySearch.trim().toLowerCase();
  const city = cityOf(s);
  const cities: CityRow[] = CITIES.filter((c) => !q || c.toLowerCase().includes(q)).map((c) => ({
    key: "city-" + c,
    name: c,
    sub: "All localities",
    count: CITY_COUNTS[c],
    icon: "◉",
    on: city === c && !s.locality,
    city: c,
    locality: "",
  }));
  const locs: CityRow[] = LOCALITIES.filter(
    ([n, c]) => !q || n.toLowerCase().includes(q) || c.toLowerCase().includes(q),
  ).map(([n, c, ct]) => ({
    key: "loc-" + n,
    name: n,
    sub: c,
    count: String(ct),
    icon: "◌",
    on: s.locality === n,
    city: c,
    locality: n,
  }));
  return [...cities, ...locs];
}

export const currentThread = (s: AppState) => s.threads.find((t) => t.id === s.threadId);

export const currentBooking = (s: AppState): Booking | undefined =>
  s.bookings.find((b) => b.id === s.viewOrder);

export const BOOKING_STATUS_LABEL = {
  awaiting: "AWAITING CONFIRMATION",
  in_progress: "IN PROGRESS",
  delivered: "DELIVERED · CONFIRM & RATE",
  approved: "COMPLETED",
} as const;

export const ORDER_STATUS_LABEL = {
  awaiting: "AWAITING CONFIRMATION",
  in_progress: "IN PROGRESS",
  delivered: "DELIVERED",
  approved: "COMPLETED",
} as const;

export const ORDER_STEPS: [string, string][] = [
  ["Booking confirmed", "Pay the freelancer directly, no platform fee"],
  ["Freelancer confirmed", "Work has started"],
  ["Work delivered", "Review the files and pay if you haven’t already"],
  ["Marked complete", "Job closed out"],
];

export const toPayTotal = (s: AppState) =>
  money(s.bookings.filter((b) => b.status !== "approved").reduce((a, b) => a + b.amountNum, 0));

/* Freelancer side ---------------------------------------------------------- */

export const kycCount = (s: AppState) => Object.values(s.kyc).filter(Boolean).length;

export const validSvcRows = (s: AppState) =>
  s.svcRows.filter((r) => String(r.amount).trim().length > 0);

export const profileStrength = (s: AppState) =>
  Math.min(
    100,
    30 + validSvcRows(s).length * 12 + kycCount(s) * 8 + (s.bank ? 6 : 0) + (s.fBio.trim() ? 6 : 0),
  );

export function strengthNote(s: AppState) {
  const city = CITIES[s.fCityIdx];
  if (kycCount(s) < 3) return "Finish verification to rank higher in " + city;
  if (validSvcRows(s).length < 3) return "Add one more service to appear in more searches";
  return "Strong profile — you’ll show up near the top in " + city;
}

export function myServices(s: AppState) {
  const city = CITIES[s.fCityIdx];
  const rows = validSvcRows(s);
  if (!rows.length)
    return [{ name: "No services yet", terms: "Add one to start getting requests", price: "—" }];
  return rows.map((r) => ({
    name: SVC_CATS[r.cat],
    terms: SVC_TYPES[r.type][0] + " · " + city,
    price: money(parseInt(r.amount, 10) || 0) + " " + SVC_TYPES[r.type][1],
  }));
}

export const paymentTotals = (s: AppState) => {
  const due = s.payments.filter((p) => p.status === "awaiting");
  const got = s.payments.filter((p) => p.status === "received");
  const sum = (arr: typeof s.payments) => arr.reduce((a, p) => a + p.amount, 0);
  const payDue = sum(due);
  const payGot = sum(got);
  return { due, got, payDue, payGot, payTotal: payDue + payGot };
};

export const planName = (s: AppState) => (s.planIdx === 1 ? "Pro" : "Starter");
export const planPrice = (s: AppState) => (s.planIdx === 1 ? "₹799/mo" : "₹299/mo");

export const unreadCount = (s: AppState) => s.notifs.filter((n) => n.unread).length;
