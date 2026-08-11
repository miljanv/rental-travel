import Image from "next/image";
import { busServices, stats } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/ui/Icons";

export function WhatWeProvide() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <Reveal variant="mask" className="relative aspect-[4/5] w-full">
            <Image
              src="/images/fleet/ns-765-rt-5-1024.webp"
              alt="Autobus Rental Travel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              className="object-cover"
            />
          </Reveal>

          <Reveal
            delay={220}
            className="absolute -right-4 bottom-8 w-[62%] max-w-[300px] lg:-right-10"
          >
            <div className="relative aspect-[4/3] w-full border-8 border-white shadow-xl">
              <Image
                src="/images/fleet/ns-785-rt-4-640.webp"
                alt="Unutrašnjost autobusa Rental Travel"
                fill
                sizes="300px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>

          <span
            aria-hidden
            className="absolute -top-8 -left-4 font-heading text-[clamp(3rem,7vw,5.5rem)] leading-none font-medium text-transparent [-webkit-text-stroke:1px_rgba(12,19,21,0.12)] lg:-left-10"
          >
            2023
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="eyebrow">Šta pružamo</span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 font-heading text-ink">
              Udoban prevoz i bezbedno iskustvo — za Vas i Vašu grupu
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-mute">
              Našu firmu čine mladi ljudi sa energijom i ljubavlju prema svom
              poslu koji će sve učiniti da Vaše putovanje ostane u lepom
              sećanju. Vozila su tehnički ispravna i čista jer su nam Vaša
              bezbednost i ugodjaj najbitniji.
            </p>
          </Reveal>

          <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {busServices.map((service, index) => (
              <Reveal
                as="li"
                key={service}
                delay={index * 60}
                className="flex items-start gap-3 text-[15px] text-ink"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-brand/10 text-brand">
                  <IconCheck className="size-3.5" />
                </span>
                <span className="inline-block first-letter:uppercase">
                  {service}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={140} className="mt-10">
            <ButtonLink href="/o-nama" variant="filled">
              O nama
            </ButtonLink>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-sand pt-10 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90}>
                <p className="font-heading text-[clamp(1.75rem,3vw,2.25rem)] leading-none text-ink">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    raw={"raw" in stat ? Boolean(stat.raw) : false}
                  />
                </p>
                <p className="mt-2 font-label text-[12px] tracking-[0.18em] text-ink-mute uppercase">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
