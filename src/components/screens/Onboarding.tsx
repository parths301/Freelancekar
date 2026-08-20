"use client";

import { CITIES, PLANS, RADIUS_LABELS, SVC_CATS, SVC_TYPES } from "@/lib/data";
import { useActionsContext, useApp } from "@/lib/store";
import { BackButton } from "../common";
import { ScreenShell } from "../shell";
import { Chip, ErrorNote, PrimaryButton } from "../ui";

const BENEFITS = [
  "List as many services as you do — one profile, many skills",
  "Clients near you see you first",
  "Clients pay you directly — you keep 100% of every job",
];

const KYC_ITEMS: [keyof ReturnType<typeof useApp>["kyc"], string, string][] = [
  ["aadhaar", "Aadhaar", "ID check · never shown to clients"],
  ["pan", "PAN card", "For payouts above ₹20,000"],
  ["selfie", "Live selfie", "Matches your ID photo"],
];

export function Onboarding() {
  const s = useApp();
  const a = useActionsContext();

  const cta =
    s.onbStep === 1
      ? s.otpSent
        ? "Verify & continue"
        : "Send OTP"
      : s.onbStep === 4
        ? "Continue to plan"
        : "Continue";

  return (
    <ScreenShell>
      <div className="flex items-center gap-3 px-5 pt-4">
        <BackButton onClick={a.onbBack} />
        <div className="h-[3px] flex-1 overflow-hidden rounded-[2px] bg-[var(--fk-track)]">
          <div
            className="h-full bg-[var(--fk-lime)] transition-[width] duration-300 ease-linear"
            style={{ width: `${s.onbStep * 20}%` }}
          />
        </div>
        <span className="t-mono text-[var(--fk-text-50)]">{s.onbStep}/5</span>
      </div>

      {s.onbStep === 1 ? <StepPhone /> : null}
      {s.onbStep === 2 ? <StepAbout /> : null}
      {s.onbStep === 3 ? <StepVerify /> : null}
      {s.onbStep === 4 ? <StepServices /> : null}
      {s.onbStep === 5 ? <StepPlan /> : null}

      {s.onbStep !== 5 ? (
        <div className="px-5 pb-[26px] pt-[22px]">
          <PrimaryButton onClick={a.onbNext}>{cta}</PrimaryButton>
        </div>
      ) : null}
    </ScreenShell>
  );
}

