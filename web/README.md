# FreelanceKar — marketing site

The public marketing site for FreelanceKar, a local freelancer marketplace for tier-2 Indian
cities (launch city Nagpur; also Indore, Jabalpur, Nashik). This is a separate Next.js project
from the mobile-app mockup at the repo root — it doesn't import from or modify that app, it only
reuses its design tokens and copy for brand consistency.

**Core selling point, reiterated everywhere it's relevant:** FreelanceKar takes **zero
commission**. Clients pay freelancers directly by UPI or cash. FreelanceKar's only revenue is the
freelancer's monthly subscription (Starter ₹299/mo, Pro ₹799/mo).

## Pages

- `/` — Homepage: hero, category grid, top-rated freelancers, three-step overview, city chips,
  freelancer CTA.
- `/how-it-works` — Separate flows for clients (search → compare → pay directly) and freelancers
  (verify → list → get paid), a "how payment works" explainer, and FAQ.
- `/pricing` — Starter vs. Pro plan comparison, feature table, zero-commission reiteration, FAQ.
- `/join-as-freelancer` — Freelancer-focused landing page: pitch, stub sign-up form, 4-step
  onboarding overview, service categories, typical rates, plan CTA.
- `/city/[slug]` — Templated city landing page, statically generated for `nagpur`, `indore`,
  `jabalpur`, `nashik` (`generateStaticParams`). Shows local stats, categories, top freelancers,
  a rate table, localities, and a city-specific FAQ.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Fonts: Archivo + JetBrains Mono (`next/font/google`), matching the app
- Design tokens (`src/app/globals.css`) are reused from the root project's
  `src/app/globals.css` — same dark theme, lime/amber accents, radii and type scale, registered
  as Tailwind color utilities via `@theme inline`.
- Content (`src/lib/data.ts`) mirrors the root project's `src/lib/data.ts` taxonomy — categories,
  cities, subscription plans — so marketing copy never drifts from the app's real data.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint      # eslint .
```

## What's intentionally stubbed

This is a static/mostly-static MVP marketing site with **no backend**:

- The "Get started" form on `/join-as-freelancer` (`src/components/SignupStub.tsx`) is a
  client-side stub. Submitting it just shows a "thanks, we'll be in touch" confirmation —
  nothing is sent to a server, there's no real OTP flow, and no data is persisted.
- There is no real auth, no waitlist backend, and no payment processing (Razorpay is mentioned by
  name only on the pricing page, describing how freelancer subscriptions will eventually be
  billed — nothing on this site actually talks to Razorpay).
- "Get quotes" / category tiles / freelancer cards link to real city pages but don't hit a real
  search or matching backend — the site has no product functionality, only content and CTAs.

## Content decisions made where the spec was silent

- The design handoff's HTML prototypes (`design_handoff_freelancekar/*.dc.html`) are an earlier
  iteration that describes an escrow-based payment model ("pay into escrow", "money releases on
  approval"). The current product spec is zero-commission with direct UPI/cash payment and no
  escrow. All copy on this site follows the current spec — the prototypes were used only for
  page structure, section layout and general tone, not for their payment-flow copy.
- Pricing plan names/prices follow the app's real `PLANS` seed data (Starter ₹299/mo, Pro
  ₹799/mo) rather than the prototype's "Starter/Growth" naming.
- The freelancer trial length is stated as "7-day free trial" (matching the app's onboarding
  copy: "7-day free trial, then a simple monthly plan"), not the prototype's "free first month".
- City page rate tables, locality lists and FAQs are seeded per city in `src/lib/data.ts`
  (`RATE_TABLE`, `cityFaqs`) — real numbers aren't available yet, so these are reasonable
  placeholders consistent with the app's Nagpur seed data (e.g. reel-editing rates, PROS pricing).
- No hero/profile photography exists yet (per the design handoff, all imagery is a diagonal-stripe
  placeholder standing in for real photos) — this site uses the same `fk-stripe` placeholder
  pattern rather than inventing stock imagery.
- The header's primary CTA is "Find a freelancer" (linking to the Nagpur city page) rather than
  "Download the app," since there's no published app to link to yet.
