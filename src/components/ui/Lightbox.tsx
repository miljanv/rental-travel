"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/Icons";
import { Modal } from "@/components/ui/Modal";

type LightboxProps = {
  images: string[];
  startIndex?: number;
  title?: string;
  onClose: () => void;
};

export function Lightbox({
  images,
  startIndex = 0,
  title,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const move = useCallback(
    (step: number) =>
      setIndex((i) => (i + step + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [move]);

  return (
    <Modal
      label={title ?? "Galerija"}
      onClose={onClose}
      closeLabel="Zatvori galeriju"
    >
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-full w-full max-w-5xl">
          <Image
            key={images[index]}
            src={`${images[index]}-1600.webp`}
            alt={`${title ?? "Slika"} ${index + 1}`}
            fill
            sizes="100vw"
            className="animate-[fadeIn_.4s_ease-out] object-contain"
          />
        </div>

        {images.length > 1 && (
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

      {images.length > 1 && (
        <div
          className="no-scrollbar flex shrink-0 justify-center gap-2 overflow-x-auto px-5 pb-6"
          onClick={(event) => event.stopPropagation()}
        >
          {images.map((image, thumbIndex) => (
            <button
              key={image}
              type="button"
              onClick={() => setIndex(thumbIndex)}
              aria-label={`Slika ${thumbIndex + 1}`}
              aria-current={thumbIndex === index ? "true" : undefined}
              className={
                "relative h-16 w-20 shrink-0 overflow-hidden border bg-white/5 transition-colors " +
                (thumbIndex === index
                  ? "border-brand"
                  : "border-white/20 hover:border-white/60")
              }
            >
              <Image
                src={`${image}-640.webp`}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
