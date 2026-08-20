"use client";

import { SUGGESTION_CHIPS } from "@/lib/data";
import { cityOf } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { LocationPill } from "../common";
import { ScreenShell } from "../shell";
import { InlineButton } from "../ui";

const HOW_IT_WORKS = ["Describe work", "Compare quotes", "Pay them directly"];

export function Explore() {
  const s = useApp();
  const a = useActionsContext();
  const city = cityOf(s);

  const recents = [
    { label: "Reel editor under ₹1,500", meta: `${city} · within 10 km`, count: "28" },
    { label: "Product photographer", meta: `${city} · available this week`, count: "64" },
  ];

  return (
    <ScreenShell>
      <div className="flex items-center justify-between px-5 pt-[18px]">
        <h1 className="t-h1 m-0">Explore</h1>
        <LocationPill compact />
      </div>

      <div className="px-5 pt-[18px]">
        <div className="flex items-center gap-[10px] rounded-[14px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[13px] py-[11px]">
          <span className="text-[14px] text-[var(--fk-text-45)]" aria-hidden>
            ⌕
          </span>
          <input
            value={s.query}
            onChange={(e) => a.setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && s.query.trim()) a.search(s.query.trim());
            }}
            placeholder="Search skills, services or people"
            aria-label="Search skills, services or people"
            className="flex-1 border-0 bg-transparent py-[2px] font-sans text-[14px] text-[var(--fk-text)] outline-none"
          />
          {s.query.trim().length > 0 ? (
            <button
              onClick={a.runSearch}
              className="cursor-pointer rounded-[8px] border-0 bg-[var(--fk-lime)] px-[11px] py-[7px] font-sans text-[11px] font-semibold text-[var(--fk-on-lime)]"
            >
              Go
            </button>
          ) : null}
        </div>
      </div>

      <div className="px-5 pt-[26px]">
        <h2 className="t-hero m-0">
          Tell us the work.
          <span className="text-[var(--fk-text-40)]"> We’ll find the person.</span>
        </h2>
      </div>

      <div className="px-5 pt-[18px]">
        <div className="rounded-[18px] border border-[var(--fk-line-10)] bg-[var(--fk-card)] p-[14px]">
          <textarea
            value={s.brief}
            onChange={(e) => a.setBrief(e.target.value)}
            placeholder="Need 8 Instagram reels a month for my café in Dharampeth…"
            aria-label="Describe the work"
            className="box-border min-h-[62px] w-full resize-none border-0 bg-transparent font-sans text-[14px] leading-[1.5] text-[var(--fk-text)] outline-none"
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-[11px] text-[14px] text-[var(--fk-text-45)]" aria-hidden>
              <span>◉</span>
              <span>▤</span>
              <span>₹</span>
            </div>
            <InlineButton onClick={a.runSearch} className="px-4">
              Find people
            </InlineButton>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-5 pt-4">
        {SUGGESTION_CHIPS.map((name) => (
          <button
            key={name}
            onClick={() => a.search(name)}
            className="cursor-pointer rounded-full border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-3 py-2 font-sans text-[12px] font-medium text-[rgba(242,242,240,.75)]"
          >
            {name}
          </button>
        ))}
      </div>

      <div className="px-5 pt-[26px]">
        <h3 className="t-h4 m-0 mb-[11px]">Recent searches</h3>
        <div className="flex flex-col gap-[9px]">
          {recents.map((r) => (
            <button
              key={r.label}
              onClick={() => a.search(r.label)}
              className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[14px] py-3 text-left text-[var(--fk-text)]"
            >
              <span className="text-[13px] text-[var(--fk-text-40)]" aria-hidden>
                ↺
              </span>
              <div className="flex flex-1 flex-col gap-[2px]">
                <span className="font-sans text-[13px] font-semibold">{r.label}</span>
                <span className="font-sans text-[10.5px] text-[var(--fk-text-45)]">{r.meta}</span>
              </div>
              <span className="t-mono text-[var(--fk-text-40)]">{r.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-[26px] pt-6">
        <h3 className="t-h4 m-0 mb-[11px]">How hiring works</h3>
        <div className="grid grid-cols-3 gap-[9px] text-center">
          {HOW_IT_WORKS.map((label, i) => (
            <div
              key={label}
              className="flex flex-col gap-1 rounded-[14px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-2 py-[13px]"
            >
              <span className="font-sans text-[17px] font-semibold">{i + 1}</span>
              <span className="font-sans text-[10.5px] leading-[1.3] text-[var(--fk-text-50)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
