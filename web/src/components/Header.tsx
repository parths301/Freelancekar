import Link from "next/link";

const NAV_LINKS = [
  { href: "/city/nagpur", label: "Categories" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-fk-line-08 bg-fk-bg/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-7 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="font-sans text-lg font-bold tracking-tight text-fk-text"
        >
          freelance<span className="text-fk-lime">kar</span>
        </Link>

        <nav className="ml-2 hidden gap-5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-fk-text-60 transition-colors hover:text-fk-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/join-as-freelancer"
            className="hidden text-[13.5px] font-medium text-fk-text-60 transition-colors hover:text-fk-text sm:inline"
          >
            Join as a freelancer
          </Link>
          <Link
            href="/city/nagpur"
            className="rounded-[11px] bg-fk-lime px-4.5 py-2.5 text-[13px] font-semibold text-fk-on-lime transition-colors hover:bg-fk-lime-hover"
          >
            Find a freelancer
          </Link>
        </div>
      </div>
    </header>
  );
}
