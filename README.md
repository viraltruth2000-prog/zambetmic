## Nova Events (Next.js)

Starter de site pentru o firmă de evenimente (landing + pagini: Servicii, Galerie, Despre, Contact) construit în Next.js (App Router) + Tailwind.

## Getting Started

Rulează serverul de development:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Personalizare rapidă

- Setează numele/descrierea/telefon/email în [src/lib/site.ts](src/lib/site.ts)
- Recomandat: copiază [./.env.example](./.env.example) în `.env.local` și completează variabilele `NEXT_PUBLIC_*` (site URL, contact, social)
- Pagini:
	- Home: [src/app/page.tsx](src/app/page.tsx)
	- Servicii: [src/app/servicii/page.tsx](src/app/servicii/page.tsx)
	- Galerie: [src/app/galerie/page.tsx](src/app/galerie/page.tsx)
	- Despre: [src/app/despre/page.tsx](src/app/despre/page.tsx)
	- Contact: [src/app/contact/page.tsx](src/app/contact/page.tsx)

### Formular contact

Formularul de pe Contact trimite către API-ul [src/app/api/contact/route.ts](src/app/api/contact/route.ts).

### SEO Checklist (Sprint 1)

- Setează `NEXT_PUBLIC_SITE_URL` cu domeniul real (fără slash final), ex: `https://zambetekids.ro`
- Completează `NEXT_PUBLIC_CONTACT_*` și `NEXT_PUBLIC_SOCIAL_*`
- Verifică:
	- `https://domeniu.ro/robots.txt`
	- `https://domeniu.ro/sitemap.xml`
	- metadata OG/Twitter (title/description/image) pe paginile principale

### SEO Checklist (Sprint 2 - Search Console Prep)

- Setează `GOOGLE_SITE_VERIFICATION` în `.env.local` (token-ul din Google Search Console)
- Rulează verificarea rapidă de config:

```bash
npm run seo:check
```

- Confirmă în producție:
	- `robots.txt` include `host` și `sitemap`
	- `sitemap.xml` listează toate rutele publice cu `lastModified`
	- Canonical URL este absolut și corect pentru domeniul live

Email (Resend):

- Copiază [./.env.example](./.env.example) în `.env.local`
- Completează `RESEND_API_KEY` și `CONTACT_TO_EMAIL`
- (Opțional) setează `CONTACT_FROM_EMAIL` (trebuie să fie un sender verificat în Resend)

## Assets (imagini)

Proiectul vine cu imagini “placeholder” în `public/` (generate automat) ca să poți lucra la layout fără să ai încă pozele finale.

### Generează placeholders (opțional)

```bash
npm run generate:services
npm run generate:characters
npm run generate:moments
npm run generate:logo
npm run generate:raster
```

### Înlocuiește cu poze reale

Înlocuiește fișierele din `public/` păstrând aceleași nume, ca să nu mai schimbi codul:

- `public/model/bg-main.png` (hero background)
- `public/model/bg-services.png`
- `public/model/bg-characters.png`
- `public/services/service-01.png`, `service-02.png`, `service-03.png` (ideal 4:3)
- `public/characters/*.png` (ideal portret, ex. 3:4)
- `public/moments/moment-01.png` … `moment-08.png` (ideal 4:3)

Sfat: dacă pozele sunt mari, convertește-le la WebP/AVIF înainte (sau folosește `next/image` ca acum și lasă Next să optimizeze în runtime).

## Build

```bash
npm run build
npm run start
```
