"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  label: string;
  onClose: () => void;
  /** Replaces the plain title in the top bar. */
  header?: ReactNode;
  closeLabel?: string;
  children: ReactNode;
};

export function Modal({
  label,
  onClose,
  header,
  closeLabel = "Zatvori",
  children,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // The portal target only exists on the client.
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  // Rendered on <body> because reveal wrappers use `will-change`, which turns
  // them into containing blocks for fixed-position descendants.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[80] flex flex-col bg-ink"
      onClick={onClose}
    >
      <div
        className="flex shrink-0 flex-wrap items-center justify-between gap-4 px-5 py-5 lg:px-10"
        onClick={(event) => event.stopPropagation()}
      >
        {header ?? (
          <p className="font-label text-[13px] tracking-[0.2em] text-white/70 uppercase">
            {label}
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="group relative ml-auto size-11 shrink-0"
        >
          <span className="absolute top-1/2 left-1/2 block h-px w-7 -translate-x-1/2 rotate-45 bg-white transition-colors group-hover:bg-brand" />
          <span className="absolute top-1/2 left-1/2 block h-px w-7 -translate-x-1/2 -rotate-45 bg-white transition-colors group-hover:bg-brand" />
        </button>
      </div>

      {children}
    </div>,
    document.body
  );
}
