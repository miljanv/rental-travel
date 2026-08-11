import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconArrowRight } from "@/components/ui/Icons";

export function CategoryGrid() {
  return (
    <section className="relative bg-white py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Rental travel"
          title={
            <>
              Prevoz putnika za svaku priliku.{" "}
              <span className="text-brand">Bezbedno.</span>
            </>
          }
          text="Iako mlada firma, trudimo se da Vam pružimo širi spektar usluga u oblasti prevoza putnika — od autobusa turističke klase, preko minibuseva, do transfera na aerodrom i iznajmljivanja automobila."
        />

        <div className="mt-16 grid gap-px bg-sand sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 100}>
              <Link
                href={category.href}
                className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden bg-ink p-8"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  className="object-cover opacity-55 transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-40"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

                <span className="ghost-number ghost-number--light absolute top-6 right-6 z-10">
                  0{index + 1}
                </span>

                <div className="relative z-10">
                  <h3 className="font-heading text-[26px] leading-tight text-white">
                    {category.title}
                  </h3>
                  {/* Collapsed until hover on pointer devices, always shown on touch */}
                  <p className="mt-4 text-[15px] leading-relaxed text-white/75 transition-all duration-500 lg:max-h-0 lg:overflow-hidden lg:text-white/0 lg:group-hover:max-h-40 lg:group-hover:text-white/75">
                    {category.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-3 font-label text-[13px] tracking-[0.22em] text-brand uppercase">
                    Saznajte više
                    <IconArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
