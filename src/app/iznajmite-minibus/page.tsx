import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FleetSection } from "@/components/fleet/FleetSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Advantages } from "@/components/home/Advantages";
import { minibusServices, minibusVehicles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Iznajmite Minibus",
  description:
    "Iznajmljivanje minibuseva Mercedes Sprinter i Volkswagen Crafter do 20 mesta, uz kombi vozila do 8 mesta — turistička putovanja, team building, aerodrom, ekskurzije, utakmice i koncerti.",
  alternates: { canonical: "/iznajmite-minibus" },
};

export default function MinibusPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="Iznajmite Minibus"
        text="Iako mlada firma, trudimo se da Vam pružimo širi spektar usluga u oblasti prevoza putnika."
        image="/images/fleet/ns-871-rt-3-1600.webp"
        breadcrumb="Iznajmite Minibus"
      />

      <FleetSection
        eyebrow="Rental travel"
        title="Minibusevi i kombi vozila za manje grupe"
        intro="Za manje grupe na raspolaganju imamo više minibuseva Mercedes Sprinter i Volkswagen Crafter do 20 mesta, kao i kombi vozilo do 8 mesta — komforni, klimatizovani i idealni za gradske i međugradske ture."
        servicesTitle="Ukoliko su Vam potrebna:"
        services={minibusServices}
        servicesNote="Imamo na raspolaganju više turističkih mini buseva. Pozovite nas za brzu ponudu."
        vehicles={minibusVehicles}
      />

      <CtaBanner />
      <Advantages />
    </>
  );
}
