import Link from "next/link";
import type { Metadata } from "next";
import { RATE_TABLE } from "@/lib/data";
import { Eyebrow, FaqCard, Section } from "@/components/ui";
import QuoteStub from "@/components/QuoteStub";

export const metadata: Metadata = {
  title: "Post a job",
  description:
    "Tell us what you need done and get matched with verified freelancers near you, usually within the hour. Free to post, zero platform fee, ever.",
};

const POPULAR = [
  "Video editors",
  "Social media managers",
  "Photographers",
  "Graphic designers",
  "Content writers",
  "Web developers",
  "Voiceover artists",
  "GST consultants",
];

const FEATURES = [
  {
    title: "Free to post, always",
    body: "No platform fee, no fee on the freelancer's price — ever.",
  },
  {
    title: "Verified pros only",
    body: "Aadhaar and a live selfie checked before anyone can quote you.",
  },
  {
    title: "You pay only when happy",
    body: "You pay the freelancer directly once you approve the delivery — nothing upfront.",
  },
];

const FAQS = [
  {
    q: "How fast will I get quotes?",
    a: "Most jobs get a first quote within an hour, and three to five the same day.",
  },
  {
    q: "Do I pay any platform fee?",
    a: "No. You pay exactly the freelancer's quoted price, nothing added.",
  },
  {
    q: "Is my money safe?",
    a: "You pay the freelancer directly on delivery — nothing leaves your account up front, and support mediates if a job goes wrong.",
  },
  {
    q: "Can I hire hyperlocal?",
    a: "Yes — filter by distance or search a locality directly.",
  },
];

export default function PostAJobPage() {
  return (
    <>
      <Section className="flex flex-col items-center pb-0 pt-16 text-center md:pt-20">
        <Eyebrow>Free for clients · always</Eyebrow>
        <h1 className="t-pretty mt-4 text-[36px] font-bold leading-[1.05] tracking-tight md:text-[50px]">
          Tell us what you need done.
        </h1>
        <p className="t-pretty mt-4 max-w-lg text-[15px] leading-relaxed text-fk-text-60 md:text-[16px]">
          Get matched with verified freelancers near you — usually within the hour.
        </p>
      </Section>

      <div className="mx-auto mt-8 max-w-2xl px-5 md:px-8">
        <div className="rounded-[18px] border border-fk-line-11 bg-fk-card p-5">
          <QuoteStub
            placeholder='Describe the work — "I need 8 Instagram reels edited every month for my café in Nagpur"'
            submitLabel="Get quotes"
          />
        </div>
      </div>

      <Section className="pt-14">
        <span className="t-mono text-fk-text-40">POPULAR RIGHT NOW</span>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {POPULAR.map((label) => (
            <Link
              key={label}
              href="/city/nagpur"
              className="rounded-full border border-fk-line-09 bg-fk-card px-4 py-2.5 text-[13px] font-medium text-fk-text transition-colors hover:border-fk-lime-bd"
            >
              {label}
            </Link>
          ))}
        </div>
      </Section>

      <Section className="grid gap-4 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-[18px] border border-fk-line-09 bg-fk-card p-5.5">
            <span className="text-xl text-fk-lime">✔</span>
            <span className="mt-3 block text-[15px] font-semibold">{f.title}</span>
            <p className="mt-2 text-[13px] leading-relaxed text-fk-text-60">{f.body}</p>
          </div>
        ))}
      </Section>

      <Section>
        <div className="flex items-baseline justify-between">
          <h2 className="t-h2">What jobs typically cost</h2>
          <span className="t-mono text-fk-text-40">REAL QUOTES, LAST 90 DAYS</span>
        </div>
        <div className="mt-5.5 overflow-hidden rounded-2xl border border-fk-line-08">
          {RATE_TABLE.map((row, i) => (
            <div
              key={row.job}
              className={`flex items-center justify-between gap-4 bg-fk-card px-4 py-3.5 ${
                i < RATE_TABLE.length - 1 ? "border-b border-fk-line-07" : ""
              }`}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[13.5px] font-semibold">{row.job}</span>
                <span className="text-[11.5px] text-fk-text-45">{row.unit}</span>
              </div>
              <span className="text-[14px] font-semibold">{row.range}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-20">
        <h2 className="t-h2">Questions clients ask</h2>
        <div className="mt-5.5 grid gap-3.5 md:grid-cols-2">
          {FAQS.map((faq) => (
            <FaqCard key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </Section>

      <Section className="flex justify-center pb-8 text-center">
        <span className="text-[14px] text-fk-text-50">
          Are you the one doing the work?{" "}
          <Link href="/join-as-freelancer" className="font-semibold text-fk-lime">
            Join as a freelancer →
          </Link>
        </span>
      </Section>
    </>
  );
}
