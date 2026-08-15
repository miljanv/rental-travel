import type { ReactNode } from "react";
import {
  deckSeats,
  isGuide,
  isSeatIds,
  type SeatCell,
  type SeatDeck,
  type SeatFixture,
  type SeatPlan,
} from "@/lib/site";

const SEAT = 28;
const PAIR_GAP = 4;
const AISLE = 20;
const PAD = 16;
const ROW_PITCH = 36;
const BACK_ROW = 42;
const FOOT = 16;
const HEAD = 14;

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

function Seat({
  x,
  y,
  n,
  dashed,
  size = SEAT,
}: {
  x: number;
  y: number;
  n: number;
  dashed?: boolean;
  size?: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={size}
        height={SEAT}
        rx={5}
        className={
          dashed
            ? "fill-ink/8 stroke-ink/35"
            : "fill-brand/15 stroke-brand/70"
        }
        strokeWidth={1.5}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={x + size / 2}
        y={y + SEAT / 2 + 0.5}
        textAnchor="middle"
        dominantBaseline="central"
        className={`font-heading ${dashed ? "fill-ink/45" : "fill-ink"}`}
        style={{ fontSize: size < 24 || n > 99 ? 8 : 10, fontWeight: 600 }}
      >
        {n}
      </text>
    </g>
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

function SeatPair({
  side,
  ids,
  y,
  dashed,
}: {
  side: Side;
  ids: number[];
  y: number;
  dashed?: boolean;
}) {
  return (
    <>
      {ids.map((n, index) => (
        <Seat key={n} x={SEAT_X[side][index]} y={y} n={n} dashed={dashed} />
      ))}
    </>
  );
}

function Cell({ side, cell, y }: { side: Side; cell: SeatCell; y: number }) {
  if (isSeatIds(cell)) {
    return <SeatPair side={side} ids={cell} y={y} />;
  }

  if (isGuide(cell)) {
    return <SeatPair side={side} ids={cell.guide} y={y} dashed />;
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
  }
}

function Deck({ deck }: { deck: SeatDeck }) {
  const seats = deckSeats(deck);
  const height =
    HEAD + deck.rows.length * ROW_PITCH + (deck.back.length ? BACK_ROW : 0) + FOOT;
  const backY = HEAD + deck.rows.length * ROW_PITCH;
  const backSeat =
    (CONTENT - PAIR_GAP * (deck.back.length - 1)) / deck.back.length;

  return (
    <figure className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="h-auto w-full max-w-[260px]"
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

          {deck.back.map((n, index) => (
            <Seat
              key={n}
              x={index * (backSeat + PAIR_GAP)}
              y={backY}
              n={n}
              size={backSeat}
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

type LegendKey = SeatFixture | "seat" | "guide";

const LEGEND: { key: LegendKey; label: string; swatch: ReactNode }[] = [
  {
    key: "seat",
    label: "sedište",
    swatch: <span className="size-3 rounded-[3px] border border-brand/60 bg-brand/25" />,
  },
  {
    key: "door",
    label: "vrata",
    swatch: <span className="h-[3px] w-5 rounded-full bg-brand" />,
  },
  {
    key: "driver",
    label: "vozač",
    swatch: <span className="size-3 rounded-full border border-white/40" />,
  },
  {
    key: "codriver",
    label: "suvozač",
    swatch: <span className="size-3 rounded-[3px] border border-white/40" />,
  },
  {
    key: "stairs",
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
    key: "toilet",
    label: "toalet",
    swatch: <span className="size-3 rounded-[3px] border border-white/35 bg-white/10" />,
  },
  {
    key: "kitchen",
    label: "kuhinja",
    swatch: <span className="size-3 rounded-[3px] border border-white/35 bg-white/10" />,
  },
  {
    key: "table",
    label: "sto",
    swatch: <span className="h-1.5 w-4 rounded-[2px] border border-white/35 bg-white/10" />,
  },
  {
    key: "guide",
    label: "mesta za vodiče",
    swatch: (
      <span className="size-3 rounded-[3px] border border-dashed border-white/35 bg-white/10" />
    ),
  },
];

function cellKey(cell: SeatCell): LegendKey | null {
  if (isSeatIds(cell)) return cell.length ? "seat" : null;
  if (isGuide(cell)) return "guide";
  return cell;
}

export function SeatingChart({ plan }: { plan: SeatPlan }) {
  const used = new Set<LegendKey>(["seat"]);
  for (const deck of plan.decks) {
    for (const row of deck.rows) {
      for (const cell of [row.left, row.right]) {
        const key = cellKey(cell);
        if (key) used.add(key);
      }
    }
  }

  const entries = LEGEND.filter(
    ({ key }) => used.has(key) && !(key === "kitchen" && used.has("toilet"))
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
          : "Brojevi na sedištima odgovaraju numeraciji u vozilu. Šema je prepisana red po red iz naše dokumentacije."}
      </p>
    </div>
  );
}
