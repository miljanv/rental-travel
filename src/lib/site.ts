export const site = {
  name: "Rental Travel",
  legalName: "Rental Travel DOO",
  domain: "rentaltravel.rs",
  url: "https://rentaltravel.rs",
  founded: "2023",
  tagline: "Iskustvo, Elegancija, Kvalitet",
  description:
    "Rental Travel DOO — iznajmljivanje autobusa, minibuseva i automobila, uz transfere do aerodroma. Dostupni smo 24 časa dnevno.",
  phone: "069 20 84 860",
  phoneHref: "tel:+381692084860",
  email: "rentaltraveldoo@gmail.com",
  emailHref: "mailto:rentaltraveldoo@gmail.com",
  instagram: "https://www.instagram.com/rental.travel/",
  workHours: "24 časa dnevno, 7 dana u nedelji",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** The home page is reached through the logo, so it is not listed here. */
export const navigation: NavItem[] = [
  { label: "O nama", href: "/o-nama" },
  { label: "Iznajmite Autobus", href: "/iznajmite-autobus" },
  { label: "Iznajmite Mini Bus", href: "/iznajmite-minibus" },
  { label: "Iznajmite Automobil", href: "/iznajmite-automobil" },
  { label: "Transfer Aerodrom", href: "/transferi-aerodrom" },
  { label: "Kontakt", href: "/kontakt" },
];

export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  excerpt: string;
  /** Card artwork, cropped to a portrait tile in the category grid. */
  image: string;
  /** Full-bleed shot for the home page carousel; falls back to `image`. */
  heroImage?: string;
};

export const categories: ServiceCategory[] = [
  {
    slug: "iznajmite-autobus",
    title: "Iznajmite Autobus",
    shortTitle: "Autobus",
    href: "/iznajmite-autobus",
    excerpt:
      "Autobusi turističke klase od 47 do 87 mesta za putovanja, ekskurzije, team building i ugovoreni prevoz.",
    image: "/images/hero/autobus-card-1600.webp",
    heroImage: "/images/hero/header-1-1920.webp",
  },
  {
    slug: "iznajmite-minibus",
    title: "Iznajmite Mini Bus",
    shortTitle: "Minibus",
    href: "/iznajmite-minibus",
    excerpt:
      "Minibusevi i kombi vozila do 20 mesta — idealni za manje grupe, gradske ture i transfere.",
    image: "/images/hero/minibus-card-1600.webp",
    heroImage: "/images/hero/header-2-1920.webp",
  },
  {
    slug: "transferi-aerodrom",
    title: "Transfer Aerodrom",
    shortTitle: "Transferi",
    href: "/transferi-aerodrom",
    excerpt:
      "Pouzdan i udoban transfer do i sa aerodroma, sa bilo koje lokacije, prilagođen vašem rasporedu leta.",
    image: "/images/hero/sprinter-wide-1600.webp",
    heroImage: "/images/hero/header-3-1920.webp",
  },
  {
    slug: "iznajmite-automobil",
    title: "Iznajmite Automobil",
    shortTitle: "Automobil",
    href: "/iznajmite-automobil",
    excerpt:
      "Širok izbor pouzdanih i redovno održavanih vozila za kratkoročno i dugoročno iznajmljivanje.",
    image: "/images/hero/auto-1600.webp",
    heroImage: "/images/hero/auto-wide-1600.webp",
  },
];

export type FleetClass =
  | "dabldeker"
  | "solo"
  | "minibus"
  | "kombi"
  | "automobil";

export const fleetClasses: Record<
  FleetClass,
  {
    label: string;
    /** Used on the card when a vehicle's exact seat count is not confirmed. */
    capacity?: string;
  }
> = {
  dabldeker: { label: "Dabldeker autobus", capacity: "83 — 87 mesta" },
  solo: { label: "Solo autobus", capacity: "47 — 63 mesta" },
  minibus: { label: "Minibus", capacity: "do 20 mesta" },
  kombi: { label: "Kombi vozilo", capacity: "do 8 mesta" },
  automobil: { label: "Putničko vozilo" },
};

export type PhotoView = "exterior" | "interior";

export type VehiclePhoto = {
  src: string;
  view: PhotoView;
};

export const photoViews: Record<PhotoView, string> = {
  exterior: "Spolja",
  interior: "Unutra",
};

