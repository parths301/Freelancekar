"use client";

import { BOOKING_STATUS_LABEL, cityOf, toPayTotal } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { ScreenShell } from "../shell";
import { Stripe } from "../ui";

export function You() {
  const s = useApp();
  const a = useActionsContext();

  return (
    <ScreenShell className="px-5 pb-[26px] pt-[18px]">
      <h1 className="t-h1 m-0 mb-[18px]">You</h1>

      <div className="flex items-center gap-[13px]">
        <Stripe
          small
          className="h-14 w-14 rounded-[16px] border border-[var(--fk-line-09)]"
        />
        <div className="flex flex-col gap-[3px]">
          <span className="t-screen-title">Café Mitti</span>
          <span className="font-sans text-[12px] text-[var(--fk-text-50)]">
            Client · {cityOf(s)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <Stat value={String(s.bookings.length)} label="bookings" />
        <Stat value={String(s.saved.length)} label="saved" />
        <Stat value={toPayTotal(s)} label="to pay" />
      </div>

      <div className="mt-5 flex flex-col gap-[9px]">
        {s.bookings.length === 0 ? (
          <div className="rounded-[15px] border border-dashed border-[var(--fk-line-14)] bg-[var(--fk-card)] p-[22px] text-center">
            <p className="t-body-sm t-pretty m-0 text-[var(--fk-text-45)]">
              No bookings yet. Hire someone and the order lives here.
            </p>
            <button
              onClick={() => a.go("explore")}
              className="mt-[14px] cursor-pointer rounded-[11px] border-0 bg-[var(--fk-lime)] px-[15px] py-[11px] font-sans text-[12.5px] font-semibold text-[var(--fk-on-lime)]"
            >
              Find a freelancer
            </button>
          </div>
        ) : (
          s.bookings.map((b) => (
            <button
              key={b.id}
              onClick={() => a.openOrder(b.id)}
              className="block w-full cursor-pointer rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[14px] py-[13px] text-left text-[var(--fk-text)]"
            >
              <div className="flex items-center justify-between">
                <span className="t-card-title">{b.name}</span>
                <span className="font-sans text-[13px] font-semibold">{b.amount}</span>
              </div>
              <div className="mt-1 font-sans text-[11.5px] text-[var(--fk-text-50)]">
                {b.service}
              </div>
              <div className="mt-[10px] flex items-center justify-between">
                <span
                  className="t-mono-sm"
                  style={{
                    color: b.status === "approved" ? "var(--fk-text-45)" : "var(--fk-lime)",
                  }}
                >
                  {BOOKING_STATUS_LABEL[b.status]}
                </span>
                <span className="font-sans text-[11px] font-medium text-[var(--fk-lime)]">
                  {b.status === "delivered" ? "Approve →" : "View →"}
                </span>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="mt-5 overflow-hidden rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)]">
        <button
          onClick={a.startFreelancer}
          className="flex w-full cursor-pointer items-center justify-between border-0 border-b border-[var(--fk-line-07)] bg-transparent p-[14px] text-left font-sans text-[13px] font-medium text-[var(--fk-text)]"
        >
          <span>Switch to freelancer mode</span>
          <span className="text-[12px] text-[var(--fk-lime)]">→</span>
        </button>
        <div className="border-b border-[var(--fk-line-07)] p-[14px] font-sans text-[13px] font-medium text-[rgba(242,242,240,.75)]">
          Payment methods
        </div>
        <button
          onClick={a.openHelp}
          className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent p-[14px] text-left font-sans text-[13px] font-medium text-[var(--fk-text)]"
        >
          <span>Help &amp; disputes</span>
          <span className="text-[12px] text-[var(--fk-lime)]">→</span>
        </button>
      </div>
    </ScreenShell>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[14px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[6px] py-[13px]">
      <div className="font-sans text-[16px] font-semibold">{value}</div>
      <div className="mt-[3px] font-sans text-[10px] text-[var(--fk-text-45)]">{label}</div>
    </div>
  );
}
