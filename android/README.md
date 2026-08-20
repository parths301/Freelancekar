# FreelanceKar — Android

Native Android MVP for FreelanceKar, a local freelancer marketplace for tier-2 Indian cities
(launch city: Nagpur; also Indore, Jabalpur, Nashik). This is a Kotlin/Jetpack Compose port of
the Next.js prototype at the repo root (`../src/`), mirroring its data model and behaviour
screen-for-screen.

**FreelanceKar takes zero platform cut.** Clients pay freelancers directly by UPI or cash — the
platform never touches or holds job money. Revenue is the freelancer's subscription (Starter
₹299/mo, Pro ₹799/mo, billed via Razorpay in the real product). Any copy implying the platform
holds or takes a cut of job money is a bug.

## Building

### Android Studio

Open the `android/` folder as a project (Android Studio will detect the Gradle wrapper) and run
the `app` configuration on an emulator or device (minSdk 26).

### Command line

```bash
cd android
./gradlew assembleDebug
```

The debug APK is written to `app/build/outputs/apk/debug/app-debug.apk`.

Requirements:
- JDK 17+ (a `JAVA_HOME` pointing at one; the project targets Java 17 bytecode)
- Android SDK with `compileSdk 35` / `build-tools` installed, and `local.properties` pointing
  `sdk.dir` at it (or the `ANDROID_HOME` environment variable set)

The Gradle wrapper (`gradlew`, `gradlew.bat`, `gradle/wrapper/`) is checked in, pinned to Gradle
8.9, which is compatible with the Android Gradle Plugin 8.6.0 pinned in the root `build.gradle.kts`.
No system-wide Gradle install is required as long as network access is available to download the
Gradle 8.9 distribution on first run (it is cached under `~/.gradle/wrapper` afterwards).

## What's implemented

- **Data layer** (`app/src/main/java/com/freelancekar/app/data/`) — `Models.kt`, `SeedData.kt`,
  `AppState.kt`, `Selectors.kt`, `Format.kt` mirror `src/lib/types.ts`, `src/lib/data.ts`, and
  `src/lib/selectors.ts` field-for-field and value-for-value (same seed freelancers, cities,
  pricing, copy, filter/sort rules, Indian-digit-grouping currency formatting).
- **State/actions** (`ui/AppViewModel.kt`) — a single `StateFlow<AppState>` plus one action per
  user event, mirroring `src/lib/store.tsx`'s reducer + action map, including all simulated async
  timings (`Timing.kt` mirrors the `TIMING` constants: search debounce, payment confirm, booking
  accept/deliver clock, chat reply delay, support reply delay, toast duration, profile-live delay,
  subscribe delay).
- **Navigation & chrome** (`ui/AppRoot.kt`, `MainActivity.kt`) — single-Activity Compose app; a
  `when (state.screen)` router swaps the 14 screens, and the bottom bar swaps between the client
  tab set (Home / Explore / Chats / You) and the freelancer tab set (Dashboard / Gigs / Chats /
  Profile) based on `freelancerMode`, hiding entirely on detail/thread/order/onboarding screens.
- **All 14 screens** (`ui/screens/`): Home, Explore, Results, Profile (client viewing a
  freelancer's public profile — `ProfileScreen.kt`), Chats, Thread, Order, Notifications, You,
  Onboarding (freelancer signup, 5 steps), Dashboard, Gigs, Payments, FreelancerProfile
  (freelancer's own account/profile screen — `FreelancerProfileScreen.kt`).
- **All 6 bottom sheets** (`ui/sheets/`): Hire (multi-step hire → pay → success/failure), City
  picker, Filters, Review, Issue/dispute, Quote (freelancer sending a quote to a job request).
- **Theme** (`ui/theme/`) — colors and type scale ported from `src/app/globals.css` design tokens.

Both the client experience (discover → hire → pay directly → chat → order → review) and the
freelancer experience (onboarding with mock OTP/KYC → dashboard → quote requests → mark gigs
delivered → track payments received) are fully wired end to end against the same in-memory mock
state, with no backend calls.

## What's intentionally not built

Same exclusions as the web reference (`../README.md`'s "Not built yet" section):

- Real backend, auth, payments, and KYC — everything here runs on in-memory mock state seeded at
  app launch (`SeedData.kt`); "OTP" is a hardcoded `1234`, KYC is a set of toggles, payment is a
  timed simulation, not a Razorpay/UPI integration.
- The marketing/landing pages (homepage, how it works, pricing, join-as-freelancer, city landing)
  — this is the in-app product experience only.
- Real imagery — avatars, covers, and portfolio tiles use the same diagonal-stripe placeholder as
  the web prototype.
- Real icons — Unicode glyphs (`⌕ ◉ ▾ ★ ✔ …`) stand in for a proper icon set.
- Push notifications, deep links, offline persistence, and any production Android concerns
  (ProGuard/R8 rules beyond defaults, app signing for release, Play Store metadata).

## Verification performed

- Every Kotlin file was read and checked against its `src/lib/*` or `src/components/**/*.tsx`
  counterpart in the Next.js reference for state wiring, action parity, and copy.
- `./gradlew assembleDebug` (via the generated wrapper / equivalent system Gradle 9.7.0) builds
  successfully against the local Android SDK — verified in this environment, producing
  `app/build/outputs/apk/debug/app-debug.apk`.
- Repo-wide grep for banned zero-commission/escrow-style phrasing turned up nothing after fixes.
