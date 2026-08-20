"use client";

import { CITIES } from "@/lib/data";
import { kycCount, validSvcRows } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { ScreenShell } from "../shell";
import { Stripe } from "../ui";

export function FreelancerProfile() {
  const s = useApp();
  const a = useActionsContext();
  const kyc = kycCount(s);
  const name = s.fName.trim() || "Your name";

  return (
    <ScreenShell className="px-5 pb-[26px] pt-[18px]">
      <h1 className="t-h1 m-0 mb-[18px]">Profile</h1>

      <div className="flex items-center gap-[13px]">
        <Stripe small className="h-14 w-14 rounded-[16px] border border-[var(--fk-line-09)]" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-[6px]">
            <span className="t-screen-title">{name}</span>
            <span className="rounded-[5px] bg-[var(--fk-lime-badge)] px-[6px] py-[3px] font-mono text-[9.5px] font-semibold text-[var(--fk-lime)]">
              {kyc === 3 ? "KYC ✔" : `KYC ${kyc}/3`}
            </span>
          </div>
          <span className="font-sans text-[12px] text-[var(--fk-text-50)]">
            Freelancer · {CITIES[s.fCityIdx]}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <Stat value={String(validSvcRows(s).length)} label="services" />
        <Stat value={String(s.quotesSent)} label="quotes sent" />
        <Stat value={String(s.fGigs.length)} label="active gigs" />
      </div>

      <p className="m-0 mt-[18px] font-sans text-[13px] leading-[1.55] text-[var(--fk-text-60)]">
        {s.fBio.trim() || "Add a line about your work so clients know what you do."}
      </p>

      <div className="mt-5 flex flex-col overflow-hidden rounded-[15px] border border-[var(--fk-line-08)] bg-[var(--fk-card)]">
        <button
          onClick={a.addMoreServices}
          className="cursor-pointer border-0 border-b border-[var(--fk-line-07)] bg-transparent p-[14px] text-left font-sans text-[13px] font-medium text-[var(--fk-text)]"
        >
          Edit services &amp; pricing
        </button>
        <button
          onClick={() => a.go("fearn")}
          className="flex cursor-pointer items-center justify-between border-0 border-b border-[var(--fk-line-07)] bg-transparent p-[14px] text-left font-sans text-[13px] font-medium text-[var(--fk-text)]"
        >
          <span>Payments &amp; bank details</span>
          <span className="text-[12px] text-[var(--fk-lime)]">→</span>
        </button>
        <button
          onClick={a.backToClient}
          className="flex cursor-pointer items-center justify-between border-0 bg-transparent p-[14px] text-left font-sans text-[13px] font-semibold text-[var(--fk-lime)]"
        >
          <span>Switch to client mode</span>
          <span className="text-[12px]">→</span>
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
