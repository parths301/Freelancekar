# Handoff: FreelanceKar — mobile marketplace app + marketing site

## Overview

FreelanceKar is a local freelancer marketplace for tier-2 Indian cities (launch city: Nagpur; also Indore, Jabalpur, Nashik). Two sides:

- **Clients** search or describe work, compare verified freelancers nearby, book a service, chat, track the order, close it out with a review, or raise a dispute.
- **Freelancers** onboard (phone OTP → profile → KYC → services & pricing → subscription plan), receive job requests, send quotes, run gigs, and track payments.

**The commercial model is central to every screen and every string: FreelanceKar takes ZERO commission.** Clients pay freelancers directly by UPI or cash. There is no escrow and no platform-held money. FreelanceKar's revenue is the freelancer's monthly subscription (Starter ₹299/mo, Pro ₹799/mo, billed via Razorpay). Any copy that implies the platform holds, releases, or takes a cut of job money is a bug.

## About the design files

The files in this bundle are **design references created in HTML** — prototypes that show intended look and behaviour. They are **not production code to copy**. They use a small in-house streaming-template runtime (`<sc-if>`, `<sc-for>`, `{{ value }}` holes, a `Component extends DCLogic` logic class) and every style is an inline attribute. None of that should be reproduced.

The task is to **recreate these designs in the target codebase's existing environment** — React Native / Flutter / SwiftUI for the app, React/Next for the marketing site — using its established component library, navigation, theming and state patterns. If no environment exists yet, pick the appropriate stack and implement there. Read the HTML for exact values (hex, px, copy, timings) and re-express them in the codebase's own tokens.

`FreelanceKar Launch Plan.dc.html` is a written document, not UI: it covers Aadhaar KYC API routes, the backend stack, a six-day launch schedule, and a security checklist. Read it before implementing KYC or payments.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, copy, animation timings and empty/error/loading states are all final and intentional. Recreate the UI pixel-accurately with the codebase's own primitives. Two caveats:

- All imagery is a **diagonal-stripe placeholder** (`repeating-linear-gradient(135deg,#17181b,#17181b 6px,#232529 6px,#232529 12px)`) standing in for avatars, portfolio thumbs and cover images. Real photography is still needed.
- A handful of glyph characters (`⌕ ◉ ▾ ★ ✔ ✕ ← → ▶ ◎ ◫ ◈ ✎ ⌘ ◍ ◭ ₹ ♡ ♥ ↗ ↺ ◌ ● ○ ◉ ▭ ⌾ ＋ ◫`) stand in for icons. **Replace every one with a real icon from the codebase's icon set at the same optical size.** The four tab-bar icons and the notification bell are already real inline SVG line icons (see Iconography).

---

## Design tokens

### Color

| Role | Value |
|---|---|
| App / device background | `#0B0B0C` |
| Bottom bars (tab bar, composer, profile action bar) | `#0F0F11` |
| Bottom-sheet surface | `#111113` |
| Card / field surface (on app bg) | `#141416` |
| Nested field / card inside a sheet; row hover | `#18181B` |
| Notification row — unread | `#17181B` |
| Notification row — read | `#131315` |
| Toast | `#1E1F23` |
| Progress track | `#1B1C1F` |
| Skeleton block (large / small) | `#1D1E22` / `#191A1E` |
| Image placeholder stripes | `#17181b` + `#232529` |
| Primary accent (lime) | `#CDF564` |
| Link hover | `#b9e442` |
| Accent tints | `rgba(205,245,100,.16)` fill, `.14` badge fill, `.12` marketing badge |
| Accent borders | `rgba(205,245,100,.5)` hover, `.45`, `.4` dashed, `.35`, `.28` unread |
| Rating / pending amber | `#F5B851` |
| Error / alert | `#F5865B`; text-on-alert `#160D09` |
| Alert tints | `rgba(245,134,91,.08)` `.1` `.14` fills; `.35` `.4` `.5` borders |
| Text primary | `#F2F2F0` |
| Text secondary ladder | `rgba(242,242,240,…)` — `.6` body, `.55` supporting, `.5` meta, `.45` label, `.42`/`.4` placeholder, `.35` faint, `.28` empty-state glyph, `.22` inactive star |
| Text on lime | `#0B0B0C` (and `rgba(11,11,12,.16)` for dividers on lime) |
| Hairline borders | `rgba(255,255,255,.07)` divider, `.08` card, `.09` field, `.1` sheet top, `.12`, `.14` secondary button, `.16`, `.18` step ring |
| Scrim | `rgba(4,4,5,.62)` |
| Device shadow | `0 24px 60px rgba(0,0,0,.32)` |
| Toast shadow | `0 10px 30px rgba(0,0,0,.4)` |

Max two background colors per surface. Lime is used for exactly one primary action per view, active states, and positive status — never decoratively.

### Typography

Two families, loaded from Google Fonts:

- **Archivo** — 400, 500, 600, 700. All UI text.
- **JetBrains Mono** — 400, 500. Uppercase micro-labels, timestamps, status chips, counts, order/case refs.

App scale (all Archivo unless noted):

