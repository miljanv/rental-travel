import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Advantages } from "@/components/home/Advantages";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Sa željom da olakšamo i ubrzamo organizaciju putovanja, 2023. godine osnovali smo preduzeće Rental Travel DOO. Iskustvo, elegancija, kvalitet.",
  alternates: { canonical: "/o-nama" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="O nama"
        text="Sa željom da olakšamo i ubrzamo organizaciju putovanja, 2023. godine osnovali smo preduzeće Rental Travel DOO."
        image="/images/fleet/ns-765-rt-5-1600.webp"
        breadcrumb="O nama"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <Reveal variant="mask" className="relative aspect-[4/5] w-full">
              <Image
                src="/images/fleet/ns-765-rt-5-1024.webp"
                alt="Autobus Rental Travel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delay={200}
              className="absolute -right-4 bottom-8 w-[60%] max-w-[290px] lg:-right-10"
            >
              <div className="relative aspect-square w-full border-8 border-white shadow-xl">
                <Image
                  src="/images/misc/profilna-square-640.webp"
                  alt="Rental Travel"
                  fill
                  sizes="290px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center">
            <Reveal>
              <span className="eyebrow">Rental travel</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-heading text-ink">
                Iskustvo, Elegancija, Kvalitet
              </h2>
            </Reveal>

            <div className="mt-7 space-y-6 text-[17px] leading-relaxed text-ink-mute">
              <Reveal as="p" delay={150}>
                Našu firmu čine mladi ljudi sa energijom i ljubavlju prema svom
                poslu koji će sve učiniti da Vaše putovanje ostane u lepom
                sećanju.
              </Reveal>
              <Reveal as="p" delay={220}>
                Vozila su tehnički ispravna i čista jer su nam Vaša bezbednost i
                ugodjaj najbitniji.
              </Reveal>
              <Reveal as="p" delay={290}>
                Dostupni smo Vam 24 časa dnevno i u svakom momentu možete
                pozvati ili poslati upit za Vašu vožnju.
              </Reveal>
            </div>

            <Reveal delay={360} className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/iznajmite-autobus" variant="filled">
                Naša flota
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outlined">
                {site.phone}
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

      <Advantages />
      <CtaBanner />
    </>
  );
}
