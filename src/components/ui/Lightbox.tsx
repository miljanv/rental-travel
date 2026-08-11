"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconArrowLeft, IconArrowRight } from "@/components/ui/Icons";

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
  const [mounted, setMounted] = useState(false);

  const move = useCallback(
    (step: number) => setIndex((i) => (i + step + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    // Portal target only exists on the client.
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [move, onClose]);

  if (!mounted) return null;

  // Rendered on <body> because reveal wrappers use `will-change`, which turns
  // them into containing blocks for fixed-position descendants.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[80] flex flex-col bg-ink"
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between px-5 py-5 lg:px-10">
        <p className="font-label text-[13px] tracking-[0.2em] text-white/70 uppercase">
          {title}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zatvori galeriju"
          className="group relative size-11"
        >
          <span className="absolute top-1/2 left-1/2 block h-px w-7 -translate-x-1/2 rotate-45 bg-white transition-colors group-hover:bg-brand" />
          <span className="absolute top-1/2 left-1/2 block h-px w-7 -translate-x-1/2 -rotate-45 bg-white transition-colors group-hover:bg-brand" />
        </button>
      </div>

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
                "relative size-16 shrink-0 overflow-hidden border transition-colors " +
                (thumbIndex === index
                  ? "border-brand"
                  : "border-white/20 hover:border-white/60")
              }
            >
              <Image
                src={`${image}-640.webp`}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
