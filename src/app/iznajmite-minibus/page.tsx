import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FleetSection } from "@/components/fleet/FleetSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Advantages } from "@/components/home/Advantages";
import { minibusServices, minibusVehicles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Iznajmite Minibus",
  description:
    "Iznajmljivanje minibuseva Mercedes Sprinter turističke klase sa 18 i 19 mesta — turistička putovanja, team building, aerodrom, ekskurzije, utakmice i koncerti.",
  alternates: { canonical: "/iznajmite-minibus" },
};

export default function MinibusPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="Iznajmite Minibus"
        text="Iako mlada firma, trudimo se da Vam pružimo širi spektar usluga u oblasti prevoza putnika."
        image="/images/fleet/ns-837-kl-1-1600.webp"
        breadcrumb="Iznajmite Minibus"
      />

      <FleetSection
        eyebrow="Rental travel"
        title="Mercedes Sprinter minibusevi za manje grupe"
        intro="Za manje grupe na raspolaganju imamo više turističkih mini buseva Mercedes Sprinter sa 18 i 19 komercijalnih mesta — komforni, klimatizovani i idealni za gradske i međugradske ture."
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
