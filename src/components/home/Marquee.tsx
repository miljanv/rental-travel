const WORDS = [
  "Autobusi",
  "Minibusevi",
  "Transferi",
  "Ekskurzije",
  "Team building",
  "Aerodrom",
  "Automobili",
];

export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink py-7">
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {WORDS.map((word) => (
              <span
                key={`${copy}-${word}`}
                className="flex items-center font-heading text-[clamp(1.5rem,3vw,2.25rem)] whitespace-nowrap text-white/85"
              >
                {word}
                <span className="mx-8 inline-block size-1.5 rotate-45 bg-brand lg:mx-12" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
