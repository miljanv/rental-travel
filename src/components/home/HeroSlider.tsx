"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { categories } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/Icons";

const SLIDE_DURATION = 6500;

const slides = categories.map((category, index) => ({
  ...category,
  index,
  kicker: ["Autobusi", "Minibusevi", "Aerodrom", "Automobili"][index],
}));

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused]);

  return (
    <section
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink lg:h-screen lg:min-h-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Usluge Rental Travel"
    >
      {slides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={slide.slug}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              isActive ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.heroImage ?? slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className={cn(
                "object-cover",
                isActive && "animate-ken-burns"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />
          </div>
        );
      })}

      {/* Vertical slide index rail */}
      <div className="absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Pređi na ${slide.title}`}
            aria-current={index === active ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "font-label text-[12px] tracking-[0.2em] transition-colors",
                index === active
                  ? "text-brand"
                  : "text-white/40 group-hover:text-white"
              )}
            >
              0{index + 1}
            </span>
            <span
              className={cn(
                "block h-px transition-all duration-500",
                index === active
                  ? "w-10 bg-brand"
                  : "w-5 bg-white/30 group-hover:w-8 group-hover:bg-white"
              )}
            />
          </button>
        ))}
      </div>

      <div className="shell relative z-10 pt-40 pb-16 lg:pb-24">
        {/*
         * Slide titles are paragraphs so that cross-fading four of them does not
         * produce four competing h1 elements; the page keeps one real heading.
         */}
        <h1 className="sr-only">
          Rental Travel — iznajmljivanje autobusa, minibuseva i automobila,
          transferi do aerodroma
        </h1>

        <div className="relative max-w-3xl">
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <div
                key={slide.slug}
                aria-hidden={!isActive}
                inert={!isActive}
                className={cn(
                  "transition-all duration-700",
                  isActive
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-x-0 bottom-0 opacity-0"
                )}
              >
                <span
                  className={cn(
                    "eyebrow text-brand transition-all duration-700 delay-100",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  )}
                >
                  {slide.kicker}
                </span>

                <p
                  className={cn(
                    "mt-6 font-heading text-white transition-all duration-700 delay-200",
                    "text-[clamp(2.5rem,7vw,4.75rem)] leading-[1.06]",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                >
                  {slide.title}
                </p>

                <p
                  className={cn(
                    "mt-6 max-w-xl text-[17px] leading-relaxed text-white/70 transition-all duration-700 delay-300",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                >
                  {slide.excerpt}
                </p>

                <div
                  className={cn(
                    "mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-[400ms]",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                >
                  <ButtonLink href={slide.href} variant="brand">
                    Saznajte više
                  </ButtonLink>
                  <ButtonLink href="/kontakt" variant="light">
                    Pošaljite upit
                  </ButtonLink>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom controls with autoplay progress */}
        <div className="mt-14 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Prethodni slajd"
              className="flex size-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand"
            >
              <IconArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Sledeći slajd"
              className="flex size-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand"
            >
              <IconArrowRight className="size-5" />
            </button>
          </div>

          <div className="relative h-px max-w-[240px] flex-1 bg-white/20">
            <span
              key={active}
              className="absolute inset-y-0 left-0 bg-brand"
              style={{
                animation: `heroProgress ${SLIDE_DURATION}ms linear forwards`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </div>

          <span className="font-label text-[13px] tracking-[0.2em] text-white/60">
            <span className="text-white">0{active + 1}</span> / 0{slides.length}
          </span>
        </div>
      </div>
    </section>
  );
}
