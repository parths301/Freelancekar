"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const DISMISS_KEY = "fk_app_banner_dismissed";

type Platform = "android" | "ios" | "other";

function noSubscribe() {
  return () => {};
}

function getDismissedSnapshot(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function getDismissedServerSnapshot(): boolean {
  return false;
}

function getPlatformSnapshot(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "other";
}

function getPlatformServerSnapshot(): Platform {
  return "other";
}

export default function AppDownloadBanner() {
  const dismissed = useSyncExternalStore(
    noSubscribe,
    getDismissedSnapshot,
    getDismissedServerSnapshot,
  );
  const platform = useSyncExternalStore(
    noSubscribe,
    getPlatformSnapshot,
    getPlatformServerSnapshot,
  );
  const [closed, setClosed] = useState(false);

  if (dismissed || closed) return null;

  const label =
    platform === "android"
      ? "Get it on Google Play"
      : platform === "ios"
        ? "Get it on the App Store"
        : "Get the app";

  return (
    <div className="flex items-center gap-3 border-b border-fk-line-08 bg-fk-card px-4 py-2.5 md:hidden">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-fk-lime text-[13px] font-bold text-fk-on-lime">
        FK
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] font-semibold text-fk-text">
          FreelanceKar app
        </p>
        <p className="truncate text-[11px] text-fk-text-55">
          Faster booking, chat &amp; order tracking
        </p>
      </div>
      <Link
        href="/get-app"
        className="shrink-0 rounded-[10px] bg-fk-lime px-3.5 py-2 text-[12px] font-semibold text-fk-on-lime"
      >
        {label}
      </Link>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          try {
            localStorage.setItem(DISMISS_KEY, "1");
          } catch {
            // localStorage unavailable — dismissal just won't persist
          }
          setClosed(true);
        }}
        className="shrink-0 text-[15px] text-fk-text-45"
      >
        ✕
      </button>
    </div>
  );
}
