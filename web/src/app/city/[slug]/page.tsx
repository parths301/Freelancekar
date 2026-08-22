import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CITIES, cityFaqs, FEATURED_PROS, getCity, RATE_TABLE } from "@/lib/data";
import { CtaBand, Section } from "@/components/ui";

export function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata(
  props: PageProps<"/city/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `Freelancers in ${city.name}`,
    description: `Hire verified freelancers in ${city.name} — reel editors, photographers, designers and more. Compare quotes and pay them directly, zero platform cut.`,
  };
}

export default async function CityPage(props: PageProps<"/city/[slug]">) {
  const { slug } = await props.params;
  const city = getCity(slug);
  if (!city) notFound();

  const faqs = cityFaqs(city.name);
  const localityRun = city.localities.slice(0, 3).map(([name]) => name).join(", ");

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-4 text-[11px] font-medium uppercase tracking-wide text-fk-text-35 md:px-8">
        Home / {city.name}
      </div>

      <Section className="grid gap-10 pt-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
        <div>
          <span className="inline-block rounded-md bg-fk-lime-badge px-2.5 py-1.5 text-[11px] font-semibold tracking-wide text-fk-lime">
            {city.count} VERIFIED IN {city.name.toUpperCase()}
          </span>
          <h1 className="t-pretty mt-4 text-[36px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
            Freelancers in {city.name}
          </h1>
          <p className="t-pretty mt-4 max-w-lg text-[16px] leading-relaxed text-fk-text-60">
            Hire reel editors, photographers, designers and more near you — {localityRun} and
            across {city.name}. Compare real rates, see verified IDs, and pay only when you&apos;re
            happy with the work.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:max-w-lg">
            <div className="flex flex-1 items-center gap-2.5 rounded-[13px] border border-fk-line-11 bg-fk-card px-4 py-3.5">
              <span className="text-fk-text-45">⌕</span>
              <span className="text-[14.5px] text-fk-text-42">
                Describe the work — “8 reels a month for my café”
              </span>
            </div>
            <span className="flex-none rounded-[13px] bg-fk-lime px-5.5 py-3.5 text-center text-[14px] font-semibold text-fk-on-lime">
              Get quotes
            </span>
          </div>

          <div className="mt-6 flex gap-8">
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-semibold">₹900–₹2,500</span>
              <span className="text-xs text-fk-text-45">typical per reel</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-semibold">Under 1 hr</span>
              <span className="text-xs text-fk-text-45">first quote arrives</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-semibold">0%</span>
              <span className="text-xs text-fk-text-45">platform cut</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-fk-line-09 bg-fk-card">
          <div className="fk-stripe flex h-[190px] items-end p-4">
            <span className="t-mono text-fk-text-40">
              PHOTO — LOCAL WORK IN {city.name.toUpperCase()}
            </span>
          </div>
          <div className="p-5">
            <span className="text-[15px] font-semibold">Why clients in {city.name} use it</span>
            <div className="mt-3.5 flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <span className="text-[13px] text-fk-lime">✔</span>
                <span className="text-[13px] leading-relaxed text-fk-text-62">
                  Aadhaar + a live selfie checked before anyone can list services
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[13px] text-fk-lime">✔</span>
                <span className="text-[13px] leading-relaxed text-fk-text-62">
                  You pay the freelancer directly — no fee added on top
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[13px] text-fk-lime">✔</span>
                <span className="text-[13px] leading-relaxed text-fk-text-62">
                  People who can travel to your locality, not another metro
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex items-baseline justify-between">
          <h2 className="t-h2">Browse by category in {city.name}</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col gap-2 rounded-2xl border border-fk-line-08 bg-fk-card p-5"
            >
              <span className="text-[15px] font-semibold">{cat.label}</span>
              <span className="t-mono text-fk-text-40">{cat.count} nearby</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex items-baseline justify-between">
          <h2 className="t-h2">Top freelancers in {city.name}</h2>
          <span className="t-mono text-fk-text-40">RANKED BY RATING &amp; RESPONSE TIME</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {FEATURED_PROS.map((pro) => (
            <Link
              key={pro.slug}
              href={`/freelancer/${pro.slug}`}
              className="overflow-hidden rounded-2xl border border-fk-line-08 bg-fk-card transition-colors hover:border-fk-lime-bd"
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
                  <span className="text-fk-text-40">{city.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="grid gap-14 md:grid-cols-2">
        <div>
          <h2 className="t-h2">What it costs in {city.name}</h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-fk-text-55">
            Real rates quoted on FreelanceKar over the last 90 days. Prices are quoted per job,
            not per hour, and you pay the freelancer directly.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-fk-line-08">
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
                <span className="flex-none text-[14px] font-semibold">{row.range}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="t-h2">Popular localities</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-fk-text-55">
            Search by locality — freelancers list their travel radius up front.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {city.localities.map(([name, count]) => (
              <div
                key={name}
                className="flex items-center gap-2.5 rounded-full border border-fk-line-09 bg-fk-card px-4 py-2.5"
              >
                <span className="text-[13px] font-medium">{name}</span>
                <span className="t-mono text-fk-text-40">{count}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-fk-line-09 bg-fk-card p-5">
            <span className="text-[15px] font-semibold">How hiring works</span>
            <div className="mt-4 flex flex-col gap-3.5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-fk-lime-badge font-mono text-[11px] font-semibold text-fk-lime">
                  1
                </span>
                <span className="text-[13px] leading-relaxed text-fk-text-62">
                  Describe the work and your locality — no account needed to start
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-fk-lime-badge font-mono text-[11px] font-semibold text-fk-lime">
                  2
                </span>
                <span className="text-[13px] leading-relaxed text-fk-text-62">
                  Compare quotes with ratings, distance and verified IDs
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5.5 w-5.5 flex-none items-center justify-center rounded-full bg-fk-lime-badge font-mono text-[11px] font-semibold text-fk-lime">
                  3
                </span>
                <span className="text-[13px] leading-relaxed text-fk-text-62">
                  Pay the freelancer directly by UPI or cash — zero platform cut
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="t-h2">Questions clients in {city.name} ask</h2>
        <div className="mt-5 grid gap-3.5 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-fk-line-08 bg-fk-card p-5">
              <span className="text-[14.5px] font-semibold">{faq.q}</span>
              <p className="t-pretty mt-2 text-[13px] leading-relaxed text-fk-text-58">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-4">
        <CtaBand
          title={`Do this work in ${city.name}? List every service you offer.`}
          body="One profile, many skills — editing, shoots, design, GST filing. Pay a simple monthly plan and keep 100% of what every client pays you."
          ctaLabel="Join as a freelancer"
          ctaHref="/join-as-freelancer"
          footnote="7-day free trial · verify with Aadhaar in about 5 min"
        />
      </Section>

      <Section className="pb-4">
        <span className="t-mono-label text-fk-text-40">OTHER CITIES</span>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {CITIES.filter((c) => c.slug !== city.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              className="rounded-full border border-fk-line-09 bg-fk-card px-4 py-2 text-[13px] font-medium"
            >
              Freelancers in {c.name}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
