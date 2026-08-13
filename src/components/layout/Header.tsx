"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navigation, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { IconInstagram, IconMail, IconPhone } from "@/components/ui/Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        {/* Top utility bar */}
        <div className="hidden border-b border-white/10 bg-ink/70 backdrop-blur-sm lg:block">
          <div className="shell flex h-[46px] items-center justify-between">
            <div className="flex items-center gap-8 font-label text-[13px] tracking-[0.18em] text-white/70 uppercase">
              <a
                href={site.phoneHref}
                className="link-wipe flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <IconPhone className="size-4 text-brand" />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="link-wipe flex items-center gap-2.5 normal-case tracking-[0.08em] transition-colors hover:text-white"
              >
                <IconMail className="size-4 text-brand" />
                {site.email}
              </a>
            </div>
            <div className="flex items-center gap-6 font-label text-[13px] tracking-[0.18em] text-white/70 uppercase">
              <span>Radno vreme 0—24h</span>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="transition-colors hover:text-brand"
              >
                <IconInstagram className="size-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Main navigation bar */}
        <div className="shell flex h-[86px] items-center justify-between lg:h-[100px]">
          <Link
            href="/"
            aria-label={`${site.name} — početna`}
            className="relative z-10 block"
          >
            <Image
              src="/images/logo.webp"
              alt={`${site.name} logo`}
              width={605}
              height={222}
              priority
              className="h-[42px] w-auto lg:h-[52px]"
            />
          </Link>

          {/* Full labels leave no room for the call button until 2xl, so the
              bar tightens its type instead of dropping links. */}
          <nav className="hidden items-center gap-4 lg:flex xl:gap-5 2xl:gap-6">
            {navigation.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-wipe font-label text-[11px] tracking-[0.06em] whitespace-nowrap uppercase transition-colors xl:text-[12px] xl:tracking-[0.1em]",
                    active ? "text-brand" : "text-white hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <ButtonLink
              href={site.phoneHref}
              variant="brand"
              size="sm"
              className="hidden whitespace-nowrap 2xl:inline-flex"
            >
              Pozovite nas
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Otvori meni"
              aria-expanded={menuOpen}
              className="group relative z-10 flex size-11 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span className="block h-px w-7 bg-white transition-all duration-300 group-hover:w-5 group-hover:bg-brand" />
              <span className="block h-px w-7 bg-white transition-all duration-300 group-hover:bg-brand" />
              <span className="block h-px w-7 bg-white transition-all duration-300 group-hover:w-5 group-hover:bg-brand" />
            </button>
          </div>
        </div>
      </header>

      {/* Sticky header revealed once the hero is scrolled past */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur-md transition-transform duration-500 ease-out",
          scrolled ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="shell flex h-[74px] items-center justify-between">
          <Link href="/" aria-label={`${site.name} — početna`}>
            <Image
              src="/images/logo-sm.webp"
              alt={`${site.name} logo`}
              width={280}
              height={103}
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex xl:gap-5 2xl:gap-6">
            {navigation.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "link-wipe font-label text-[11px] tracking-[0.06em] whitespace-nowrap uppercase transition-colors xl:text-[12px] xl:tracking-[0.1em]",
                    active ? "text-brand" : "text-white hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="font-label text-[13px] tracking-[0.14em] whitespace-nowrap text-white uppercase transition-colors hover:text-brand xl:tracking-[0.2em]"
            >
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Otvori meni"
              className="group flex size-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span className="block h-px w-6 bg-white transition-all group-hover:bg-brand" />
              <span className="block h-px w-6 bg-white transition-all group-hover:bg-brand" />
              <span className="block h-px w-6 bg-white transition-all group-hover:bg-brand" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-ink transition-all duration-500",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div className="shell flex h-[86px] shrink-0 items-center justify-between lg:h-[100px]">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            aria-label={`${site.name} — početna`}
          >
            <Image
              src="/images/logo-sm.webp"
              alt={`${site.name} logo`}
              width={280}
              height={103}
              className="h-10 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Zatvori meni"
            className="group relative size-11"
          >
            <span className="absolute top-1/2 left-1/2 block h-px w-7 -translate-x-1/2 rotate-45 bg-white transition-colors group-hover:bg-brand" />
            <span className="absolute top-1/2 left-1/2 block h-px w-7 -translate-x-1/2 -rotate-45 bg-white transition-colors group-hover:bg-brand" />
          </button>
        </div>

        <nav className="flex flex-1 overflow-y-auto">
          {/* `m-auto` instead of `justify-center` so tall lists stay fully
              scrollable on short viewports rather than clipping at the top. */}
          <div className="shell m-auto flex w-full flex-col gap-1 py-6">
            {navigation.map((item, index) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-5 py-2"
                  style={{
                    transitionDelay: `${index * 55}ms`,
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "none" : "translateY(20px)",
                    transition: "opacity .5s ease, transform .5s ease",
                  }}
                >
                  <span className="font-label text-xs tracking-[0.25em] text-brand">
                    0{index + 1}
                  </span>
                  <span
                    className={cn(
                      "font-heading text-2xl transition-colors group-hover:text-brand sm:text-4xl lg:text-5xl",
                      active ? "text-brand" : "text-white"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shell shrink-0 border-t border-white/10 py-6">
          <div className="flex flex-col gap-2 font-label text-[13px] tracking-[0.18em] text-white/70 uppercase sm:flex-row sm:items-center sm:justify-between">
            <a href={site.phoneHref} className="hover:text-brand">
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="normal-case tracking-[0.08em] hover:text-brand"
            >
              {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-brand"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