/**
 * What occupies one side of the aisle in a row. Seat numbers match the
 * operator's own diagrams (window first, then aisle). Crew and guide seats
 * are drawn but not counted, so the total always matches advertised capacity.
 */
export type SeatFixture =
  | "driver"
  | "codriver"
  | "door"
  | "stairs"
  | "toilet"
  | "table"
  | "kitchen";

export type SeatCell =
  | number[]
  | SeatFixture
  /** Narrow fold-down seats for tour guides, outside the commercial count. */
  | { guide: number[] };

export type SeatRow = { left: SeatCell; right: SeatCell };

export type SeatDeck = {
  label?: string;
  rows: SeatRow[];
  /** Rear bench, left to right, spanning the aisle. */
  back: number[];
};

export type SeatPlan = {
  decks: SeatDeck[];
  /** Derived from the seat count instead of read off the real vehicle. */
  approximate?: boolean;
};

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  plate: string;
  /** Exact capacity, where confirmed. Otherwise the class range is shown. */
  seats?: number;
  fleetClass: FleetClass;
  description: string;
  photos: VehiclePhoto[];
  /** Only for vehicles whose seat count is confirmed. */
  seatPlan?: SeatPlan;
};

export function vehicleCapacity(vehicle: Vehicle) {
  return vehicle.seats
    ? `${vehicle.seats} mesta`
    : fleetClasses[vehicle.fleetClass].capacity;
}

/**
 * Photo files are produced by `scripts/import-fleet.mjs` as `<plate>-<n>`.
 * Grouping them is manual because the import cannot tell an exterior shot from
 * an interior one; the first exterior becomes the card cover and the order
 * within each group drives the guided tour.
 */
function photos(
  plate: string,
  groups: { exterior?: number[]; interior?: number[] }
): VehiclePhoto[] {
  const pick = (indices: number[] = [], view: PhotoView) =>
    indices.map((n) => ({ src: `/images/fleet/${plate}-${n}`, view }));

  return [
    ...pick(groups.exterior, "exterior"),
    ...pick(groups.interior, "interior"),
  ];
}

/** Shorthands that keep the seat maps below readable. */
const row = (left: SeatCell, right: SeatCell): SeatRow => ({ left, right });

/** Excel columns A, B, D, E → window-first pairs on each side of the aisle. */
const pair = (a: number, b: number, d: number, e: number) =>
  row([a, b], [e, d]);

export function isSeatIds(cell: SeatCell): cell is number[] {
  return Array.isArray(cell);
}

export function isGuide(cell: SeatCell): cell is { guide: number[] } {
  return typeof cell === "object" && !Array.isArray(cell) && "guide" in cell;
}

export function deckSeats(value: SeatDeck) {
  const cell = (side: SeatCell) => (isSeatIds(side) ? side.length : 0);
  return (
    value.rows.reduce((sum, r) => sum + cell(r.left) + cell(r.right), 0) +
    value.back.length
  );
}

/**
 * Seat maps below are transcribed from the operator's own diagrams, row by row,
 * including the numbered seats. `pair(A, B, D, E)` is one Excel row; `back` is
 * the rear bench left to right.
 */
