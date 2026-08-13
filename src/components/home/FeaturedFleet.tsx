import { vehicles } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VehicleCard } from "@/components/fleet/VehicleCard";

const featured = [
  "vdl-synergy-ns-765-rt",
  "vdl-magiq-ns-754-rt",
  "vdl-berkhof-ns-832-rt",
  "mercedes-sprinter-ns-871-rt",
].map((slug) => vehicles.find((vehicle) => vehicle.slug === slug)!);

export function FeaturedFleet() {
  return (
    <section className="relative overflow-hidden bg-sand-light py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Naša flota"
            title={
              <>
                Vozila koja garantuju maksimalno zadovoljstvo. Uživajte.
              </>
            }
            className="lg:max-w-2xl"
          />
          <Reveal delay={200} className="shrink-0">
            <ButtonLink href="/iznajmite-autobus" variant="outlined">
              Cela flota
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((vehicle, index) => (
            <Reveal key={vehicle.slug} delay={index * 110}>
              <VehicleCard vehicle={vehicle} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
