# Alhambra Tour — Independent Alhambra Guide

Independent Alhambra tickets guide (GetYourGuide affiliate). Next.js 16 + Tailwind 4 + Drizzle ORM + Neon Postgres.

## Run it

```bash
npm install
cp .env.example .env.local   # then paste your Neon DATABASE_URL
npm run dev                  # http://localhost:3000
```

## Database (Neon)

```bash
npm run db:generate   # create SQL migrations from src/db/schema.ts
npm run db:migrate    # apply them to Neon
npm run db:studio     # browse tables
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/facts.ts` | Prices, opening status, key numbers. One place to update; moves to the `facts` table in phase 2 |
| `src/lib/gyg.ts` | GetYourGuide link builder (partner ID + per-placement campaign) and featured tours |
| `src/components/hero/` | Cinematic scroll hero (adapted from MotionSites "Mostar Guide") with original illustrated layers |
| `src/components/ticket-finder.tsx` | 4-question "Which ticket do I need?" tool |
| `src/db/schema.ts` | Admin data model: sites, pages, keyword registry, facts, GYG products, media, redirects, clicks, GSC, availability checks, changelog |

## Design tokens

dusk `#1b2440` · myrtle `#1f4a3a` (primary) · stucco `#f2eadc` (page) · hamra `#b9562f` (illustration) · zellige `#2a5aa0` (links) · display: Gloock · text: Figtree (both self-hosted via @fontsource).

The arch shape (`.arch`) is used only for recommendations.

## Next

1. Admin panel at `/admin` (auth, pages editor, keyword registry, facts library, product library)
2. Ticket, tour, day-trip and plan page templates
3. Swap illustrated hero layers for your own photos
