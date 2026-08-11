import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Advantages } from "@/components/home/Advantages";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck, IconPlane } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transferi Aerodrom",
  description:
    "Pouzdan i udoban transfer do i sa aerodroma, sa bilo koje lokacije. Tačnost, komfor i bezbrižno putovanje, prilagođeno vašem rasporedu leta.",
  alternates: { canonical: "/transferi-aerodrom" },
};

const POINTS = [
  "Transfer do i sa aerodroma, sa bilo koje lokacije",
  "Iz centra grada, hotela ili privatne adrese",
  "Tačnost i praćenje rasporeda leta",
  "Iskusni vozači i moderna klimatizovana vozila",
  "Prevoz pojedinaca, porodica i grupa",
  "Dostupno 24 časa dnevno",
];

export default function AirportTransferPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="Transferi Aerodrom"
        text="Pouzdan i udoban transfer do i sa aerodroma, sa bilo koje lokacije."
        image="/images/hero/sprinter-wide-1600.webp"
        breadcrumb="Transferi Aerodrom"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <Reveal variant="mask" className="relative aspect-[4/3] w-full">
              <Image
                src="/images/hero/sprinter-wide-1024.webp"
                alt="Transfer na aerodrom — Rental Travel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delay={220}
              className="absolute -right-3 -bottom-8 flex size-28 items-center justify-center bg-brand text-white lg:-right-8 lg:size-36"
            >
              <IconPlane className="size-12 lg:size-16" />
            </Reveal>
          </div>

          <div>
            <Reveal>
              <span className="eyebrow">Rental travel</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-heading text-ink">
                Ukoliko Vam je potreban transfer na aerodrom
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-mute">
                Nudimo pouzdan i udoban transfer do i sa aerodroma, sa bilo koje
                lokacije. Bez obzira da li putujete iz centra grada, hotela ili
                privatne adrese, naš profesionalni prevoz obezbeđuje tačnost,
                komfor i bezbrižno putovanje. Vozači su iskusni, vozila moderna
                i klimatizovana, a usluga prilagođena vašem rasporedu leta.
              </p>
            </Reveal>

            <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {POINTS.map((point, index) => (
                <Reveal
                  as="li"
                  key={point}
                  delay={index * 60}
                  className="flex items-start gap-3 text-[15px] text-ink"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-brand/10 text-brand">
                    <IconCheck className="size-3.5" />
                  </span>
                  {point}
                </Reveal>
              ))}
            </ul>

            <Reveal delay={220} className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/kontakt" variant="brand">
                Rezervišite transfer
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outlined">
                {site.phone}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <Advantages />
      <CtaBanner />
    </>
  );
}
