import { HeroSlider } from "@/components/home/HeroSlider";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedFleet } from "@/components/home/FeaturedFleet";
import { CtaBanner } from "@/components/home/CtaBanner";
import { WhatWeProvide } from "@/components/home/WhatWeProvide";
import { Advantages } from "@/components/home/Advantages";
import { Marquee } from "@/components/home/Marquee";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { ServicePackages } from "@/components/home/ServicePackages";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryGrid />
      <FeaturedFleet />
      <CtaBanner />
      <WhatWeProvide />
      <Marquee />
      <Advantages />
      <GalleryStrip />
      <ServicePackages />
    </>
  );
}
