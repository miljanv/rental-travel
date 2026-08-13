import type { Vehicle } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { IconCheck } from "@/components/ui/Icons";

type FleetSectionProps = {
  eyebrow: string;
  title: string;
  intro: string;
  servicesTitle: string;
  services: string[];
  servicesNote?: string;
  vehicles: Vehicle[];
};

export function FleetSection({
  eyebrow,
  title,
  intro,
  servicesTitle,
  services,
  servicesNote,
  vehicles,
}: FleetSectionProps) {
  return (
    <>
      <section className="bg-white py-24 lg:py-32">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={eyebrow} title={title} text={intro} />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h3 className="font-heading text-[26px] text-ink">
                {servicesTitle}
              </h3>
            </Reveal>
            <span className="mt-5 block h-px w-12 bg-brand" />

            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {services.map((service, index) => (
                <Reveal
                  as="li"
                  key={service}
                  delay={index * 60}
                  className="group flex items-start gap-3.5 border-b border-sand pb-4 text-[15px] text-ink"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <IconCheck className="size-3.5" />
                  </span>
                  <span className="inline-block first-letter:uppercase">
                    {service}
                  </span>
                </Reveal>
              ))}
            </ul>

            {servicesNote && (
              <Reveal delay={200}>
                <p className="mt-8 text-[17px] leading-relaxed text-ink-mute">
                  {servicesNote}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <FleetGrid
        title="Izaberite vozilo iz naše flote"
        text="Kliknite na sliku za galeriju. Za rezervaciju i ponudu pozovite nas ili pošaljite upit."
        vehicles={vehicles}
      />
    </>
  );
}
