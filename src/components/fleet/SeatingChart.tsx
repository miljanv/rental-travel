import { deckSeats, type SeatCell, type SeatDeck, type SeatPlan } from "@/lib/site";

const SEAT = 24;
const PAIR_GAP = 5;
const AISLE = 22;
const PAD = 16;
const ROW_PITCH = 32;
const BACK_ROW = 40;
const FOOT = 14;
const HEAD = 12;

const CONTENT = SEAT * 4 + PAIR_GAP * 2 + AISLE;
const WIDTH = CONTENT + PAD * 2;
const SIDE = SEAT * 2 + PAIR_GAP;

// Window seat first on each side, so a row that lost a seat loses the aisle one.
const SEAT_X = {
  left: [0, SEAT + PAIR_GAP],
  right: [CONTENT - SEAT, CONTENT - SEAT * 2 - PAIR_GAP],
};
const SIDE_X = { left: 0, right: CONTENT - SIDE };

type Side = "left" | "right";

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

/** Toilet, kitchen and the guide seats all read as a block against the wall. */
function Block({
  side,
  y,
  height = SEAT,
  dashed,
}: {
  side: Side;
  y: number;
  height?: number;
  dashed?: boolean;
}) {
  return (
    <rect
      x={SIDE_X[side]}
      y={y}
      width={SIDE}
      height={height}
      rx={5}
      className="fill-ink/8 stroke-ink/30"
      strokeWidth={1.5}
      strokeDasharray={dashed ? "4 3" : undefined}
    />
  );
}

function Cell({ side, cell, y }: { side: Side; cell: SeatCell; y: number }) {
  if (typeof cell === "number") {
    return (
      <>
        {SEAT_X[side].slice(0, cell).map((x) => (
          <Seat key={x} x={x} y={y} />
        ))}
      </>
    );
  }

  const outer = side === "left" ? 0 : CONTENT;
  const inward = side === "left" ? 1 : -1;

  switch (cell) {
    case "driver":
      return (
        <circle
          cx={outer + inward * (SEAT / 2 + 2)}
          cy={y + SEAT / 2}
          r={9}
          className="fill-none stroke-ink/40"
          strokeWidth={2}
        />
      );

    case "codriver":
      return (
        <rect
          x={side === "left" ? 0 : CONTENT - SEAT}
          y={y}
          width={SEAT}
          height={SEAT}
          rx={5}
          className="fill-none stroke-ink/30"
          strokeWidth={1.5}
        />
      );

    case "door":
      return (
        <line
          x1={outer}
          y1={y + SEAT / 2}
          x2={outer + inward * SEAT * 1.6}
          y2={y + SEAT / 2}
          className="stroke-brand"
          strokeWidth={3}
          strokeLinecap="round"
        />
      );

    case "stairs":
      return (
        <>
          {[0, 1, 2].map((step) => (
            <line
              key={step}
              x1={outer}
              y1={y + 5 + step * 7}
              x2={outer + inward * SEAT * 1.5}
              y2={y + 5 + step * 7}
              className="stroke-ink/40"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
        </>
      );

    case "toilet":
    case "kitchen":
      return <Block side={side} y={y} />;

    case "table":
      return <Block side={side} y={y + SEAT / 4} height={SEAT / 2} />;

    case "guide":
      return <Block side={side} y={y + 3} height={SEAT - 6} dashed />;
  }
}

function Deck({ deck }: { deck: SeatDeck }) {
  const seats = deckSeats(deck);
  const height =
    HEAD + deck.rows.length * ROW_PITCH + (deck.back ? BACK_ROW : 0) + FOOT;
  const backY = HEAD + deck.rows.length * ROW_PITCH;
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
          {deck.rows.map((row, index) => {
            const y = HEAD + index * ROW_PITCH;
            return (
              <g key={index}>
                <Cell side="left" cell={row.left} y={y} />
                <Cell side="right" cell={row.right} y={y} />
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

/** Only what the drawing actually contains ends up in the legend. */
const LEGEND: { cell: SeatCell; label: string; swatch: React.ReactNode }[] = [
  {
    cell: 0,
    label: "sedište",
    swatch: <span className="size-3 rounded-[3px] border border-brand/60 bg-brand/25" />,
  },
  {
    cell: "door",
    label: "vrata",
    swatch: <span className="h-[3px] w-5 rounded-full bg-brand" />,
  },
  {
    cell: "driver",
    label: "vozač",
    swatch: <span className="size-3 rounded-full border border-white/40" />,
  },
  {
    cell: "codriver",
    label: "suvozač",
    swatch: <span className="size-3 rounded-[3px] border border-white/40" />,
  },
  {
    cell: "stairs",
    label: "stepenice",
    swatch: (
      <span className="flex w-5 flex-col gap-[3px]">
        <span className="h-px w-full bg-white/40" />
        <span className="h-px w-full bg-white/40" />
        <span className="h-px w-full bg-white/40" />
      </span>
    ),
  },
  {
    cell: "toilet",
    label: "toalet",
    swatch: <span className="size-3 rounded-[3px] border border-white/35 bg-white/10" />,
  },
  {
    cell: "kitchen",
    label: "kuhinja",
    swatch: <span className="size-3 rounded-[3px] border border-white/35 bg-white/10" />,
  },
  {
    cell: "table",
    label: "sto",
    swatch: <span className="h-1.5 w-4 rounded-[2px] border border-white/35 bg-white/10" />,
  },
  {
    cell: "guide",
    label: "mesta za vodiče",
    swatch: (
      <span className="size-3 rounded-[3px] border border-dashed border-white/35 bg-white/10" />
    ),
  },
];

export function SeatingChart({ plan }: { plan: SeatPlan }) {
  const used = new Set<SeatCell>([0]);
  for (const deck of plan.decks) {
    for (const row of deck.rows) {
      for (const cell of [row.left, row.right]) {
        if (typeof cell !== "number") used.add(cell);
      }
    }
  }

  // Toilet and kitchen share a swatch, so keep only the first of the two.
  const entries = LEGEND.filter(
    ({ cell }) =>
      used.has(cell) && !(cell === "kitchen" && used.has("toilet"))
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap items-start justify-center gap-10">
        {plan.decks.map((deck, index) => (
          <Deck key={deck.label ?? index} deck={deck} />
        ))}
      </div>

      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-label text-[11px] tracking-[0.16em] text-white/50 uppercase">
        {entries.map(({ label, swatch }) => (
          <span key={label} className="flex items-center gap-2">
            {swatch}
            {label}
          </span>
        ))}
      </p>

      <p className="mt-6 max-w-md text-center text-[13px] leading-relaxed text-white/45">
        {plan.approximate
          ? "Šema je informativna i prikazuje uobičajen raspored za ovaj broj mesta. Tačan raspored potvrđujemo pri rezervaciji."
          : "Šema prikazuje stvaran raspored sedišta u vozilu, red po red, prema našoj dokumentaciji."}
      </p>
    </div>
  );
}
