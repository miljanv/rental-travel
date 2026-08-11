import { advantages } from "@/lib/site";
import { advantageIcons } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Advantages() {
  return (
    <section className="relative bg-sand-light py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Najbolji vozači"
          title="Brinemo o Vašem komforu i bezbednosti"
          text="Vozila su tehnički ispravna i čista, a naši vozači iskusni i posvećeni. Dostupni smo Vam 24 časa dnevno i u svakom momentu možete pozvati ili poslati upit za Vašu vožnju."
          align="center"
        />

        <div className="mt-16 grid gap-px bg-sand sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => {
            const Icon = advantageIcons[advantage.icon];
            return (
              <Reveal key={advantage.title} delay={(index % 3) * 110}>
                <div className="group relative h-full bg-white p-9 transition-colors duration-500 hover:bg-ink lg:p-10">
                  <span
                    aria-hidden
                    className="absolute top-7 right-8 font-heading text-4xl leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgba(12,19,21,0.12)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]"
                  >
                    0{index + 1}
                  </span>

                  <span className="flex size-14 items-center justify-center border border-sand text-brand transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-7" />
                  </span>

                  <h5 className="mt-7 font-heading text-[21px] leading-snug text-ink transition-colors duration-500 group-hover:text-white">
                    {advantage.title}
                  </h5>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-mute transition-colors duration-500 group-hover:text-white/70">
                    {advantage.text}
                  </p>

                  <span className="mt-7 block h-px w-10 bg-brand transition-all duration-500 group-hover:w-20" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
