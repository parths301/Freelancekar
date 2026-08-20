import Link from "next/link";
import type { Metadata } from "next";
import { CheckLine, FaqCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How clients hire and pay freelancers directly, and how freelancers get found and paid — with zero commission on any job.",
};

const CLIENT_STEPS = [
  {
    title: "Describe the work & locality",
    body: "No account needed to start — post what you need done and where.",
  },
  {
    title: "Compare quotes & profiles",
    body: "Ratings, response time, distance and verified IDs, side by side.",
  },
  {
    title: "Agree a price in chat",
    body: "Talk it through with the freelancer and settle on a fixed price before work starts.",
  },
  {
    title: "Pay them directly",
    body: "UPI or cash, straight to the freelancer, when you're happy with the work.",
  },
];

const FREELANCER_STEPS = [
  {
    title: "Verify with Aadhaar + PAN",
    body: "Takes about 5 minutes — clients only ever see the verified badge.",
  },
  {
    title: "List your services & pricing",
    body: "One profile, as many services as you actually offer.",
  },
  {
    title: "Respond to requests near you",
    body: "Send a quote with your price, delivery window and a note.",
  },
  {
    title: "Deliver, get paid — no commission",
    body: "The client pays you directly. You keep 100% of every job, every time.",
  },
];

const FAQS = [
  {
    q: "Does FreelanceKar take a cut of my job?",
    a: "No. Clients pay nothing extra, and freelancers keep 100% of every job — the platform runs on a simple freelancer subscription, not commission.",
  },
  {
    q: "What if the work is never delivered?",
    a: "Raise an issue and support in your city mediates within 24 hours, and can pause the freelancer's listing. Since you only pay on delivery, your money was never at risk.",
  },
  {
    q: "How are freelancers verified?",
    a: "Aadhaar and a live selfie before anyone can list services; PAN and bank details before they can be marked verified for payouts.",
  },
  {
    q: "Can I hire someone hyperlocal?",
    a: "Yes — filter by distance or search a locality. Every freelancer lists the radius they'll travel.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section className="pt-14 text-center">
        <h1 className="t-h1 t-pretty mx-auto max-w-2xl">How FreelanceKar works</h1>
        <p className="t-pretty mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-fk-text-60">
          One clear flow for hiring, and one honest pricing model for freelancers — no commission,
          ever.
        </p>
      </Section>

      <Section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-fk-line-09 bg-fk-card p-7">
          <span className="t-mono-label text-fk-lime">FOR CLIENTS</span>
          <h2 className="t-h3 mt-2.5">Hire without the risk</h2>
          <div className="mt-5 flex flex-col gap-4">
            {CLIENT_STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-fk-lime-badge font-mono text-[11px] font-semibold text-fk-lime">
                  {i + 1}
                </span>
                <div>
                  <span className="text-[14px] font-semibold">{step.title}</span>
                  <p className="mt-1 text-[13px] leading-relaxed text-fk-text-60">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/city/nagpur"
            className="mt-6 inline-block rounded-xl bg-fk-lime px-5 py-3.5 text-[13.5px] font-semibold text-fk-on-lime"
          >
            Find a freelancer
          </Link>
        </div>

        <div className="rounded-3xl border border-fk-line-09 bg-fk-card p-7">
          <span className="t-mono-label text-fk-lime">FOR FREELANCERS</span>
          <h2 className="t-h3 mt-2.5">Get found, get paid</h2>
          <div className="mt-5 flex flex-col gap-4">
            {FREELANCER_STEPS.map((step, i) => (
              <div key={step.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-fk-lime-badge font-mono text-[11px] font-semibold text-fk-lime">
                  {i + 1}
                </span>
                <div>
                  <span className="text-[14px] font-semibold">{step.title}</span>
                  <p className="mt-1 text-[13px] leading-relaxed text-fk-text-60">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/join-as-freelancer"
            className="mt-6 inline-block rounded-xl border border-fk-lime-bd-45 bg-fk-lime-badge px-5 py-3.5 text-[13.5px] font-semibold text-fk-lime"
          >
            Join as a freelancer
          </Link>
        </div>
      </Section>

      <Section>
        <div className="grid gap-7 rounded-3xl border border-fk-line-09 bg-fk-card p-8 md:grid-cols-2 md:items-center">
          <div>
            <span className="t-mono-label text-fk-lime">HOW PAYMENT WORKS</span>
            <h2 className="t-h3 mt-2.5">You pay the freelancer, not us</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-fk-text-60">
              Agree the price in chat and settle it directly — UPI, bank transfer or cash, on your
              own terms. FreelanceKar never holds your money, so there&apos;s nothing frozen and
              nothing to wait on. If a job goes wrong, support mediates and can pause the
              freelancer&apos;s listing while it&apos;s sorted out.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CheckLine>ID-verified freelancers only</CheckLine>
            <CheckLine>Every quote is a fixed price, no fees added</CheckLine>
            <CheckLine>Ratings and reviews stick to every order</CheckLine>
            <CheckLine>Report or block anyone, any time</CheckLine>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="t-h2">Common questions</h2>
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          {FAQS.map((faq) => (
            <FaqCard key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </Section>

      <Section className="flex flex-col justify-center gap-3 pb-4 sm:flex-row">
        <Link
          href="/city/nagpur"
          className="rounded-[13px] bg-fk-lime px-6.5 py-3.5 text-center text-[14px] font-semibold text-fk-on-lime"
        >
          Find a freelancer
        </Link>
        <Link
          href="/join-as-freelancer"
          className="rounded-[13px] border border-fk-line-12 bg-fk-card px-6.5 py-3.5 text-center text-[14px] font-semibold text-fk-text"
        >
          Join as a freelancer
        </Link>
      </Section>
    </>
  );
}
