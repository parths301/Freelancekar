"use client";

import { currentBooking } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { Sheet } from "../shell";
import { PrimaryButton } from "../ui";

export function ReviewSheet() {
  const s = useApp();
  const a = useActionsContext();
  const b = currentBooking(s);

  return (
    <Sheet open={s.reviewOpen && !!b} onClose={a.closeReview} label="Close out the job">
      {b ? (
        <div className="px-5 pb-[22px] pt-5">
          <div className="flex items-center justify-between">
            <h3 className="t-sheet-title m-0">Close out the job</h3>
            <button
              onClick={a.closeReview}
              aria-label="Close"
              className="cursor-pointer border-0 bg-transparent text-[16px] text-[var(--fk-text-50)]"
            >
              ✕
            </button>
          </div>
          <p className="t-body-sm m-0 mt-[9px] text-[var(--fk-text-55)]">
            Confirm you’ve paid {b.first} {b.amount} directly. How was the work?
          </p>

          <div
            className="mt-4 flex gap-2"
            role="radiogroup"
            aria-label={`Rating: ${s.reviewStars} of 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => a.setReviewStars(n)}
                role="radio"
                aria-checked={s.reviewStars === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className="cursor-pointer border-0 bg-transparent p-0 text-[28px] leading-none"
                style={{
                  color: n <= s.reviewStars ? "var(--fk-amber)" : "var(--fk-text-22)",
                }}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={s.reviewText}
            onChange={(e) => a.setReviewText(e.target.value)}
            placeholder="What went well? This shows on their profile."
            aria-label="Review"
            className="mt-[14px] box-border min-h-[70px] w-full resize-none rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-3 font-sans text-[13px] leading-[1.5] text-[var(--fk-text)] outline-none"
          />

          {s.reviewError ? (
            <span
              className="mt-[9px] block font-sans text-[11.5px] font-medium text-[var(--fk-alert)]"
              role="alert"
            >
              Pick a star rating first.
            </span>
          ) : null}

          <PrimaryButton className="mt-4" onClick={() => a.submitReview(b)}>
            Mark paid &amp; post review
          </PrimaryButton>
        </div>
      ) : null}
    </Sheet>
  );
}
