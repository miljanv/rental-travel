import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-ink">
      <Image
        src="/images/fleet/ns-785-rt-1-1600.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/50" />

      <div className="shell relative z-10 text-center">
        <span className="font-heading text-[clamp(6rem,18vw,14rem)] leading-none font-medium text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)]">
          404
        </span>
        <h1 className="mt-6 font-heading text-white">
          Stranica nije pronađena
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-white/70">
          Tražena stranica ne postoji ili je premeštena. Vratite se na početnu
          ili nas pozovite na {site.phone}.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="brand">
            Početna
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="light">
            Kontakt
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
