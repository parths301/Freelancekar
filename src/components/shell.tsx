"use client";

import type { ReactNode } from "react";
import { useApp, useActionsContext } from "@/lib/store";
import type { Screen } from "@/lib/types";
import {
  ChatsIcon,
  DashboardIcon,
  ExploreIcon,
  GigsIcon,
  HomeIcon,
  PersonIcon,
} from "./icons";
import { cx } from "./ui";

/** Ambient dot grid + glow blobs, behind everything, never interactive. */
export function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="fk-drift absolute -left-1/4 -top-1/4 h-[150%] w-[150%]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(242,242,240,.15) 1px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="fk-bloom absolute h-[280px] w-[280px] rounded-full"
        style={{
          left: -50,
          top: 110,
          background: "radial-gradient(circle,rgba(242,242,240,.09),transparent 70%)",
        }}
      />
      <div
        className="fk-bloom absolute h-[320px] w-[320px] rounded-full"
        style={{
          right: -70,
          top: 420,
          animationDuration: "9.5s",
          animationDelay: "1.4s",
          background: "radial-gradient(circle,rgba(242,242,240,.08),transparent 70%)",
        }}
      />
      <div
        className="fk-bloom absolute h-[260px] w-[260px] rounded-full"
        style={{
          left: 40,
          top: 640,
          animationDuration: "8.2s",
          animationDelay: ".7s",
          background: "radial-gradient(circle,rgba(242,242,240,.07),transparent 70%)",
        }}
      />
    </div>
  );
}

/** Prototype chrome only — a real build uses the system status bar. */
export function StatusBar() {
  return (
    <div className="relative z-[1] flex flex-none justify-between px-[22px] pt-[14px] font-mono text-[11px] font-medium text-[var(--fk-text-50)]">
      <span>9:41</span>
      <span>5G ▮</span>
    </div>
  );
}

const CLIENT_TABS: [ReactNode, string, Screen][] = [
  [<HomeIcon key="h" />, "Home", "home"],
  [<ExploreIcon key="e" />, "Explore", "explore"],
  [<ChatsIcon key="c" />, "Chats", "chats"],
  [<PersonIcon key="y" />, "You", "you"],
];

const FREELANCER_TABS: [ReactNode, string, Screen][] = [
  [<DashboardIcon key="d" />, "Dashboard", "fdash"],
  [<GigsIcon key="g" />, "Gigs", "fgigs"],
  [<ChatsIcon key="c" />, "Chats", "chats"],
  [<PersonIcon key="p" />, "Profile", "fme"],
];

const HIDDEN_TAB_SCREENS: Screen[] = ["profile", "fonb", "thread", "order", "notifs"];

export function TabBar() {
  const s = useApp();
  const a = useActionsContext();
  if (HIDDEN_TAB_SCREENS.includes(s.screen)) return null;

  const freelancer =
    (["fdash", "fgigs", "fme", "fearn"] as Screen[]).includes(s.screen) ||
    (s.screen === "chats" && s.freelancerMode);
  const tabs = freelancer ? FREELANCER_TABS : CLIENT_TABS;

  return (
    <nav
      className="relative z-[1] grid flex-none grid-cols-4 border-t border-[var(--fk-line-07)] bg-[var(--fk-bar)] px-[18px] pb-5 pt-[10px]"
      aria-label={freelancer ? "Freelancer sections" : "Client sections"}
    >
      {tabs.map(([icon, label, key]) => {
        const active = s.screen === key;
        return (
          <button
            key={label}
            onClick={() => a.go(key)}
            aria-current={active ? "page" : undefined}
            className="flex cursor-pointer flex-col items-center gap-1 border-0 bg-transparent p-0"
            style={{ color: active ? "var(--fk-lime)" : "var(--fk-text-45)" }}
          >
            {icon}
            <span className="t-tab">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function Toast() {
  const s = useApp();
  if (!s.toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fk-in-short absolute bottom-[96px] left-5 right-5 z-[6] rounded-[13px] px-[14px] py-[12px] font-sans text-[12.5px] font-medium"
      style={{ background: "var(--fk-toast)", boxShadow: "var(--fk-shadow-toast)" }}
    >
      {s.toast}
    </div>
  );
}

/** Bottom sheet: scrim + sheet surface, both animated, internal scroll. */
export function Sheet({
  open,
  onClose,
  children,
  label,
  maxHeight = "86%",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  maxHeight?: string;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-[5]" role="dialog" aria-modal="true" aria-label={label}>
      <button
        aria-label="Close"
        onClick={onClose}
        className="fk-fade absolute inset-0 cursor-default border-0 p-0"
        style={{ background: "var(--fk-scrim)" }}
      />
      <div
        className="fk-sheet-anim fk-scroll absolute bottom-0 left-0 right-0 overflow-y-auto rounded-t-[26px] border-t border-[var(--fk-line-10)] bg-[var(--fk-sheet)]"
        style={{ maxHeight }}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetHead({
  title,
  onClose,
  onBack,
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-5 pt-[18px]">
      {onBack ? (
        <button
          onClick={onBack}
          aria-label="Back"
          className="cursor-pointer border-0 bg-transparent p-0 text-[16px] text-[var(--fk-text-60)]"
        >
          ←
        </button>
      ) : null}
      <h2 className="t-sheet-title m-0">{title}</h2>
      <button
        onClick={onClose}
        aria-label="Close"
        className="ml-auto cursor-pointer border-0 bg-transparent p-0 text-[15px] text-[var(--fk-text-45)]"
      >
        ✕
      </button>
    </div>
  );
}

/** Screen enter animation wrapper. */
export function ScreenShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("fk-in", className)}>{children}</div>;
}
