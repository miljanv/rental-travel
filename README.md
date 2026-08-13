# Rental Travel

Redizajn sajta [rentaltravel.rs](https://rentaltravel.rs) — Next.js 16 (App Router), TypeScript i Tailwind CSS v4.

Dizajn je rađen po temi [LuxeDrive (Qode Interactive)](https://luxedrive.qodeinteractive.com/premium-vehicles/): ista tipografska skala, isti sistem dugmadi sa animiranim markerom, ista struktura sekcija i scroll animacije. Sav tekst, kontakt podaci i fotografije su preuzeti sa postojećeg sajta.

## Pokretanje

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkcijski build
npm start        # pokretanje produkcijskog builda
```

## Struktura

```
src/
  app/
    layout.tsx              # fontovi, metadata, JSON-LD, Header/Footer
    page.tsx                # Početna
    o-nama/                 # O nama
    iznajmite-autobus/      # Autobusi + flota
    iznajmite-minibus/      # Minibusevi + flota
    iznajmite-automobil/    # Rent a car
    transferi-aerodrom/     # Transferi
    kontakt/                # Kontakt + forma (server action)
    sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/                 # Header, Footer, PageHero, BackToTop
    home/                   # Sekcije početne strane
    fleet/                  # Kartice i grid vozila
    contact/                # Kontakt forma
    ui/                     # Button, Reveal, Counter, Lightbox, Icons
  lib/
    site.ts                 # SVI podaci sajta (kontakt, meni, vozila, usluge)
scripts/
  optimize-images.mjs       # JPG/PNG -> WebP u 3 širine
  make-logo.mjs             # transparentni logo iz prosleđene slike
public/images/              # optimizovane slike (8.8 MB umesto 22 MB)
```

Sadržaj se menja na jednom mestu — `src/lib/site.ts`. Tu su telefon, e-mail, Instagram, meni, lista vozila (marka, model, tablice, broj mesta, slike) i tekstovi usluga.

## Dizajn sistem

Definisan u `src/app/globals.css` preko Tailwind v4 `@theme`:

| Token | Vrednost | Upotreba |
| --- | --- | --- |
| `--color-ink` | `#0c1315` | pozadine tamnih sekcija, naslovi |
| `--color-brand` | `#e8112d` | akcent (crvena iz logotipa) |
| `--color-sky` | `#00a8d8` | sekundarna (plava iz logotipa) |
| `--color-sand` | `#d9d6ce` | linije, ivice |
| `--color-sand-light` | `#f6f4f0` | naizmenične svetle sekcije |
| `--font-heading` | Epilogue | naslovi |
| `--font-body` | Sora | tekst |
| `--font-label` | Inconsolata | uppercase labele, dugmad |

Akcent se menja u jednoj liniji — `--color-brand` u `@theme`. Za originalnu zlatnu iz LuxeDrive teme postavite `#bfa37c`.

## Kontakt forma

Server action `src/app/kontakt/actions.ts` validira unos na serveru i šalje mejl preko Resend REST API-ja (bez dodatnih zavisnosti). Upit stiže na `site.email`, a `reply_to` je adresa posetioca, pa se na upit odgovara običnim „Reply".

Podešavanje:

1. Na [resend.com](https://resend.com) dodajte domen `rentaltravel.rs` i unesite DNS zapise koje vam dashboard prikaže (DKIM, SPF, return-path). Resend šalje isključivo sa verifikovanog domena.
2. Napravite API ključ (`re_…`).
3. Lokalno: `cp .env.example .env.local` i popunite vrednosti.
4. Produkcija: iste dve promenljive u Vercel → Settings → Environment Variables, pa novi deploy.

```bash
RESEND_API_KEY=re_vas_kljuc
CONTACT_FROM_EMAIL="Rental Travel <upit@rentaltravel.rs>"
```

Dok `RESEND_API_KEY` i `CONTACT_FROM_EMAIL` nisu podešeni, forma javlja posetiocu da pozove telefonom umesto da lažno prijavi uspeh, a razlog upisuje u server log.

Zaštita od spama: skriveno polje `website` (bot koji ga popuni dobije poruku o uspehu, ali se mejl ne šalje) i ograničenje od tri upita u deset minuta po IP adresi. Ograničenje se drži u memoriji instance, pa je usporavanje botova, ne tvrda garancija — ako spam postane problem, sledeći korak je Cloudflare Turnstile.

## Slike

Originali su skinuti sa starog sajta i konvertovani u WebP u tri širine (640/1024/1600) plus blur placeholder:

```bash
node scripts/optimize-images.mjs   # očekuje originale u /tmp/scrape/raw
node scripts/make-logo.mjs         # transparentni logo + WebP varijante
```

Vozilo `NS 797-ZV` (Van Hool Astromega) nema fotografije na starom sajtu — kartica koristi rezervnu sliku. Dodajte putanje u `vehicles` u `src/lib/site.ts` kada slike budu dostupne.

## Optimizacija

- Sve stranice su statički prerenderovane (`○ Static`).
- Client komponente samo gde su neophodne: hero slider, header, lightbox, counter, forma.
- Slike: WebP + AVIF, `sizes` na svakoj slici, `priority` samo na prvom hero slajdu, godišnji `Cache-Control: immutable`.
- Fontovi: `next/font` sa `display: swap`, self-hosted, `latin-ext` (naša slova).
- Animacije: samo `transform`/`opacity`, uz `IntersectionObserver`; sve se gasi na `prefers-reduced-motion`.
