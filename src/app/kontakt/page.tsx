import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/home/Marquee";
import {
  IconClock,
  IconInstagram,
  IconMail,
  IconPhone,
} from "@/components/ui/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktirajte Rental Travel DOO — telefon ${site.phone}, e-mail ${site.email}. Dostupni smo 24 časa dnevno za sve upite i rezervacije.`,
  alternates: { canonical: "/kontakt" },
};

const DETAILS = [
  {
    icon: IconPhone,
    label: "Telefon",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: IconMail,
    label: "E-mail",
    value: site.email,
    href: site.emailHref,
  },
  {
    icon: IconClock,
    label: "Radno vreme",
    value: site.workHours,
  },
  {
    icon: IconInstagram,
    label: "Instagram",
    value: "@rental.travel",
    href: site.instagram,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="Kontakt"
        text="Dostupni smo Vam 24 časa dnevno i u svakom momentu možete pozvati ili poslati upit za Vašu vožnju."
        image="/images/fleet/ns-754-rt-1-1600.webp"
        breadcrumb="Kontakt"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="shell grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Pišite nam</span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 font-heading text-ink">
                Tu smo za svaki Vaš upit
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-mute">
                Pošaljite nam relaciju, datum i broj putnika — dobijate ponudu u
                najkraćem roku. Za hitne rezervacije pozovite nas direktno.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-px bg-sand">
              {DETAILS.map((detail, index) => {
                const Icon = detail.icon;
                const content = (
                  <span className="flex items-start gap-5 bg-white p-6 transition-colors group-hover:bg-sand-light">
                    <span className="flex size-11 shrink-0 items-center justify-center border border-sand text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-label text-[11px] tracking-[0.22em] text-ink-mute uppercase">
                        {detail.label}
                      </span>
                      <span className="mt-1 block font-heading text-[19px] break-words text-ink">
                        {detail.value}
                      </span>
                    </span>
                  </span>
                );

                return (
                  <Reveal as="li" key={detail.label} delay={index * 80}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={
                          detail.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          detail.href.startsWith("http")
                            ? "noreferrer noopener"
                            : undefined
                        }
                        className="group block"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="group block">{content}</span>
                    )}
                  </Reveal>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <span className="eyebrow">Upit za ponudu</span>
            </Reveal>
            <Reveal delay={90}>
              <h3 className="mt-5 font-heading text-ink">
                Pošaljite upit za Vašu vožnju
              </h3>
            </Reveal>
            <Reveal delay={170} className="mt-10">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />
    </>
  );
}
