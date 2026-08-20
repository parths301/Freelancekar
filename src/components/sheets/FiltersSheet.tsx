"use client";

import { useActionsContext, useApp } from "@/lib/store";
import type { FilterSet } from "@/lib/types";
import { Sheet } from "../shell";
import { Chip } from "../ui";

const GROUPS: { label: string; key: keyof FilterSet; opts: [string, string][] }[] = [
  {
    label: "MAX BUDGET",
    key: "budget",
    opts: [
      ["Any", "any"],
      ["Under ₹2k", "2000"],
      ["Under ₹10k", "10000"],
      ["Under ₹25k", "25000"],
    ],
  },
  {
    label: "DISTANCE",
    key: "dist",
    opts: [
      ["Any", "any"],
      ["Within 3 km", "3"],
      ["Within 5 km", "5"],
      ["Within 10 km", "10"],
    ],
  },
  {
    label: "WORK MODE",
    key: "mode",
    opts: [
      ["Any", "any"],
      ["On-site", "onsite"],
      ["Remote ok", "remote"],
    ],
  },
  {
    label: "LANGUAGE",
    key: "lang",
    opts: [
      ["Any", "any"],
      ["Hindi", "Hindi"],
      ["Marathi", "Marathi"],
      ["English", "English"],
    ],
  },
];

export function FiltersSheet() {
  const s = useApp();
  const a = useActionsContext();

  return (
    <Sheet open={s.filtersOpen} onClose={a.closeFilters} label="Filters" maxHeight="88%">
      <div className="px-5 pb-[22px] pt-[18px]">
        <div className="flex items-center justify-between">
          <h3 className="t-sheet-title m-0">Filters</h3>
          <button
            onClick={a.closeFilters}
            aria-label="Close"
            className="cursor-pointer border-0 bg-transparent text-[16px] text-[var(--fk-text-50)]"
          >
            ✕
          </button>
        </div>

        {GROUPS.map((g) => (
          <div key={g.key} className="mt-[18px] flex flex-col gap-[9px]">
            <span className="t-mono-label text-[var(--fk-text-45)]">{g.label}</span>
            <div className="flex flex-wrap gap-[7px]">
              {g.opts.map(([name, value]) => (
                <Chip
                  key={value}
                  on={s.filters[g.key] === value}
                  onClick={() => a.setFilter(g.key, value)}
                  className="py-[9px]"
                >
                  {name}
                </Chip>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-[18px] flex items-center justify-between gap-3 rounded-[14px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] px-[14px] py-[13px]">
          <div className="flex flex-col gap-[2px]">
            <span className="font-sans text-[13px] font-semibold">Available this week</span>
            <span className="font-sans text-[11px] text-[var(--fk-text-50)]">
              Only show open calendars
            </span>
          </div>
          <button
            onClick={a.toggleAvailNow}
            role="switch"
            aria-checked={s.filters.availNow}
            aria-label="Available this week"
            className="relative h-[26px] w-[44px] flex-none cursor-pointer rounded-full border p-0"
            style={{
              background: s.filters.availNow ? "var(--fk-lime)" : "var(--fk-nested)",
              borderColor: s.filters.availNow ? "var(--fk-lime)" : "var(--fk-line-14)",
            }}
          >
            <span
              className="absolute top-[2px] h-5 w-5 rounded-full transition-[left] duration-200 ease-linear"
              style={{
                left: s.filters.availNow ? 20 : 2,
                background: s.filters.availNow ? "var(--fk-on-lime)" : "var(--fk-text-50)",
              }}
            />
          </button>
        </div>

        <div className="mt-5 flex gap-[9px]">
          <button
            onClick={a.resetFilters}
            className="flex-1 cursor-pointer rounded-[12px] border border-[var(--fk-line-14)] bg-transparent p-[14px] font-sans text-[13px] font-medium text-[rgba(242,242,240,.7)]"
          >
            Reset
          </button>
          <button
            onClick={a.applyFilters}
            className="flex-[1.5] cursor-pointer rounded-[12px] border-0 bg-[var(--fk-lime)] p-[14px] font-sans text-[13.5px] font-semibold text-[var(--fk-on-lime)]"
          >
            Show results
          </button>
        </div>
      </div>
    </Sheet>
  );
}
