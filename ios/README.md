# FreelanceKar — iOS

A native SwiftUI MVP of FreelanceKar: a zero-commission local freelancer
marketplace for tier-2 Indian cities (launch city Nagpur; also Indore,
Jabalpur, Nashik). Clients pay freelancers directly by UPI or cash —
FreelanceKar never holds money. Revenue is freelancer subscriptions only
(Starter ₹299/mo, Pro ₹799/mo).

This app is a faithful port of the Next.js/React reference implementation at
`/src` — same data model, same state machine, same screen-by-screen copy and
behaviour, same design tokens — rebuilt with Swift + SwiftUI instead of
React + Tailwind.

## Opening / building

- **Xcode 26** or later (tested with Xcode 26.6 / Swift 6.3).
- **iOS 17.0** deployment target.
- Open `FreelanceKar.xcodeproj` in Xcode and run the `FreelanceKar` scheme on
  an iPhone simulator or device.
- The project is generated with [XcodeGen](https://github.com/yonaskolb/XcodeGen)
  from `project.yml`. If you change the file layout, re-run `xcodegen generate`
  from the `ios/` directory to regenerate `FreelanceKar.xcodeproj` (the
  `.xcodeproj` itself is checked in so the project opens without XcodeGen
  installed).

### Build verification

`xcodebuild -project FreelanceKar.xcodeproj -target FreelanceKar -sdk
iphonesimulator build` was run in the environment this was built in. The
Swift sources compiled and linked cleanly into a real arm64 Mach-O
`FreelanceKar.app` binary (verified with `file`) — every screen, sheet, and
store action type-checks and builds. The one step that could not complete
end-to-end in that sandbox was the asset-catalog compile (`actool`), because
the sandbox has the iOS Simulator *SDK* but no simulator *runtime* installed
(`xcrun simctl list runtimes` returns empty, and Xcode's platform downloader
isn't reachable there) — an environment limitation, not a code issue. This
was confirmed by building the exact same target with the asset catalog
temporarily removed, which succeeded end-to-end (`BUILD SUCCEEDED`,
`FreelanceKar.app/FreelanceKar` produced as a valid arm64 executable). On a
normal Xcode install with a simulator runtime downloaded (Xcode prompts for
this automatically), `Cmd+R` builds and runs the app as-is.

## What's implemented

**Screens (14, both client and freelancer modes):**
Home, Explore, Results, Freelancer Profile (client-facing), Chats, Thread,
Order, Notifications, You, Freelancer Onboarding (5 steps), Freelancer
Dashboard, Payments (freelancer earnings), Gigs, Freelancer Profile (own).

**Sheets (6):** Hire (details → pay → success/failure), City picker, Filters,
Review, Issue/dispute, Quote (freelancer sending a quote to a job request).

**Store & state:** a single `AppStore: ObservableObject` (`Store/AppStore.swift`)
holding one `AppState` struct that mirrors `src/lib/types.ts`'s `AppState`
field-for-field, with action methods mirroring every function on the web
store (`src/lib/store.tsx`) — search, hire/pay flow, chat send + auto-reply,
quote accept/decline, booking clock (accept → deliver), reviews, disputes
(raise → support auto-reply), notifications, freelancer onboarding (phone/OTP
→ about → KYC → services → plan), availability toggle, quotes, gigs, and
payments. Derived/filter/sort logic lives in `Store/Selectors.swift`,
mirroring `src/lib/selectors.ts` (result filtering/sorting, profile strength,
payment totals, etc).

**Simulated async behaviour:** every timer from the web reference's `TIMING`
object (search delay, payment confirm, booking accept/deliver, chat reply,
support reply, toast duration, profile-live delay, subscribe delay) is
reproduced with `Task { try await Task.sleep(nanoseconds:) }` using the same
millisecond values, instead of `setTimeout`.

**Design system:** `DesignSystem/Theme.swift` defines the `FK` color/radius/
motion namespace and a `Font` type-scale extension, both pulled 1:1 from
`src/app/globals.css`'s `--fk-*` custom properties and `.t-*` classes (dark
background, lime `#CDF564` / amber `#F5B851` accents, Archivo-style weights
via system font, JetBrains-Mono-style monospace for labels/prices). No stock
iOS system colors are used for brand surfaces.

**Currency formatting:** `money(_:)` in `Models/SeedData.swift` implements
Indian digit grouping by hand (₹1,40,000 style — groups of 2 after the first
3 digits), matching `en-IN` `toLocaleString` semantics used by the web
reference's `money()`.

**Zero-commission messaging:** copy throughout (Payments, Dashboard, hire
sheet, issue sheet, onboarding step 5) states clients pay freelancers
directly with "no platform fee" / "FreelanceKar never holds your money" /
"₹0 platform cut" — the words "escrow", "release funds", "held securely",
"platform fee on jobs", and "commission" do not appear anywhere in the app,
matching the web reference and the business rule.

## What's intentionally not built

Same exclusions as the web reference (see `/src`'s README "Not built yet"
section) — this is a UI + local/mock-data MVP:

- No real backend / network layer. All data is seeded in
  `Models/SeedData.swift` and mutated in-memory by `AppStore`.
- No real authentication. Phone/OTP in onboarding is simulated (`1234` is
  the accepted demo code); there's no session persistence across launches.
- No real payments integration. UPI/card/net-banking selection in the hire
  sheet and the Razorpay mentions in onboarding/payments are simulated
  copy and delays, not a real payment SDK.
- No real KYC. Aadhaar/PAN/selfie upload in onboarding just toggles a local
  boolean ("Tap each item to simulate an upload").
- No persistence. State resets on a fresh app launch (`AppStore` starts
  from `AppState()`'s defaults, same as the web reference's `useReducer`
  initial state).
- No push notifications — the in-app Notifications screen and the toast
  banner stand in for real delivery.

## Structure

```
ios/
  project.yml                      XcodeGen spec (source of truth for the .xcodeproj)
  FreelanceKar.xcodeproj/          Generated Xcode project (checked in)
  FreelanceKar/
    FreelanceKarApp.swift          App entry point + RootView (screen switch, sheets, tab bar/composer)
    DesignSystem/Theme.swift       Colors, radii, motion timings, type scale
    Models/Models.swift            Data model types (mirrors src/lib/types.ts)
    Models/SeedData.swift          Seed/mock data + money() formatter (mirrors src/lib/data.ts, format.ts)
    Store/AppState.swift           AppState struct + TIMING constants
    Store/AppStore.swift           ObservableObject with all action methods (mirrors src/lib/store.tsx)
    Store/Selectors.swift          Derived/filter/sort logic (mirrors src/lib/selectors.ts)
    Views/Components/              Reusable UI: buttons, cards, chips, sheet chrome, tab bar
    Views/Screens/                 14 screens
    Views/Sheets/                  6 bottom sheets
    Assets.xcassets/               App icon + accent color placeholders
```

## Notable deviations from the web reference

- **Layout engine, not pixel values.** The web reference is a fixed 390×844
  "device" frame with absolute Tailwind spacing. The iOS app uses SwiftUI's
  native layout (safe areas, `ScrollView`, adaptive `VStack`/`HStack`) at the
  same spacing scale, so it fills whatever device/simulator window it runs
  in rather than a hard-coded phone mockup.
- **Ambient background.** The web reference's animated dot-grid + drifting
  glow blobs (`fk-drift`/`fk-bloom` keyframes) are simplified to a static
  dark background (`FKBackground`) — a decorative-only simplification, not a
  behavioural one.
- **Flow/wrap layout.** Chip rows that wrap (suggestion chips, filter
  options, city chips) use a small custom `Layout` (`FKFlowLayout`) since
  SwiftUI has no built-in flow layout; behaviourally equivalent to the CSS
  `flex-wrap` rows in the reference.
- **Diagonal stripe placeholders.** The reference's repeating-gradient CSS
  stripe placeholder for photography is redrawn with a SwiftUI `Canvas`
  (`Stripe`), same visual pattern.
- **Icons.** Client/freelancer tab icons use SF Symbols in place of the
  reference's hand-drawn inline SVGs (`Views/Components/TabBar.swift`) —
  same meaning, native iconography instead of porting raw SVG paths.
