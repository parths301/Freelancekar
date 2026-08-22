import type { Metadata } from "next";
import { Section, Eyebrow, CheckLine } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get the app",
  description:
    "The FreelanceKar Android and iOS apps are on the way. Use the website in the meantime — every feature works in the browser too.",
};

export default function GetAppPage() {
  return (
    <>
      <Section className="flex flex-col items-center pb-16 text-center">
        <Eyebrow>Mobile apps</Eyebrow>
        <h1 className="t-pretty mt-4 text-[36px] font-bold leading-[1.05] tracking-tight md:text-[52px]">
          The app is on its way.
        </h1>
        <p className="t-pretty mt-4 max-w-lg text-[15px] leading-relaxed text-fk-text-60">
          FreelanceKar for Android and iOS isn&apos;t published yet. Everything works
          on this website in the meantime — bookmark it, or add it to your home
          screen for an app-like experience.
        </p>

        <div className="mt-9 grid w-full max-w-md gap-3.5 sm:grid-cols-2">
          <div className="rounded-2xl border border-fk-line-09 bg-fk-card p-5 text-left">
            <span className="t-mono-label text-fk-text-45">Android</span>
            <p className="mt-2 text-[14px] font-semibold">Coming soon to Google Play</p>
          </div>
          <div className="rounded-2xl border border-fk-line-09 bg-fk-card p-5 text-left">
            <span className="t-mono-label text-fk-text-45">iOS</span>
            <p className="mt-2 text-[14px] font-semibold">Coming soon to the App Store</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 self-start text-left">
          <CheckLine>Same freelancer search, chat and booking as the app</CheckLine>
          <CheckLine>No install needed — works in any mobile browser</CheckLine>
          <CheckLine>Zero platform cut, same as the app: pay freelancers directly</CheckLine>
        </div>
      </Section>
    </>
  );
}