const seatPlans = {
  /** NS 765-RT, VDL Synergy: 20 seats downstairs, 63 upstairs. */
  ns765: {
    decks: [
      {
        label: "Donja etaža",
        rows: [
          row("driver", "codriver"),
          pair(1, 2, 3, 4),
          row("table", "table"),
          pair(5, 6, 7, 8),
          pair(9, 10, 11, 12),
          pair(13, 14, 15, 16),
          pair(17, 18, 19, 20),
          row("toilet", "stairs"),
        ],
        back: [],
      },
      {
        label: "Gornja etaža",
        rows: [
          pair(21, 22, 23, 24),
          row([25, 26], "stairs"),
          pair(27, 28, 31, 32),
          pair(29, 30, 35, 36),
          pair(33, 34, 39, 40),
          pair(37, 38, 43, 44),
          pair(41, 42, 47, 48),
          pair(45, 46, 51, 52),
          pair(49, 50, 55, 56),
          row([53, 54], "stairs"),
          pair(57, 58, 61, 62),
          pair(59, 60, 65, 66),
          pair(63, 64, 69, 70),
          row([67, 68], []),
          pair(71, 72, 73, 74),
          pair(75, 76, 77, 78),
        ],
        back: [79, 80, 83, 81, 82],
      },
    ],
  },

  /** NS 878-RT, Van Hool: 24 seats downstairs plus two numbered guide seats, 63 upstairs. */
  ns878: {
    decks: [
      {
        label: "Donja etaža",
        rows: [
          row("driver", "codriver"),
          row({ guide: [1, 2] }, "stairs"),
          row("kitchen", "kitchen"),
          pair(3, 4, 5, 6),
          row("table", "table"),
          pair(7, 8, 9, 10),
          pair(11, 12, 13, 14),
          pair(15, 16, 17, 18),
          pair(19, 20, 21, 22),
          pair(23, 24, 25, 26),
          row("toilet", "stairs"),
        ],
        back: [],
      },
      {
        label: "Gornja etaža",
        rows: [
          pair(27, 28, 29, 30),
          row([31, 32], "stairs"),
          pair(33, 34, 35, 36),
          row([], [40, 39]),
          pair(37, 38, 43, 44),
          pair(41, 42, 47, 48),
          pair(45, 46, 51, 52),
          pair(49, 50, 55, 56),
          pair(53, 54, 59, 60),
          pair(57, 58, 63, 64),
          row([61, 62], "stairs"),
          row([65, 66], []),
          pair(67, 68, 69, 70),
          pair(71, 72, 73, 74),
          pair(75, 76, 77, 78),
          pair(79, 80, 81, 82),
          row([], [84, 83]),
        ],
        back: [85, 86, 87, 88, 89],
      },
    ],
  },

  /** NS 754-RT, VDL MagiQ. */
  ns754: {
    decks: [
      {
        rows: [
          row("driver", "door"),
          pair(1, 2, 3, 4),
          pair(5, 6, 7, 8),
          pair(9, 10, 11, 12),
          pair(13, 14, 15, 16),
          pair(17, 18, 19, 20),
          pair(21, 22, 23, 24),
          row([25, 26], "door"),
          pair(29, 30, 27, 28),
          pair(33, 34, 31, 32),
          pair(37, 38, 35, 36),
          pair(41, 42, 39, 40),
          pair(43, 44, 45, 46),
          pair(47, 48, 49, 50),
          pair(51, 52, 53, 54),
          pair(55, 56, 57, 58),
        ],
        back: [59, 60, 63, 61, 62],
      },
    ],
  },

  /** NS 868-RT, Van Hool: seats 49 and 50 fold down beside the middle door. */
  ns868: {
    decks: [
      {
        rows: [
          row("driver", "door"),
          pair(3, 4, 1, 2),
          pair(7, 8, 5, 6),
          pair(11, 12, 9, 10),
          pair(15, 16, 13, 14),
          pair(19, 20, 17, 18),
          pair(23, 24, 21, 22),
          pair(27, 28, 25, 26),
          pair(29, 30, 49, 50),
          row([31, 32], "door"),
          pair(33, 34, 35, 36),
          pair(37, 38, 39, 40),
          pair(41, 42, 43, 44),
          pair(45, 46, 47, 48),
          row([], [52, 51]),
        ],
        back: [53, 54, 57, 55, 56],
      },
    ],
  },

  /** NS 785-RT, VDL Jonckheere. */
  ns785: {
    decks: [
      {
        rows: [
          row("driver", "door"),
          pair(3, 4, 1, 2),
          pair(7, 8, 5, 6),
          pair(11, 12, 9, 10),
          pair(15, 16, 13, 14),
          pair(19, 20, 17, 18),
          pair(23, 24, 21, 22),
          pair(27, 28, 25, 26),
          row([29, 30], "door"),
          row([31, 32], []),
          pair(33, 34, 35, 36),
          pair(37, 38, 39, 40),
          pair(41, 42, 43, 44),
          pair(45, 46, 47, 48),
          pair(49, 50, 51, 52),
        ],
        back: [53, 54, 55, 56, 57],
      },
    ],
  },

  /** NS 778-RT, VDL Jonckheere: toilet and a table midway down the cabin. */
  ns778: {
    decks: [
      {
        rows: [
          row("driver", "door"),
          pair(1, 2, 3, 4),
          pair(5, 6, 7, 8),
          pair(9, 10, 11, 12),
          pair(13, 14, 15, 16),
          pair(17, 18, 19, 20),
          pair(21, 22, 23, 24),
          row([], "toilet"),
          row("table", "door"),
          row([25, 26], []),
          pair(27, 28, 29, 30),
          pair(31, 32, 33, 34),
          pair(35, 36, 37, 38),
          pair(39, 40, 41, 42),
        ],
        back: [43, 44, 45, 46, 47],
      },
    ],
  },

  /** NS 832-RT, VDL Berkhof. */
  ns832: {
    decks: [
      {
        rows: [
          row("driver", "codriver"),
          pair(3, 4, 1, 2),
          pair(7, 8, 5, 6),
          pair(11, 12, 9, 10),
          pair(15, 16, 13, 14),
          pair(19, 20, 17, 18),
          pair(23, 24, 21, 22),
          row([25, 26], "door"),
          pair(29, 30, 27, 28),
          pair(33, 34, 31, 32),
          pair(37, 38, 35, 36),
          pair(41, 42, 39, 40),
          pair(45, 46, 43, 44),
        ],
        back: [51, 50, 49, 48, 47],
      },
    ],
  },
} satisfies Record<string, SeatPlan>;

