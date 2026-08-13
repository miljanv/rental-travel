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
  import-fleet.mjs          # fotografije flote, prva serija
  import-fleet-v2.mjs       # fotografije flote, druga serija + carousel
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

Server action `src/app/kontakt/actions.ts` validira unos na serveru i šalje mejl preko SMTP-a (`nodemailer`), bez ijednog eksternog servisa. Upit stiže na `site.email`, a `replyTo` je adresa posetioca, pa se na upit odgovara običnim „Reply".

Podešavanje: `cp .env.example .env.local`, popunite vrednosti, pa iste promenljive dodajte u Vercel → Settings → Environment Variables i pokrenite novi deploy (promenljive se čitaju pri build-u).

Gmail — potreban je uključen 2FA i „App password" sa [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), jer obična lozinka ne prolazi:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=rentaltraveldoo@gmail.com
SMTP_PASSWORD=16_cifreni_app_password
```

Sanduče na domenu (Hostinger) — nema DNS izmena jer zona već ima Hostinger SPF i MX:

```bash
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=office@rentaltravel.rs
SMTP_PASSWORD=lozinka_sanduceta
```

Port 465 ide preko TLS-a od prvog bajta, a 587 kroz STARTTLS — kod prati port, pa je dovoljno promeniti `SMTP_PORT`. Pošiljalac je uvek `SMTP_USER` jer Gmail i većina servera odbijaju tuđu adresu u `From`, a primalac je `site.email` ako se ne postavi `CONTACT_TO_EMAIL`.

Dok SMTP promenljive nisu podešene, forma javlja posetiocu da pozove telefonom umesto da lažno prijavi uspeh, a razlog upisuje u server log. Svaka greška servera se loguje sa punim odgovorom, vidljivo u Vercel Runtime Logs.

Zaštita od spama: skriveno polje `website` (bot koji ga popuni dobije poruku o uspehu, ali se mejl ne šalje) i ograničenje od tri upita u deset minuta po IP adresi. Ograničenje se drži u memoriji instance, pa je usporavanje botova, ne tvrda garancija — ako spam postane problem, sledeći korak je Cloudflare Turnstile.

## Slike

Sve slike se konvertuju u WebP u tri širine (640/1024/1600) plus blur placeholder; slike za hero carousel dobijaju i 1920 jer se prikazuju preko celog ekrana.

```bash
node scripts/optimize-images.mjs   # originali sa starog sajta, iz /tmp/scrape/raw
node scripts/import-fleet.mjs      # prva serija fotografija po vozilu, iz foldera klijenta
node scripts/import-fleet-v2.mjs   # druga serija + zajedničke slike za carousel
node scripts/make-logo.mjs         # transparentni logo + WebP varijante
```

Import skripte numerišu fotografije po imenu fajla (`ns-884-rt-1`, `-2`, …) i preskaču duplikate. Raspoređivanje na „spolja" i „unutra", kao i izbor naslovne slike, radi se ručno u `vehicles` u `src/lib/site.ts` — skripta ne može da razlikuje enterijer od eksterijera.

Bez fotografija su još `NS 880-RT` i `NS 882-RT` (VW Crafter), `NS 900-RT` (Škoda Superb) i `NS 909-RT` (Škoda Kodiaq); njihove kartice prikazuju „Fotografije u pripremi".

## Raspored sedenja

Šeme u `seatPlans` (`src/lib/site.ts`) prepisane su red po red iz klijentove tabele „Raspored sedenja RENTAL TRAVEL". Svaki red je `row(levo, desno)` — broj sedišta sa te strane prolaza ili ono što stoji umesto njih (`door`, `stairs`, `toilet`, `table`, `kitchen`, `guide`, `driver`, `codriver`), a `back` je klupa preko celog zadnjeg dela. Mesta za vodiče i suvozača se crtaju, ali se ne broje, pa zbir uvek odgovara komercijalnom kapacitetu iz `seats`.

Vozila bez tabele (`NS 915-RT`, `NS 884-RT`) prikazuju broj mesta bez šeme. Minibusevi koriste `approximatePlan`, pa ispod šeme stoji napomena da je raspored informativan.

## Optimizacija

- Sve stranice su statički prerenderovane (`○ Static`).
- Client komponente samo gde su neophodne: hero slider, header, lightbox, counter, forma.
- Slike: WebP + AVIF, `sizes` na svakoj slici, `priority` samo na prvom hero slajdu, godišnji `Cache-Control: immutable`.
- Fontovi: `next/font` sa `display: swap`, self-hosted, `latin-ext` (naša slova).
- Animacije: samo `transform`/`opacity`, uz `IntersectionObserver`; sve se gasi na `prefers-reduced-motion`.
