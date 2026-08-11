"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { vehicleTitle, type Vehicle } from "@/lib/site";
import { IconBus, IconSeat } from "@/components/ui/Icons";
import { Lightbox } from "@/components/ui/Lightbox";

const FALLBACK = "/images/hero/profilna-wide";

export function VehicleCard({
  vehicle,
  index,
}: {
  vehicle: Vehicle;
  index: number;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gallery = vehicle.images.length ? vehicle.images : [FALLBACK];
  const cover = gallery[0];
  const thumbs = gallery.slice(1, 4);
  const title = vehicleTitle(vehicle);

  return (
    <article className="group relative flex h-full flex-col bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(12,19,21,0.35)]">
      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-sand"
        aria-label={`Otvori galeriju: ${title} ${vehicle.plate}`}
      >
        <Image
          src={`${cover}-1024.webp`}
          alt={`${title} ${vehicle.plate}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />

        <span className="absolute top-0 left-0 flex items-center gap-2 bg-brand px-4 py-2 font-label text-[12px] tracking-[0.2em] text-white uppercase">
          <IconBus className="size-4" />
          {vehicle.plate}
        </span>

        <span
          className={cn(
            "absolute right-4 bottom-4 flex items-center gap-2 bg-white/95 px-3.5 py-2",
            "font-label text-[12px] tracking-[0.18em] text-ink uppercase"
          )}
        >
          <IconSeat className="size-4 text-brand" />
          {vehicle.seats} mesta
        </span>
      </button>

      <div className="flex flex-1 flex-col p-7">
        <span className="font-label text-[12px] tracking-[0.22em] text-brand uppercase">
          {vehicle.klasa}
        </span>
        <h5 className="mt-3 font-heading text-[22px] leading-snug text-ink transition-colors group-hover:text-brand">
          {title}
        </h5>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-mute">
          {vehicle.description}
        </p>

        {thumbs.length > 0 && (
          <div className="mt-6 flex gap-2">
            {thumbs.map((thumb, thumbIndex) => (
              <button
                key={thumb}
                type="button"
                onClick={() => setLightboxIndex(thumbIndex + 1)}
                className="relative size-16 overflow-hidden border border-sand transition-colors hover:border-brand"
                aria-label={`Slika ${thumbIndex + 2}`}
              >
                <Image
                  src={`${thumb}-640.webp`}
                  alt=""
                  fill
                  sizes="64px"
                  loading="lazy"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-7 flex items-center justify-between border-t border-sand pt-6">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="btn btn--link"
          >
            <span className="btn-text">Galerija</span>
          </button>
          <Link href="/kontakt" className="btn btn--link text-brand">
            <span className="btn-text">Upit</span>
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          startIndex={lightboxIndex}
          title={`${title} — ${vehicle.plate}`}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </article>
  );
}