/**
 * Fallback for vehicles whose diagram we do not have: full rows of four with
 * the leftover seats next to the middle door. Marked approximate so the chart
 * says so.
 */
function approximatePlan(seats: number, back: number): SeatPlan {
  const remaining = seats - back;
  const fullRows = Math.floor(remaining / 4);
  const rest = remaining % 4;
  const rows: SeatRow[] = [row("driver", "door")];
  let next = 1;

  const take = (count: number) =>
    Array.from({ length: count }, () => {
      const n = next;
      next += 1;
      return n;
    });

  for (let i = 0; i < fullRows; i += 1) {
    const [a, b, d, e] = take(4);
    rows.push(pair(a, b, d, e));
  }

  if (rest > 0) {
    const ids = take(rest);
    const left = ids.slice(0, Math.min(rest, 2));
    const extra = ids.slice(2);
    const right =
      extra.length === 2 ? [extra[1], extra[0]] : extra.length === 1 ? extra : [];
    rows.splice(1 + Math.ceil(fullRows * 0.6), 0, row(left, right));
  }

  return {
    decks: [{ rows, back: take(back) }],
    approximate: true,
  };
}

const minibusPlan = (seats: number) => approximatePlan(seats, 4);

export const vehicles: Vehicle[] = [
  {
    slug: "vdl-synergy-ns-765-rt",
    brand: "VDL",
    model: "Synergy",
    plate: "NS 765-RT",
    seats: 83,
    fleetClass: "dabldeker",
    description:
      "Dabldeker autobus turističke klase sa 83 komercijalna mesta za putnike.",
    photos: photos("ns-765-rt", {
      exterior: [9, 6, 12, 10, 3, 11],
      interior: [4, 5, 8, 2, 1, 7],
    }),
    seatPlan: seatPlans.ns765,
  },
  {
    slug: "vdl-synergy-ns-915-rt",
    brand: "VDL",
    model: "Synergy",
    plate: "NS 915-RT",
    seats: 87,
    fleetClass: "dabldeker",
    description:
      "Dabldeker autobus turističke klase na dve etaže, sa 87 komercijalnih mesta za putnike.",
    photos: photos("ns-915-rt", { exterior: [4, 3], interior: [2, 1] }),
  },
  {
    slug: "van-hool-ns-878-rt",
    brand: "Van Hool",
    model: "Van Hool",
    plate: "NS 878-RT",
    seats: 87,
    fleetClass: "dabldeker",
    description:
      "Dabldeker autobus turističke klase sa 87 komercijalnih mesta, kuhinjom i toaletom.",
    photos: photos("ns-878-rt", {
      exterior: [8],
      interior: [6, 3, 2, 5, 4, 1, 7],
    }),
    seatPlan: seatPlans.ns878,
  },
  {
    slug: "vdl-magiq-ns-754-rt",
    brand: "VDL",
    model: "MagiQ",
    plate: "NS 754-RT",
    seats: 63,
    fleetClass: "solo",
    description:
      "Autobus turističke klase sa 63 komercijalna mesta za putnike.",
    photos: photos("ns-754-rt", {
      exterior: [1, 7, 8, 4, 6],
      interior: [3, 5, 2],
    }),
    seatPlan: seatPlans.ns754,
  },
  {
    slug: "vdl-berkhof-ns-832-rt",
    brand: "VDL",
    model: "Berkhof",
    plate: "NS 832-RT",
    seats: 51,
    fleetClass: "solo",
    description:
      "Autobus turističke klase sa 51 komercijalnim mestom za putnike.",
    photos: photos("ns-832-rt", {
      exterior: [10, 11, 9, 8, 1, 7, 6, 2],
      interior: [5, 12, 3, 4],
    }),
    seatPlan: seatPlans.ns832,
  },
  {
    slug: "van-hool-ns-868-rt",
    brand: "Van Hool",
    model: "Van Hool",
    plate: "NS 868-RT",
    seats: 57,
    fleetClass: "solo",
    description:
      "Autobus turističke klase sa 57 komercijalnih mesta za putnike.",
    photos: photos("ns-868-rt", {
      exterior: [4, 2, 3, 5, 6, 8, 7],
      interior: [1],
    }),
    seatPlan: seatPlans.ns868,
  },
  {
    slug: "vdl-jonckheere-ns-778-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 778-RT",
    seats: 47,
    fleetClass: "solo",
    description:
      "Autobus za prevoz sportista, dece i radnika sa 47 komercijalnih mesta za sedenje.",
    photos: photos("ns-778-rt", {
      exterior: [3, 5, 1, 2, 4, 11],
      interior: [6, 12, 7, 9, 10, 8],
    }),
    seatPlan: seatPlans.ns778,
  },
  {
    slug: "vdl-jonckheere-ns-785-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 785-RT",
    seats: 57,
    fleetClass: "solo",
    description:
      "Autobus za prevoz sportista, dece i radnika sa 57 komercijalnih mesta za sedenje.",
    photos: photos("ns-785-rt", { exterior: [1, 3], interior: [2] }),
    seatPlan: seatPlans.ns785,
  },
  {
    slug: "vdl-jonckheere-ns-884-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 884-RT",
    seats: 47,
    fleetClass: "solo",
    description:
      "Solo autobus turističke klase sa 47 komercijalnih mesta za grupna putovanja i ugovoreni prevoz.",
    photos: photos("ns-884-rt", {
      exterior: [2, 1, 5, 6],
      interior: [3, 4],
    }),
  },
  {
    slug: "mercedes-sprinter-ns-858-rt",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 858-RT",
    seats: 18,
    fleetClass: "minibus",
    description:
      "Minibus turističke klase sa 18 komercijalnih mesta za putnike.",
    photos: photos("ns-858-rt", { exterior: [2, 1], interior: [3] }),
    seatPlan: minibusPlan(18),
  },
  {
    slug: "mercedes-sprinter-ns-861-rt",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 861-RT",
    seats: 19,
    fleetClass: "minibus",
    description:
      "Minibus turističke klase sa 19 komercijalnih mesta za putnike.",
    photos: photos("ns-861-rt", { exterior: [1, 2] }),
    seatPlan: minibusPlan(19),
  },
  {
    slug: "mercedes-sprinter-ns-871-rt",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 871-RT",
    fleetClass: "minibus",
    description:
      "Minibus turističke klase za manje grupe, ekskurzije i gradske ture.",
    photos: photos("ns-871-rt", { exterior: [3, 1, 2], interior: [4, 5] }),
  },
  {
    slug: "volkswagen-crafter-ns-880-rt",
    brand: "Volkswagen",
    model: "Crafter",
    plate: "NS 880-RT",
    fleetClass: "minibus",
    description:
      "Minibus za manje grupe — ekskurzije, dnevne ture i transferi.",
    photos: [],
  },
  {
    slug: "volkswagen-crafter-ns-882-rt",
    brand: "Volkswagen",
    model: "Crafter",
    plate: "NS 882-RT",
    fleetClass: "minibus",
    description:
      "Minibus za manje grupe — ekskurzije, dnevne ture i transferi.",
    photos: [],
  },
  {
    slug: "mercedes-sprinter-ns-890-rt",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 890-RT",
    fleetClass: "kombi",
    description:
      "Kombi vozilo do 8 mesta — transferi do aerodroma i poslovni prevoz.",
    photos: photos("ns-890-rt", { exterior: [5, 3, 4], interior: [2, 1] }),
  },
  {
    slug: "fiat-scudo-ns-769-cr",
    brand: "Fiat",
    model: "Scudo",
    plate: "NS 769-CR",
    fleetClass: "kombi",
    description:
      "Putnički kombi za manje grupe — transferi, poslovna putovanja i prevoz do aerodroma.",
    photos: photos("fiat-scudo", {
      exterior: [3, 1, 2, 4],
      interior: [5, 6],
    }),
  },
  {
    slug: "skoda-superb-ns-900-rt",
    brand: "Škoda",
    model: "Superb",
    plate: "NS 900-RT",
    fleetClass: "automobil",
    description:
      "Putničko vozilo za poslovna putovanja, transfere i svakodnevne obaveze.",
    photos: [],
  },
  {
    slug: "skoda-kodiaq-ns-909-rt",
    brand: "Škoda",
    model: "Kodiaq",
    plate: "NS 909-RT",
    fleetClass: "automobil",
    description:
      "Prostran SUV za putovanja, odmor i duže rute sa više prtljaga.",
    photos: [],
  },
];

