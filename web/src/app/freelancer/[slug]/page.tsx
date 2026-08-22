import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREELANCERS, getFreelancer } from "@/lib/data";
import QuoteStub from "@/components/QuoteStub";

export function generateStaticParams() {
  return FREELANCERS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  props: PageProps<"/freelancer/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const pro = getFreelancer(slug);
  if (!pro) return {};
  return {
    title: pro.name,
    description: `${pro.tagline} in ${pro.area}. ${pro.rating}★ (${pro.jobs} jobs). Get quotes and pay ${pro.name.split(" ")[0]} directly — zero platform fee.`,
  };
}

export default async function FreelancerProfilePage(
  props: PageProps<"/freelancer/[slug]">,
) {
  const { slug } = await props.params;
  const pro = getFreelancer(slug);
  if (!pro) notFound();

  const firstName = pro.name.split(" ")[0];

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-4 font-mono text-[11px] font-medium uppercase tracking-wide text-fk-text-35 md:px-8">
        <Link href="/" className="text-fk-text-35 hover:text-fk-text-55">
          Home
        </Link>
        {" / "}
        {pro.name}
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-5.5 md:grid-cols-[2fr_1fr] md:items-start md:px-8">
        <div>
          <div className="flex items-start gap-4.5">
            <div className="fk-stripe h-[84px] w-[84px] shrink-0 rounded-full" />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[26px] font-bold tracking-tight">{pro.name}</h1>
                <span className="rounded-md bg-fk-lime-badge px-2.5 py-1 font-mono text-[11px] font-semibold text-fk-lime">
                  ✔ VERIFIED
                </span>
              </div>
              <p className="mt-1.5 text-[14px] font-medium text-fk-text-60">{pro.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] font-medium">
                <span className="text-fk-amber">
                  ★ {pro.rating} <span className="font-normal text-fk-text-45">({pro.jobs} jobs)</span>
                </span>
                <span className="text-fk-text-55">
                  {pro.area} · {pro.travelRadius}
                </span>
                <span className="text-fk-text-55">{pro.responseTime}</span>
              </div>
            </div>
          </div>

          <div className="mt-7.5 border-t border-fk-line-08 pt-6">
            <h2 className="text-[18px] font-semibold tracking-tight">About</h2>
            <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-fk-text-62">
              {pro.about}
            </p>
          </div>

          <div className="mt-7.5 border-t border-fk-line-08 pt-6">
            <h2 className="text-[18px] font-semibold tracking-tight">Services &amp; pricing</h2>
            <div className="mt-4 flex flex-col gap-2.5">
              {pro.services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between gap-4 rounded-[14px] border border-fk-line-08 bg-fk-card px-4.5 py-4"
                >
                  <div>
                    <span className="text-[14px] font-semibold">{service.name}</span>
                    <p className="mt-1 text-[12.5px] text-fk-text-50">{service.note}</p>
                  </div>
                  <span className="shrink-0 text-[15px] font-semibold">{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7.5 border-t border-fk-line-08 pt-6">
            <h2 className="text-[18px] font-semibold tracking-tight">Portfolio</h2>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {Array.from({ length: pro.portfolioCount }).map((_, i) => (
                <div key={i} className="fk-stripe aspect-square rounded-xl" />
              ))}
            </div>
          </div>

          <div className="mt-7.5 border-t border-fk-line-08 pt-6">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[18px] font-semibold tracking-tight">Reviews</h2>
              <span className="text-[13px] font-medium text-fk-text-45">
                {pro.rating} average · {pro.jobs} jobs
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3.5">
              {pro.reviews.map((review, i) => (
                <div
                  key={review.author}
                  className={
                    i < pro.reviews.length - 1
                      ? "border-b border-fk-line-07 pb-3.5"
                      : ""
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-semibold">{review.author}</span>
                    <span className="font-medium text-fk-amber">
                      {"★".repeat(review.stars)}
                      <span className="text-fk-line-14">{"★".repeat(5 - review.stars)}</span>
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-fk-text-60">
                    {review.body}
                  </p>
                  <span className="text-[11px] text-fk-text-35">
                    {review.when} · {review.service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 md:sticky md:top-[90px]">
          <div className="rounded-[18px] border border-fk-line-10 bg-fk-card p-5.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[20px] font-semibold">From {pro.fromPrice}</span>
              <span className="rounded-md bg-fk-lime-badge px-2.5 py-1 font-mono text-[11px] font-semibold text-fk-lime">
                AVAILABLE
              </span>
            </div>
            <p className="mt-1 text-[12.5px] text-fk-text-45">{pro.responseTime}</p>
            <QuoteStub
              className="mt-4"
              placeholder={`Tell ${firstName} what you need — a link, budget, or timeline helps.`}
              submitLabel="Request a quote"
            />
            <div className="mt-4 flex flex-col gap-2">
              <span className="flex items-center gap-2 text-[12.5px] text-fk-text-60">
                <span className="text-fk-lime">✔</span> Aadhaar verified
              </span>
              <span className="flex items-center gap-2 text-[12.5px] text-fk-text-60">
                <span className="text-fk-lime">✔</span> PAN verified
              </span>
              <span className="flex items-center gap-2 text-[12.5px] text-fk-text-60">
                <span className="text-fk-lime">✔</span> Bank verified for payouts
              </span>
            </div>
          </div>
          <span className="text-center text-[12px] text-fk-text-35">Report this profile</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-4 pt-14 md:px-8">
        <p className="text-[13px] text-fk-text-45">
          Note: this is a sample profile for the FreelanceKar prototype — real freelancer
          profiles go live as verified sign-ups launch.
        </p>
      </div>
    </>
  );
}