| Use | Spec |
|---|---|
| Onboarding H1 | 600 26px / 1.15, `-.025em` |
| Page H1 (Explore, Chats, You, Gigs, Profile) | 600 24px, `-.025em` |
| Hero H2 (Explore prompt) | 600 25px / 1.15, `-.03em` |
| Section H2 (Home) | 600 22px / 1.2, `-.02em` |
| Notifications H1 | 600 21px, `-.02em` |
| Profile name | 600 21px, `-.02em` |
| Sheet title | 600 17–18px, `-.02em` |
| Screen title (Order, Payments) | 600 16px |
| Section H3 | 600 15px |
| Card title | 600 13–14.5px |
| Body | 400 12.5–13px / 1.5–1.55 |
| Card meta | 400 11–11.5px / 1.35–1.45 |
| Tab label | 500 10.5px |
| Big number (earnings) | 600 34px, `-.03em` |
| Quote amount | 600 24px, `-.02em` |
| Micro-label (mono) | 500 10px, `letter-spacing:.07em`, uppercase |
| Status / timestamp (mono) | 500 10–11px |
| OTP field (mono) | 600 18px, `letter-spacing:.4em`, centered |

Marketing pages step up: hero H1 700 52–58px `-.04em`; page H1 700 48px `-.035em`; section H2 600 30px `-.03em`; card H2 600 24px `-.02em`; body 400 14–16px / 1.6.

Long prose blocks use `text-wrap: pretty`.

### Spacing, radii, sizes

- Horizontal page gutter: **20px** (18px in thread header/composer, 22px in centered sheet states).
- Vertical section rhythm: 16 / 18 / 20 / 22 / 24 / 26px top padding; 26px bottom on the last block of a scroll view.
- List gap 9px; grid gap 7–9px; chip gap 7–8px; card internal gap 3–5px.
- Radii: **38** device, **26 26 0 0** sheet, **20** earnings card, **18** result card / brief box, **16** notice card, **15** list card, **14** field / category tile, **13** sheet field, **12** small button, **11** date/day tile, **10** inline button, **9** chip-in-card, **6** mono badge, **999** pill, **50%** circle.
- Card padding: 13–16px. Field padding: 11–14px. Button padding: 9–15px vertical.
- Primary CTA: full width, 14–15px padding, radius 13, `600 14px`.
- Device frame: **390 × 844**, `overflow:hidden`, column flex.
- Tab bar: 4-column grid, `10px 18px 20px` padding, 25px icons, 1px top hairline.
- Minimum tap target 44px — all buttons meet it via padding.

### Motion

| Name | Spec | Used for |
|---|---|---|
| `fkIn` | 280ms ease, `opacity 0→1` + `translateY(10px)→0` | screen enter |
| `fkIn` (short) | 220ms | thread enter, toast |
| `fkSheet` | 300ms `cubic-bezier(.2,.8,.2,1)`, `translateY(100%)→0` | bottom sheets |
| `fkFade` | 200ms ease, opacity | sheet scrim |
| `fkPulse` | 1100ms ease-in-out infinite, opacity 1→.45 | search skeletons |
| `fkDrift` | 80s linear infinite, `translate3d(0,0,0)→(48px,72px,0)` | background dot grid |
| `fkBloom` | 7s / 8s / 8.2s / 9.5s / 11s ease-in-out infinite (staggered 0 / .7s / 1.4s / 1.8s), opacity .25→1 + scale .88→1.12 | background glow blobs |
| width transitions | `width .3s ease` | onboarding progress, profile strength |
| toggle knob | `left .2s ease` | filter switch |

### Simulated async timings (replace with real network calls, keep the perceived rhythm)

| Event | Delay |
|---|---|
| Search skeleton → results | 750ms |
| Payment confirm spinner | 1100ms |
| Freelancer accepts booking (`awaiting` → `in_progress`) | 3200ms |
| Freelancer delivers (`in_progress` → `delivered`) | 9000ms |
| Chat auto-reply + typing indicator | 1600ms |
| Support first response on a dispute | 4500ms |
| Toast dismiss | 2200ms |
| Post-publish "Profile is live" notification | 1200ms |
| Post-subscribe confirmation toast | 600ms |

---

## Iconography

Real inline SVG line icons, `24×24` viewBox, `fill:none`, `stroke:currentColor`, `stroke-width:1.7`, round caps and joins. Rendered at **25px** in the tab bar, 18–19px in the header bell, 26px in empty states.

| Icon | Path |
|---|---|
| Home | `M3.4 10.6 12 4l8.6 6.6V19a1 1 0 0 1-1 1h-4.8v-5.6H9.2V20H4.4a1 1 0 0 1-1-1z` |
| Explore (magnifier) | `M11 4.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6M20.2 20l-4.4-4.4` |
| Chats | `M4 5.4h16v10.2H9.6L4 19.8z` |
| Person (You / Profile) | `M12 4.2a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4M4.8 20c1-3.4 3.8-5.2 7.2-5.2s6.2 1.8 7.2 5.2` |
| Dashboard (grid) | `M4 4.6h6.4V11H4zM13.6 4.6H20V11h-6.4zM4 13h6.4v6.4H4zM13.6 13H20v6.4h-6.4z` |
| Gigs (briefcase) | `M3.4 8.2h17.2v11H3.4zM9 8.2V6a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 6v2.2` |
| Bell | `M18.5 16.5H5.5l1.6-2.6V10a4.9 4.9 0 0 1 9.8 0v3.9zM10 19.4a2.2 2.2 0 0 0 4 0` |