function StepHead({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h1 className="t-onb-h1 m-0">{title}</h1>
      <p className="m-0 mt-[9px] font-sans text-[13px] leading-[1.55] text-[var(--fk-text-50)]">
        {body}
      </p>
    </>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <span className="t-mono-label text-[var(--fk-text-45)]">{children}</span>;
}

function StepPhone() {
  const s = useApp();
  const a = useActionsContext();
  return (
    <div className="px-5 pt-[30px]">
      <StepHead
        title="Start earning on FreelanceKar"
        body="7-day free trial, then a simple monthly plan. No commission on your jobs, ever."
      />

      <div className="mt-6 flex flex-col gap-2">
        <FieldLabel>MOBILE NUMBER</FieldLabel>
        <div className="flex items-center gap-[10px] rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[14px] py-[13px]">
          <span className="font-sans text-[14px] font-medium text-[var(--fk-text-50)]">+91</span>
          <input
            value={s.phone}
            onChange={(e) => a.setPhone(e.target.value)}
            placeholder="98765 43210"
            inputMode="numeric"
            aria-label="Mobile number"
            className="flex-1 border-0 bg-transparent font-sans text-[15px] font-medium tracking-[0.02em] text-[var(--fk-text)] outline-none"
          />
        </div>
      </div>

      {s.otpSent ? (
        <div className="mt-4 flex flex-col gap-2">
          <FieldLabel>OTP SENT · USE 1234</FieldLabel>
          <input
            value={s.otp}
            onChange={(e) => a.setOtp(e.target.value)}
            placeholder="1234"
            inputMode="numeric"
            aria-label="One-time password"
            className="t-otp rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[14px] py-[13px] text-[var(--fk-text)] outline-none"
          />
        </div>
      ) : null}

      {s.onbErrorMsg ? <ErrorNote>{s.onbErrorMsg}</ErrorNote> : null}

      <div className="mt-[26px] flex flex-col gap-[11px]">
        {BENEFITS.map((b) => (
          <div key={b} className="flex items-start gap-[11px]">
            <span className="text-[13px] text-[var(--fk-lime)]" aria-hidden>
              ✔
            </span>
            <span className="t-body-sm text-[var(--fk-text-60)]">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAbout() {
  const s = useApp();
  const a = useActionsContext();
  return (
    <div className="px-5 pt-[30px]">
      <StepHead title="About you" body="This is what clients see at the top of your profile." />

      <div className="mt-[22px] flex flex-col gap-[18px]">
        <div className="flex flex-col gap-2">
          <FieldLabel>NAME OR STUDIO NAME</FieldLabel>
          <input
            value={s.fName}
            onChange={(e) => a.setFName(e.target.value)}
            placeholder="e.g. Rahul Verma / Studio Aarambh"
            aria-label="Name or studio name"
            className="rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[14px] py-[13px] font-sans text-[14px] font-medium text-[var(--fk-text)] outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel>YOUR CITY</FieldLabel>
          <div className="flex flex-wrap gap-[7px]">
            {CITIES.map((c, i) => (
              <Chip key={c} on={s.fCityIdx === i} onClick={() => a.setFCity(i)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel>HOW FAR YOU’LL TRAVEL</FieldLabel>
          <div className="grid grid-cols-4 gap-[7px]">
            {RADIUS_LABELS.map((r, i) => (
              <Chip
                key={r}
                on={s.fRadiusIdx === i}
                onClick={() => a.setFRadius(i)}
                className="rounded-[11px] px-1 py-[11px]"
              >
                {r}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel>ONE LINE ABOUT YOUR WORK</FieldLabel>
          <textarea
            value={s.fBio}
            onChange={(e) => a.setFBio(e.target.value)}
            placeholder="Reels and product shoots for cafés and local brands."
            aria-label="One line about your work"
            className="box-border min-h-[62px] resize-none rounded-[13px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-[14px] py-3 font-sans text-[13.5px] leading-[1.5] text-[var(--fk-text)] outline-none"
          />
        </div>
      </div>

      {s.onbErrorMsg ? <ErrorNote>{s.onbErrorMsg}</ErrorNote> : null}
    </div>
  );
}

function StepVerify() {
  const s = useApp();
  const a = useActionsContext();
  return (
    <div className="px-5 pt-[30px]">
      <StepHead
        title="Get verified"
        body="Verified profiles get roughly 3× more enquiries. Your documents are never shown to clients."
      />

      <div className="mt-[22px] flex flex-col gap-[10px]">
        {KYC_ITEMS.map(([key, name, note]) => {
          const on = s.kyc[key];
          return (
            <button
              key={key}
              onClick={() => a.toggleKyc(key)}
              aria-pressed={on}
              className="flex cursor-pointer items-center gap-3 rounded-[14px] border bg-[var(--fk-card)] p-[14px] text-left text-[var(--fk-text)]"
              style={{ borderColor: on ? "var(--fk-lime)" : "var(--fk-line-08)" }}
            >
              <span
                className="text-[15px]"
                style={{ color: on ? "var(--fk-lime)" : "var(--fk-text-45)" }}
                aria-hidden
              >
                {on ? "✔" : "＋"}
              </span>
              <div className="flex flex-1 flex-col gap-[3px]">
                <span className="t-card-title">{name}</span>
                <span className="font-sans text-[11px] text-[var(--fk-text-50)]">{note}</span>
              </div>
              <span
                className="t-mono-sm"
                style={{ color: on ? "var(--fk-lime)" : "var(--fk-text-45)" }}
              >
                {on ? "DONE" : "UPLOAD"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-[14px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-[14px]">
        <div className="flex flex-col gap-[3px]">
          <span className="font-sans text-[13px] font-semibold">Bank account for payouts</span>
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

      {s.onbErrorMsg ? <ErrorNote>{s.onbErrorMsg}</ErrorNote> : null}

      <p className="m-0 mt-[14px] font-sans text-[11.5px] leading-[1.5] text-[var(--fk-text-40)]">
        Tap each item to simulate an upload.
      </p>
    </div>
  );
}

function StepServices() {
  const s = useApp();
  const a = useActionsContext();
  return (
    <div className="px-5 pt-[30px]">
      <StepHead
        title="What do you offer?"
        body="Add every service you do. Each one gets listed separately, so you show up in more searches."
      />

      <div className="mt-5 flex flex-col gap-[10px]">
        {s.svcRows.map((r, i) => (
          <div
            key={i}
            className="rounded-[15px] border border-[var(--fk-line-09)] bg-[var(--fk-card)] p-[13px]"
          >
            <div className="flex items-center justify-between gap-[10px]">
              <span className="t-mono-label text-[var(--fk-text-40)]">SERVICE {i + 1}</span>
              <button
                onClick={() => a.removeSvcRow(i)}
                aria-label={`Remove service ${i + 1}`}
                className="cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[var(--fk-text-40)]"
              >
                ✕
              </button>
            </div>

            <button
              onClick={() => a.updRow(i, { cat: (r.cat + 1) % SVC_CATS.length })}
              className="mt-[9px] flex w-full cursor-pointer items-center justify-between rounded-[11px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] px-3 py-[11px] text-left text-[var(--fk-text)]"
            >
              <span className="font-sans text-[13px] font-semibold">{SVC_CATS[r.cat]}</span>
              <span className="text-[10px] text-[var(--fk-text-40)]" aria-hidden>
                ▾
              </span>
            </button>

            <div className="mt-2 flex gap-[7px]">
              {SVC_TYPES.map(([name], ti) => (
                <Chip
                  key={name}
                  on={r.type === ti}
                  onClick={() => a.updRow(i, { type: ti })}
                  className="flex-1 rounded-[9px] px-1 py-[9px] text-[11.5px]"
                >
                  {name}
                </Chip>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-[9px] rounded-[11px] border border-[var(--fk-line-09)] bg-[var(--fk-nested)] px-3 py-[11px]">
              <span className="font-sans text-[13px] font-medium text-[var(--fk-text-50)]">₹</span>
              <input
                value={r.amount}
                onChange={(e) =>
                  a.updRow(i, { amount: e.target.value.replace(/\D/g, "").slice(0, 7) })
                }
                placeholder="1500"
                inputMode="numeric"
                aria-label={`Price for service ${i + 1}`}
                className="flex-1 border-0 bg-transparent font-sans text-[13.5px] font-semibold text-[var(--fk-text)] outline-none"
              />
              <span className="font-sans text-[11.5px] text-[var(--fk-text-45)]">
                {SVC_TYPES[r.type][1]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={a.addSvcRow}
        className="mt-[11px] w-full cursor-pointer rounded-[13px] border border-dashed border-[var(--fk-lime-bd-40)] bg-transparent p-[13px] font-sans text-[12.5px] font-semibold text-[var(--fk-lime)]"
      >
        + Add another service
      </button>

      {s.onbErrorMsg ? <ErrorNote>{s.onbErrorMsg}</ErrorNote> : null}
    </div>
  );
}

function StepPlan() {
  const s = useApp();
  const a = useActionsContext();
  return (
    <div className="px-5 pb-[26px] pt-[30px]">
      <StepHead
        title="Choose your plan"
        body="Clients pay you directly by UPI or cash — FreelanceKar never touches that money. This plan just keeps your profile listed and searchable."
      />

      <div className="mt-[22px] flex flex-col gap-[10px]">
        {PLANS.map((p, i) => (
          <button
            key={p.name}
            onClick={() => a.subscribeAndPublish(i)}
            className="cursor-pointer rounded-[15px] border bg-[var(--fk-card)] p-[15px] text-left text-[var(--fk-text)]"
            style={{ borderColor: i === s.planIdx ? "var(--fk-lime)" : "var(--fk-line-08)" }}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-[15px] font-semibold">{p.name}</span>
              <span
                className="font-sans text-[15px] font-semibold"
                style={{ color: i === s.planIdx ? "var(--fk-lime)" : "var(--fk-text)" }}
              >
                {p.price}
              </span>
            </div>
            <p className="m-0 mt-[6px] font-sans text-[12px] leading-[1.5] text-[var(--fk-text-55)]">
              {p.note}
            </p>
          </button>
        ))}
      </div>

      <p className="m-0 mt-4 font-sans text-[11.5px] leading-[1.5] text-[var(--fk-text-40)]">
        Billed via Razorpay. Cancel anytime — your profile stays live until the period ends.
      </p>
    </div>
  );
}
