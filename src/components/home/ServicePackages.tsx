import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBus, IconCar, IconCheck, IconSeat } from "@/components/ui/Icons";

const PACKAGES = [
  {
    name: "Minibus",
    capacity: "8 — 20",
    unit: "mesta",
    href: "/iznajmite-minibus",
    icon: IconSeat,
    features: [
      "Mercedes Sprinter i Volkswagen Crafter",
      "Kombi vozila za grupe do 8 putnika",
      "Klimatizovan prostor za putnike",
      "Dostupno 24/7",
    ],
    featured: false,
  },
  {
    name: "Autobus",
    capacity: "47 — 83",
    unit: "mesta",
    href: "/iznajmite-autobus",
    icon: IconBus,
    features: [
      "Solo i dabldeker autobusi VDL i Van Hool",
      "Putovanja, ekskurzije, team building",
      "Prevoz sportista, dece i radnika",
      "Dostupno 24/7",
    ],
    featured: true,
  },
  {
    name: "Automobil",
    capacity: "Fleksibilno",
    unit: "kratkoročno i dugoročno",
    href: "/iznajmite-automobil",
    icon: IconCar,
    features: [
      "Pouzdana i redovno održavana vozila",
      "Za poslovna putovanja i odmor",
      "Transparentne cene bez skrivenih troškova",
      "Dostupno 24/7",
    ],
    featured: false,
  },
];

export function ServicePackages() {
  return (
    <section className="relative bg-sand-light py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Izaberite vozilo"
          title={
            <>
              Zatražite ponudu — izaberite <span className="text-brand">svoj model</span>
            </>
          }
          align="center"
        />

        <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Reveal key={pkg.name} delay={index * 120}>
                <div
                  className={cn(
                    "group relative flex h-full flex-col p-9 transition-all duration-500 lg:p-11",
                    pkg.featured
                      ? "bg-ink text-white/70 lg:-my-4 lg:py-14"
                      : "bg-white hover:shadow-[0_30px_60px_-30px_rgba(12,19,21,0.3)]"
                  )}
                >
                  {pkg.featured && (
                    <span className="absolute top-0 right-0 bg-brand px-4 py-2 font-label text-[11px] tracking-[0.22em] text-white uppercase">
                      Najtraženije
                    </span>
                  )}

                  <span
                    className={cn(
                      "flex size-14 items-center justify-center border transition-colors duration-500",
                      pkg.featured
                        ? "border-white/20 text-brand"
                        : "border-sand text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                    )}
                  >
                    <Icon className="size-7" />
                  </span>

                  <h4
                    className={cn(
                      "mt-7 font-heading text-[26px]",
                      pkg.featured ? "text-white" : "text-ink"
                    )}
                  >
                    {pkg.name}
                  </h4>

                  <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                    <span
                      className={cn(
                        "font-heading text-[clamp(2rem,4vw,2.75rem)] leading-none",
                        pkg.featured ? "text-white" : "text-ink"
                      )}
                    >
                      {pkg.capacity}
                    </span>
                    <span className="font-label text-[12px] tracking-[0.18em] uppercase">
                      {pkg.unit}
                    </span>
                  </p>

                  <span
                    className={cn(
                      "mt-8 block h-px w-full",
                      pkg.featured ? "bg-white/15" : "bg-sand"
                    )}
                  />

                  <ul className="mt-8 flex-1 space-y-3.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-[15px]"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-brand/10 text-brand">
                          <IconCheck className="size-3.5" />
                        </span>
                        <span className={pkg.featured ? "" : "text-ink-mute"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <ButtonLink
                      href={pkg.href}
                      variant={pkg.featured ? "brand" : "outlined"}
                      className="w-full justify-center"
                    >
                      Pogledajte
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
