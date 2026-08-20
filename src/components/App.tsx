"use client";

import { useEffect, useRef } from "react";
import { AppProvider, useApp, useScrollRef } from "@/lib/store";
import { Background, StatusBar, TabBar, Toast } from "./shell";
import { Chats } from "./screens/Chats";
import { Dashboard } from "./screens/Dashboard";
import { Explore } from "./screens/Explore";
import { FreelancerProfile } from "./screens/FreelancerProfile";
import { Gigs } from "./screens/Gigs";
import { Home } from "./screens/Home";
import { Notifications } from "./screens/Notifications";
import { Onboarding } from "./screens/Onboarding";
import { Order } from "./screens/Order";
import { Payments } from "./screens/Payments";
import { Profile, ProfileActionBar } from "./screens/Profile";
import { Results } from "./screens/Results";
import { Composer, Thread } from "./screens/Thread";
import { You } from "./screens/You";
import { CitySheet } from "./sheets/CitySheet";
import { FiltersSheet } from "./sheets/FiltersSheet";
import { HireSheet } from "./sheets/HireSheet";
import { IssueSheet } from "./sheets/IssueSheet";
import { QuoteSheet } from "./sheets/QuoteSheet";
import { ReviewSheet } from "./sheets/ReviewSheet";

function CurrentScreen() {
  const s = useApp();
  switch (s.screen) {
    case "home":
      return <Home />;
    case "explore":
      return <Explore />;
    case "results":
      return <Results />;
    case "profile":
      return <Profile />;
    case "chats":
      return <Chats />;
    case "thread":
      return <Thread />;
    case "order":
      return <Order />;
    case "notifs":
      return <Notifications />;
    case "you":
      return <You />;
    case "fonb":
      return <Onboarding />;
    case "fdash":
      return <Dashboard />;
    case "fearn":
      return <Payments />;
    case "fgigs":
      return <Gigs />;
    case "fme":
      return <FreelancerProfile />;
  }
}

/** The bottom bar swaps by screen: composer in a thread, action bar on a profile. */
function BottomBar() {
  const s = useApp();
  if (s.screen === "thread") return <Composer />;
  if (s.screen === "profile") return <ProfileActionBar />;
  return <TabBar />;
}

function Device() {
  const scrollRef = useScrollRef();
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current = {
      top: () => {
        if (el.current) el.current.scrollTop = 0;
      },
      bottom: () => {
        if (el.current) el.current.scrollTop = el.current.scrollHeight;
      },
    };
  }, [scrollRef]);

  return (
    <div
      className="relative flex h-[844px] w-[390px] flex-col overflow-hidden rounded-[38px] bg-[var(--fk-bg)] text-[var(--fk-text)]"
      style={{ boxShadow: "var(--fk-shadow-device)" }}
    >
      <Background />
      <StatusBar />

      <main ref={el} className="fk-scroll relative z-[1] flex-1 overflow-y-auto overflow-x-hidden">
        <CurrentScreen />
      </main>

      <BottomBar />

      <HireSheet />
      <CitySheet />
      <FiltersSheet />
      <ReviewSheet />
      <IssueSheet />
      <QuoteSheet />
      <Toast />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <div className="flex flex-1 items-center justify-center p-7">
        <Device />
      </div>
    </AppProvider>
  );
}
