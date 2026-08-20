"use client";

import { DATE_LABELS, PAY_METHODS } from "@/lib/data";
import { money } from "@/lib/format";
import { activePro, selectedPackage } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { Sheet } from "../shell";
import { Chip, PrimaryButton, Stripe } from "../ui";

export function HireSheet() {
  const s = useApp();
  const a = useActionsContext();
  const pro = activePro(s);
  const pkg = selectedPackage(s);

  return (
    <Sheet open={s.hire > 0} onClose={a.closeHire} label={`Hire ${pro.first}`} maxHeight="88%">
      {s.hire === 1 ? (
        <div className="px-5 pb-[22px] pt-[18px]">
          <div className="flex items-center justify-between">
            <h3 className="m-0 font-sans text-[18px] font-semibold tracking-[-0.02em]">
              Hire {pro.first}
            </h3>
            <CloseButton onClick={a.closeHire} />
          </div>

          <Group label="SERVICE">
            {pro.packages.map((p, i) => (
              <button
                key={p.name}
                onClick={() => a.pickService(i)}
                aria-pressed={i === s.svcIdx}
                className="flex cursor-pointer items-center justify-between gap-[10px] rounded-[13px] border bg-[var(--fk-nested)] px-[13px] py-3 text-left text-[var(--fk-text)]"
                style={{ borderColor: i === s.svcIdx ? "var(--fk-lime)" : "var(--fk-line-08)" }}
              >
                <div className="flex flex-col gap-[2px]">
                  <span className="font-sans text-[13px] font-semibold">{p.name}</span>
                  <span className="font-sans text-[10.5px] text-[var(--fk-text-50)]">{p.terms}</span>
                </div>
                <span className="flex-none font-sans text-[12.5px] font-semibold">{p.price}</span>
              </button>
            ))}
          </Group>

          <Group label="START DATE">
            <div className="grid grid-cols-3 gap-[7px]">
              {DATE_LABELS.map((label, i) => (
                <Chip
                  key={label}
                  on={s.hireDateIdx === i}
                  onClick={() => a.setHireDate(i)}
                  className="rounded-[11px] px-[6px] py-[11px]"
                >
                  {label}
                </Chip>
              ))}
            </div>
          </Group>

          <Group label="BRIEF">
            <textarea
              value={s.hireNote}
              onChange={(e) => a.setHireNote(e.target.value)}
              placeholder="What exactly do you need? Add links or references."
              aria-label="Brief"
              className="box-border min-h-[64px] w-full resize-none rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-3 font-sans text-[13px] leading-[1.5] text-[var(--fk-text)] outline-none"
            />
            {s.hireError ? (
              <span className="font-sans text-[11.5px] font-medium text-[var(--fk-alert)]" role="alert">
                Add a line about the work so {pro.first} can confirm.
              </span>
            ) : null}
          </Group>

          <PrimaryButton className="mt-[18px]" onClick={a.toPay}>
            Continue · {pkg.price}
          </PrimaryButton>
        </div>
      ) : null}

      {s.hire === 2 ? (
        <div className="px-5 pb-[22px] pt-[18px]">
          <div className="flex items-center justify-between">
            <button
              onClick={a.toDetails}
              aria-label="Back"
              className="cursor-pointer border-0 bg-transparent p-0 text-[15px] text-[var(--fk-text-60)]"
            >
              ←
            </button>
            <h3 className="t-screen-title m-0">Secure payment</h3>
            <CloseButton onClick={a.closeHire} />
          </div>

          <div className="mt-4 rounded-[15px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-[14px]">
            <div className="flex items-center gap-[11px] border-b border-[var(--fk-line-07)] pb-3">
              <Stripe small className="h-[38px] w-[38px] rounded-[11px]" />
              <div className="flex flex-1 flex-col gap-[2px]">
                <span className="font-sans text-[13px] font-semibold">{pro.name}</span>
                <span className="font-sans text-[11px] text-[var(--fk-text-50)]">{pkg.name}</span>
              </div>
            </div>
            <div className="flex justify-between pt-3 font-sans text-[12.5px] text-[var(--fk-text-60)]">
              <span>Service</span>
              <span className="text-[var(--fk-text)]">{pkg.price}</span>
            </div>
            <div className="mt-[11px] flex justify-between border-t border-[var(--fk-line-07)] pt-[11px] font-sans text-[14px] font-semibold">
              <span>Total to pay {pro.first}</span>
              <span>{money(pkg.amount)}</span>
            </div>
          </div>

          <Group label="PAY WITH">
            {PAY_METHODS.map(([icon, name, note], i) => (
              <button
                key={name}
                onClick={() => a.setMethod(i)}
                role="radio"
                aria-checked={i === s.methodIdx}
                className="flex cursor-pointer items-center gap-[11px] rounded-[13px] border bg-[var(--fk-nested)] px-[13px] py-3 text-left text-[var(--fk-text)]"
                style={{ borderColor: i === s.methodIdx ? "var(--fk-lime)" : "var(--fk-line-09)" }}
              >
                <span className="text-[14px]" aria-hidden>
                  {icon}
                </span>
                <div className="flex flex-1 flex-col gap-[2px]">
                  <span className="font-sans text-[12.5px] font-semibold">{name}</span>
                  <span className="font-sans text-[10.5px] text-[var(--fk-text-50)]">{note}</span>
                </div>
                <span
                  className="text-[12px]"
                  style={{
                    color: i === s.methodIdx ? "var(--fk-lime)" : "var(--fk-text-35)",
                  }}
                  aria-hidden
                >
                  {i === s.methodIdx ? "●" : "○"}
                </span>
              </button>
            ))}
          </Group>

          <p className="m-0 mt-[14px] font-sans text-[11.5px] leading-[1.5] text-[var(--fk-text-45)]">
            You pay {pro.first} directly — no platform fee. This confirms the booking and shares your
            contact details.
          </p>

          <PrimaryButton
            className="mt-4"
            disabled={s.paying}
            onClick={() => a.payNow(pro, pkg.name, pkg.amount)}
          >
            {s.paying ? "Confirming…" : "Confirm booking"}
          </PrimaryButton>
        </div>
      ) : null}

      {s.hire === 3 ? (
        <div className="px-[22px] pb-[26px] pt-[34px] text-center">
          <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--fk-lime)] text-[22px] text-[var(--fk-on-lime)]">
            ✓
          </div>
          <h3 className="m-0 mt-4 font-sans text-[19px] font-semibold tracking-[-0.02em]">
            Booked with {pro.first}
          </h3>
          <p className="m-0 mt-2 font-sans text-[13px] leading-[1.55] text-[var(--fk-text-55)]">
            Pay {pro.first} {money(pkg.amount)} directly on delivery. Usually confirms within{" "}
            {pro.replyIn} — you’ll get a notification.
          </p>
          <div className="mt-[18px] flex flex-col gap-[9px] rounded-[15px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] p-[14px] text-left">
            <DetailRow label="Service" value={pkg.name} />
            <DetailRow label="Starts" value={DATE_LABELS[s.hireDateIdx]} />
            <DetailRow label="Order" value={s.bookings[0]?.id ?? ""} />
          </div>
          <div className="mt-4 flex gap-[9px]">
            <button
              onClick={a.afterBookChat}
              className="flex-1 cursor-pointer rounded-[12px] border border-[var(--fk-line-16)] bg-transparent p-[13px] font-sans text-[13px] font-medium text-[var(--fk-text)]"
            >
              Open chat
            </button>
            <button
              onClick={a.afterBookHome}
              className="flex-1 cursor-pointer rounded-[12px] border-0 bg-[var(--fk-lime)] p-[13px] font-sans text-[13px] font-semibold text-[var(--fk-on-lime)]"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}

      {s.hire === 4 ? (
        <div className="px-[22px] pb-[26px] pt-8 text-center">
          <div
            className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border text-[22px]"
            style={{
              background: "var(--fk-alert-14)",
              borderColor: "var(--fk-alert-bd-50)",
              color: "var(--fk-alert)",
            }}
          >
            !
          </div>
          <h3 className="m-0 mt-4 font-sans text-[19px] font-semibold tracking-[-0.02em]">
            Payment didn’t go through
          </h3>
          <p className="t-pretty m-0 mt-2 font-sans text-[13px] leading-[1.55] text-[var(--fk-text-55)]">
            Your bank declined the card. Nothing was charged and {pro.first} hasn’t been booked yet.
          </p>
          <div className="mt-[18px] flex flex-col gap-[7px] rounded-[15px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] px-[14px] py-[13px] text-left">
            <DetailRow label="Attempted" value={money(pkg.amount)} />
            <DetailRow label="Reason" value="DECLINED_BY_ISSUER" />
          </div>
          <div className="mt-4 flex flex-col gap-[9px]">
            <button
              onClick={a.payWithUpi}
              className="cursor-pointer rounded-[12px] border-0 bg-[var(--fk-lime)] p-[14px] font-sans text-[13.5px] font-semibold text-[var(--fk-on-lime)]"
            >
              Pay with UPI instead
            </button>
            <button
              onClick={a.retryPay}
              className="cursor-pointer rounded-[12px] border border-[var(--fk-line-16)] bg-transparent p-[13px] font-sans text-[13px] font-medium text-[var(--fk-text)]"
            >
              Try the card again
            </button>
          </div>
        </div>
      ) : null}
    </Sheet>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <span className="t-mono-label text-[var(--fk-text-45)]">{label}</span>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between font-sans text-[12px] text-[var(--fk-text-55)]">
      <span>{label}</span>
      <span className="font-medium text-[var(--fk-text)]">{value}</span>
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="cursor-pointer border-0 bg-transparent text-[16px] text-[var(--fk-text-50)]"
    >
      ✕
    </button>
  );
}
