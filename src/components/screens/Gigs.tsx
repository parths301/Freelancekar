"use client";

import { useActionsContext, useApp } from "@/lib/store";
import { ScreenShell } from "../shell";
import { Stripe } from "../ui";

export function Gigs() {
  const s = useApp();
  const a = useActionsContext();

  return (
    <ScreenShell className="px-5 pb-[26px] pt-[18px]">
      <h1 className="t-h1 m-0 mb-[6px]">Gigs</h1>
      <p className="m-0 mb-4 font-sans text-[12.5px] text-[var(--fk-text-50)]">
        {s.fGigs.length} active · {s.quotesSent} quotes awaiting reply
      </p>

      {s.fGigs.length === 0 ? (
        <div className="mt-10 px-[22px] text-center">
          <div className="text-[22px] text-[var(--fk-text-28)]" aria-hidden>
            ◫
          </div>
          <p className="t-body t-pretty m-0 mt-3 text-[var(--fk-text-45)]">
            No gigs running. Quote on requests from the dashboard — accepted quotes turn into gigs
            here.
          </p>
          <button
            onClick={() => a.go("fdash")}
            className="mt-4 cursor-pointer rounded-[11px] border-0 bg-[var(--fk-lime)] px-4 py-3 font-sans text-[12.5px] font-semibold text-[var(--fk-on-lime)]"
          >
            See new requests
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-[10px]">
          {s.fGigs.map((g) => {
            const done = g.status === "DELIVERED";
            return (
              <div
                key={g.id}
                className="rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-[14px]"
              >
                <div className="flex items-center gap-[11px]">
                  <Stripe small className="h-9 w-9 flex-none rounded-[11px]" />
                  <div className="flex flex-1 flex-col gap-[2px]">
                    <span className="t-card-title">{g.client}</span>
                    <span className="font-sans text-[11px] text-[var(--fk-text-50)]">
                      {g.service}
                    </span>
                  </div>
                  <span className="font-sans text-[13px] font-semibold">{g.amount}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--fk-line-07)] pt-[11px]">
                  <span
                    className="t-mono-sm"
                    style={{ color: done ? "var(--fk-text-45)" : "var(--fk-lime)" }}
                  >
                    {g.status}
                  </span>
                  <button
                    onClick={() => a.markGigDelivered(g.id)}
                    className="cursor-pointer rounded-[10px] px-[13px] py-[9px] font-sans text-[11.5px] font-semibold"
                    style={{
                      background: done ? "transparent" : "var(--fk-lime)",
                      color: done ? "var(--fk-text-60)" : "var(--fk-on-lime)",
                      border: done ? "1px solid var(--fk-line-14)" : "0",
                    }}
                  >
                    {done ? "Awaiting approval" : "Mark delivered"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ScreenShell>
  );
}
