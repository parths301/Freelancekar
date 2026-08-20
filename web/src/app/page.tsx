import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, CITIES, FEATURED_PROS } from "@/lib/data";
import { CtaBand, Eyebrow, NumberedStep, Section, StatPill } from "@/components/ui";

export const metadata: Metadata = {
  title: "Hire local freelancers, pay them directly",
  description:
    "Reel editors, photographers, designers and more in Nagpur, Indore, Jabalpur and Nashik. Compare quotes, hire in a tap, pay them directly — FreelanceKar takes zero commission.",
};

export default function HomePage() {
  return (
    <>
      <Section className="flex flex-col items-center pt-16 text-center md:pt-20">
        <Eyebrow>340+ VERIFIED FREELANCERS · 4 CITIES</Eyebrow>
        <h1 className="t-pretty t-hero mt-5 max-w-3xl">Hire real skills, near you.</h1>
        <p className="t-pretty mt-4 max-w-xl text-[16px] leading-relaxed text-fk-text-60">
          Reel editors, photographers, designers and more — in Nagpur, Indore, Jabalpur and
          Nashik. Compare freelancers, hire in a tap, pay them directly. FreelanceKar takes zero
          commission on your job.
        </p>

        <div className="mt-7 flex w-full max-w-xl flex-col gap-2.5 sm:flex-row">
          <div className="flex flex-1 items-center gap-2.5 rounded-[13px] border border-fk-line-11 bg-fk-card px-4 py-3.5 text-left">
            <span className="text-fk-text-45">⌕</span>
            <span className="text-[14.5px] text-fk-text-42">
              Try “reel editor in Nagpur” or “GST filing”
            </span>
          </div>
          <Link
            href="/city/nagpur"
            className="flex-none rounded-[13px] bg-fk-lime px-5.5 py-3.5 text-center text-[14px] font-semibold text-fk-on-lime transition-colors hover:bg-fk-lime-hover"
          >
            Get quotes
          </Link>
        </div>

        <div className="mt-8 flex gap-8 sm:gap-10">
          <StatPill value="Free" label="for clients, always" />
          <StatPill value="0%" label="commission taken" />
          <StatPill value="<1 hr" label="typical first reply" />
        </div>
      </Section>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-3 px-5 md:px-8">
        <span className="t-mono text-fk-text-35">LIVE IN</span>
        {CITIES.map((city) => (
          <Link
            key={city.slug}
            href={`/city/${city.slug}`}
            className="rounded-full border border-fk-line-09 bg-fk-card px-4 py-2 text-[13px] font-medium text-fk-text"
          >
            {city.name}
          </Link>
        ))}
        <span className="text-[12.5px] text-fk-text-40">— more cities every month</span>
      </div>

      <Section>
        <h2 className="t-h2">Browse by category</h2>
        <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={`/city/nagpur?category=${encodeURIComponent(cat.label)}`}
              className="flex flex-col gap-2 rounded-2xl border border-fk-line-08 bg-fk-card p-5 transition-colors hover:border-fk-lime-bd"
            >
              <span className="text-[15px] font-semibold">{cat.label}</span>
              <span className="t-mono text-fk-text-40">{cat.count} nearby →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex items-baseline justify-between">
          <h2 className="t-h2">Top-rated this month</h2>
          <Link href="/city/nagpur" className="text-[13px] font-semibold text-fk-lime">
            See all →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {FEATURED_PROS.map((pro) => (
            <div
              key={pro.name}
              className="overflow-hidden rounded-2xl border border-fk-line-08 bg-fk-card"
            >
              <div className="fk-stripe h-[120px]" />
              <div className="p-4.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15.5px] font-semibold">{pro.name}</span>
                  <span className="text-[11px] text-fk-lime">✔</span>
                </div>
                <div className="mt-1.5 text-[12.5px] leading-snug text-fk-text-50">
                  {pro.services}
                </div>
                <div className="mt-2.5 flex items-center gap-2.5 text-xs font-medium">
                  <span className="text-fk-amber">★ {pro.rating}</span>
                  <span className="text-fk-text-40">{pro.jobs} jobs</span>
                  <span className="text-fk-text-40">{pro.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="t-h2 text-center">Three steps, no surprises</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <NumberedStep
            n={1}
            title="Describe the work"
            body="Search or describe your job and locality — no account needed to start."
          />
          <NumberedStep
            n={2}
            title="Compare freelancers"
            body="See ratings, distance and verified IDs before you pick."
          />
          <NumberedStep
            n={3}
            title="Pay them directly"
            body="UPI or cash, straight to the freelancer. We never touch it."
          />
        </div>
        <div className="mt-6 text-center">
          <Link href="/how-it-works" className="text-[13px] font-semibold text-fk-lime">
            See the full guide →
          </Link>
        </div>
      </Section>

      <Section>
        <CtaBand
          title="Do this work for a living? List every service you offer."
          body="One profile, many skills. No commission, ever — pay a simple monthly plan and keep 100% of what you earn."
          ctaLabel="Join as a freelancer"
          ctaHref="/join-as-freelancer"
          footnote="Starter from ₹299/mo · verify in about 5 minutes"
        />
      </Section>
    </>
  );
}
