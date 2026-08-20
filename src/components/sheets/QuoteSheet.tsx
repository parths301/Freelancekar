"use client";

import { DAY_LABELS } from "@/lib/data";
import { useActionsContext, useApp } from "@/lib/store";
import { Sheet } from "../shell";
import { Chip, PrimaryButton } from "../ui";

export function QuoteSheet() {
  const s = useApp();
  const a = useActionsContext();
  const req = s.reqs.find((r) => r.id === s.quoteFor);

  return (
    <Sheet open={!!req} onClose={a.closeQuote} label="Send a quote" maxHeight="88%">
      {req ? (
        <div className="px-5 pb-[22px] pt-[18px]">
          <div className="flex items-center justify-between">
            <h3 className="t-sheet-title m-0">Send a quote</h3>
            <button
              onClick={a.closeQuote}
              aria-label="Close"
              className="cursor-pointer border-0 bg-transparent text-[16px] text-[var(--fk-text-50)]"
            >
              ✕
            </button>
          </div>

          <div className="mt-[14px] rounded-[14px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-[13px]">
            <div className="t-card-title">{req.title}</div>
            <div className="mt-1 font-sans text-[11.5px] text-[var(--fk-text-50)]">{req.meta}</div>
            <div className="mt-2 font-sans text-[11.5px] font-medium text-[var(--fk-lime)]">
              Client budget: {req.budget}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <span className="t-mono-label text-[var(--fk-text-45)]">YOUR PRICE</span>
            <div className="flex items-center gap-[9px] rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-[13px]">
              <span className="font-sans text-[14px] font-medium text-[var(--fk-text-50)]">₹</span>
              <input
                value={s.quoteAmount}
                onChange={(e) => a.setQuoteAmount(e.target.value)}
                placeholder="14000"
                inputMode="numeric"
                aria-label="Your price"
                className="flex-1 border-0 bg-transparent font-sans text-[15px] font-semibold text-[var(--fk-text)] outline-none"
              />
            </div>
            <span className="font-sans text-[11px] text-[var(--fk-text-42)]">
              You keep 100% — client pays you directly, no platform cut.
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <span className="t-mono-label text-[var(--fk-text-45)]">DELIVERY IN</span>
            <div className="grid grid-cols-4 gap-[7px]">
              {DAY_LABELS.map((d, i) => (
                <Chip
                  key={d}
                  on={s.quoteDayIdx === i}
                  onClick={() => a.setQuoteDay(i)}
                  className="rounded-[11px] px-1 py-[11px]"
                >
                  {d}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <span className="t-mono-label text-[var(--fk-text-45)]">MESSAGE</span>
            <textarea
              value={s.quoteMsg}
              onChange={(e) => a.setQuoteMsg(e.target.value)}
              placeholder="What’s included, how you work, what you need from them."
              aria-label="Message"
              className="box-border min-h-[66px] resize-none rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-3 font-sans text-[13px] leading-[1.5] text-[var(--fk-text)] outline-none"
            />
            {s.quoteError ? (
              <span className="font-sans text-[11.5px] font-medium text-[var(--fk-alert)]" role="alert">
                Add a price and a short message before sending.
              </span>
            ) : null}
          </div>

          <PrimaryButton className="mt-[18px]" onClick={a.sendQuote}>
            Send quote
          </PrimaryButton>
        </div>
      ) : null}
    </Sheet>
  );
}
