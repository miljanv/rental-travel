import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  text?: string;
  image: string;
  breadcrumb: string;
};

export function PageHero({
  title,
  eyebrow,
  text,
  image,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-ink pt-[var(--header-height)] lg:min-h-[620px]">
      <Image
        src={image}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="animate-ken-burns object-cover opacity-50"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/45" />

      <div className="shell relative z-10 pb-16 lg:pb-24">
        {eyebrow && (
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
        )}

        <Reveal delay={90}>
          <h1 className="mt-5 font-heading text-white">{title}</h1>
        </Reveal>

        {text && (
          <Reveal delay={170}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/70">
              {text}
            </p>
          </Reveal>
        )}

        <Reveal delay={250}>
          <nav
            aria-label="Putanja"
            className="mt-9 flex items-center gap-3 font-label text-[12px] tracking-[0.2em] text-white/50 uppercase"
          >
            <Link href="/" className="transition-colors hover:text-brand">
              Početna
            </Link>
            <span className="block size-1 rotate-45 bg-brand" />
            <span className="text-white">{breadcrumb}</span>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
