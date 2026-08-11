import Image from "next/image";
import Link from "next/link";
import { categories, navigation, site } from "@/lib/site";
import { IconInstagram, IconMail, IconPhone } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/65">
      {/* Oversized watermark wordmark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 font-heading text-[18vw] leading-none whitespace-nowrap text-white/[0.02] select-none"
      >
        Rental Travel
      </span>

      <div className="shell relative grid gap-12 pt-24 pb-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <Image
            src="/images/logo.webp"
            alt={`${site.name} logo`}
            width={605}
            height={222}
            className="h-14 w-auto"
          />
          <p className="mt-7 max-w-sm leading-relaxed">
            Sa željom da olakšamo i ubrzamo organizaciju putovanja, {site.founded}.
            godine osnovali smo preduzeće {site.legalName}. Vozila su tehnički
            ispravna i čista jer su nam Vaša bezbednost i ugodjaj najbitniji.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-8 inline-flex items-center gap-3 font-label text-[13px] tracking-[0.2em] text-white uppercase"
          >
            <span className="flex size-10 items-center justify-center border border-white/20 transition-colors group-hover:border-brand group-hover:bg-brand">
              <IconInstagram className="size-4" />
            </span>
            Instagram
          </a>
        </Reveal>

        <Reveal className="lg:col-span-3 lg:col-start-5" delay={80}>
          <h5 className="font-heading text-xl text-white">Navigacija</h5>
          <span className="mt-4 block h-px w-9 bg-brand" />
          <ul className="mt-6 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-wipe inline-block transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={160}>
          <h5 className="font-heading text-xl text-white">Usluge</h5>
          <span className="mt-4 block h-px w-9 bg-brand" />
          <ul className="mt-6 space-y-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="link-wipe inline-block transition-colors hover:text-white"
                >
                  {category.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={240}>
          <h5 className="font-heading text-xl text-white">Kontakt</h5>
          <span className="mt-4 block h-px w-9 bg-brand" />
          <ul className="mt-6 space-y-5">
            <li>
              <a
                href={site.phoneHref}
                className="group flex items-start gap-4 transition-colors hover:text-white"
              >
                <IconPhone className="mt-1 size-[18px] shrink-0 text-brand" />
                <span>
                  <span className="block font-label text-[11px] tracking-[0.22em] text-white/40 uppercase">
                    Telefon
                  </span>
                  <span className="font-heading text-lg text-white">
                    {site.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.emailHref}
                className="group flex items-start gap-4 transition-colors hover:text-white"
              >
                <IconMail className="mt-1 size-[18px] shrink-0 text-brand" />
                <span>
                  <span className="block font-label text-[11px] tracking-[0.22em] text-white/40 uppercase">
                    E-mail
                  </span>
                  <span className="break-all text-white">{site.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 size-[18px] shrink-0 text-brand">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
              </span>
              <span>
                <span className="block font-label text-[11px] tracking-[0.22em] text-white/40 uppercase">
                  Radno vreme
                </span>
                <span className="text-white">{site.workHours}</span>
              </span>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="relative border-t border-white/10">
        {/* Extra bottom padding keeps the fixed back-to-top button from
            covering the copyright line on narrow screens. */}
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 pb-20 font-label text-[13px] tracking-[0.16em] text-white/45 uppercase sm:flex-row sm:pb-6">
          <p>
            Copyright RentalTravel.rs © {new Date().getFullYear()}
          </p>
          <p className="normal-case tracking-[0.08em]">
            {site.legalName} — {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
