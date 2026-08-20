import type { Gig, JobRequest, Notif, Payment } from "./data";

export type Screen =
  | "home"
  | "explore"
  | "results"
  | "profile"
  | "chats"
  | "thread"
  | "order"
  | "notifs"
  | "you"
  | "fonb"
  | "fdash"
  | "fearn"
  | "fgigs"
  | "fme";

export type Sort = "match" | "near" | "price" | "rating";

export type FilterSet = {
  budget: string;
  dist: string;
  mode: string;
  lang: string;
  availNow: boolean;
};

export type BookingStatus = "awaiting" | "in_progress" | "delivered" | "approved";

export type Review = { stars: number; text: string };

export type Issue = {
  ref: string;
  reason: string;
  text: string;
  status: "open" | "responded";
};

export type Booking = {
  id: string;
  proId: string;
  name: string;
  first: string;
  service: string;
  amount: string;
  amountNum: number;
  status: BookingStatus;
  review: Review | null;
  issue?: Issue;
};

export type Message = { from: "me" | "them"; text: string; ts: string };

export type Quote = {
  amount: number;
  days: string;
  service: string;
  msg: string;
  status: "pending" | "accepted" | "declined";
};

export type Thread = {
  id: string;
  name: string;
  first: string;
  proId: string;
  last: string;
  ts: string;
  msgs: Message[];
  quote?: Quote;
  orderRef?: string;
};

export type ServiceRow = { cat: number; type: number; amount: string };

export type AppState = {
  /* Navigation */
  screen: Screen;
  freelancerMode: boolean;

  /* Discovery */
  cityIdx: number;
  locality: string;
  cityOpen: boolean;
  citySearch: string;
  query: string;
  brief: string;
  searchLabel: string;
  searching: boolean;
  sort: Sort;
  filters: FilterSet;
  applied: FilterSet;
  filtersOpen: boolean;

  /* Freelancer detail & hiring */
  activeId: string | null;
  svcIdx: number;
  saved: string[];
  hire: 0 | 1 | 2 | 3 | 4;
  hireNote: string;
  hireDateIdx: number;
  hireError: boolean;
  methodIdx: number;
  paying: boolean;
  payRetried: boolean;

  /* Orders & messaging */
  bookings: Booking[];
  viewOrder: string | null;
  threads: Thread[];
  threadId: string | null;
  draft: string;
  typing: boolean;

  /* Disputes & reviews */
  issueOpen: boolean;
  issueReason: number;
  issueText: string;
  issueError: boolean;
  reviewOpen: boolean;
  reviewStars: number;
  reviewText: string;
  reviewError: boolean;

  /* Notifications */
  notifs: Notif[];

  /* Freelancer onboarding & account */
  onbStep: number;
  phone: string;
  otpSent: boolean;
  otp: string;
  onbErrorMsg: string;
  fName: string;
  fCityIdx: number;
  fRadiusIdx: number;
  fBio: string;
  kyc: { aadhaar: boolean; pan: boolean; selfie: boolean };
  bank: boolean;
  svcRows: ServiceRow[];
  onboarded: boolean;
  subscribed: boolean;
  planIdx: number;
  kycRejected: boolean;

  /* Freelancer working state */
  available: boolean;
  reqs: JobRequest[];
  quotesSent: number;
  quoteFor: string | null;
  quoteAmount: string;
  quoteDayIdx: number;
  quoteMsg: string;
  quoteError: boolean;
  fGigs: Gig[];
  payments: Payment[];

  /* UI */
  toast: string;
};

export const EMPTY_FILTERS: FilterSet = {
  budget: "any",
  dist: "any",
  mode: "any",
  lang: "any",
  availNow: false,
};
