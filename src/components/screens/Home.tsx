"use client";

import { CATS, CITY_COUNTS, PROS } from "@/lib/data";
import { cityOf } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { BellButton, LocationPill } from "../common";
import { ScreenShell } from "../shell";
import { InlineButton, SectionTitle, Stripe } from "../ui";

export function Home() {
  const s = useApp();
  const a = useActionsContext();
  const city = cityOf(s);

  return (
    <ScreenShell>
      <div className="flex items-center justify-between gap-3 px-5 pt-4">
        <span className="font-sans text-[18px] font-bold tracking-[-0.025em] text-[var(--fk-lime)]">
          FreelanceKar
        </span>
        <div className="flex items-center gap-[9px]">
          <BellButton />
          <LocationPill />
        </div>
      </div>

      <div className="px-5 pt-[18px]">
        <button
          onClick={() => a.go("explore")}
          className="flex w-full cursor-pointer items-center gap-[10px] rounded-[14px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[14px] py-[13px] text-left"
        >
          <span className="text-[14px] text-[var(--fk-text-45)]" aria-hidden>
            ⌕
          </span>
          <span className="font-sans text-[14px] text-[var(--fk-text-42)]">
            Search “reel editor”, “GST filing”…
          </span>
        </button>
      </div>

      <div className="px-5 pt-6">
        <h2 className="t-h2 m-0 mb-[3px]">What do you need done?</h2>
        <p className="m-0 mb-[14px] font-sans text-[13px] leading-[1.4] text-[var(--fk-text-50)]">
          {CITY_COUNTS[city]} verified freelancers in {city}
        </p>

        <div className="grid grid-cols-3 gap-[9px]">
          {CATS.map(([icon, name, query]) => (
            <button
              key={name}
              onClick={() => a.search(query)}
              className="flex min-h-[78px] cursor-pointer flex-col gap-[9px] rounded-[14px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[10px] py-[13px] text-left text-[var(--fk-text)]"
            >
              <span className="text-[17px]" aria-hidden>
                {icon}
              </span>
              <span className="font-sans text-[11.5px] font-medium leading-[1.25]">{name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => a.go("explore")}
          className="mt-[10px] w-full cursor-pointer border-0 bg-transparent p-[6px] font-sans text-[12px] font-medium text-[var(--fk-lime)]"
        >
          All 24 categories →
        </button>
      </div>

      <div className="pt-[22px]">
        <SectionTitle
          className="px-5"
          title="Top rated near you"
          right={
            <button
              onClick={() => a.go("explore")}
              className="cursor-pointer border-0 bg-transparent p-0 font-sans text-[12px] text-[var(--fk-text-45)]"
            >
              See all
            </button>
          }
        />
        <div className="fk-scroll flex gap-3 overflow-x-auto px-5 pt-[14px]">
          {PROS.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => a.openPro(p.id)}
              className="w-[150px] flex-none cursor-pointer overflow-hidden rounded-[16px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-0 text-left text-[var(--fk-text)]"
            >
              <Stripe className="h-[92px]" />
              <div className="flex flex-col gap-[5px] px-[11px] pb-3 pt-[10px]">
                <span className="font-sans text-[13px] font-semibold">{p.name}</span>
                <span className="font-sans text-[11px] text-[var(--fk-text-50)]">{p.headline}</span>
                <span className="font-sans text-[11px] font-medium text-[var(--fk-amber)]">
                  ★ {p.rating} <span className="text-[var(--fk-text-40)]">({p.jobs})</span>
                </span>
                <span className="font-sans text-[12px] font-semibold">{p.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-[26px] pt-[22px]">
        <div className="flex items-center justify-between gap-3 rounded-[16px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-4">
          <div className="flex flex-col gap-[3px]">
            <span className="t-h4">Can’t find it? Post a job</span>
            <span className="t-meta text-[var(--fk-text-50)]">Get quotes in under an hour</span>
          </div>
          <InlineButton onClick={() => a.go("explore")}>Post</InlineButton>
        </div>
      </div>
    </ScreenShell>
  );
}
