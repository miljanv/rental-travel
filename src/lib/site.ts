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
  /** Condensed label for the desktop bar, where seven full labels do not fit. */
  short: string;
  href: string;
};

/** The home page is reached through the logo, so it is not listed here. */
export const navigation: NavItem[] = [
  { label: "O nama", short: "O nama", href: "/o-nama" },
  { label: "Iznajmite Autobus", short: "Autobus", href: "/iznajmite-autobus" },
  { label: "Iznajmite Minibus", short: "Minibus", href: "/iznajmite-minibus" },
  {
    label: "Iznajmite Automobil",
    short: "Automobil",
    href: "/iznajmite-automobil",
  },
  {
    label: "Transferi Aerodrom",
    short: "Transferi",
    href: "/transferi-aerodrom",
  },
  { label: "Kontakt", short: "Kontakt", href: "/kontakt" },
];

export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  href: string;
  excerpt: string;
  image: string;
};

export const categories: ServiceCategory[] = [
  {
    slug: "iznajmite-autobus",
    title: "Iznajmite Autobus",
    shortTitle: "Autobus",
    href: "/iznajmite-autobus",
    excerpt:
      "Autobusi turističke klase od 47 do 83 mesta za putovanja, ekskurzije, team building i ugovoreni prevoz.",
    image: "/images/fleet/ns-785-rt-1-1600.webp",
  },
  {
    slug: "iznajmite-minibus",
    title: "Iznajmite Mini Bus",
    shortTitle: "Minibus",
    href: "/iznajmite-minibus",
    excerpt:
      "Minibusevi i kombi vozila do 20 mesta — idealni za manje grupe, gradske ture i transfere.",
    image: "/images/fleet/ns-871-rt-3-1600.webp",
  },
  {
    slug: "transferi-aerodrom",
    title: "Transfer Aerodrom",
    shortTitle: "Transferi",
    href: "/transferi-aerodrom",
    excerpt:
      "Pouzdan i udoban transfer do i sa aerodroma, sa bilo koje lokacije, prilagođen vašem rasporedu leta.",
    image: "/images/hero/sprinter-wide-1600.webp",
  },
  {
    slug: "iznajmite-automobil",
    title: "Iznajmite Automobil",
    shortTitle: "Automobil",
    href: "/iznajmite-automobil",
    excerpt:
      "Širok izbor pouzdanih i redovno održavanih vozila za kratkoročno i dugoročno iznajmljivanje.",
    image: "/images/hero/profilna-wide-1600.webp",
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
  dabldeker: { label: "Dabldeker autobus", capacity: "78+ mesta" },
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

/** A row of seats on either side of the aisle. */
export type SeatRow = { left: number; right: number };

export type SeatDeck = {
  label?: string;
  rows: SeatRow[];
  /** Wider bench across the back of the deck. */
  back: number;
  /** An upper deck is reached by stairs and has neither driver nor doors. */
  front: "driver" | "stairs";
};

export type SeatPlan = { decks: SeatDeck[] };

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

/**
 * Approximate 2+2 layout derived from the seat count: full rows of four, one
 * shorter row where the middle door sits, and a wider bench at the back. Good
 * enough to show a group how the vehicle is arranged, but every plan needs a
 * check against the real vehicle before it can be called exact.
 */
function deck(
  total: number,
  back: number,
  label?: string,
  front: SeatDeck["front"] = "driver"
): SeatDeck {
  const rows: SeatRow[] = [];
  const remaining = total - back;
  const fullRows = Math.floor(remaining / 4);
  const rest = remaining % 4;

  for (let i = 0; i < fullRows; i += 1) rows.push({ left: 2, right: 2 });

  if (rest > 0) {
    // Seats come off the door side, which is the right-hand one on our vehicles.
    const left = Math.min(rest, 2);
    rows.splice(Math.ceil(fullRows * 0.6), 0, { left, right: rest - left });
  }

  return { label, rows, back, front };
}

export function deckSeats(value: SeatDeck) {
  return value.rows.reduce((sum, row) => sum + row.left + row.right, 0) + value.back;
}

const coachPlan = (seats: number): SeatPlan => ({ decks: [deck(seats, 5)] });
const minibusPlan = (seats: number): SeatPlan => ({ decks: [deck(seats, 4)] });

/** The lower-deck share is the usual VDL split; correct it once measured. */
const doubleDeckPlan = (seats: number, lower = 19): SeatPlan => ({
  decks: [
    deck(lower, 5, "Donja etaža"),
    deck(seats - lower, 5, "Gornja etaža", "stairs"),
  ],
});

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
    seatPlan: doubleDeckPlan(83),
  },
  {
    slug: "vdl-synergy-ns-915-rt",
    brand: "VDL",
    model: "Synergy",
    plate: "NS 915-RT",
    fleetClass: "dabldeker",
    description:
      "Dabldeker autobus turističke klase na dve etaže, za velike grupe putnika.",
    photos: [],
  },
  {
    slug: "van-hool-ns-878-rt",
    brand: "Van Hool",
    model: "Van Hool",
    plate: "NS 878-RT",
    fleetClass: "dabldeker",
    description:
      "Dabldeker autobus turističke klase sa dve etaže i velikim prtljažnim prostorom.",
    photos: [],
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
    seatPlan: coachPlan(63),
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
    seatPlan: coachPlan(51),
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
      exterior: [4, 2, 3, 5, 6],
      interior: [1],
    }),
    seatPlan: coachPlan(57),
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
    seatPlan: coachPlan(47),
  },
  {
    slug: "vdl-jonckheere-ns-785-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 785-RT",
    seats: 47,
    fleetClass: "solo",
    description:
      "Autobus za prevoz sportista, dece i radnika sa 47 komercijalnih mesta za sedenje.",
    photos: photos("ns-785-rt", { exterior: [1, 3], interior: [2] }),
    seatPlan: coachPlan(47),
  },
  {
    slug: "vdl-jonckheere-ns-884-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 884-RT",
    fleetClass: "solo",
    description:
      "Solo autobus turističke klase za grupna putovanja i ugovoreni prevoz.",
    photos: [],
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
    photos: [],
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
