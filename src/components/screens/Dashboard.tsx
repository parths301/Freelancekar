"use client";

import { CITIES } from "@/lib/data";
import { money } from "@/lib/format";
import { myServices, paymentTotals, profileStrength, strengthNote } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { BellButton } from "../common";
import { ScreenShell } from "../shell";
import { InlineButton, InlineOutlineButton, SectionTitle } from "../ui";

export function Dashboard() {
  const s = useApp();
  const a = useActionsContext();
  const city = CITIES[s.fCityIdx];
  const first = s.fName.trim().split(" ")[0] || "there";
  const { payDue, payGot, payTotal } = paymentTotals(s);
  const strength = profileStrength(s);

  return (
    <ScreenShell>
      <div className="flex items-center justify-between px-5 pt-[18px]">
        <div className="flex flex-col gap-[2px]">
          <span className="font-sans text-[12px] text-[var(--fk-text-50)]">Good morning,</span>
          <span className="font-sans text-[19px] font-semibold tracking-[-0.02em]">{first}</span>
        </div>
        <div className="flex items-center gap-[9px]">
          <BellButton size={34} />
          <button
            onClick={a.toggleAvailable}
            role="switch"
            aria-checked={s.available}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--fk-line-09)] bg-[var(--fk-card)] px-3 py-[7px] text-[var(--fk-text)]"
          >
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: s.available ? "var(--fk-lime)" : "var(--fk-text-35)" }}
            />
            <span className="font-sans text-[12px] font-medium">
              {s.available ? "Available" : "Not taking work"}
            </span>
          </button>
        </div>
      </div>

      {s.kycRejected && s.onboarded ? (
        <div className="px-5 pt-[18px]">
          <div
            className="flex items-start gap-[11px] rounded-[16px] border p-[14px]"
            style={{ background: "var(--fk-alert-10)", borderColor: "var(--fk-alert-bd-40)" }}
          >
            <span className="mt-px flex-none text-[13px] text-[var(--fk-alert)]" aria-hidden>
              !
            </span>
            <div className="flex flex-1 flex-col gap-[3px]">
              <span className="font-sans text-[13px] font-semibold text-[var(--fk-alert)]">
                Verification incomplete
              </span>
              <span className="t-meta t-pretty text-[var(--fk-text-60)]">
                Your selfie is missing, so your profile shows as unverified. Verified freelancers get
                ~3× more enquiries.
              </span>
              <button
                onClick={a.fixKyc}
                className="mt-[7px] cursor-pointer self-start rounded-[9px] border-0 px-3 py-2 font-sans text-[11.5px] font-semibold"
                style={{ background: "var(--fk-alert)", color: "var(--fk-on-alert)" }}
              >
                Finish verification
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="px-5 pt-5">
        <button
          onClick={() => a.go("fearn")}
          className="block w-full cursor-pointer rounded-[20px] border-0 bg-[var(--fk-lime)] p-[18px] text-left text-[var(--fk-on-lime)]"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[11px] font-medium tracking-[0.06em] opacity-65">
              EARNINGS · AUGUST
            </span>
            <span className="font-sans text-[11px] font-semibold opacity-70">All payments →</span>
          </div>
          <div className="t-big mt-2">{money(payTotal)}</div>
          <div
            className="mt-3 flex gap-4 border-t pt-3"
            style={{ borderColor: "var(--fk-on-lime-divider)" }}
          >
            <Figure value={money(payDue)} label="pending pay" />
            <Figure value={money(payGot)} label="received" />
            <Figure value="+22%" label="vs July" />
          </div>
        </button>
      </div>

      <div className="px-5 pt-[18px]">
        <div className="rounded-[16px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-[14px]">
          <div className="flex items-center justify-between">
            <span className="t-card-title">Profile strength</span>
            <span className="font-mono text-[12px] font-semibold text-[var(--fk-lime)]">
              {strength}%
            </span>
          </div>
          <div className="my-[10px] h-[5px] overflow-hidden rounded-[3px] bg-[var(--fk-track)]">
            <div
              className="h-full bg-[var(--fk-lime)] transition-[width] duration-300"
              style={{ width: `${strength}%` }}
            />
          </div>
          <span className="t-meta text-[var(--fk-text-50)]">{strengthNote(s)}</span>
        </div>
      </div>

      <div className="px-5 pt-[22px]">
        <SectionTitle
          className="mb-[11px]"
          title="New requests"
          right={
            <span className="rounded-[6px] bg-[var(--fk-lime)] px-[7px] py-[3px] font-mono text-[10px] font-semibold text-[var(--fk-on-lime)]">
              {s.reqs.length} NEW
            </span>
          }
        />
        {s.reqs.length === 0 ? (
          <div className="t-body-sm rounded-[15px] border border-dashed border-[var(--fk-line-14)] bg-[var(--fk-card)] p-[22px] text-center text-[var(--fk-text-45)]">
            All caught up. New jobs matching your services in {city} land here.
          </div>
        ) : (
          <div className="flex flex-col gap-[9px]">
            {s.reqs.map((r) => (
              <div
                key={r.id}
                className="rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-[14px] py-[13px]"
              >
                <div className="flex items-center justify-between gap-[10px]">
                  <span className="t-card-title">{r.title}</span>
                  <span className="flex-none font-sans text-[13px] font-semibold">{r.budget}</span>
                </div>
                <div className="mt-1 font-sans text-[11.5px] text-[var(--fk-text-50)]">{r.meta}</div>
                <div className="mt-[11px] flex gap-2">
                  <InlineOutlineButton className="flex-1" onClick={() => a.passRequest(r.id)}>
                    Pass
                  </InlineOutlineButton>
                  <InlineButton className="flex-1 px-0 py-[9px]" onClick={() => a.openQuote(r.id)}>
                    Send quote
                  </InlineButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pb-[26px] pt-[22px]">
        <h3 className="t-h3 m-0 mb-[11px]">Your services</h3>
        <div className="overflow-hidden rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)]">
          {myServices(s).map((svc) => (
            <div
              key={svc.name + svc.price}
              className="flex items-center gap-[11px] border-b border-[var(--fk-line-07)] px-[14px] py-[13px]"
            >
              <div className="flex flex-1 flex-col gap-[2px]">
                <span className="font-sans text-[13px] font-semibold">{svc.name}</span>
                <span className="font-sans text-[11px] text-[var(--fk-text-50)]">{svc.terms}</span>
              </div>
              <span className="font-sans text-[12.5px] font-semibold">{svc.price}</span>
            </div>
          ))}
          <button
            onClick={a.addMoreServices}
            className="w-full cursor-pointer border-0 bg-transparent px-[14px] py-[13px] text-left font-sans text-[12.5px] font-semibold text-[var(--fk-lime)]"
          >
            + Add a service
          </button>
        </div>
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
