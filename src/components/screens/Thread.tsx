"use client";

import { currentThread } from "@/lib/selectors";
import { money } from "@/lib/format";
import { useActionsContext, useApp } from "@/lib/store";
import { BackButton } from "../common";
import { Stripe } from "../ui";

const QUOTE_STATUS: Record<string, { client: string; freelancer: string; color: string; border: string }> = {
  pending: {
    client: "AWAITING YOUR REPLY",
    freelancer: "SENT · AWAITING REPLY",
    color: "var(--fk-amber)",
    border: "rgba(245,184,81,.45)",
  },
  accepted: {
    client: "ACCEPTED · BOOKED",
    freelancer: "ACCEPTED · BOOKED",
    color: "var(--fk-lime)",
    border: "var(--fk-lime)",
  },
  declined: {
    client: "DECLINED",
    freelancer: "DECLINED",
    color: "var(--fk-text-40)",
    border: "var(--fk-line-08)",
  },
};

export function Thread() {
  const s = useApp();
  const a = useActionsContext();
  const t = currentThread(s);
  const q = t?.quote;
  const status = q ? QUOTE_STATUS[q.status] : null;

  return (
    <div className="fk-in-short pb-2">
      <div className="flex items-center gap-3 border-b border-[var(--fk-line-08)] px-[18px] py-[14px]">
        <BackButton onClick={() => a.go("chats")} />
        <Stripe small className="h-[34px] w-[34px] rounded-[11px]" />
        <div className="flex flex-1 flex-col gap-[2px]">
          <span className="font-sans text-[14px] font-semibold">{t?.name ?? ""}</span>
          <span className="font-sans text-[10.5px] text-[var(--fk-text-45)]">
            Usually replies in 15 min
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] px-[18px] pt-4">
        {(t?.msgs ?? []).map((m, i) => {
          const mine = m.from === "me";
          return (
            <div key={i} className={mine ? "flex justify-end" : "flex justify-start"}>
              <div
                className="max-w-[78%] border px-[13px] py-[10px]"
                style={{
                  background: mine ? "var(--fk-lime-badge)" : "var(--fk-card)",
                  borderColor: mine ? "var(--fk-lime-bd-35)" : "var(--fk-line-08)",
                  borderRadius: mine ? "15px 15px 5px 15px" : "15px 15px 15px 5px",
                }}
              >
                <span className="whitespace-pre-wrap font-sans text-[13px] leading-[1.45]">
                  {m.text}
                </span>
                <div className="mt-[5px] text-right font-mono text-[9.5px] font-medium opacity-50">
                  {m.ts}
                </div>
              </div>
            </div>
          );
        })}

        {q && status ? (
          <div
            className="rounded-[17px] border bg-[var(--fk-card)] p-[15px]"
            style={{ borderColor: status.border }}
          >
            <div className="flex items-center justify-between">
              <span className="t-mono-label text-[var(--fk-text-45)]">QUOTE</span>
              <span className="t-mono-sm" style={{ color: status.color }}>
                {s.freelancerMode ? status.freelancer : status.client}
              </span>
            </div>
            <div className="t-quote mt-2">{money(q.amount)}</div>
            <div className="mt-[3px] font-sans text-[11.5px] text-[var(--fk-text-50)]">
              {q.service} · delivery in {q.days}
            </div>
            <p className="t-body-sm m-0 mt-[11px] text-[rgba(242,242,240,.62)]">{q.msg}</p>

            {q.status === "pending" && !s.freelancerMode ? (
              <div className="mt-[14px] flex gap-2 border-t border-[var(--fk-line-07)] pt-[13px]">
                <button
                  onClick={a.declineQuote}
                  className="flex-1 cursor-pointer rounded-[11px] border border-[var(--fk-line-14)] bg-transparent p-[11px] font-sans text-[12.5px] font-medium text-[rgba(242,242,240,.7)]"
                >
                  Decline
                </button>
                <button
                  onClick={a.acceptQuote}
                  className="flex-[1.4] cursor-pointer rounded-[11px] border-0 bg-[var(--fk-lime)] p-[11px] font-sans text-[12.5px] font-semibold text-[var(--fk-on-lime)]"
                >
                  Accept quote
                </button>
              </div>
            ) : null}

            {q.status === "accepted" ? (
              <button
                onClick={a.openOrderFromThread}
                className="mt-[13px] w-full cursor-pointer rounded-[11px] border border-[var(--fk-line-14)] bg-transparent p-[11px] font-sans text-[12px] font-semibold text-[var(--fk-lime)]"
              >
                View order
              </button>
            ) : null}
          </div>
        ) : null}

        {s.typing ? (
          <div className="flex justify-start">
            <div
              className="border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[14px] py-[11px] font-sans text-[13px] text-[var(--fk-text-45)]"
              style={{ borderRadius: "15px 15px 15px 5px" }}
            >
              typing…
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Replaces the tab bar while a thread is open. */
export function Composer() {
  const s = useApp();
  const a = useActionsContext();
  return (
    <div className="relative z-[1] flex flex-none items-center gap-[9px] border-t border-[var(--fk-line-08)] bg-[var(--fk-bar)] px-[18px] pb-5 pt-3">
      <input
        value={s.draft}
        onChange={(e) => a.setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") a.sendMsg();
        }}
        placeholder="Write a message"
        aria-label="Write a message"
        className="flex-1 rounded-[12px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[13px] py-3 font-sans text-[13.5px] text-[var(--fk-text)] outline-none"
      />
      <button
        onClick={a.sendMsg}
        className="cursor-pointer rounded-[12px] border-0 bg-[var(--fk-lime)] px-[15px] py-3 font-sans text-[12.5px] font-semibold text-[var(--fk-on-lime)]"
      >
        Send
      </button>
    </div>
  );
}
