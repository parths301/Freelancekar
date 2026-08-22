import Link from "next/link";
import type { Metadata } from "next";
import { PLANS } from "@/lib/data";
import { CtaBand, FaqCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Freelancer subscriptions from ₹299/mo. Clients never pay a fee, and freelancers keep 100% of every job — FreelanceKar takes zero platform cut.",
};

const COMPARE_ROWS: [string, string, string][] = [
  ["Services listed", "2", "Unlimited"],
  ["Leads & quotes", "Unlimited", "Unlimited"],
  ["Priority placement", "—", "✔"],
  ["Verified badge boost", "—", "✔"],
  ["Platform cut on jobs", "₹0", "₹0"],
];

const FAQS = [
  {
    q: "Do clients pay anything at all?",
    a: "No — searching, comparing freelancers and messaging are free forever for clients. You pay only the freelancer, directly, for the job.",
  },
  {
    q: "What happens after my 7-day trial?",
    a: "You're billed automatically on your chosen plan via Razorpay. Cancel anytime — your profile stays live until the period ends.",
  },
  {
    q: "Is there any fee on top of my price?",
    a: "Never. Whatever you quote is exactly what lands in your account, by UPI or cash, directly from the client.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, upgrade or downgrade anytime from your dashboard — it takes effect from the next billing cycle.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-14 text-center">
        <h1 className="t-h1 t-pretty mx-auto max-w-xl">Simple pricing. Zero platform cut, ever.</h1>
        <p className="t-pretty mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-fk-text-60">
          Clients never pay a fee. Freelancers pick a monthly plan and keep 100% of what they earn
          on every job — FreelanceKar is never in the payment.
        </p>
      </Section>

      <Section className="grid gap-5 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`relative rounded-3xl border bg-fk-card p-7 ${
              plan.featured ? "border-[1.5px] border-fk-lime" : "border-fk-line-10"
            }`}
          >
            {plan.featured ? (
              <span className="absolute -top-3 right-6 rounded-md bg-fk-lime px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-fk-on-lime">
                MOST POPULAR
              </span>
            ) : null}
            <span
              className={`t-mono-label ${plan.featured ? "text-fk-lime" : "text-fk-text-45"}`}
            >
              {plan.name.toUpperCase()}
            </span>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[44px] font-bold tracking-tight">{plan.priceLabel}</span>
              <span className="text-sm text-fk-text-45">/ month</span>
            </div>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-fk-text-55">{plan.tagline}</p>
            <Link
              href="/join-as-freelancer"
              className={`mt-5.5 block rounded-xl py-3.5 text-center text-[13.5px] font-semibold ${
                plan.featured
                  ? "bg-fk-lime text-fk-on-lime"
                  : "border border-fk-line-14 bg-white/6 text-fk-text"
              }`}
            >
              Start 7-day free trial
            </Link>
            <div className="mt-6 flex flex-col gap-2.5">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <span className="text-[13px] text-fk-lime">✔</span>
                  <span className="text-[13px] leading-relaxed text-fk-text-65">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-fk-lime-bd-22 bg-fk-lime-badge/10 p-5.5 sm:flex-row sm:items-center">
          <span className="t-mono-label flex-none whitespace-nowrap text-fk-lime">
            FOR CLIENTS
          </span>
          <p className="text-[14px] leading-relaxed text-fk-text-72">
            Searching, comparing quotes and messaging freelancers are always free. FreelanceKar
            never adds a fee on top of the freelancer&apos;s price — you pay them directly.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="t-h2 text-[26px]">Compare plans</h2>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-fk-line-08">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[1.6fr_1fr_1fr] border-b border-fk-line-08 bg-fk-card px-4.5 py-3.5">
              <span className="text-xs font-semibold text-fk-text-50">Feature</span>
              <span className="text-center text-xs font-semibold">Starter</span>
              <span className="text-center text-xs font-semibold text-fk-lime">Pro</span>
            </div>
            {COMPARE_ROWS.map(([feature, starter, pro], i) => (
              <div
                key={feature}
                className={`grid grid-cols-[1.6fr_1fr_1fr] px-4.5 py-3.5 ${
                  i < COMPARE_ROWS.length - 1 ? "border-b border-fk-line-06" : ""
                }`}
              >
                <span className="text-[13px] text-fk-text-70">{feature}</span>
                <span className="text-center text-[13px] font-medium text-fk-text-30">
                  {starter === "—" ? starter : <span className="text-fk-text">{starter}</span>}
                </span>
                <span
                  className={`text-center text-[13px] font-medium ${
                    pro === "✔" ? "text-fk-lime" : "text-fk-text"
                  }`}
                >
                  {pro}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="t-h2 text-[26px]">Pricing questions</h2>
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          {FAQS.map((faq) => (
            <FaqCard key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </Section>

      <Section className="pb-4">
        <CtaBand
          title="7 days free for every new freelancer."
          body="Try Starter or Pro on us — cancel anytime before the trial ends and pay nothing."
          ctaLabel="Get started free"
          ctaHref="/join-as-freelancer"
        />
      </Section>
    </>
  );
}
