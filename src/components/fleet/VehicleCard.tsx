"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  fleetClasses,
  vehicleCapacity,
  vehicleTitle,
  type Vehicle,
} from "@/lib/site";
import { IconBus, IconCar, IconSeat } from "@/components/ui/Icons";
import { VehicleViewer } from "@/components/fleet/VehicleViewer";

type ViewerState = { index: number; seats: boolean; tour: boolean };

export function VehicleCard({
  vehicle,
  index,
}: {
  vehicle: Vehicle;
  index: number;
}) {
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const { photos, seatPlan } = vehicle;
  const hasPhotos = photos.length > 0;
  const thumbs = photos.slice(1, 4);
  const title = vehicleTitle(vehicle);
  const capacity = vehicleCapacity(vehicle);
  const Icon = vehicle.fleetClass === "automobil" ? IconCar : IconBus;

  // A tour only reads as one if it has both the outside and the inside to show.
  const hasTour =
    photos.length >= 4 && photos.some((photo) => photo.view === "interior");

  const openPhotos = (at: number, tour = false) =>
    setViewer({ index: at, seats: false, tour });

  return (
    <article className="group relative flex h-full flex-col bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(12,19,21,0.35)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
        {hasPhotos ? (
          <button
            type="button"
            onClick={() => openPhotos(0, hasTour)}
            className="absolute inset-0 block w-full"
            aria-label={`${hasTour ? "Pokreni obilazak" : "Otvori galeriju"}: ${title} ${vehicle.plate}`}
          >
            <Image
              src={`${photos[0].src}-1024.webp`}
              alt={`${title} ${vehicle.plate}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              loading={index < 3 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-sand">
            <Icon className="size-12 text-brand/25" />
            <span className="font-label text-[11px] tracking-[0.2em] text-ink-mute uppercase">
              Fotografije u pripremi
            </span>
          </div>
        )}

        <span className="pointer-events-none absolute top-0 left-0 flex items-center gap-2 bg-brand px-4 py-2 font-label text-[12px] tracking-[0.2em] text-white uppercase">
          <Icon className="size-4" />
          {vehicle.plate}
        </span>

        {capacity && (
          <span
            className={cn(
              "pointer-events-none absolute right-4 bottom-4 flex items-center gap-2 bg-white/95 px-3.5 py-2",
              "font-label text-[12px] tracking-[0.18em] text-ink uppercase"
            )}
          >
            <IconSeat className="size-4 text-brand" />
            {capacity}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="font-label text-[12px] tracking-[0.22em] text-brand uppercase">
          {fleetClasses[vehicle.fleetClass].label}
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
                key={thumb.src}
                type="button"
                onClick={() => openPhotos(thumbIndex + 1)}
                className="relative h-16 w-20 overflow-hidden border border-sand bg-sand transition-colors hover:border-brand"
                aria-label={`Slika ${thumbIndex + 2}`}
              >
                <Image
                  src={`${thumb.src}-640.webp`}
                  alt=""
                  fill
                  sizes="80px"
                  loading="lazy"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-sand pt-6">
          {hasPhotos && (
            <button
              type="button"
              onClick={() => openPhotos(0, hasTour)}
              className="btn btn--link"
            >
              <span className="btn-text">
                {hasTour ? "Obilazak" : "Galerija"}
              </span>
            </button>
          )}
          {seatPlan && (
            <button
              type="button"
              onClick={() => setViewer({ index: 0, seats: true, tour: false })}
              className="btn btn--link"
            >
              <span className="btn-text">Raspored</span>
            </button>
          )}
          <Link
            href="/kontakt"
            className={cn(
              "btn btn--link text-brand",
              (hasPhotos || seatPlan) && "ml-auto"
            )}
          >
            <span className="btn-text">Upit</span>
          </Link>
        </div>
      </div>

      {viewer && (
        <VehicleViewer
          vehicle={vehicle}
          startIndex={viewer.index}
          startOnSeats={viewer.seats}
          autoplay={viewer.tour}
          onClose={() => setViewer(null)}
        />
      )}
    </article>
  );
}
