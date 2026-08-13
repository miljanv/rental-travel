"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { photoViews, vehicleTitle, type PhotoView, type Vehicle } from "@/lib/site";
import { IconArrowLeft, IconArrowRight, IconSeat } from "@/components/ui/Icons";
import { Modal } from "@/components/ui/Modal";
import { SeatingChart } from "@/components/fleet/SeatingChart";

const TOUR_STEP = 3600;

export function VehicleViewer({
  vehicle,
  startIndex = 0,
  startOnSeats = false,
  autoplay = false,
  onClose,
}: {
  vehicle: Vehicle;
  startIndex?: number;
  startOnSeats?: boolean;
  autoplay?: boolean;
  onClose: () => void;
}) {
  const { photos, seatPlan } = vehicle;
  const [index, setIndex] = useState(startIndex);
  const [onSeats, setOnSeats] = useState(startOnSeats);
  const [playing, setPlaying] = useState(autoplay);

  const title = vehicleTitle(vehicle);
  const current = photos[index];

  const views = useMemo(() => {
    const unique: PhotoView[] = [];
    for (const photo of photos) {
      if (!unique.includes(photo.view)) unique.push(photo.view);
    }
    return unique;
  }, [photos]);

  const move = useCallback(
    (step: number) => {
      setPlaying(false);
      setOnSeats(false);
      setIndex((i) => (i + step + photos.length) % photos.length);
    },
    [photos.length]
  );

  const openView = (view: PhotoView) => {
    setPlaying(false);
    setOnSeats(false);
    setIndex(photos.findIndex((photo) => photo.view === view));
  };

  useEffect(() => {
    if (!photos.length) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [move, photos.length]);

  // The tour walks the photos in order and runs out at the last one instead of
  // looping, so it reads as a single pass through the vehicle.
  const touring = playing && !onSeats && index < photos.length - 1;

  useEffect(() => {
    if (!touring) return;
    const timer = setTimeout(() => setIndex((i) => i + 1), TOUR_STEP);
    return () => clearTimeout(timer);
  }, [touring, index]);

  const group = photos.filter((photo) => photo.view === current?.view);
  const position = current
    ? group.findIndex((photo) => photo.src === current.src) + 1
    : 0;

  const tabClass = (active: boolean) =>
    cn(
      "border-b-2 pb-1 font-label text-[12px] tracking-[0.18em] uppercase transition-colors",
      active
        ? "border-brand text-white"
        : "border-transparent text-white/50 hover:text-white"
    );

  return (
    <Modal
      label={`${title} — ${vehicle.plate}`}
      onClose={onClose}
      closeLabel="Zatvori prikaz vozila"
      header={
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-label text-[13px] tracking-[0.2em] text-white/70 uppercase">
            {title} — {vehicle.plate}
          </p>
          <div className="flex items-center gap-6">
            {views.map((view) => (
              <button
                key={view}
                type="button"
                onClick={() => openView(view)}
                className={tabClass(!onSeats && current?.view === view)}
              >
                {photoViews[view]}
              </button>
            ))}
            {seatPlan && (
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setOnSeats(true);
                }}
                className={cn(tabClass(onSeats), "flex items-center gap-2")}
              >
                <IconSeat className="size-3.5" />
                Raspored
              </button>
            )}
          </div>
        </div>
      }
    >
      {onSeats && seatPlan ? (
        <div
          className="flex flex-1 items-start justify-center overflow-y-auto px-5 py-6"
          onClick={(event) => event.stopPropagation()}
        >
          <SeatingChart plan={seatPlan} />
        </div>
      ) : (
        <>
          <div
            className="relative flex flex-1 items-center justify-center px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-full w-full max-w-5xl">
              {current && (
                <Image
                  key={current.src}
                  src={`${current.src}-1600.webp`}
                  alt={`${title} ${vehicle.plate} — ${photoViews[current.view].toLowerCase()}`}
                  fill
                  sizes="100vw"
                  className="animate-[fadeIn_.6s_ease-out] object-contain"
                />
              )}
            </div>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Prethodna slika"
                  className="absolute left-2 flex size-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand lg:left-6"
                >
                  <IconArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Sledeća slika"
                  className="absolute right-2 flex size-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand lg:right-6"
                >
                  <IconArrowRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <div
            className="shrink-0 px-5 pt-5 pb-6 lg:px-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-label text-[12px] tracking-[0.18em] text-white/60 uppercase">
                {current && photoViews[current.view]} — {position}/{group.length}
              </p>

              {photos.length > 2 && (
                <button
                  type="button"
                  onClick={() => {
                    if (touring) {
                      setPlaying(false);
                      return;
                    }
                    setOnSeats(false);
                    setIndex(0);
                    setPlaying(true);
                  }}
                  className="btn btn--link text-brand"
                >
                  <span className="btn-text">
                    {touring ? "Zaustavi obilazak" : "Pokreni obilazak"}
                  </span>
                </button>
              )}
            </div>

            {photos.length > 1 && (
              <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto">
                {photos.map((photo, thumbIndex) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => {
                      setPlaying(false);
                      setOnSeats(false);
                      setIndex(thumbIndex);
                    }}
                    aria-label={`${photoViews[photo.view]} ${thumbIndex + 1}`}
                    aria-current={
                      !onSeats && thumbIndex === index ? "true" : undefined
                    }
                    className={cn(
                      "relative h-16 w-20 shrink-0 overflow-hidden border bg-white/5 transition-colors",
                      !onSeats && thumbIndex === index
                        ? "border-brand"
                        : "border-white/20 hover:border-white/60"
                    )}
                  >
                    {/* Contained, not cropped: most shots are portrait and a
                        square crop of a bus makes them all look alike. */}
                    <Image
                      src={`${photo.src}-640.webp`}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
