"use client";

import { activePro, selectedPackage } from "@/lib/selectors";
import { useActionsContext, useApp } from "@/lib/store";
import { ScreenShell } from "../shell";
import { InlineButton, InlineOutlineButton, SectionTitle, Stripe } from "../ui";

export function Profile() {
  const s = useApp();
  const a = useActionsContext();
  const pro = activePro(s);
  const saved = s.saved.includes(pro.id);

  return (
    <ScreenShell>
      <div className="relative">
        <Stripe className="mt-3 h-[104px]" />
        <button
          onClick={() => a.go(s.searchLabel ? "results" : "home")}
          aria-label="Back"
          className="absolute left-4 top-3 h-8 w-8 cursor-pointer rounded-full border border-[var(--fk-line-12)] text-[14px] text-[var(--fk-text)]"
          style={{ background: "rgba(11,11,12,.72)" }}
        >
          ←
        </button>
      </div>

      <div className="-mt-[30px] flex items-end justify-between px-5">
        <Stripe
          small
          className="h-[72px] w-[72px] rounded-[20px] border-[3px] border-[var(--fk-bg)]"
        />
        <div className="flex gap-2 pb-1">
          <button
            onClick={() => a.toggleSave(pro.id, pro.first)}
            role="switch"
            aria-checked={saved}
            aria-label={saved ? `Remove ${pro.first} from saved` : `Save ${pro.first}`}
            className="cursor-pointer rounded-[10px] border border-[var(--fk-line-14)] bg-transparent px-[11px] py-[7px] text-[13px]"
            style={{ color: saved ? "var(--fk-lime)" : "rgba(242,242,240,.7)" }}
          >
            {saved ? "♥" : "♡"}
          </button>
          <span className="rounded-[10px] border border-[var(--fk-line-14)] px-[11px] py-[7px] text-[13px] text-[rgba(242,242,240,.7)]">
            ↗
          </span>
        </div>
      </div>

      <div className="px-5 pt-3">
        <div className="flex items-center gap-[7px]">
          <h2 className="t-h1-sm m-0">{pro.name}</h2>
          <span className="rounded-[6px] bg-[var(--fk-lime-badge)] px-[7px] py-[3px] font-mono text-[10px] font-semibold text-[var(--fk-lime)]">
            KYC ✔
          </span>
        </div>
        <p className="m-0 mt-[6px] font-sans text-[13px] leading-[1.45] text-[var(--fk-text-55)]">
          {pro.tagline}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 px-5 pt-4 text-center">
        <Stat value={String(pro.rating)} label={`${pro.jobs} jobs`} valueColor="var(--fk-amber)" />
        <Stat value="98%" label="completion" />
        <Stat value={pro.replyIn} label="replies in" />
        <Stat value={pro.years} label="on platform" />
      </div>

      <div className="px-5 pt-6">
        <SectionTitle
          className="mb-[11px]"
          title="Services offered"
          right={
            <span className="font-mono text-[11px] text-[var(--fk-text-40)]">
              {pro.packages.length} ACTIVE
            </span>
          }
        />
        <div className="flex flex-col gap-[9px]">
          {pro.packages.map((p, i) => (
            <button
              key={p.name}
              onClick={() => a.pickService(i)}
              aria-pressed={i === s.svcIdx}
              className="flex cursor-pointer items-center justify-between gap-[10px] rounded-[14px] border bg-[var(--fk-card)] px-[14px] py-[13px] text-left text-[var(--fk-text)]"
              style={{ borderColor: i === s.svcIdx ? "var(--fk-lime)" : "var(--fk-line-08)" }}
            >
              <div className="flex flex-col gap-[3px]">
                <span className="t-card-title">{p.name}</span>
                <span className="font-sans text-[11px] text-[var(--fk-text-50)]">{p.terms}</span>
              </div>
              <span className="flex-none font-sans text-[13px] font-semibold">{p.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6">
        <h3 className="t-h3 m-0 mb-[11px]">Recent work</h3>
        <div className="grid grid-cols-3 gap-[7px]">
          <Stripe className="aspect-[3/4] rounded-[11px]" />
          <Stripe className="aspect-[3/4] rounded-[11px]" />
          <Stripe className="flex aspect-[3/4] items-center justify-center rounded-[11px] font-sans text-[12px] font-medium text-[var(--fk-text-60)]">
            +14
          </Stripe>
        </div>
      </div>

      <div className="px-5 pb-[30px] pt-6">
        <h3 className="t-h3 m-0 mb-[11px]">Reviews</h3>
        <div className="rounded-[14px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] p-[14px]">
          <div className="flex items-center gap-[9px]">
            <Stripe small className="h-7 w-7 rounded-full" />
            <span className="font-sans text-[12.5px] font-semibold">{pro.reviewer}</span>
            <span className="ml-auto font-sans text-[11px] font-medium text-[var(--fk-amber)]">
              ★ 5.0
            </span>
          </div>
          <p className="t-body-sm t-pretty m-0 mt-[10px] text-[var(--fk-text-60)]">{pro.review}</p>
        </div>
      </div>
    </ScreenShell>
  );
}

function Stat({
  value,
  label,
  valueColor,
}: {
  value: string;
  label: string;
  valueColor?: string;
}) {
  return (
    <div className="rounded-[12px] border border-[var(--fk-line-08)] bg-[var(--fk-card)] px-1 py-[10px]">
      <div className="font-sans text-[14px] font-semibold" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="mt-[2px] font-sans text-[9.5px] text-[var(--fk-text-45)]">{label}</div>
    </div>
  );
}

/** Replaces the tab bar while a freelancer profile is open. */
export function ProfileActionBar() {
  const s = useApp();
  const a = useActionsContext();
  const pro = activePro(s);
  const pkg = selectedPackage(s);

  return (
    <div className="relative z-[1] flex flex-none items-center justify-between gap-3 border-t border-[var(--fk-line-07)] bg-[var(--fk-bar)] px-5 pb-5 pt-[14px]">
      <div className="flex flex-col">
        <span className="font-sans text-[15px] font-semibold">{pkg.price}</span>
        <span className="font-sans text-[10.5px] text-[var(--fk-text-45)]">{pkg.terms}</span>
      </div>
      <div className="flex gap-2">
        <InlineOutlineButton onClick={() => a.messagePro(pro)}>Chat</InlineOutlineButton>
        <InlineButton className="px-[18px]" onClick={() => a.openHire()}>
          Hire
        </InlineButton>
      </div>
    </div>
  );
}
