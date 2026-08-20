"use client";

import { selectCityRows } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { Sheet } from "../shell";

export function CitySheet() {
  const s = useApp();
  const a = useActionsContext();
  const rows = selectCityRows(s);

  return (
    <Sheet open={s.cityOpen} onClose={a.closeCity} label="Choose a location" maxHeight="82%">
      <div className="flex max-h-[82vh] flex-col">
        <div className="flex-none px-5 pt-[18px]">
          <div className="flex items-center justify-between">
            <h3 className="t-sheet-title m-0">Where do you need work done?</h3>
            <button
              onClick={a.closeCity}
              aria-label="Close"
              className="cursor-pointer border-0 bg-transparent text-[16px] text-[var(--fk-text-50)]"
            >
              ✕
            </button>
          </div>

          <div className="mt-[14px] flex items-center gap-[10px] rounded-[13px] border border-[var(--fk-line-10)] bg-[var(--fk-nested)] px-[13px] py-[11px]">
            <span className="text-[13px] text-[var(--fk-text-45)]" aria-hidden>
              ⌕
            </span>
            <input
              value={s.citySearch}
              onChange={(e) => a.setCitySearch(e.target.value)}
              placeholder="Locality or city — e.g. Dharampeth"
              aria-label="Search locality or city"
              className="flex-1 border-0 bg-transparent font-sans text-[13.5px] text-[var(--fk-text)] outline-none"
            />
          </div>

          <button
            onClick={a.useCurrentLocation}
            className="mt-[9px] flex w-full cursor-pointer items-center gap-[9px] rounded-[12px] border border-dashed border-[var(--fk-lime-bd-35)] bg-transparent px-[13px] py-[11px] text-left font-sans text-[12.5px] font-semibold text-[var(--fk-lime)]"
          >
            <span className="text-[12px]" aria-hidden>
              ◉
            </span>
            <span>Use my current location</span>
          </button>
        </div>

        <div className="fk-scroll flex flex-1 flex-col gap-[7px] overflow-y-auto px-5 pb-[22px] pt-[14px]">
          {rows.map((r) => (
            <button
              key={r.key}
              onClick={() => a.pickPlace(r.city, r.locality)}
              aria-pressed={r.on}
              className="flex cursor-pointer items-center gap-[11px] rounded-[13px] border bg-[var(--fk-nested)] px-[13px] py-3 text-left text-[var(--fk-text)]"
              style={{ borderColor: r.on ? "var(--fk-lime)" : "var(--fk-line-09)" }}
            >
              <span
                className="flex-none text-[12px]"
                style={{ color: r.on ? "var(--fk-lime)" : "var(--fk-text-40)" }}
                aria-hidden
              >
                {r.icon}
              </span>
              <div className="flex flex-1 flex-col gap-[2px]">
                <span className="font-sans text-[13px] font-semibold">{r.name}</span>
                <span className="font-sans text-[10.5px] text-[var(--fk-text-45)]">{r.sub}</span>
              </div>
              <span className="t-mono-sm flex-none text-[var(--fk-text-35)]">{r.count}</span>
            </button>
          ))}

          {rows.length === 0 ? (
            <div className="px-[10px] py-[26px] text-center">
              <p className="t-body-sm m-0 text-[var(--fk-text-45)]">
                No match for “{s.citySearch}”. FreelanceKar is live in Nagpur, Indore, Jabalpur and
                Nashik — more cities each month.
              </p>
              <button
                onClick={() => a.setCitySearch("")}
                className="mt-[14px] cursor-pointer rounded-[11px] border border-[var(--fk-lime-bd-35)] bg-transparent px-[14px] py-[10px] font-sans text-[12px] font-semibold text-[var(--fk-lime)]"
              >
                Show all localities
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Sheet>
  );
}
