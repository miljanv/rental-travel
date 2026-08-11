import type { Metadata, Viewport } from "next";
import { Epilogue, Inconsolata, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { site } from "@/lib/site";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Iznajmljivanje autobusa, minibuseva i automobila`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "iznajmljivanje autobusa",
    "iznajmljivanje minibusa",
    "rent a car",
    "transfer aerodrom",
    "prevoz putnika",
    "autobuski prevoz Srbija",
    "Rental Travel",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Prevoz putnika, transferi i rent a car`,
    description: site.description,
    images: [
      {
        url: "/images/fleet/ns-785-rt-1-1600.webp",
        width: 1600,
        height: 1200,
        alt: `${site.name} autobus`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Prevoz putnika, transferi i rent a car`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1315",
  colorScheme: "light",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  telephone: "+381692084860",
  email: site.email,
  description: site.description,
  foundingDate: site.founded,
  image: `${site.url}/images/logo.png`,
  logo: `${site.url}/images/logo.png`,
  sameAs: [site.instagram],
  address: {
    "@type": "PostalAddress",
    addressCountry: "RS",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="sr"
      className={`${epilogue.variable} ${sora.variable} ${inconsolata.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-clip">
        {/* Scroll reveals start hidden and are opened by JS, so force them
            visible when scripting is unavailable. */}
        <noscript>
          <style>{`.reveal,.reveal-mask{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand focus:px-5 focus:py-3 focus:font-label focus:text-sm focus:tracking-widest focus:text-white focus:uppercase"
        >
          Preskoči na sadržaj
        </a>
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
