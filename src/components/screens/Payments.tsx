"use client";

import { money } from "@/lib/format";
import { paymentTotals, planName, planPrice } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { BackButton } from "../common";
import { ScreenShell } from "../shell";
import { InlineButton, InlineOutlineButton, SectionTitle } from "../ui";

export function Payments() {
  const s = useApp();
  const a = useActionsContext();
  const { due, got, payDue, payGot, payTotal } = paymentTotals(s);

  return (
    <ScreenShell>
      <div className="flex items-center gap-3 px-5 pt-4">
        <BackButton onClick={() => a.go("fdash")} />
        <span className="t-screen-title">Payments</span>
      </div>

      <div className="px-5 pt-[18px]">
        <div className="rounded-[20px] bg-[var(--fk-lime)] p-[18px] text-[var(--fk-on-lime)]">
          <span className="font-mono text-[11px] font-medium tracking-[0.06em] opacity-65">
            COLLECTED · AUGUST
          </span>
          <div className="t-big mt-2">{money(payGot)}</div>
          <div
            className="mt-3 flex gap-[18px] border-t pt-3"
            style={{ borderColor: "var(--fk-on-lime-divider)" }}
          >
            <Figure value={money(payDue)} label="still to collect" />
            <Figure value={money(payTotal)} label="billed this month" />
            <Figure value="₹0" label="platform cut" />
          </div>
        </div>
      </div>

      <div className="px-5 pt-[22px]">
        <SectionTitle
          className="mb-[11px]"
          title="To collect"
          right={<span className="t-mono-sm text-[var(--fk-text-40)]">PAID TO YOU DIRECTLY</span>}
        />
        <div className="flex flex-col gap-[9px]">
          {due.length === 0 ? (
            <div className="t-body-sm rounded-[15px] border border-dashed border-[var(--fk-line-14)] bg-[var(--fk-card)] p-5 text-center text-[var(--fk-text-45)]">
              Nothing outstanding. Every client has paid up.
            </div>
          ) : (
            due.map((p) => (
              <div
                key={p.id}
                className="rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[14px] py-[13px]"
              >
                <div className="flex items-center justify-between gap-[10px]">
                  <span className="t-card-title">{p.client}</span>
                  <span className="flex-none font-sans text-[13px] font-semibold">
                    {money(p.amount)}
                  </span>
                </div>
                <div className="mt-1 font-sans text-[11.5px] text-[var(--fk-text-50)]">
                  {p.service} · {p.when}
                </div>
                <div className="mt-[11px] flex gap-2">
                  <InlineOutlineButton className="flex-1" onClick={() => a.remindPayment(p.client)}>
                    Remind
                  </InlineOutlineButton>
                  <InlineButton
                    className="flex-[1.3] px-0 py-[9px]"
                    onClick={() => a.markPaymentReceived(p.id)}
                  >
                    Mark received
                  </InlineButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="px-5 pt-[22px]">
        <h3 className="t-h3 m-0 mb-[11px]">Received</h3>
        <div className="overflow-hidden rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)]">
          {got.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-[11px] border-b border-[var(--fk-line-07)] px-[14px] py-[13px] last:border-b-0"
            >
              <div className="flex flex-1 flex-col gap-[2px]">
                <span className="font-sans text-[13px] font-semibold">{p.client}</span>
                <span className="font-sans text-[11px] text-[var(--fk-text-50)]">
                  {p.service} · {p.via}
                </span>
              </div>
              <span className="font-sans text-[12.5px] font-semibold">{money(p.amount)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pb-[26px] pt-[22px]">
        <h3 className="t-h3 m-0 mb-[11px]">Your plan</h3>
        <div className="rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-[14px]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[3px]">
              <span className="t-card-title">
                {planName(s)} · {planPrice(s)}
              </span>
              <span className="font-sans text-[11px] text-[var(--fk-text-50)]">
                Renews 1 Sep · Razorpay
              </span>
            </div>
            <button
              onClick={a.managePlan}
              className="cursor-pointer rounded-[10px] border border-[var(--fk-line-14)] bg-transparent px-[13px] py-[9px] font-sans text-[11.5px] font-semibold text-[rgba(242,242,240,.75)]"
            >
              Manage
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--fk-line-07)] pt-3">
            <div className="flex flex-col gap-[3px]">
              <span className="font-sans text-[13px] font-semibold">Where clients pay you</span>
              <span className="font-sans text-[11px] text-[var(--fk-text-50)]">
                {s.bank ? "HDFC ••4471 · verified" : "Add UPI ID or account number"}
              </span>
            </div>
            <button
              onClick={a.toggleBank}
              className="cursor-pointer rounded-[10px] border-0 px-[13px] py-[9px] font-sans text-[11.5px] font-semibold"
              style={{
                background: s.bank ? "var(--fk-lime-fill)" : "var(--fk-lime)",
                color: s.bank ? "var(--fk-lime)" : "var(--fk-on-lime)",
              }}
            >
              {s.bank ? "Added" : "Add"}
            </button>
          </div>
        </div>
        <p className="m-0 mt-[13px] font-sans text-[11.5px] leading-[1.5] text-[var(--fk-text-40)]">
          FreelanceKar never holds your money — clients pay you by UPI or cash and you keep every
          rupee.
        </p>
      </div>
    </ScreenShell>
  );
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-sans text-[14px] font-semibold">{value}</span>
      <span className="font-sans text-[10.5px] opacity-65">{label}</span>
    </div>
  );
}
