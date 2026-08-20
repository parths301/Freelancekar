"use client";

import { cityOf, filterCount, placeLabel, selectResults } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import type { Sort } from "@/lib/types";
import { BackButton } from "../common";
import { ScreenShell } from "../shell";
import { Chip, InlineButton, InlineOutlineButton, OutlineButton, PrimaryButton, Stripe } from "../ui";

const SORTS: [string, Sort][] = [
  ["Best match", "match"],
  ["Nearest", "near"],
  ["Under ₹15k", "price"],
  ["4.8★+", "rating"],
];

export function Results() {
  const s = useApp();
  const a = useActionsContext();
  const city = cityOf(s);
  const results = s.searching ? [] : selectResults(s);
  const active = filterCount(s);

  const countLabel = s.searching
    ? "Searching…"
    : results.length === 1
      ? "1 person"
      : `${results.length} people`;

  const emptyNote =
    active > 0
      ? `Your filters are narrow for ${placeLabel(s)}. Widen the budget or distance and try again.`
      : `Nobody in ${placeLabel(s)} matches “${s.searchLabel || "this"}” right now. Post the job and freelancers come to you.`;

  return (
    <ScreenShell>
      <div className="flex items-center gap-[11px] px-5 pt-4">
        <BackButton onClick={() => a.go("explore")} />
        <div className="flex flex-1 items-center gap-[9px] rounded-[12px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[13px] py-[11px]">
          <span className="text-[13px] text-[var(--fk-text-45)]" aria-hidden>
            ⌕
          </span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-[12.5px] text-[rgba(242,242,240,.8)]">
            {s.searchLabel || "Reel editor"}
          </span>
        </div>
        <button
          onClick={a.openFilters}
          aria-label={active ? `Filters, ${active} active` : "Filters"}
          className="relative cursor-pointer border-0 bg-transparent p-0 text-[15px]"
          style={{ color: active > 0 ? "var(--fk-lime)" : "var(--fk-text-60)" }}
        >
          ⚙
          {active > 0 ? (
            <span className="absolute -right-[6px] -top-1 rounded-full bg-[var(--fk-lime)] px-1 py-[1px] font-mono text-[8.5px] font-semibold text-[var(--fk-on-lime)]">
              {active}
            </span>
          ) : null}
        </button>
      </div>

      <div className="fk-scroll flex gap-2 overflow-x-auto px-5 pt-[14px]">
        {SORTS.map(([name, key]) => (
          <Chip key={key} on={s.sort === key} onClick={() => a.setSort(key)}>
            {name}
          </Chip>
        ))}
      </div>

      <div className="flex items-baseline justify-between px-5 pt-4">
        <span className="t-h4">
          {countLabel} in {city}
        </span>
        <span className="font-mono text-[11px] text-[var(--fk-text-40)]">
          {s.sort === "match" ? "MATCH SCORED" : "FILTERED"}
        </span>
      </div>

      {s.searching ? (
        <div className="flex flex-col gap-[11px] px-5 pb-[26px] pt-[14px]">
          {[1, 2, 3].map((k) => (
            <div
              key={k}
              className="fk-pulse flex gap-3 rounded-[18px] border border-[rgba(255,255,255,.06)] bg-[var(--fk-card)] p-[14px]"
            >
              <div className="h-12 w-12 flex-none rounded-[14px] bg-[var(--fk-skeleton-lg)]" />
              <div className="flex flex-1 flex-col gap-[9px] pt-[3px]">
                <div className="h-[11px] w-[58%] rounded-[4px] bg-[var(--fk-skeleton-lg)]" />
                <div className="h-[9px] w-[82%] rounded-[4px] bg-[var(--fk-skeleton-sm)]" />
                <div className="h-[9px] w-[44%] rounded-[4px] bg-[var(--fk-skeleton-sm)]" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="px-[30px] py-[30px] text-center">
          <div className="text-[24px] text-[var(--fk-text-28)]" aria-hidden>
            ⌕
          </div>
          <h3 className="t-screen-title m-0 mt-[14px]">Nobody matches this yet</h3>
          <p className="t-body-sm t-pretty m-0 mt-2 text-[var(--fk-text-50)]">{emptyNote}</p>
          <div className="mt-5 flex flex-col gap-[9px]">
            <PrimaryButton onClick={a.clearAll}>Clear filters</PrimaryButton>
            <OutlineButton onClick={() => a.go("explore")}>Post the job instead</OutlineButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[11px] px-5 pb-[26px] pt-[14px]">
          {results.map((p, i) => (
            <div
              key={p.id}
              className="rounded-[18px] border bg-[var(--fk-card)] p-[14px]"
              style={{ borderColor: i === 0 ? "var(--fk-lime)" : "var(--fk-line-08)" }}
            >
              <button
                onClick={() => a.openPro(p.id)}
                className="flex w-full cursor-pointer gap-3 border-0 bg-transparent p-0 text-left text-[var(--fk-text)]"
              >
                <Stripe
                  small
                  className="h-12 w-12 flex-none rounded-[14px] border border-[var(--fk-line-09)]"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-[6px]">
                    <span className="font-sans text-[14.5px] font-semibold">{p.name}</span>
                    {p.verified ? (
                      <span
                        className="text-[11px] text-[var(--fk-lime)]"
                        aria-label="Verified freelancer"
                      >
                        ✔
                      </span>
                    ) : null}
                    <span
                      className="ml-auto font-mono text-[11px] font-semibold"
                      style={{ color: i === 0 ? "var(--fk-lime)" : "var(--fk-text-55)" }}
                    >
                      {p.match}%
                    </span>
                  </div>
                  <span className="t-meta text-[var(--fk-text-55)]">{p.services}</span>
                  <div className="flex items-center gap-[9px] font-sans text-[11px] font-medium">
                    <span className="text-[var(--fk-amber)]">★ {p.rating}</span>
                    <span className="text-[var(--fk-text-40)]">{p.jobs} jobs</span>
                    <span className="text-[var(--fk-text-40)]">{p.distance}</span>
                  </div>
                </div>
              </button>

              <div className="mt-3 flex items-center justify-between border-t border-[var(--fk-line-07)] pt-[11px]">
                <div className="flex flex-col">
                  <span className="t-card-title">{p.price}</span>
                  <span className="font-sans text-[10.5px] text-[var(--fk-text-45)]">{p.note}</span>
                </div>
                <div className="flex gap-2">
                  <InlineOutlineButton onClick={() => a.messageFromResults(p)}>
                    Message
                  </InlineOutlineButton>
                  <InlineButton className="px-[14px] py-[9px]" onClick={() => a.openHire(p.id)}>
                    Hire
                  </InlineButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScreenShell>
  );
}
