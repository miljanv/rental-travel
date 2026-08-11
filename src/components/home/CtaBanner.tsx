import Image from "next/image";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { IconPhone } from "@/components/ui/Icons";

export function CtaBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/images/hero/profilna-wide-1600.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        loading="lazy"
        className="object-cover opacity-25"
      />
      <span className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

      <div className="shell relative grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <span className="eyebrow">Uštedite uz Rental Travel</span>
          <h2 className="mt-5 font-heading text-white">
            Zatražite ponudu za Vašu rutu — odgovaramo brzo.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">
            Dostupni smo Vam 24 časa dnevno i u svakom momentu možete pozvati
            ili poslati upit za Vašu vožnju.
          </p>
        </Reveal>

        <Reveal delay={140} className="lg:justify-self-end">
          <div className="border border-white/15 bg-white/[0.04] p-8 backdrop-blur-sm lg:p-10">
            <span className="font-label text-[12px] tracking-[0.24em] text-brand uppercase">
              Pozovite nas
            </span>
            <a
              href={site.phoneHref}
              className="mt-4 flex items-center gap-4 font-heading text-[clamp(1.75rem,4vw,2.5rem)] text-white transition-colors hover:text-brand"
            >
              <IconPhone className="size-7 text-brand" />
              {site.phone}
            </a>
            <p className="mt-4 text-white/60">
              ili nam pišite na{" "}
              <a
                href={site.emailHref}
                className="link-wipe text-white hover:text-brand"
              >
                {site.email}
              </a>
            </p>
            <div className="mt-8">
              <ButtonLink href="/kontakt" variant="brand">
                Pošaljite upit
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
