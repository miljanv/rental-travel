import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FleetSection } from "@/components/fleet/FleetSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Advantages } from "@/components/home/Advantages";
import { busServices, busVehicles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Iznajmite Autobus",
  description:
    "Iznajmljivanje autobusa turističke klase od 47 do 83 mesta — turistička putovanja, ekskurzije, team building, transferi, prevoz sportista, dece i radnika.",
  alternates: { canonical: "/iznajmite-autobus" },
};

export default function BusPage() {
  return (
    <>
      <PageHero
        eyebrow="Rental travel"
        title="Iznajmite Autobus"
        text="Iako mlada firma, trudimo se da Vam pružimo širi spektar usluga u oblasti prevoza putnika."
        image="/images/fleet/ns-785-rt-1-1600.webp"
        breadcrumb="Iznajmite Autobus"
      />

      <FleetSection
        eyebrow="Rental travel"
        title="Autobusi turističke klase za svaku vrstu putovanja"
        intro="Naša flota obuhvata autobuse VDL i Van Hool turističke klase sa kapacitetom od 47 do 83 mesta. Sva vozila su tehnički ispravna, klimatizovana i redovno servisirana."
        servicesTitle="Ukoliko Vam je potreban:"
        services={busServices}
        servicesNote="Pozovite nas ili pošaljite upit i u najkraćem roku dobijate ponudu prilagođenu Vašoj ruti i broju putnika."
        vehicles={busVehicles}
      />

      <CtaBanner />
      <Advantages />
    </>
  );
}
