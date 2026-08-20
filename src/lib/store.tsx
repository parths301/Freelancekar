"use client";

/**
 * The whole app runs off one store, mirroring the prototype's single reducer.
 * Async behaviour (booking clock, chat replies, support responses) is simulated
 * with timers here; swapping in real network calls means replacing the bodies of
 * these actions, not the screens.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  CITIES,
  DAY_LABELS,
  ISSUE_REASONS,
  PAYMENTS,
  PROS,
  REQS,
  SEED_GIGS,
  SEED_NOTIFS,
  SVC_CATS,
  type Pro,
} from "./data";
import { money } from "./format";
import {
  EMPTY_FILTERS,
  type AppState,
  type Booking,
  type FilterSet,
  type Screen,
  type Sort,
  type Thread,
} from "./types";

/** Perceived rhythm of the prototype — keep these when wiring real calls. */
export const TIMING = {
  search: 750,
  payConfirm: 1100,
  accept: 3200,
  deliver: 9000,
  chatReply: 1600,
  supportReply: 4500,
  toast: 2200,
  profileLive: 1200,
  subscribed: 600,
};

const initialState: AppState = {
  screen: "home",
  freelancerMode: false,

  cityIdx: 0,
  locality: "",
  cityOpen: false,
  citySearch: "",
  query: "",
  brief: "",
  searchLabel: "",
  searching: false,
  sort: "match",
  filters: { ...EMPTY_FILTERS },
  applied: { ...EMPTY_FILTERS },
  filtersOpen: false,

  activeId: null,
  svcIdx: 0,
  saved: [],
  hire: 0,
  hireNote: "",
  hireDateIdx: 0,
  hireError: false,
  methodIdx: 0,
  paying: false,
  payRetried: false,

  bookings: [],
  viewOrder: null,
  threads: [],
  threadId: null,
  draft: "",
  typing: false,

  issueOpen: false,
  issueReason: 0,
  issueText: "",
  issueError: false,
  reviewOpen: false,
  reviewStars: 0,
  reviewText: "",
  reviewError: false,

  notifs: SEED_NOTIFS,

  onbStep: 1,
  phone: "",
  otpSent: false,
  otp: "",
  onbErrorMsg: "",
  fName: "",
  fCityIdx: 0,
  fRadiusIdx: 1,
  fBio: "",
  kyc: { aadhaar: false, pan: false, selfie: false },
  bank: false,
  svcRows: [{ cat: 0, type: 0, amount: "" }],
  onboarded: false,
  subscribed: false,
  planIdx: 1,
  kycRejected: false,

  available: true,
  reqs: REQS,
  quotesSent: 0,
  quoteFor: null,
  quoteAmount: "",
  quoteDayIdx: 1,
  quoteMsg: "",
  quoteError: false,
  fGigs: SEED_GIGS,
  payments: PAYMENTS,

  toast: "",
};

type Action =
  | { type: "patch"; patch: Partial<AppState> }
  | { type: "apply"; fn: (s: AppState) => Partial<AppState> };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.patch };
    case "apply":
      return { ...state, ...action.fn(state) };
  }
}

export type Actions = ReturnType<typeof useActions>;

type ScrollTarget = { top: () => void; bottom: () => void };

