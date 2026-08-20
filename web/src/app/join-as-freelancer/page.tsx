import Link from "next/link";
import type { Metadata } from "next";
import { RATE_TABLE, SVC_CATS } from "@/lib/data";
import { CtaBand, Eyebrow, NumberedStep, Section } from "@/components/ui";
import SignupStub from "@/components/SignupStub";

export const metadata: Metadata = {
  title: "Join as a freelancer",
  description:
    "List every service you offer, get matched with clients in your own city, and keep 100% of what you earn. No commission, ever — just a simple monthly plan.",
};

export default function JoinAsFreelancerPage() {
  return (
    <>
      <Section className="grid gap-12 pt-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <Eyebrow>7-DAY FREE TRIAL</Eyebrow>
          <h1 className="t-pretty mt-4 text-[40px] font-bold leading-[1.06] tracking-tight md:text-[52px]">
            Turn your skill into income, near home.
          </h1>
          <p className="t-pretty mt-4 max-w-md text-[16px] leading-relaxed text-fk-text-60">
            List every service you offer, get matched with clients in your own city, and keep
            100% of what you earn — no commission, ever.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-[13px] bg-fk-lime px-6.5 py-3.5 text-[14px] font-semibold text-fk-on-lime">
              Get started free
            </span>
            <span className="text-[12.5px] font-medium text-fk-text-50">
              7-day free trial · then from ₹299/mo
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-8">
            <div className="flex flex-col gap-0.5">
              <span className="text-[19px] font-semibold">340+</span>
              <span className="text-xs text-fk-text-45">verified freelancers</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[19px] font-semibold">12,000+</span>
              <span className="text-xs text-fk-text-45">jobs completed</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[19px] font-semibold">4 cities</span>
              <span className="text-xs text-fk-text-45">and growing</span>
            </div>
          </div>
        </div>

        <SignupStub />
      </Section>

      <Section>
        <h2 className="t-h2 text-center">Four steps to your first lead</h2>
        <div className="mt-7 grid gap-3.5 sm:grid-cols-2 md:grid-cols-4">
          <NumberedStep n={1} title="Sign up with your phone" body="One OTP, no paperwork upfront." />
          <NumberedStep
            n={2}
            title="Verify Aadhaar + PAN"
            body="Builds client trust before you list services."
          />
          <NumberedStep
            n={3}
            title="List services & pricing"
            body="As many services as you actually offer."
          />
          <NumberedStep
            n={4}
            title="Start getting leads"
            body="Requests from clients near you, same day."
          />
        </div>
      </Section>

      <Section>
        <div className="flex items-baseline justify-between">
          <h2 className="t-h2">What people list</h2>
          <span className="t-mono text-fk-text-40">{SVC_CATS.length} CATEGORIES LIVE</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {SVC_CATS.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-fk-line-09 bg-fk-card px-4 py-2.5 text-[13px] font-medium"
            >
              {cat}
            </span>
          ))}
        </div>
      </Section>

      <Section className="grid gap-14 md:grid-cols-2">
        <div>
          <h2 className="t-h2">Typical rates on the platform</h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fk-text-55">
            What freelancers are quoting right now, across all four cities.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-fk-line-08">
            {RATE_TABLE.slice(0, 4).map((row, i) => (
              <div
                key={row.job}
                className={`flex items-center justify-between gap-4 bg-fk-card px-4 py-3.5 ${
                  i < 3 ? "border-b border-fk-line-07" : ""
                }`}
              >
                <span className="text-[13.5px] font-semibold">{row.job}</span>
                <span className="flex-none text-[14px] font-semibold">{row.range}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="t-h2">Why freelancers choose us</h2>
          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-start gap-3">
              <span className="text-sm text-fk-lime">✔</span>
              <span className="text-[13.5px] leading-relaxed text-fk-text-65">
                No commission, ever — a flat monthly plan, that&apos;s it
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm text-fk-lime">✔</span>
              <span className="text-[13.5px] leading-relaxed text-fk-text-65">
                Leads from your own city, not competing nationally
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm text-fk-lime">✔</span>
              <span className="text-[13.5px] leading-relaxed text-fk-text-65">
                Clients pay you directly — UPI, bank transfer or cash
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sm text-fk-lime">✔</span>
              <span className="text-[13.5px] leading-relaxed text-fk-text-65">
                We never touch your money — no waiting on a payout
              </span>
            </div>
          </div>
          <Link
            href="/pricing"
            className="mt-5.5 block rounded-2xl border border-fk-line-10 bg-fk-card p-4.5"
          >
            <span className="text-[14px] font-semibold">See full pricing →</span>
            <p className="mt-1.5 text-[12.5px] text-fk-text-50">
              Plans from ₹299/month, free for your first 7 days
            </p>
          </Link>
        </div>
      </Section>

      <Section className="pb-4">
        <CtaBand
          title="7-day free trial, live now."
          body="Start free in Nagpur, Indore, Jabalpur or Nashik — no commission, ever."
          ctaLabel="Get started free"
          ctaHref="/pricing"
        />
      </Section>
    </>
  );
}