/** Some vehicles are known only by their make, so avoid "Van Hool Van Hool". */
export function vehicleTitle(vehicle: Vehicle) {
  return vehicle.brand === vehicle.model
    ? vehicle.brand
    : `${vehicle.brand} ${vehicle.model}`;
}

/** Grids lead with the largest class, so the two-deckers come first. */
export const busVehicles = [
  ...vehicles.filter((v) => v.fleetClass === "dabldeker"),
  ...vehicles.filter((v) => v.fleetClass === "solo"),
];

export const minibusVehicles = [
  ...vehicles.filter((v) => v.fleetClass === "minibus"),
  ...vehicles.filter((v) => v.fleetClass === "kombi"),
];

export const carVehicles = vehicles.filter((v) => v.fleetClass === "automobil");

export const busServices = [
  "prevoz na turistička putovanja",
  "prevoz na team building",
  "transferi na aerodrom",
  "prevoz na ekskurzije",
  "prevoz na utakmice",
  "prevoz na koncerte",
  "organizovani prevoz dece u školu",
  "ugovoreni prevoz radnika",
];

export const minibusServices = [
  "turistička putovanja",
  "team building",
  "aerodrom",
  "ekskurzije",
  "utakmice",
  "koncerti",
];

export type Advantage = {
  title: string;
  text: string;
  icon: "clock" | "shield" | "sparkle" | "wheel" | "wallet" | "route";
};