function useActions(
  state: AppState,
  dispatch: React.Dispatch<Action>,
  scroll: React.RefObject<ScrollTarget | null>,
) {
  // Timers and event handlers read the latest state through this ref; it is
  // updated after commit so it never mutates during render.
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }, []);

  const set = useCallback(
    (patch: Partial<AppState>) => dispatch({ type: "patch", patch }),
    [dispatch],
  );
  const apply = useCallback(
    (fn: (s: AppState) => Partial<AppState>) => dispatch({ type: "apply", fn }),
    [dispatch],
  );

  return useMemo(() => {
    const scrollTop = () => queueMicrotask(() => scroll.current?.top());
    const scrollBottom = () => setTimeout(() => scroll.current?.bottom(), 60);

    const go = (screen: Screen) => {
      set({ screen });
      scrollTop();
    };

    const flash = (msg: string) => {
      set({ toast: msg });
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => set({ toast: "" }), TIMING.toast);
    };

    const notify = (
      title: string,
      body: string,
      target: { type: "order" | "thread"; id: string } | null = null,
    ) =>
      apply((s) => ({
        notifs: [
          {
            id: "n" + s.notifs.length + "-" + title.slice(0, 8),
            title,
            body,
            ts: "now",
            unread: true,
            target,
          },
          ...s.notifs,
        ],
      }));

    const patchBooking = (id: string, patch: Partial<Booking>) =>
      apply((s) => ({
        bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      }));

    const patchThread = (id: string, patch: Partial<Thread>) =>
      apply((s) => ({
        threads: s.threads.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      }));

    /** Booking clock: freelancer accepts, then delivers. */
    const runBooking = (order: string, first: string) => {
      later(() => {
        patchBooking(order, { status: "in_progress" });
        flash(first + " confirmed the booking");
        notify(first + " confirmed your booking", "Order " + order + " — work has started.", {
          type: "order",
          id: order,
        });
      }, TIMING.accept);
      later(() => {
        patchBooking(order, { status: "delivered" });
        flash(first + " marked the work delivered — confirm and rate");
        notify(
          first + " delivered the work",
          "Check the files and pay " + first + " directly if you haven’t.",
          { type: "order", id: order },
        );
      }, TIMING.deliver);
    };

    const addThread = (pro: Pro, last: string, extra: Partial<Thread> = {}) =>
      apply((s) => {
        const existing = s.threads.find((t) => t.id === pro.id);
        const msgs = existing?.msgs ?? [];
        const t: Thread = {
          id: pro.id,
          name: pro.name,
          first: pro.first,
          proId: pro.id,
          last,
          ts: "now",
          msgs: [...msgs, { from: "me", text: last, ts: "9:41" }],
          ...extra,
        };
        return { threads: [t, ...s.threads.filter((x) => x.id !== pro.id)] };
      });

    const openThread = (id: string) => {
      set({ threadId: id, draft: "", screen: "thread" });
      scrollBottom();
    };

    const openOrder = (id: string) => {
      set({ viewOrder: id, screen: "order" });
      scrollTop();
    };

    const search = (label: string) => {
      set({ searchLabel: label, sort: "match", searching: true, screen: "results" });
      scrollTop();
      if (searchTimer.current) clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => set({ searching: false }), TIMING.search);
    };

    const finishPublish = () => {
      const s = stateRef.current;
      const valid = s.svcRows.filter((r) => String(r.amount).trim().length > 0);
      const rejected = !s.kyc.selfie;
      set({
        onboarded: true,
        onbErrorMsg: "",
        kycRejected: rejected,
        freelancerMode: true,
        screen: "fdash",
      });
      scrollTop();
      flash(
        s.onboarded
          ? "Services updated"
          : "Profile live in " + CITIES[s.fCityIdx] + " · " + valid.length + " services",
      );
      if (rejected) {
        later(
          () =>
            notify(
              "Verification incomplete",
              "Your live selfie is missing, so the verified badge is on hold.",
            ),
          TIMING.profileLive,
        );
      } else if (!s.onboarded) {
        later(
          () =>
            notify(
              "Profile is live",
              "You’re now visible to clients in " + CITIES[s.fCityIdx] + ".",
            ),
          TIMING.profileLive,
        );
      }
    };

    return {
      go,
      flash,
      notify,
      scrollTop,
      scrollBottom,

      /* Discovery ------------------------------------------------------- */
      search,
      setQuery: (query: string) => set({ query }),
      setBrief: (brief: string) => set({ brief }),
      runSearch: () => {
        const s = stateRef.current;
        search((s.query.trim() || s.brief.trim() || "Reel editor").slice(0, 60));
      },
      setSort: (sort: Sort) => {
        set({ sort });
        scrollTop();
      },
      openCity: () => set({ cityOpen: true, citySearch: "" }),
      closeCity: () => set({ cityOpen: false }),
      setCitySearch: (citySearch: string) => set({ citySearch }),
      pickPlace: (cityName: string, loc: string) => {
        set({
          cityIdx: CITIES.indexOf(cityName as (typeof CITIES)[number]),
          locality: loc,
          cityOpen: false,
          citySearch: "",
        });
        flash(loc ? "Showing freelancers near " + loc : "Showing freelancers in " + cityName);
        scrollTop();
      },
      useCurrentLocation: () => {
        set({ cityIdx: 0, locality: "Dharampeth", cityOpen: false, citySearch: "" });
        flash("Located you in Dharampeth, Nagpur");
      },

      /* Filters --------------------------------------------------------- */
      openFilters: () => apply((s) => ({ filtersOpen: true, filters: { ...s.applied } })),
      closeFilters: () => set({ filtersOpen: false }),
      setFilter: (key: keyof FilterSet, value: string) =>
        apply((s) => ({ filters: { ...s.filters, [key]: value } })),
      toggleAvailNow: () =>
        apply((s) => ({ filters: { ...s.filters, availNow: !s.filters.availNow } })),
      resetFilters: () => set({ filters: { ...EMPTY_FILTERS } }),
      applyFilters: () => {
        apply((s) => ({ applied: { ...s.filters }, filtersOpen: false }));
        scrollTop();
      },
      clearAll: () => {
        set({ applied: { ...EMPTY_FILTERS }, filters: { ...EMPTY_FILTERS }, sort: "match" });
        flash("Filters cleared");
      },

      /* Profile --------------------------------------------------------- */
      openPro: (id: string) => {
        set({ activeId: id, svcIdx: 0, screen: "profile" });
        scrollTop();
      },
      pickService: (svcIdx: number) => set({ svcIdx }),
      toggleSave: (proId: string, first: string) => {
        const on = stateRef.current.saved.includes(proId);
        apply((s) => ({
          saved: on ? s.saved.filter((x) => x !== proId) : [...s.saved, proId],
        }));
        flash(on ? "Removed from saved" : "Saved " + first);
      },
      messagePro: (pro: Pro) => {
        addThread(pro, "Hi, are you free this week?");
        openThread(pro.id);
      },
      messageFromResults: (pro: Pro) => {
        addThread(pro, "You: hi, are you free this week?");
        flash("Message sent to " + pro.first);
      },

      /* Hire sheet ------------------------------------------------------ */
      openHire: (proId?: string) =>
        set({
          hire: 1,
          hireNote: "",
          hireError: false,
          ...(proId ? { activeId: proId, svcIdx: 0 } : {}),
        }),
      closeHire: () => set({ hire: 0, paying: false }),
      setHireNote: (hireNote: string) => set({ hireNote, hireError: false }),
      setHireDate: (hireDateIdx: number) => set({ hireDateIdx }),
      toDetails: () => set({ hire: 1 }),
      toPay: () => {
        if (stateRef.current.hireNote.trim().length < 8) {
          set({ hireError: true });
          return;
        }
        set({ hire: 2 });
      },
      setMethod: (methodIdx: number) => set({ methodIdx }),
      retryPay: () => set({ payRetried: true, hire: 2 }),
      payWithUpi: () => {
        set({ payRetried: true, methodIdx: 0, hire: 2 });
        flash("UPI selected — instant, no charges");
      },
      payNow: (pro: Pro, pkgName: string, pkgAmount: number) => {
        const s = stateRef.current;
        if (s.paying) return;
        set({ paying: true });
        const ref = "FK-" + (48210 + s.bookings.length * 7);
        later(() => {
          const now = stateRef.current;
          if (now.methodIdx === 1 && !now.payRetried) {
            set({ hire: 4, paying: false });
            flash("Card declined — nothing was charged");
            notify(
              "Payment failed",
              "Your bank declined the card. " + pro.first + " is not booked yet.",
            );
            return;
          }
          apply((st) => ({
            hire: 3,
            paying: false,
            bookings: [
              {
                id: ref,
                proId: pro.id,
                name: pro.name,
                first: pro.first,
                service: pkgName,
                amount: money(pkgAmount),
                amountNum: pkgAmount,
                status: "awaiting",
                review: null,
              },
              ...st.bookings,
            ],
          }));
          addThread(pro, "Booked " + pkgName + " — " + money(pkgAmount) + " to pay directly.");
          notify(
            "Booking confirmed",
            "Order " + ref + " with " + pro.name + ". Pay " + money(pkgAmount) + " directly.",
            { type: "order", id: ref },
          );
          runBooking(ref, pro.first);
        }, TIMING.payConfirm);
      },
      afterBookChat: () => {
        set({ hire: 0 });
        go("chats");
      },
      afterBookHome: () => {
        set({ hire: 0 });
        go("home");
      },

      /* Chats ----------------------------------------------------------- */
      openThread,
      setDraft: (draft: string) => set({ draft }),
      sendMsg: () => {
        const s = stateRef.current;
        const t = s.threads.find((x) => x.id === s.threadId);
        const text = s.draft.trim();
        if (!t || !text) return;
        patchThread(t.id, {
          msgs: [...t.msgs, { from: "me", text, ts: "9:43" }],
          last: "You: " + text,
          ts: "now",
        });
        set({ draft: "", typing: true });
        scrollBottom();
        if (replyTimer.current) clearTimeout(replyTimer.current);
        replyTimer.current = setTimeout(() => {
          const fm = stateRef.current.freelancerMode;
          const reply = fm
            ? "Sounds good — when can you start?"
            : "Yes, I can do that. I’ll send a quote in a few minutes.";
          set({ typing: false });
          apply((st) => ({
            threads: st.threads.map((x) =>
              x.id === t.id
                ? { ...x, msgs: [...x.msgs, { from: "them" as const, text: reply, ts: "9:44" }], last: reply, ts: "now" }
                : x,
            ),
          }));
          notify((t.first || t.name) + " replied", reply, { type: "thread", id: t.id });
          scrollBottom();
        }, TIMING.chatReply);
      },
      acceptQuote: () => {
        const s = stateRef.current;
        const t = s.threads.find((x) => x.id === s.threadId);
        if (!t?.quote) return;
        const q = t.quote;
        const order = "FK-" + (48310 + s.bookings.length * 7);
        const first = t.first || t.name.split(" ")[0];
        patchThread(t.id, {
          quote: { ...q, status: "accepted" },
          orderRef: order,
          msgs: [
            ...t.msgs,
            {
              from: "me",
              text:
                "Accepted your quote — " + money(q.amount) + ". Booking confirmed, no platform fee.",
              ts: "9:42",
            },
          ],
        });
        apply((st) => ({
          bookings: [
            {
              id: order,
              proId: t.id,
              name: t.name,
              first,
              service: q.service,
              amount: money(q.amount),
              amountNum: q.amount,
              status: "awaiting" as const,
              review: null,
            },
            ...st.bookings,
          ],
        }));
        flash("Booking confirmed · order " + order);
        runBooking(order, first);
      },
      declineQuote: () => {
        const s = stateRef.current;
        const t = s.threads.find((x) => x.id === s.threadId);
        if (!t?.quote) return;
        patchThread(t.id, {
          quote: { ...t.quote, status: "declined" },
          msgs: [...t.msgs, { from: "me", text: "Thanks — going with someone else this time.", ts: "9:42" }],
        });
        flash("Quote declined");
      },
      openOrderFromThread: () => {
        const s = stateRef.current;
        const b = s.bookings.find((x) => x.proId === s.threadId);
        if (b) openOrder(b.id);
      },

      /* Orders, reviews, disputes --------------------------------------- */
      openOrder,
      openReview: () => set({ reviewOpen: true, reviewStars: 0, reviewText: "", reviewError: false }),
      closeReview: () => set({ reviewOpen: false }),
      setReviewStars: (reviewStars: number) => set({ reviewStars, reviewError: false }),
      setReviewText: (reviewText: string) => set({ reviewText }),
      submitReview: (booking: Booking) => {
        const s = stateRef.current;
        if (!s.reviewStars) {
          set({ reviewError: true });
          return;
        }
        patchBooking(booking.id, {
          status: "approved",
          review: {
            stars: s.reviewStars,
            text: s.reviewText.trim() || "Good work, would hire again.",
          },
        });
        set({ reviewOpen: false });
        flash("Job closed · " + booking.amount + " marked paid to " + booking.first);
        notify(
          "Job closed out",
          booking.amount +
            " marked paid to " +
            booking.first +
            ". Your review is live on their profile.",
          { type: "order", id: booking.id },
        );
      },
      openIssue: () => set({ issueOpen: true, issueText: "", issueError: false, issueReason: 0 }),
      closeIssue: () => set({ issueOpen: false }),
      setIssueReason: (issueReason: number) => set({ issueReason }),
      setIssueText: (issueText: string) => set({ issueText, issueError: false }),
      submitIssue: (booking: Booking) => {
        const s = stateRef.current;
        if (s.issueText.trim().length < 10) {
          set({ issueError: true });
          return;
        }
        const reason = ISSUE_REASONS[s.issueReason];
        const ref = "SUP-" + (2140 + s.bookings.length * 3);
        const base = { ref, reason, text: s.issueText.trim() };
        patchBooking(booking.id, { issue: { ...base, status: "open" } });
        set({ issueOpen: false });
        flash("Issue raised · " + ref);
        notify(
          "Issue raised · " + ref,
          reason + " on order " + booking.id + ". Support replies within 24 hours.",
          { type: "order", id: booking.id },
        );
        later(() => {
          patchBooking(booking.id, { issue: { ...base, status: "responded" } });
          notify(
            "Support replied · " + ref,
            "We’ve contacted " +
              (booking.first || "the freelancer") +
              " and paused their listing while this is open.",
            { type: "order", id: booking.id },
          );
          flash("Support replied to " + ref);
        }, TIMING.supportReply);
      },
      openHelp: () => {
        const s = stateRef.current;
        const b = s.bookings[0];
        if (!b) {
          flash("No orders yet — raise an issue from an order once you book");
          return;
        }
        openOrder(b.id);
        set({ issueOpen: true, issueText: "", issueError: false, issueReason: 0 });
      },

      /* Notifications --------------------------------------------------- */
      openNotifs: () => go("notifs"),
      closeNotifs: () => go(stateRef.current.freelancerMode ? "fdash" : "home"),
      markAllRead: () => {
        apply((s) => ({ notifs: s.notifs.map((n) => ({ ...n, unread: false })) }));
        flash("All caught up");
      },
      openNotif: (id: string) => {
        const n = stateRef.current.notifs.find((x) => x.id === id);
        apply((s) => ({ notifs: s.notifs.map((x) => (x.id === id ? { ...x, unread: false } : x)) }));
        if (!n?.target) return;
        if (n.target.type === "order") openOrder(n.target.id);
        else openThread(n.target.id);
      },

      /* Mode switching -------------------------------------------------- */
      startFreelancer: () => {
        const s = stateRef.current;
        set({
          freelancerMode: true,
          onbStep: s.onboarded ? 4 : 1,
          onbErrorMsg: "",
          screen: s.onboarded ? "fdash" : "fonb",
        });
        scrollTop();
      },
      backToClient: () => {
        set({ freelancerMode: false, screen: "you" });
        scrollTop();
      },

      /* Onboarding ------------------------------------------------------ */
      setPhone: (phone: string) =>
        set({ phone: phone.replace(/[^\d ]/g, "").slice(0, 11), onbErrorMsg: "" }),
      setOtp: (otp: string) => set({ otp: otp.replace(/\D/g, "").slice(0, 4), onbErrorMsg: "" }),
      setFName: (fName: string) => set({ fName, onbErrorMsg: "" }),
      setFCity: (fCityIdx: number) => set({ fCityIdx }),
      setFRadius: (fRadiusIdx: number) => set({ fRadiusIdx }),
      setFBio: (fBio: string) => set({ fBio }),
      toggleKyc: (key: "aadhaar" | "pan" | "selfie") =>
        apply((s) => ({ kyc: { ...s.kyc, [key]: !s.kyc[key] }, onbErrorMsg: "" })),
      toggleBank: () => apply((s) => ({ bank: !s.bank })),
      updRow: (i: number, patch: Partial<AppState["svcRows"][number]>) =>
        apply((s) => ({
          svcRows: s.svcRows.map((r, x) => (x === i ? { ...r, ...patch } : r)),
          onbErrorMsg: "",
        })),
      addSvcRow: () =>
        apply((s) => ({
          svcRows: [...s.svcRows, { cat: (s.svcRows.length * 3) % SVC_CATS.length, type: 0, amount: "" }],
          onbErrorMsg: "",
        })),
      removeSvcRow: (i: number) =>
        apply((s) => ({
          svcRows: s.svcRows.length > 1 ? s.svcRows.filter((_, x) => x !== i) : s.svcRows,
        })),
      onbBack: () => {
        const s = stateRef.current;
        if (s.onbStep === 1) {
          go("you");
          return;
        }
        set({ onbStep: s.onbStep - 1, onbErrorMsg: "" });
        scrollTop();
      },
      onbNext: () => {
        const s = stateRef.current;
        if (s.onbStep === 1) {
          const digits = s.phone.replace(/\D/g, "");
          if (digits.length < 10) {
            set({ onbErrorMsg: "Enter a 10-digit mobile number." });
            return;
          }
          if (!s.otpSent) {
            set({ otpSent: true, onbErrorMsg: "" });
            flash("OTP sent to +91 " + s.phone);
            return;
          }
          if (s.otp !== "1234") {
            set({ onbErrorMsg: "That code didn’t match. Use 1234 in this demo." });
            return;
          }
          set({ onbStep: 2, onbErrorMsg: "" });
          scrollTop();
          return;
        }
        if (s.onbStep === 2) {
          if (s.fName.trim().length < 2) {
            set({ onbErrorMsg: "Add the name clients should see." });
            return;
          }
          set({ onbStep: 3, onbErrorMsg: "" });
          scrollTop();
          return;
        }
        if (s.onbStep === 3) {
          const kycCount = Object.values(s.kyc).filter(Boolean).length;
          if (kycCount < 2) {
            set({ onbErrorMsg: "Upload at least Aadhaar and a selfie to get verified." });
            return;
          }
          set({ onbStep: 4, onbErrorMsg: "" });
          scrollTop();
          return;
        }
        const valid = s.svcRows.filter((r) => String(r.amount).trim().length > 0);
        if (!valid.length) {
          set({ onbErrorMsg: "Add a price for at least one service." });
          return;
        }
        if (s.subscribed || s.onboarded) {
          finishPublish();
          return;
        }
        set({ onbStep: 5, onbErrorMsg: "" });
        scrollTop();
      },
      subscribeAndPublish: (planIdx: number) => {
        const name = planIdx === 1 ? "Pro" : "Starter";
        const price = planIdx === 1 ? "₹799/mo" : "₹299/mo";
        set({ subscribed: true, planIdx });
        finishPublish();
        later(() => flash("Subscribed to " + name + " · " + price + " via Razorpay"), TIMING.subscribed);
      },
      fixKyc: () => {
        set({ onbStep: 3, onbErrorMsg: "" });
        go("fonb");
      },
      addMoreServices: () => {
        set({ onbStep: 4, onbErrorMsg: "" });
        go("fonb");
      },

      /* Freelancer working state ---------------------------------------- */
      toggleAvailable: () => {
        const was = stateRef.current.available;
        apply((s) => ({ available: !s.available }));
        flash(
          was
            ? "Hidden from new searches"
            : "You’re visible in " + CITIES[stateRef.current.fCityIdx] + " again",
        );
      },
      passRequest: (id: string) => {
        apply((s) => ({ reqs: s.reqs.filter((x) => x.id !== id) }));
        flash("Passed on this job");
      },
      openQuote: (id: string) =>
        set({ quoteFor: id, quoteAmount: "", quoteDayIdx: 1, quoteMsg: "", quoteError: false }),
      closeQuote: () => set({ quoteFor: null }),
      setQuoteAmount: (v: string) =>
        set({ quoteAmount: v.replace(/\D/g, "").slice(0, 7), quoteError: false }),
      setQuoteDay: (quoteDayIdx: number) => set({ quoteDayIdx }),
      setQuoteMsg: (quoteMsg: string) => set({ quoteMsg, quoteError: false }),
      sendQuote: () => {
        const s = stateRef.current;
        const amount = parseInt(String(s.quoteAmount).replace(/\D/g, ""), 10) || 0;
        if (amount < 100 || s.quoteMsg.trim().length < 8) {
          set({ quoteError: true });
          return;
        }
        const req = s.reqs.find((r) => r.id === s.quoteFor);
        if (!req) return;
        apply((st) => ({
          reqs: st.reqs.filter((r) => r.id !== st.quoteFor),
          quoteFor: null,
          quotesSent: st.quotesSent + 1,
          threads: [
            {
              id: "q-" + req.id,
              name: req.title,
              first: "the client",
              proId: "q-" + req.id,
              last: "You quoted " + money(amount) + " · " + DAY_LABELS[st.quoteDayIdx],
              ts: "now",
              msgs: [
                {
                  from: "them" as const,
                  text: req.title + ". " + req.meta.split(" · ")[0] + ". Budget " + req.budget + ".",
                  ts: "9:12",
                },
              ],
              quote: {
                amount,
                days: DAY_LABELS[st.quoteDayIdx],
                service: SVC_CATS[st.svcRows[0].cat],
                msg: st.quoteMsg.trim(),
                status: "pending" as const,
              },
            },
            ...st.threads,
          ],
        }));
        flash("Quote sent · " + money(amount));
        notify("Quote sent · " + money(amount), req.title + " — the client can see it now.", {
          type: "thread",
          id: "q-" + req.id,
        });
      },
      markGigDelivered: (id: string) => {
        const g = stateRef.current.fGigs.find((x) => x.id === id);
        if (!g) return;
        if (g.status === "DELIVERED") {
          flash("Client confirms delivery directly with you");
          return;
        }
        apply((s) => ({
          fGigs: s.fGigs.map((x) => (x.id === id ? { ...x, status: "DELIVERED" as const } : x)),
        }));
        flash("Marked delivered — " + g.amount + " collected directly from the client");
      },
      remindPayment: (client: string) => flash("Reminder sent to " + client),
      markPaymentReceived: (id: string) => {
        const p = stateRef.current.payments.find((x) => x.id === id);
        if (!p) return;
        apply((s) => ({
          payments: s.payments.map((x) =>
            x.id === id ? { ...x, status: "received" as const, via: "UPI · today", when: "" } : x,
          ),
        }));
        flash(money(p.amount) + " from " + p.client + " marked received");
        notify(
          "Payment received",
          money(p.amount) + " from " + p.client + " — recorded in your August total.",
        );
      },
      managePlan: () => flash("Plan managed in Razorpay · cancel anytime"),
      pickPlan: (planIdx: number) => set({ planIdx }),
    };
  }, [set, apply, later, scroll]);
}

const StateContext = createContext<AppState | null>(null);
const ActionsContext = createContext<Actions | null>(null);
const ScrollContext = createContext<React.RefObject<ScrollTarget | null> | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scroll = useRef<ScrollTarget | null>(null);
  const actions = useActions(state, dispatch, scroll);

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
}

export function useApp() {
  const state = useContext(StateContext);
  if (!state) throw new Error("useApp must be used inside AppProvider");
  return state;
}

export function useActionsContext() {
  const actions = useContext(ActionsContext);
  if (!actions) throw new Error("useActionsContext must be used inside AppProvider");
  return actions;
}

export function useScrollRef() {
  const ref = useContext(ScrollContext);
  if (!ref) throw new Error("useScrollRef must be used inside AppProvider");
  return ref;
}

export { PROS };
