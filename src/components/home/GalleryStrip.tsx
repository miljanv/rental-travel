"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

const GALLERY = [
  "/images/fleet/ns-765-rt-1",
  "/images/fleet/ns-754-rt-1",
  "/images/fleet/zr-242-hr-2",
  "/images/fleet/ns-785-rt-2",
  "/images/fleet/ns-837-kl-2",
  "/images/fleet/ns-861-rt-1",
  "/images/fleet/ns-832-rt-2",
  "/images/fleet/ns-778-rt-3",
];

export function GalleryStrip() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Galerija"
          title="Naša vozila iz svakog ugla"
          text="Autobusi i minibusevi turističke klase, klimatizovani i redovno servisirani — spolja i unutra."
          align="center"
        />

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((image, imageIndex) => (
            <Reveal key={image} delay={(imageIndex % 4) * 90}>
              <button
                type="button"
                onClick={() => setIndex(imageIndex)}
                aria-label={`Otvori sliku ${imageIndex + 1}`}
                className="group relative block aspect-square w-full overflow-hidden bg-sand"
              >
                <Image
                  src={`${image}-640.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/45">
                  <span className="relative size-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="absolute top-1/2 left-0 block h-px w-8 bg-white" />
                    <span className="absolute top-0 left-1/2 block h-8 w-px bg-white" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {index !== null && (
        <Lightbox
          images={GALLERY}
          startIndex={index}
          title="Galerija — Rental Travel"
          onClose={() => setIndex(null)}
        />
      )}
    </section>
  );
}
