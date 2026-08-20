import Link from "next/link";
import { CITIES } from "@/lib/data";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/join-as-freelancer", label: "Join as a freelancer" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-fk-line-08">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="flex flex-wrap gap-6 md:gap-9">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-fk-text-55 transition-colors hover:text-fk-text"
            >
              {link.label}
            </Link>
          ))}
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="text-[13px] text-fk-text-55 transition-colors hover:text-fk-text"
            >
              Freelancers in {city.name}
            </Link>
          ))}
          <span className="text-[13px] text-fk-text-55">Privacy Policy</span>
          <span className="text-[13px] text-fk-text-55">Terms</span>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-fk-line-07 pt-6">
          <span className="text-[15px] font-bold tracking-tight text-fk-text">
            freelance<span className="text-fk-lime">kar</span>
          </span>
          <span className="text-xs text-fk-text-35">
            © {new Date().getFullYear()} FreelanceKar, a Sparx Consultancy product · Nagpur ·
            Indore · Jabalpur · Nashik
          </span>
        </div>
      </div>
    </footer>
  );
}
