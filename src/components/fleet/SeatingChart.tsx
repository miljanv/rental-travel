import { deckSeats, type SeatDeck, type SeatPlan } from "@/lib/site";

const SEAT = 24;
const PAIR_GAP = 5;
const AISLE = 22;
const PAD = 16;
const ROW_PITCH = 32;
const FRONT = 46;
const BACK_ROW = 40;
const FOOT = 14;

const CONTENT = SEAT * 4 + PAIR_GAP * 2 + AISLE;
const WIDTH = CONTENT + PAD * 2;

// Window seat first on each side, so a row that lost a seat loses the aisle one.
const LEFT_X = [0, SEAT + PAIR_GAP];
const RIGHT_X = [CONTENT - SEAT, CONTENT - SEAT * 2 - PAIR_GAP];

function Seat({ x, y }: { x: number; y: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={SEAT}
      height={SEAT}
      rx={5}
      className="fill-brand/15 stroke-brand/70"
      strokeWidth={1.5}
    />
  );
}

function Door({ y }: { y: number }) {
  return (
    <line
      x1={CONTENT - SEAT * 1.6}
      y1={y}
      x2={CONTENT}
      y2={y}
      className="stroke-brand"
      strokeWidth={3}
      strokeLinecap="round"
    />
  );
}

function Deck({ deck }: { deck: SeatDeck }) {
  const seats = deckSeats(deck);
  const height =
    FRONT + deck.rows.length * ROW_PITCH + (deck.back ? BACK_ROW : 0) + FOOT;

  // The short row is where the middle door sits.
  const doorRow = deck.rows.findIndex((row) => row.left + row.right < 4);
  const backY = FRONT + deck.rows.length * ROW_PITCH;
  const backSeat = (CONTENT - PAIR_GAP * (deck.back - 1)) / deck.back;

  return (
    <figure className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="h-auto w-full max-w-[190px]"
        role="img"
        aria-label={`Raspored ${seats} sedišta${deck.label ? `, ${deck.label.toLowerCase()}` : ""}`}
      >
        <rect
          x={0.75}
          y={0.75}
          width={WIDTH - 1.5}
          height={height - 1.5}
          rx={26}
          className="fill-white stroke-ink/15"
          strokeWidth={1.5}
        />

        <g transform={`translate(${PAD} 0)`}>
          {deck.front === "driver" ? (
            <>
              <circle
                cx={SEAT / 2 + 2}
                cy={FRONT / 2}
                r={9}
                className="fill-none stroke-ink/35"
                strokeWidth={2}
              />
              <Door y={12} />
            </>
          ) : (
            Array.from({ length: 3 }, (_, step) => (
              <line
                key={step}
                x1={0}
                y1={12 + step * 7}
                x2={SEAT * 1.4}
                y2={12 + step * 7}
                className="stroke-ink/30"
                strokeWidth={2}
                strokeLinecap="round"
              />
            ))
          )}

          {deck.rows.map((row, index) => {
            const y = FRONT + index * ROW_PITCH;
            return (
              <g key={index}>
                {LEFT_X.slice(0, row.left).map((x) => (
                  <Seat key={`l${x}`} x={x} y={y} />
                ))}
                {RIGHT_X.slice(0, row.right).map((x) => (
                  <Seat key={`r${x}`} x={x} y={y} />
                ))}
                {index === doorRow && deck.front === "driver" && (
                  <Door y={y + SEAT / 2} />
                )}
              </g>
            );
          })}

          {deck.back > 0 &&
            Array.from({ length: deck.back }, (_, index) => (
              <rect
                key={index}
                x={index * (backSeat + PAIR_GAP)}
                y={backY}
                width={backSeat}
                height={SEAT}
                rx={4}
                className="fill-brand/12 stroke-brand/45"
                strokeWidth={1.5}
              />
            ))}
        </g>
      </svg>

      <figcaption className="mt-4 text-center">
        {deck.label && (
          <span className="block font-label text-[11px] tracking-[0.2em] text-white/50 uppercase">
            {deck.label}
          </span>
        )}
        <span className="mt-1 block font-heading text-[18px] text-white">
          {seats} mesta
        </span>
      </figcaption>
    </figure>
  );
}

export function SeatingChart({ plan }: { plan: SeatPlan }) {
  const hasStairs = plan.decks.some((deck) => deck.front === "stairs");

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap items-start justify-center gap-10">
        {plan.decks.map((deck, index) => (
          <Deck key={deck.label ?? index} deck={deck} />
        ))}
      </div>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-label text-[11px] tracking-[0.16em] text-white/50 uppercase">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-[3px] border border-brand/60 bg-brand/25" />
          sedište
        </span>
        <span className="flex items-center gap-2">
          <span className="h-[3px] w-5 rounded-full bg-brand" />
          vrata
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full border border-white/40" />
          vozač
        </span>
        {hasStairs && (
          <span className="flex items-center gap-2">
            <span className="flex w-5 flex-col gap-[3px]">
              <span className="h-px w-full bg-white/40" />
              <span className="h-px w-full bg-white/40" />
              <span className="h-px w-full bg-white/40" />
            </span>
            stepenice
          </span>
        )}
      </p>

      <p className="mt-6 max-w-md text-center text-[13px] leading-relaxed text-white/45">
        Šema je informativna i prikazuje uobičajen raspored za ovaj broj mesta.
        Tačan raspored potvrđujemo pri rezervaciji.
      </p>
    </div>
  );
}
