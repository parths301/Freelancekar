"use client";

import { ISSUE_REASONS } from "@/lib/data";
import { cityOf, currentBooking } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { Sheet } from "../shell";
import { Chip, PrimaryButton } from "../ui";

export function IssueSheet() {
  const s = useApp();
  const a = useActionsContext();
  const b = currentBooking(s);

  return (
    <Sheet open={s.issueOpen && !!b} onClose={a.closeIssue} label="Raise an issue" maxHeight="88%">
      {b ? (
        <div className="px-5 pb-[22px] pt-5">
          <div className="flex items-center justify-between">
            <h3 className="t-sheet-title m-0">Raise an issue</h3>
            <button
              onClick={a.closeIssue}
              aria-label="Close"
              className="cursor-pointer border-0 bg-transparent text-[16px] text-[var(--fk-text-50)]"
            >
              ✕
            </button>
          </div>
          <p className="t-body-sm m-0 mt-[9px] text-[var(--fk-text-55)]">
            Order {b.id} with {b.name}. Support in {cityOf(s)} picks this up within 24 hours.
          </p>

          <div className="mt-4 flex flex-wrap gap-[7px]">
            {ISSUE_REASONS.map((name, i) => (
              <Chip
                key={name}
                on={s.issueReason === i}
                onClick={() => a.setIssueReason(i)}
                className="py-[9px]"
                style={{
                  background: s.issueReason === i ? "var(--fk-lime)" : "var(--fk-nested)",
                }}
              >
                {name}
              </Chip>
            ))}
          </div>

          <textarea
            value={s.issueText}
            onChange={(e) => a.setIssueText(e.target.value)}
            placeholder="What happened? Dates, what was promised, what you got."
            aria-label="What happened"
            className="mt-[14px] box-border min-h-[80px] w-full resize-none rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-3 font-sans text-[13px] leading-[1.5] text-[var(--fk-text)] outline-none"
          />

          {s.issueError ? (
            <span
              className="mt-[9px] block font-sans text-[11.5px] font-medium text-[var(--fk-alert)]"
              role="alert"
            >
              Add a couple of lines so support can act on it.
            </span>
          ) : null}

          <PrimaryButton className="mt-4" onClick={() => a.submitIssue(b)}>
            Send to support
          </PrimaryButton>

          <p className="t-pretty m-0 mt-[13px] font-sans text-[11.5px] leading-[1.5] text-[var(--fk-text-40)]">
            FreelanceKar never holds your money, so nothing is frozen — support mediates and can
            pause the freelancer’s listing while the case is open.
          </p>
        </div>
      ) : null}
    </Sheet>
  );
}
