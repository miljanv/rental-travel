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

export const navigation: NavItem[] = [
  { label: "Početna", short: "Početna", href: "/" },
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
      "Mercedes Sprinter minibusevi turističke klase sa 18 i 19 mesta — idealni za manje grupe i gradske ture.",
    image: "/images/fleet/ns-837-kl-1-1600.webp",
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

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  plate: string;
  seats: number;
  category: "autobus" | "minibus";
  klasa: string;
  description: string;
  images: string[];
};

export const vehicles: Vehicle[] = [
  {
    slug: "vdl-berkhof-ns-832-rt",
    brand: "VDL",
    model: "Berkhof",
    plate: "NS 832-RT",
    seats: 51,
    category: "autobus",
    klasa: "Turistička klasa",
    description:
      "Autobus turističke klase sa 51 komercijalnim mestom za putnike.",
    images: [
      "/images/fleet/ns-832-rt-1",
      "/images/fleet/ns-832-rt-2",
    ],
  },
  {
    slug: "van-hool-zr-242-hr",
    brand: "Van Hool",
    model: "Van Hool",
    plate: "ZR 242-HR",
    seats: 57,
    category: "autobus",
    klasa: "Turistička klasa",
    description:
      "Autobus turističke klase sa 57 komercijalnih mesta za putnike.",
    images: [
      "/images/fleet/zr-242-hr-1",
      "/images/fleet/zr-242-hr-2",
      "/images/fleet/zr-242-hr-3",
    ],
  },
  {
    slug: "vdl-megiq-ns-754-rt",
    brand: "VDL",
    model: "MegIQ",
    plate: "NS 754-RT",
    seats: 63,
    category: "autobus",
    klasa: "Turistička klasa",
    description:
      "Autobus turističke klase sa 63 komercijalnih mesta za putnike.",
    images: [
      "/images/fleet/ns-754-rt-1",
      "/images/fleet/ns-754-rt-2",
      "/images/fleet/ns-754-rt-3",
      "/images/fleet/ns-754-rt-4",
    ],
  },
  {
    slug: "vdl-synergy-ns-765-rt",
    brand: "VDL",
    model: "Synergy",
    plate: "NS 765-RT",
    seats: 83,
    category: "autobus",
    klasa: "Dupla etaža",
    description:
      "Autobus turističke klase sa 83 komercijalnih mesta za putnike.",
    images: [
      "/images/fleet/ns-765-rt-1",
      "/images/fleet/ns-765-rt-2",
      "/images/fleet/ns-765-rt-3",
      "/images/fleet/ns-765-rt-4",
      "/images/fleet/ns-765-rt-5",
    ],
  },
  {
    slug: "van-hool-astromega-ns-797-zv",
    brand: "Van Hool",
    model: "Astromega",
    plate: "NS 797-ZV",
    seats: 63,
    category: "autobus",
    klasa: "Dupla etaža",
    description:
      "Autobus turističke klase sa 63 komercijalnih mesta za putnike.",
    images: [],
  },
  {
    slug: "vdl-jonckheere-ns-778-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 778-RT",
    seats: 47,
    category: "autobus",
    klasa: "Sportisti, deca, radnici",
    description:
      "Autobus za prevoz sportista, dece i radnika sa 47 komercijalnih mesta za sedenje.",
    images: [
      "/images/fleet/ns-778-rt-1",
      "/images/fleet/ns-778-rt-2",
      "/images/fleet/ns-778-rt-3",
    ],
  },
  {
    slug: "vdl-jonckheere-ns-785-rt",
    brand: "VDL",
    model: "Jonckheere",
    plate: "NS 785-RT",
    seats: 47,
    category: "autobus",
    klasa: "Sportisti, deca, radnici",
    description:
      "Autobus za prevoz sportista, dece i radnika sa 47 komercijalnih mesta za sedenje.",
    images: [
      "/images/fleet/ns-785-rt-1",
      "/images/fleet/ns-785-rt-2",
      "/images/fleet/ns-785-rt-3",
      "/images/fleet/ns-785-rt-4",
    ],
  },
  {
    slug: "mercedes-sprinter-ns-837-kl",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 837-KL",
    seats: 19,
    category: "minibus",
    klasa: "Turistička klasa",
    description:
      "Minibus turističke klase sa 19 komercijalnih mesta za putnike.",
    images: [
      "/images/fleet/ns-837-kl-1",
      "/images/fleet/ns-837-kl-2",
      "/images/fleet/ns-837-kl-3",
    ],
  },
  {
    slug: "mercedes-sprinter-ns-858-rt",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 858-RT",
    seats: 18,
    category: "minibus",
    klasa: "Turistička klasa",
    description:
      "Minibus turističke klase sa 18 komercijalnih mesta za putnike.",
    images: [
      "/images/fleet/ns-858-rt-1",
      "/images/fleet/ns-858-rt-2",
    ],
  },
  {
    slug: "mercedes-sprinter-ns-861-rt",
    brand: "Mercedes",
    model: "Sprinter",
    plate: "NS 861-RT",
    seats: 19,
    category: "minibus",
    klasa: "Turistička klasa",
    description:
      "Minibus turističke klase sa 19 komercijalnih mesta za putnike.",
    images: [
      "/images/fleet/ns-861-rt-1",
      "/images/fleet/ns-861-rt-2",
    ],
  },
];

/** Some vehicles are known only by their make, so avoid "Van Hool Van Hool". */
export function vehicleTitle(vehicle: Vehicle) {
  return vehicle.brand === vehicle.model
    ? vehicle.brand
    : `${vehicle.brand} ${vehicle.model}`;
}

export const busVehicles = vehicles.filter((v) => v.category === "autobus");
export const minibusVehicles = vehicles.filter((v) => v.category === "minibus");

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
  { value: 10, suffix: "", label: "Vozila u floti" },
  { value: 2023, suffix: "", label: "Godina osnivanja", raw: true },
  { value: 24, suffix: "/7", label: "Dostupnost" },
  { value: 500, suffix: "+", label: "Zadovoljnih grupa" },
];
