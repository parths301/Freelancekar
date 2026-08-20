# FreelanceKar

Local freelancer marketplace for tier-2 Indian cities (launch city: Nagpur; also Indore, Jabalpur, Nashik).

**FreelanceKar takes zero commission.** Clients pay freelancers directly by UPI or cash. There is no escrow and no platform-held money. Revenue is the freelancer's subscription (Starter ₹299/mo, Pro ₹799/mo, billed via Razorpay). Any copy implying the platform holds, releases, or takes a cut of job money is a bug.

## Current state

The mobile app UI is built end to end against mock data — all 14 screens, 6 bottom sheets, both client and freelancer sides, every state wired. There is no backend yet: async behaviour (booking clock, chat replies, support responses) is simulated with timers in `src/lib/store.tsx`.

Stack per the launch plan: Next.js (App Router) on Vercel as an installable PWA. Planned backend: Supabase (Postgres + PostGIS, RLS, Storage, Edge Functions), Razorpay Subscriptions + UPI Autopay, Firebase Phone Auth.

```bash
npm run dev      # http://localhost:3000
npm run build
npx eslint .
```

## Layout

| Path | What |
|---|---|
| `src/app/globals.css` | Design tokens (color, type scale, motion) as CSS variables and utility classes |
| `src/lib/data.ts` | Seed data standing in for backend responses |
| `src/lib/types.ts` | The state model |
| `src/lib/store.tsx` | Single store: state, actions, simulated async timings (`TIMING`) |
| `src/lib/selectors.ts` | Derived values — search filtering/sorting, order steps, profile strength |
| `src/components/screens/` | The 14 screens |
| `src/components/sheets/` | Hire, city picker, filters, review, issue, quote |
| `src/components/shell.tsx` | Device chrome: background, status bar, tab bar, sheet, toast |
| `design_handoff_freelancekar/` | The original design bundle — read `README.md` there for full specs |

## Not built yet

- Backend, auth, payments, KYC (see `design_handoff_freelancekar/FreelanceKar Launch Plan.dc.html` before starting on KYC or payments)
- The five marketing pages (homepage, how it works, pricing, join as freelancer, city landing)
- Real imagery — every avatar, cover and portfolio tile is the diagonal-stripe placeholder
- Real icons for the Unicode glyph placeholders (`⌕ ◉ ▾ ★ ✔ …`); the tab-bar icons and bell are real SVG
