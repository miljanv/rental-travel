import type { Vehicle } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VehicleCard } from "@/components/fleet/VehicleCard";

type FleetGridProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  vehicles: Vehicle[];
  className?: string;
};

export function FleetGrid({
  eyebrow = "Naša vozila",
  title,
  text,
  vehicles,
  className = "bg-sand-light",
}: FleetGridProps) {
  return (
    <section className={`${className} py-24 lg:py-32`}>
      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          text={text}
          align="center"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle, index) => (
            <Reveal key={vehicle.slug} delay={(index % 3) * 110}>
              <VehicleCard vehicle={vehicle} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
