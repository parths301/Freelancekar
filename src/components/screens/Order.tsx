"use client";

import { currentBooking, ORDER_STATUS_LABEL, ORDER_STEPS } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { BackButton } from "../common";
import { ScreenShell } from "../shell";
import { OutlineButton, PrimaryButton, Stripe } from "../ui";

const ORDER_SEQ = ["awaiting", "in_progress", "delivered", "approved"] as const;

export function Order() {
  const s = useApp();
  const a = useActionsContext();
  const b = currentBooking(s);
  if (!b) return null;

  const at = ORDER_SEQ.indexOf(b.status);
  const complete = b.status === "approved";
  const issue = b.issue;

  return (
    <ScreenShell>
      <div className="flex items-center gap-3 px-5 pt-4">
        <BackButton onClick={() => a.go("you")} />
        <span className="t-screen-title">Order {b.id}</span>
      </div>

      <div className="px-5 pt-5">
        <div className="rounded-[18px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-4">
          <div className="flex items-center gap-3">
            <Stripe small className="h-11 w-11 rounded-[13px]" />
            <div className="flex flex-1 flex-col gap-[3px]">
              <span className="t-h4">{b.name}</span>
              <span className="font-sans text-[11.5px] text-[var(--fk-text-50)]">{b.service}</span>
            </div>
          </div>
          <div className="mt-[14px] flex items-center justify-between border-t border-[var(--fk-line-07)] pt-[13px]">
            <div className="flex flex-col">
              <span className="font-sans text-[18px] font-semibold">{b.amount}</span>
              <span
                className="font-sans text-[11px]"
                style={{ color: complete ? "var(--fk-text-45)" : "var(--fk-lime)" }}
              >
                {complete ? `Paid to ${b.first} directly` : `Pay ${b.first} directly`}
              </span>
            </div>
            <span
              className="t-mono-sm"
              style={{ color: complete ? "var(--fk-text-45)" : "var(--fk-lime)" }}
            >
              {ORDER_STATUS_LABEL[b.status]}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-[22px]">
        <h3 className="t-h3 m-0 mb-[13px]">Progress</h3>
        <ol className="m-0 flex list-none flex-col p-0">
          {ORDER_STEPS.map(([title, note], i) => {
            const reached = i <= at;
            const last = i === ORDER_STEPS.length - 1;
            return (
              <li key={title} className="flex gap-[13px]">
                <div className="flex w-[18px] flex-none flex-col items-center">
                  <span
                    className="box-border h-[11px] w-[11px] rounded-full border-2"
                    style={{
                      background: reached ? "var(--fk-lime)" : "var(--fk-bg)",
                      borderColor: reached ? "var(--fk-lime)" : "var(--fk-line-18)",
                    }}
                  />
                  <span
                    className="w-px flex-1"
                    style={{
                      background: i < at ? "var(--fk-lime)" : "var(--fk-line-12)",
                      minHeight: last ? 0 : 26,
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-[2px] pb-4">
                  <span
                    className="font-sans text-[13px] font-semibold"
                    style={{ color: reached ? "var(--fk-text)" : "var(--fk-text-40)" }}
                  >
                    {title}
                  </span>
                  <span className="font-sans text-[11px] text-[var(--fk-text-45)]">
                    {reached ? note : "—"}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {b.review ? (
        <div className="px-5 pt-1">
          <div className="rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-[14px]">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[13px] font-semibold">Your review</span>
              <span
                className="font-sans text-[12px] font-medium text-[var(--fk-amber)]"
                aria-label={`${b.review.stars} out of 5 stars`}
              >
                {"★".repeat(b.review.stars)}
              </span>
            </div>
            <p className="t-body-sm m-0 mt-[9px] text-[var(--fk-text-60)]">{b.review.text}</p>
          </div>
        </div>
      ) : null}

      {issue ? (
        <div className="px-5 pt-1">
          <div
            className="rounded-[15px] border p-[14px]"
            style={{
              background: "var(--fk-alert-08)",
              borderColor: "var(--fk-alert-bd-35)",
            }}
          >
            <div className="flex items-center justify-between gap-[10px]">
              <span className="font-sans text-[13px] font-semibold text-[var(--fk-alert)]">
                Issue · {issue.ref}
              </span>
              <span
                className="t-mono-sm"
                style={{
                  color: issue.status === "open" ? "var(--fk-amber)" : "var(--fk-lime)",
                }}
              >
                {issue.status === "open" ? "SUPPORT REVIEWING" : "SUPPORT REPLIED"}
              </span>
            </div>
            <div className="mt-[5px] font-sans text-[11.5px] text-[var(--fk-text-55)]">
              {issue.reason}
            </div>
            <p className="t-body-sm t-pretty m-0 mt-[9px] text-[var(--fk-text-60)]">
              {issue.status === "open"
                ? `Raised with the support team. Keep any files or messages from ${b.first || "the freelancer"} — you’ll get a reply within 24 hours.`
                : `Support has spoken to ${b.first || "the freelancer"} and paused their listing while this is open. Add anything else in chat.`}
            </p>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-[9px] px-5 pb-[26px] pt-[18px]">
        {b.status === "delivered" ? (
          <PrimaryButton onClick={a.openReview}>Mark complete &amp; rate</PrimaryButton>
        ) : null}
        <OutlineButton onClick={() => b.proId && a.openThread(b.proId)}>
          Message {b.first}
        </OutlineButton>
        {!issue ? (
          <button
            onClick={a.openIssue}
            className="w-full cursor-pointer border-0 bg-transparent p-[6px] font-sans text-[12px] font-medium text-[var(--fk-text-55)]"
          >
            Raise an issue
          </button>
        ) : null}
      </div>
    </ScreenShell>
  );
}
