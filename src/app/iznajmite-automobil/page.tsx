import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Advantages } from "@/components/home/Advantages";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { carVehicles, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Iznajmite Automobil",
  description:
    "Širok izbor pouzdanih i redovno održavanih vozila za kratkoročno i dugoročno iznajmljivanje. Fleksibilni uslovi, transparentne cene i brza usluga.",
  alternates: { canonical: "/iznajmite-automobil" },
};

const POINTS = [
  "Kratkoročno i dugoročno iznajmljivanje",
  "Poslovna putovanja, odmor ili svakodnevne obaveze",
  "Pouzdana i redovno održavana vozila",
  "Fleksibilni uslovi i transparentne cene",
  "Brza usluga prilagođena Vašim potrebama",
  "Podrška i dostupnost 24 časa dnevno",
];

export default function CarRentalPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="Iznajmite Automobil"
        text="Širok izbor pouzdanih i redovno održavanih vozila za kratkoročno i dugoročno iznajmljivanje."
        image="/images/hero/auto-wide-1600.webp"
        breadcrumb="Iznajmite Automobil"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Reveal>
              <span className="eyebrow">Rental travel</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-heading text-ink">
                Ukoliko Vam je potreban automobil
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-mute">
                Ukoliko vam je potreban automobil, nudimo širok izbor pouzdanih
                i redovno održavanih vozila za kratkoročno i dugoročno
                iznajmljivanje. Bez obzira da li vam je auto potreban za
                poslovno putovanje, odmor ili svakodnevne obaveze, garantujemo
                fleksibilne uslove, transparentne cene i brzu uslugu
                prilagođenu vašim potrebama.
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
                Pošaljite upit
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outlined">
                {site.phone}
              </ButtonLink>
            </Reveal>
          </div>

          <div className="relative order-1 lg:order-2">
            <Reveal variant="mask" className="relative aspect-[4/3] w-full">
              <Image
                src="/images/hero/auto-1024.webp"
                alt="Iznajmljivanje automobila — Rental Travel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <span
              aria-hidden
              className="absolute -bottom-8 -left-4 font-heading text-[clamp(3rem,7vw,5.5rem)] leading-none font-medium text-transparent [-webkit-text-stroke:1px_rgba(12,19,21,0.12)] lg:-left-10"
            >
              Rent a car
            </span>
          </div>
        </div>
      </section>

      <FleetGrid
        title="Automobili u našoj floti"
        text="Za rezervaciju i cenu najma pozovite nas ili pošaljite upit — odgovaramo u najkraćem roku."
        vehicles={carVehicles}
      />

      <Advantages />
      <CtaBanner />
    </>
  );
}