Active tab `#CDF564`; inactive `rgba(242,242,240,.45)`.

---

## Global chrome

**Status bar** — `9:41` left, `5G ▮` right, mono 500 11px at `rgba(242,242,240,.5)`, padding `14px 22px 0`. Prototype only; use the real system status bar.

**Ambient background** (behind all content, `pointer-events:none`, z-index 0; content sits at z-index 1). Three variants, exposed as a design tweak — ship the default:
1. **Pulsing dots** (default) — `radial-gradient(rgba(242,242,240,.15) 1px, transparent 1.5px)` at `24px 24px`, on a 150%-size layer offset `-25%,-25%`, drifting via `fkDrift`; plus three white radial glow blobs (280/320/260px at left -50/top 110, right -70/top 420, left 40/top 640) blooming on staggered `fkBloom`.
2. **Lime bloom** — same grid at `.12` opacity; two lime blobs (`rgba(205,245,100,.14)` 300px and `.12` 340px).
3. **Flat** — no background layer.

**Tab bar** — hidden on `profile`, `fonb`, `thread`, `order`, `notifs`. Labels can be hidden (icon-only) via a tweak; default shown. Client tabs: Home · Explore · Chats · You. Freelancer tabs: Dashboard · Gigs · Chats · Profile.

**Toast** — absolutely positioned, `left/right 20px`, `bottom 96px`, above everything (z-index 6). Single line, mono-free, `500 12.5px`. Auto-dismisses at 2200ms; a new toast replaces the current one.

**Overlays** (z-index 5) — full-bleed scrim `rgba(4,4,5,.62)` with `fkFade`, sheet pinned to bottom with `fkSheet`, `max-height` 82–88%, internal scroll. Six sheets: Hire, City picker, Filters, Review, Issue, Quote.

---

## Screens — client side

### 1. Home (`home`)
**Purpose:** orient, pick a category, or jump to search.

Layout, top to bottom, all 20px gutter:
- **Header row** `16px 20px 0`, space-between: wordmark `FreelanceKar` 700 18px `-.025em` in `#CDF564`; right cluster gap 9px — bell button (38×38 circle, `#141416`, border `rgba(255,255,255,.09)`, hover border `rgba(205,245,100,.5)`, 19px bell SVG) with unread badge (lime pill, min-width 16px, mono 600 9px, `#0B0B0C` text, 2px `#0B0B0C` ring, offset `-2px/-2px`); and a location pill (`◉` 10px lime + city label 600 13px + `▾`), padding `9px 13px`, radius 999.
- **Search entry** (18px top) — full-width button styled as a field: radius 14, padding `13px 14px`, `⌕` + placeholder `Search "reel editor", "GST filing"…` at `rgba(242,242,240,.42)`. Navigates to Explore.
- **"What do you need done?"** H2 + subline `{count} verified freelancers in {city}` (`2,140` for Nagpur).
- **Category grid** — 3 columns, gap 9px, 9 tiles, each min-height 78px, radius 14, padding `13px 10px`, glyph 17px above label 500 11.5px/1.25, hover border lime + bg `#181A1C`. Categories: Reels & video · Social media · Photo & wedding · Graphic design · Content writing · Web & apps · Voiceover · Ads & marketing · GST & accounts. Each runs a canned search.
- **`All 24 categories →`** lime text button, 500 12px.
- **Top rated near you** — H3 + `See all`; horizontal scroller, 150px cards, 92px stripe image, then name 600 13px / headline / `★ rating (jobs)` in `#F5B851` / price 600 12px.
- **Post-a-job card** — radius 16, "Can't find it? Post a job" + "Get quotes in under an hour" + lime `Post` button.

### 2. Explore (`explore`)
**Purpose:** search by text or by describing the job.

- Header: `Explore` H1 + compact location pill.
- Live search field (radius 14) with a lime `Go` button that appears only when the query is non-empty. Enter submits.
- Hero H2: **"Tell us the work."** + `We'll find the person.` in `rgba(242,242,240,.4)`.
- **Brief composer** — radius 18 card, textarea min-height 62px, placeholder `Need 8 Instagram reels a month for my café in Dharampeth…`; footer row with three faint affordance glyphs (location, attachment, budget) and a lime **Find people** button.
- Suggestion chips (999 radius): Wedding shoot · GST filing · Logo design · Hindi voiceover · Reel editing.
- **Recent searches** — rows with `↺`, label, meta, result count in mono.
- **How hiring works** — 3 numbered tiles: Describe work · Compare quotes · **Pay them directly**.

### 3. Results (`results`)
**Purpose:** compare and act.

