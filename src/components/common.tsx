"use client";

import { useActionsContext, useApp } from "@/lib/store";
import { placeLabel, unreadCount } from "@/lib/selectors";
import { BellIcon } from "./icons";
import { cx } from "./ui";

export function LocationPill({ compact }: { compact?: boolean }) {
  const s = useApp();
  const a = useActionsContext();
  return (
    <button
      onClick={a.openCity}
      aria-label={`Change location. Currently ${placeLabel(s)}`}
      className={cx(
        "flex cursor-pointer items-center rounded-full border border-[var(--fk-line-09)] bg-[var(--fk-card)] text-[var(--fk-text)]",
        compact ? "gap-2 px-3 py-[7px]" : "gap-[7px] px-[13px] py-[9px]",
      )}
    >
      <span className="text-[10px] text-[var(--fk-lime)]" aria-hidden>
        ◉
      </span>
      <span className={compact ? "font-sans text-[12px] font-medium" : "font-sans text-[13px] font-semibold"}>
        {placeLabel(s)}
      </span>
      <span className="text-[10px] text-[var(--fk-text-45)]" aria-hidden>
        ▾
      </span>
    </button>
  );
}

export function BellButton({ size = 38 }: { size?: number }) {
  const s = useApp();
  const a = useActionsContext();
  const count = unreadCount(s);
  return (
    <button
      onClick={a.openNotifs}
      aria-label={count ? `${count} unread notifications` : "Notifications"}
      className="relative flex cursor-pointer items-center justify-center rounded-full border border-[var(--fk-line-09)] bg-[var(--fk-card)] p-0 text-[var(--fk-text)]"
      style={{ width: size, height: size }}
    >
      <BellIcon size={size >= 38 ? 19 : 18} />
      {count > 0 ? (
        <span
          className="absolute -right-[2px] -top-[2px] box-border min-w-[16px] rounded-full border-2 border-[var(--fk-bg)] px-1 py-[2px] font-mono text-[9px] font-semibold text-[var(--fk-on-lime)]"
          style={{ background: "var(--fk-lime)" }}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

export function BackButton({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="cursor-pointer border-0 bg-transparent p-0 text-[16px] text-[var(--fk-text-60)]"
    >
      ←
    </button>
  );
}

/** Uppercase mono status chip — colour plus label, never colour alone. */
export function StatusText({ label, color }: { label: string; color: string }) {
  return (
    <span className="t-mono-sm" style={{ color }}>
      {label}
    </span>
  );
}