export const advantages: Advantage[] = [
  {
    title: "Dostupni 24/7",
    text: "Dostupni smo Vam 24 časa dnevno i u svakom momentu možete pozvati ili poslati upit za Vašu vožnju.",
    icon: "clock",
  },
  {
    title: "Bezbednost na prvom mestu",
    text: "Vozila su tehnički ispravna i redovno servisirana jer su nam Vaša bezbednost i ugodjaj najbitniji.",
    icon: "shield",
  },
  {
    title: "Čistoća i komfor",
    text: "Sva vozila su besprekorno čista i klimatizovana, spremna za dugu i prijatnu vožnju.",
    icon: "sparkle",
  },
  {
    title: "Profesionalni vozači",
    text: "Iskusni vozači sa dugogodišnjom praksom u međunarodnom i domaćem prevozu putnika.",
    icon: "wheel",
  },
  {
    title: "Transparentne cene",
    text: "Fleksibilni uslovi, jasne cene bez skrivenih troškova i brza izrada ponude za Vašu rutu.",
    icon: "wallet",
  },
  {
    title: "Fleksibilne rute",
    text: "Prilagođavamo se Vašem itinereru — od jednosmernih transfera do višednevnih tura.",
    icon: "route",
  },
];

export const stats = [
  { value: vehicles.length, suffix: "", label: "Vozila u floti" },
  { value: 2023, suffix: "", label: "Godina osnivanja", raw: true },
  { value: 24, suffix: "/7", label: "Dostupnost" },
  { value: 500, suffix: "+", label: "Zadovoljnih grupa" },
];