- Sticky-feeling header row: back `←`, read-only query field, filter `⚙` button with a lime count badge when filters are active (icon turns lime).
- Sort scroller: **Best match** (default) · Nearest · Under ₹15k · 4.8★+. Active = lime fill, `#0B0B0C` text.
- Count row: `{n} people in {city}` + mono `MATCH SCORED` / `FILTERED`.
- **Result card** — radius 18, padding 14. Top: 48px stripe avatar (radius 14); name 600 14.5px + lime `✔` for verified + right-aligned match `%` in mono (lime for the top result); services line; `★ rating` amber, `{jobs} jobs`, distance. Divider, then price 600 13.5px + note, and two buttons: outlined **Message**, lime **Hire**. **The first card gets a lime border**; the rest `rgba(255,255,255,.08)`.
- **Loading:** 3 skeleton cards pulsing at `fkPulse` for 750ms (48px block + 3 bars at 58% / 82% / 44%).
- **Empty:** `⌕` glyph, "Nobody matches this yet", a note that names the locality and either the narrow filters or the query, then lime **Clear filters** and outlined **Post the job instead**.

### 4. Freelancer profile (`profile`)
Tab bar is replaced by a **sticky action bar**: selected package price + terms, outlined **Chat**, lime **Hire**.

- 104px stripe cover with a floating circular back button (`rgba(11,11,12,.72)`).
- 72px avatar (radius 20, 3px `#0B0B0C` ring) pulled up `-30px`; right side: save toggle (`♡`→`♥`, lime when saved) and share `↗`.
- Name 600 21px + lime `KYC ✔` mono badge; tagline.
- **4-stat grid** — rating (amber) / `{jobs} jobs`, `98% completion`, `replies in {t}`, `{years} on platform`.
- **Services offered** — H3 + mono `{n} ACTIVE`; selectable rows (selected row = lime border) with name, terms, price. Selection drives the action bar and the Hire sheet.
- **Recent work** — 3-up 3:4 tiles, third overlaid `+14`.
- **Reviews** — one card: 28px avatar, reviewer, `★ 5.0`, review body.

### 5. Chats (`chats`) and Thread (`thread`)
- **Chats:** H1 + thread rows (40px avatar radius 12, name, truncated last message, timestamp — lime when `now`). Empty: chat glyph + "No enquiries yet. Message a freelancer from Explore and the thread shows up here."
- **Thread:** header with back, 34px avatar, name + `Usually replies in 15 min`. Bubbles max-width 78%, padding `10px 13px`; **mine** = `rgba(205,245,100,.14)` fill, `rgba(205,245,100,.35)` border, radius `15 15 5 15`; **theirs** = `#141416`, `rgba(255,255,255,.08)`, radius `15 15 15 5`; timestamp mono 9.5px at 50% opacity, right-aligned. Typing indicator is a their-side bubble reading `typing…`.
- **Quote card in thread** — radius 17, mono `QUOTE` label + status (`AWAITING YOUR REPLY` amber / `SENT · AWAITING REPLY` on the freelancer side / `ACCEPTED · BOOKED` lime / `DECLINED` grey). Amount 600 24px, `{service} · delivery in {days}`, message. Client sees **Decline** (outlined, flex 1) + **Accept quote** (lime, flex 1.4); once accepted it collapses to an outlined lime **View order**. Card border: amber while pending, lime when accepted.
- **Composer** (bottom bar, replaces tab bar): input radius 12 + lime **Send**. Enter sends.

