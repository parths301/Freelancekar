import type { ReactNode } from "react";
import Link from "next/link";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-fk-lime-badge px-2.5 py-1.5 text-[11px] font-semibold tracking-wide text-fk-lime">
      {children}
    </span>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-5 pt-20 md:px-8 ${className}`}>{children}</section>
  );
}

export function NumberedStep({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-fk-line-09 bg-fk-card p-5">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fk-lime-badge font-mono text-[11px] font-semibold text-fk-lime">
        {n}
      </span>
      <span className="mt-3.5 block text-[15px] font-semibold">{title}</span>
      <p className="mt-1.5 text-[13px] leading-relaxed text-fk-text-58">{body}</p>
    </div>
  );
}

export function FaqCard({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-fk-line-08 bg-fk-card p-5">
      <span className="text-[14.5px] font-semibold">{q}</span>
      <p className="t-pretty mt-2 text-[13px] leading-relaxed text-fk-text-58">{a}</p>
    </div>
  );
}

export function CheckLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[13px] text-fk-lime">✔</span>
      <span className="text-[13px] leading-relaxed text-fk-text-65">{children}</span>
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-[13px] bg-fk-lime px-6.5 py-3.5 text-center text-[14px] font-semibold text-fk-on-lime transition-colors hover:bg-fk-lime-hover ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-[13px] border border-fk-line-12 bg-fk-card px-6.5 py-3.5 text-center text-[14px] font-semibold text-fk-text transition-colors hover:border-fk-lime-bd ${className}`}
    >
      {children}
    </Link>
  );
}

export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xl font-semibold">{value}</span>
      <span className="text-xs text-fk-text-45">{label}</span>
    </div>
  );
}

export function CtaBand({
  title,
  body,
  ctaLabel,
  ctaHref,
  footnote,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  footnote?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-8 rounded-3xl bg-fk-lime p-9 text-fk-on-lime md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <h2 className="t-pretty text-[28px] font-bold leading-tight tracking-tight md:text-[34px]">
          {title}
        </h2>
        <p className="t-pretty mt-3 max-w-xl text-[15px] leading-relaxed opacity-[0.72]">{body}</p>
      </div>
      <div className="flex flex-none flex-col gap-2.5">
        <Link
          href={ctaHref}
          className="rounded-[13px] bg-fk-on-lime px-6.5 py-3.5 text-center text-[14px] font-semibold text-fk-lime"
        >
          {ctaLabel}
        </Link>
        {footnote ? (
          <span className="text-center text-xs font-medium opacity-65">{footnote}</span>
        ) : null}
      </div>
    </div>
  );
}