### 6. You (`you`)
- H1, then identity row: 56px avatar radius 16, `Café Mitti`, `Client · {city}`.
- **3-stat grid**: bookings · saved · **to pay** (sum of non-completed order amounts).
- **Booking cards** — name + amount on one line, service beneath, then mono status and a lime CTA. Statuses: `AWAITING CONFIRMATION` → `IN PROGRESS` → `DELIVERED · CONFIRM & RATE` → `COMPLETED` (grey). CTA is `Approve →` when delivered, else `View →`.
- Empty state: dashed border card, "No bookings yet. Hire someone and the order lives here." + lime **Find a freelancer**.
- **Settings list** (one grouped card, hairline dividers): `Switch to freelancer mode` (lime chevron) · `Payment methods` (inert) · `Help & disputes` (opens the first order's issue sheet, or toasts if there are no orders).

### 7. Order (`order`)
- Header: back + `Order FK-48210` (mono-ish 600 16px).
- **Summary card** — 44px avatar, freelancer name, service; divider; amount 600 18px with `Pay {first} directly` in lime beneath (becomes `Paid to {first} directly`, grey, when complete), and the mono status right-aligned.
- **Progress timeline** — 4 steps, 11px dots with 2px rings joined by a 1px, 26px-tall connector. Reached = lime dot/ring/line and `#F2F2F0` title; unreached = `#0B0B0C` dot, `rgba(255,255,255,.18)` ring, `rgba(255,255,255,.12)` line, `rgba(242,242,240,.4)` title, note `—`. Steps: **Booking confirmed** ("Pay the freelancer directly, no platform fee") → **Freelancer confirmed** ("Work has started") → **Work delivered** ("Review the files and pay if you haven't already") → **Marked complete** ("Job closed out").
- **Your review** card once submitted (stars in amber + text).
- **Issue card** when a dispute exists — alert-tinted (`rgba(245,134,91,.08)` on `.35` border): `Issue · SUP-2140` in `#F5865B`, mono status `SUPPORT REVIEWING` (amber) → `SUPPORT REPLIED` (lime), reason line, and the support response.
- Actions: lime **Mark complete & rate** (only when delivered) → outlined **Message {first}** → text-only **Raise an issue** (hidden once an issue exists).

### 8. Notifications (`notifs`)
Back + `Notifications` H1 + `Mark all read` (lime, only when unread exist). Rows: 7px status dot (lime unread / `rgba(242,242,240,.2)` read), title 600 13px, body, lime CTA line (`View order →` / `Open chat →`), mono timestamp right. Unread rows use `#17181B` + `rgba(205,245,100,.28)` border; read rows `#131315` + `rgba(255,255,255,.07)`. Tapping marks read and deep-links to the order or thread. Empty: bell glyph + "Nothing yet. Quotes, escrow updates and messages show up here."

> **Copy fix for implementation:** that empty-state string still says "escrow". It should read "Quotes, payment updates and messages show up here."

---

## Screens — freelancer side

### 9. Onboarding (`fonb`) — 5 steps
Header on every step: back `←`, a 3px progress track (`#1B1C1F`) with a lime fill at `step × 20%` transitioning `width .3s ease`, and a mono `n/5` label. Step 1's back exits to `you`. A single lime full-width CTA sits at the bottom of steps 1–4; step 5 has no CTA (picking a plan submits).

1. **Start earning on FreelanceKar** — "7-day free trial, then a simple monthly plan. No commission on your jobs, ever." Phone field with a `+91` prefix (digits only, max 11 chars incl. space). CTA `Send OTP` → reveals a 4-digit OTP field labelled `OTP SENT · USE 1234` (mono 600 18px, `.4em` tracking, centered) and the CTA becomes `Verify & continue`. Three lime `✔` benefit lines, the third being "Clients pay you directly — you keep 100% of every job". Validation: <10 digits → "Enter a 10-digit mobile number."; wrong OTP → "That code didn't match. Use 1234 in this demo."
2. **About you** — name/studio input; city as a chip row (Nagpur · Indore · Jabalpur · Nashik); travel radius as a 4-up tile row (5 km · 10 km · 25 km · Anywhere, default 10 km); one-line bio textarea. Validation: name <2 chars → "Add the name clients should see."
3. **Get verified** — "Verified profiles get roughly 3× more enquiries. Your documents are never shown to clients." Three tappable rows (Aadhaar / PAN card / Live selfie) toggling `＋ UPLOAD` → lime `✔ DONE` with a lime border. Then a bank-payout row: `Add UPI ID or account number` → `HDFC ••4471 · verified`, button `Add` (lime) → `Added` (lime tint). Footnote "Tap each item to simulate an upload." Validation: fewer than 2 uploads → "Upload at least Aadhaar and a selfie to get verified."
4. **What do you offer?** — repeatable service rows (radius 15): mono `SERVICE n` + `✕` remove (never removes the last row); a category button that cycles through 12 categories; a 3-up pricing-type row (Fixed `/ project` · Per day `/ day` · Monthly `/ month`); and a `₹` amount input with the unit suffix. Below: dashed lime **+ Add another service**. Validation: no priced row → "Add a price for at least one service." CTA `Continue to plan` (or publishes directly if already subscribed/onboarded).
5. **Choose your plan** — "Clients pay you directly by UPI or cash — FreelanceKar never touches that money. This plan just keeps your profile listed and searchable." Two cards, selected = lime border + lime price: **Starter ₹299/mo** (up to 2 services, standard placement), **Pro ₹799/mo** (unlimited services, priority placement, verified badge boost; default). Tapping a plan subscribes and publishes. Footnote: "Billed via Razorpay. Cancel anytime — your profile stays live until the period ends."

On publish: go to Dashboard, toast `Profile live in {city} · {n} services`, then after 1200ms a notification. **If the live selfie was skipped, the profile publishes but `kycRejected` is set** — the dashboard shows a verification banner and the notification reads "Verification incomplete".

### 10. Dashboard (`fdash`)
- Header: `Good morning,` + first name 600 19px; bell (34px) + availability pill (7px dot + `Available` / `Not taking work`, dot lime / grey). Toggling toasts "Hidden from new searches" / "You're visible in {city} again".
- **Verification banner** (conditional, alert-tinted radius 16): "Verification incomplete" + explanation + `Finish verification` button in `#F5865B` with `#160D09` text → jumps to onboarding step 3.
- **Earnings card** — full-bleed lime, radius 20, padding 18, `#0B0B0C` text. Mono `EARNINGS · AUGUST` + `All payments →`; total 600 34px; divider (`rgba(11,11,12,.16)`) then three figures: pending pay · received · `+22% vs July`. Whole card taps through to Payments.
- **Profile strength** — label + lime mono percentage, 5px lime progress bar, and a contextual note ("Finish verification to rank higher in {city}" / "Add one more service to appear in more searches" / "Strong profile — you'll show up near the top in {city}"). Formula: `min(100, 30 + services×12 + kycDone×8 + bank×6 + bio×6)`.
- **New requests** — H3 + lime `{n} NEW` mono badge; cards with title + budget, `{locality} · {km} · posted {t} ago`, and **Pass** (outlined) / **Send quote** (lime) split evenly. Empty: dashed card "All caught up. New jobs matching your services in {city} land here."
- **Your services** — grouped card listing each priced service (`{category}` / `{type} · {city}` / `₹x / unit`), with a lime `+ Add a service` row → onboarding step 4.

### 11. Payments (`fearn`)
- Back + `Payments`.
- **Lime summary card** — mono `COLLECTED · AUGUST`, received total 600 34px, then: `still to collect` · `billed this month` · **`₹0 platform cut`**.
- **To collect** — H3 + mono `PAID TO YOU DIRECTLY`. Rows: client + amount, `{service} · {when}`, then **Remind** (outlined, flex 1) / **Mark received** (lime, flex 1.3). Marking received moves the row to Received, toasts, and posts a notification. Empty: "Nothing outstanding. Every client has paid up."
- **Received** — grouped list: client, `{service} · {via}` (e.g. `UPI · 12 Aug`, `Cash · 6 Aug`), amount.
- **Your plan** — `{Pro} · ₹799/mo`, `Renews 1 Sep · Razorpay`, outlined **Manage**; divider; `Where clients pay you` + bank note + Add/Added button. Footnote: "FreelanceKar never holds your money — clients pay you by UPI or cash and you keep every rupee."

### 12. Gigs (`fgigs`)
H1 + `{n} active · {m} quotes awaiting reply`. Cards: 36px avatar, client, service, amount; divider; mono status (`IN PROGRESS` lime / `DELIVERED` grey) + action — lime **Mark delivered**, which becomes an outlined, inert **Awaiting approval** (tapping it toasts "Client confirms delivery directly with you"). Empty: "No gigs running. Quote on requests from the dashboard — accepted quotes turn into gigs here." + lime **See new requests**.

### 13. Freelancer profile (`fme`)
H1 `Profile`; identity row with name + mono KYC badge (`KYC ✔` when all 3 done, else `KYC n/3`); `Freelancer · {city}`. 3-stat grid: services · quotes sent · active gigs. Bio paragraph (or the prompt "Add a line about your work so clients know what you do."). Grouped list: `Edit services & pricing` · `Payments & bank details` · lime `Switch to client mode`.

---

## Overlays (bottom sheets)

### Hire sheet — 4 states
1. **Details** — `Hire {first}` + `✕`. Mono `SERVICE` + selectable package rows (`#18181B`, lime border when selected). Mono `START DATE` + 3-up tiles (Tomorrow · This week · Pick date). Mono `BRIEF` + textarea (placeholder "What exactly do you need? Add links or references."). CTA `Continue · {price}`. Validation: brief under 8 chars → "Add a line about the work so {first} can confirm."
2. **Secure payment** — back / `Secure payment` / close. Summary card: avatar + name + service, `Service {price}`, then **`Total to pay {first}` {amount}**. Mono `PAY WITH` + three methods with radio dots: `UPI · GPay / PhonePe` (Instant, no charges — default), `Card` (Visa · Mastercard · RuPay), `Net banking`. Note: "You pay {first} directly — no platform fee. This confirms the booking and shares your contact details." CTA `Confirm booking` → `Confirming…` for 1100ms.
3. **Success** — 52px lime `✓` circle, `Booked with {first}`, "Pay {first} {amount} directly on delivery. Usually confirms within {replyIn} — you'll get a notification." Detail card: Service / Starts / Order. Buttons: outlined **Open chat**, lime **Done**.
4. **Failure** — deliberately triggered when **Card** is chosen on the first attempt. 52px alert circle `!`, "Payment didn't go through", "Your bank declined the card. Nothing was charged and {first} hasn't been booked yet." Detail card: `Attempted {amount}` / `Reason DECLINED_BY_ISSUER`. Buttons: lime **Pay with UPI instead** (switches method to UPI, returns to step 2), outlined **Try the card again** (returns to step 2; succeeds on retry).

### City picker
Fixed head: title `Where do you need work done?` + close; search field (placeholder `Locality or city — e.g. Dharampeth`); dashed lime **Use my current location** (resolves to Dharampeth, Nagpur). Scrolling body: city rows (`◉`, `All localities`, freelancer count) then 12 locality rows (`◌`, parent city, count). Selected row = lime border + lime glyph. Empty: "No match for "{q}". FreelanceKar is live in Nagpur, Indore, Jabalpur and Nashik — more cities each month." + **Show all localities**.

### Filters
Four chip groups — `MAX BUDGET` (Any / Under ₹2k / ₹10k / ₹25k), `DISTANCE` (Any / 3 / 5 / 10 km), `WORK MODE` (Any / On-site / Remote ok), `LANGUAGE` (Any / Hindi / Marathi / English) — plus an `Available this week` row with a custom 44×26 pill switch (knob 20px, `left` 2px→20px, `left .2s ease`; on = lime track, `#0B0B0C` knob). Footer: **Reset** (flex 1, outlined) / **Show results** (flex 1.5, lime). Edits are staged and only committed on apply; opening the sheet re-seeds from the applied set.

### Review ("Close out the job")
"Confirm you've paid {first} {amount} directly. How was the work?" 5 stars at 28px (amber when selected, `rgba(242,242,240,.22)` otherwise), a textarea ("What went well? This shows on their profile."), and lime **Mark paid & post review**. Validation: no stars → "Pick a star rating first." Submitting sets the order to `approved`, stores the review (defaulting the text to "Good work, would hire again."), toasts, and notifies.

### Issue ("Raise an issue")
"Order {ref} with {name}. Support in {city} picks this up within 24 hours." Reason chips: Work not delivered · Not what was agreed · Freelancer unreachable · Asked for more money · Something else. Textarea ("What happened? Dates, what was promised, what you got."), lime **Send to support**. Validation: under 10 chars → "Add a couple of lines so support can act on it." Footnote: "FreelanceKar never holds your money, so nothing is frozen — support mediates and can pause the freelancer's listing while the case is open." Creates case `SUP-2140`, status `open`, and 4500ms later flips to `responded` with a second notification.

### Quote sheet (freelancer)
Request recap card (title, meta, lime `Client budget: {x}`). Mono `YOUR PRICE` + `₹` input with the note "You keep 100% — client pays you directly, no platform cut." Mono `DELIVERY IN` + 4-up tiles (24 hr · 3 days · 1 week · 2 weeks, default 3 days). Mono `MESSAGE` + textarea. Lime **Send quote**. Validation: amount < ₹100 or message under 8 chars → "Add a price and a short message before sending." Sending removes the request, increments quotes-sent, and creates a thread carrying a `pending` quote.

---

## State model

Single reducer/store for the whole prototype. Keys, grouped:

**Navigation** — `screen` (`home` | `explore` | `results` | `profile` | `chats` | `thread` | `order` | `notifs` | `you` | `fonb` | `fdash` | `fearn` | `fgigs` | `fme`), plus a non-rendered `freelancerMode` flag that decides which tab set shows on the shared `chats` screen and where the bell's back button returns to. Every screen change resets the scroll container to top (thread scrolls to bottom instead).

**Discovery** — `cityIdx`, `locality`, `cityOpen`, `citySearch`, `query`, `brief`, `searchLabel`, `searching`, `sort` (`match` | `near` | `price` | `rating`), `filters` (staged) and `applied` (committed) each `{budget, dist, mode, lang, availNow}`, `filtersOpen`.

**Freelancer detail / hiring** — `activeId`, `svcIdx` (selected package), `saved[]`, `hire` (0 = closed, 1–4 = sheet state), `hireNote`, `hireDateIdx`, `hireError`, `methodIdx`, `paying`, `payRetried`.

**Orders & messaging** — `bookings[]` (`{id, proId, name, first, service, amount, amountNum, status, review, issue}`; status `awaiting` → `in_progress` → `delivered` → `approved`), `viewOrder`, `threads[]` (`{id, name, first, proId, last, ts, msgs[], quote?, orderRef?}`; message `{from: 'me'|'them', text, ts}`; quote `{amount, days, service, msg, status: pending|accepted|declined}`), `threadId`, `draft`, `typing`.

**Disputes & reviews** — `issueOpen`, `issueReason`, `issueText`, `issueError`, `reviewOpen`, `reviewStars`, `reviewText`, `reviewError`.

**Notifications** — `notifs[]` (`{id, title, body, ts, unread, target: null | {type: 'order'|'thread', id}}`), seeded with two entries.

**Freelancer onboarding & account** — `onbStep` (1–5), `phone`, `otpSent`, `otp`, `onbErrorMsg`, `fName`, `fCityIdx`, `fRadiusIdx`, `fBio`, `kyc {aadhaar, pan, selfie}`, `bank`, `svcRows[] {cat, type, amount}`, `onboarded`, `subscribed`, `planIdx`, `kycRejected`.

**Freelancer working state** — `available`, `reqs[]`, `quotesSent`, `quoteFor`, `quoteAmount`, `quoteDayIdx`, `quoteMsg`, `quoteError`, `fGigs[]`, `payments[]` (`{id, client, service, amount, status: awaiting|received, via, when}`).

**UI** — `toast`.

### Key transitions

- **Search** → set label, reset sort to `match`, `searching: true`, navigate to Results, clear after 750ms.
- **Hire → pay → book** → validate brief (8+ chars) → step 2 → `Confirm booking` sets `paying` → after 1100ms: if method is Card and not yet retried, go to step 4 (failure) + toast + notification; otherwise create the booking (`FK-48210 + 7×bookingCount`), open a thread, notify, show step 3, and start the booking clock.
- **Booking clock** → 3200ms `awaiting → in_progress` (toast + notification); 9000ms `in_progress → delivered` (toast + notification).
- **Approve** → review sheet → `delivered → approved`, review stored, toast, notification.
- **Chat send** → append my message, set `typing`, after 1600ms append the counterpart reply and notify. The reply text differs by side ("I'll send a quote in a few minutes." vs "when can you start?").
- **Quote accept** → mark quote `accepted`, append a confirmation message, create a booking (`FK-48310 + 7×n`) and start the booking clock.
- **Dispute** → validate 10+ chars → case `SUP-2140 + 3×n` at status `open`, toast, notification; after 4500ms → `responded` + second notification.
- **Onboarding** → per-step validation as listed; step 4 either advances to the plan step or republishes; plan pick subscribes then publishes; missing selfie sets `kycRejected`.
- **Mode switch** — `Switch to freelancer mode` goes to onboarding (or straight to the dashboard if already onboarded); `Switch to client mode` returns to You.

### Filtering & sorting rules (as prototyped)
Budget filters on the freelancer's base rate; distance on km; `remote` keeps only remote-capable profiles; language matches a per-profile language list; "available this week" keeps profiles within 6 km. Sorts: `match` by descending match score, `near` by ascending km, `price` filters to ≤ ₹15k then ascending base, `rating` filters to ≥ 4.8. Replace with real server-side query params — but keep the **first result highlighted with a lime border and a lime match percentage**, which is a deliberate ranking affordance.

---

## Data needed from the backend

- **Freelancer**: id, name, first name, tagline, headline, service summary, rating, jobs completed, distance (km), base rate, display price, reply-time, years on platform, match score, verified flag, languages, remote-capable flag, a review (author + body), and 1–3 packages `{name, terms, price, amount}`.
- **Taxonomy**: 9 home categories (24 total intended), 12 service categories for onboarding, 3 pricing types, 4 cities, 12 localities with freelancer counts, per-city freelancer counts (Nagpur 2,140 · Indore 1,860 · Jabalpur 640 · Nashik 910).
- **Job requests**: title, budget label, `{locality} · {km} · posted {t} ago`.
- **Payments**: client, service, amount, status, method + date once received, due label.
- Currency is formatted `₹` + `toLocaleString('en-IN')` throughout — use the Indian grouping (₹1,40,000), never `en-US`.

---

## Copy rules

1. **Never** say escrow, "release funds", "held securely", "platform fee on jobs", or "commission". Clients **pay the freelancer directly**; FreelanceKar's only charge is the freelancer's subscription.
2. Say "Pay {first} directly", "no platform fee", "you keep 100%", "₹0 platform cut".
3. Empty states say what will appear there and offer the action that fills it.
4. Errors are one plain sentence with the fix. No error codes in user copy (the one exception is the deliberate `DECLINED_BY_ISSUER` diagnostic on the payment-failure state).
5. Sentence case for everything except mono micro-labels and status chips, which are uppercase.
6. Amounts are always rendered with `₹` and Indian digit grouping.

---

## Accessibility notes to resolve in build

- The location pill, filter button, save toggle, availability toggle and the "available this week" switch are icon/glyph-led and need accessible labels and roles (`switch` + `aria-checked` for the two toggles).
- Status is currently communicated by color plus an uppercase mono label — keep both; do not drop to color alone.
- Star rating needs a radiogroup with a value and a text equivalent.
- The bell badge count needs an `aria-label` ("3 unread notifications").
- `#F5865B` on `#0B0B0C` and `#CDF564` on `#0B0B0C` both pass AA for body text; lime-on-lime-tint (`#CDF564` on `rgba(205,245,100,.14)`) is used only for badges at 600 weight — verify against your contrast bar before reuse at smaller sizes.
- Reduced-motion: disable `fkDrift` / `fkBloom` / `fkPulse` and shorten sheet entry.

---

## Assets

No binary assets. Everything is CSS, inline SVG paths, or text.

- **Fonts**: Archivo (400/500/600/700) and JetBrains Mono (400/500) from Google Fonts. Self-host or use the codebase's font pipeline.
- **Images**: every photograph, avatar and portfolio thumbnail is the diagonal-stripe placeholder described under Fidelity. Real assets required: 5 freelancer avatars, cover images, portfolio grids (3 + "+14"), client avatars.
- **Icons**: 7 real inline SVG line icons (see Iconography). All other glyphs are Unicode placeholders to be replaced with real icons.

---

## Files in this bundle

| File | What it is |
|---|---|
| `FreelanceKar Prototype.dc.html` | **The main artifact.** Full interactive mobile app — 14 screens, 6 bottom sheets, both client and freelancer sides, all states wired. |
| `FreelanceKar Homepage.dc.html` | Marketing homepage (desktop). |
| `FreelanceKar How It Works.dc.html` | Marketing: hiring flow for clients, earning flow for freelancers, how payment works, FAQ. |
| `FreelanceKar City Page.dc.html` | Templated SEO landing page — `{category} in {city}`, top freelancers, local rate table, localities, city FAQ, freelancer CTA. |
| `FreelanceKar Pricing.dc.html` | Marketing: subscription plans. |
| `FreelanceKar Join As Freelancer.dc.html` | Marketing: freelancer acquisition landing page. |
| `FreelanceKar Post A Job.dc.html` | Post-a-job flow. |
| `FreelanceKar Freelancer Profile.dc.html` | Desktop/web freelancer profile page. |
| `FreelanceKar.dc.html` | Earlier static screen exploration — reference only; the Prototype supersedes it. |
| `FreelanceKar Launch Plan.dc.html` | Written launch document: Aadhaar KYC API routes, backend stack and schema sketch, six-day schedule, security checklist, out-of-scope list. **Read before building KYC or payments.** |

To view any file, open it in a browser — each is self-contained apart from `support.js`, which must sit alongside them (it is included in this bundle).

## Suggested build order

1. Design tokens + typography + the two shared shells (scroll screen with tab bar; bottom sheet).
2. Client discovery: Home → Explore → Results (with skeleton and empty states) → Profile.
3. Hire sheet including both the success and the card-decline paths.
4. Orders + the booking status machine, then Review and Issue.
5. Chats, thread, quote card.
6. Notifications with deep links.
7. Freelancer onboarding (5 steps, all validation).
8. Dashboard, Payments, Gigs, freelancer Profile, quote sheet.
9. Marketing site from the five desktop pages.
