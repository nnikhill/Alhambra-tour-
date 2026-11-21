# Alhambra Tour Ticket — independent Alhambra guide

Independent Alhambra tickets guide that earns through GetYourGuide affiliate links.
Next.js 16 (App Router) · Tailwind 4 · Drizzle ORM · Neon Postgres · Auth.js · Tiptap · Vercel Blob.

## Run it

```bash
npm install
cp .env.example .env.local      # fill in DATABASE_URL and AUTH_SECRET
npm run db:migrate              # create tables (safe to re-run)
npm run db:seed-blog            # first time only: import the 12 launch posts
ADMIN_EMAIL=you@example.com ADMIN_NAME="Your Name" ADMIN_PASSWORD='12+ characters' npm run admin:create
npm run dev                     # http://localhost:3000, admin at /admin
```

Checks: `npm run lint`, `npm run typecheck`, `npm run build`.

## Blog admin (`/admin`)

- Sign in with the account made by `admin:create` (roles: `admin`, `editor`, `writer`;
  writers save drafts, editors publish, only admins delete for good and edit authors).
- Write or paste (Google Docs, Word, web pages): headings, lists, links, tables and
  images keep their formatting. Everything is cleaned on save (no scripts or inline styles).
- Toolbar extras: link picker (site pages, GetYourGuide products or searches, any URL),
  image upload with required alt text, tables, "Short answer" and tip boxes, booking boxes,
  HTML source mode.
- GetYourGuide links are stored as `gyg:<product or search>` and turned into tracked links
  when the page renders: partner ID, UTM tags, `sub_id=blog_<slug>_link_<n>` / `_cta_<n>`,
  `rel="sponsored nofollow noopener"`.
- Sidebar: publish / schedule / unpublish, preview, SEO fields with a checklist and Google
  preview, social preview, featured image, category, tags, author, booking card, related posts,
  FAQ (also output as FAQ schema), revisions (last 30).
- Publishing updates `/blog/`, the post, `sitemap.xml` and `llms.txt` straight away.
  Changing the URL of a live post adds a permanent redirect from the old URL.
  Scheduled posts appear within an hour of their time (page cache).

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Needed for |
| --- | --- |
| `DATABASE_URL` | Neon connection string (blog, admin, sitemap) |
| `AUTH_SECRET` | Admin sessions. A long random string; changing it signs everyone out |
| `BLOB_READ_WRITE_TOKEN` | Image uploads (create a Blob store in Vercel; it adds this for you) |
| `NEXT_PUBLIC_SITE_URL` | `https://alhambratourticket.com` |
| `NEXT_PUBLIC_GYG_PARTNER_ID` | Optional override of the GetYourGuide partner ID |

## Security notes

- Content-Security-Policy: nonce + `strict-dynamic` on `/admin` and the admin APIs
  (`src/proxy.ts`), a static policy on public pages (`next.config.ts`). See `src/lib/csp.ts`.
- Admin API: server-side session and role check on every route, same-origin check on writes,
  zod validation, HTML sanitised with sanitize-html, uploads type-sniffed (no SVG, 5 MB max).
- Login: bcrypt (cost 12), 5 failed attempts per email or IP in 15 minutes locks for 15 minutes.

## Where things live

| Path | What |
| --- | --- |
| `src/app/(site)/` | Public pages |
| `src/app/admin/`, `src/app/api/admin/` | Blog admin pages and API |
| `src/lib/blog/` | Blog read side (`repo.ts`), write side (`admin-repo.ts`), sanitiser, renderer, SEO checks |
| `src/components/admin/` | Editor (Tiptap) and admin UI |
| `src/content/` | Ticket, tour and guide page content; `posts.ts` is the original blog seed |
| `src/lib/gyg.ts` | GetYourGuide link builder and product list |
| `src/db/schema.ts`, `drizzle/` | Data model and SQL migrations |
| `scripts/` | `migrate.mjs`, `seed-blog.mts`, `create-admin.mjs` |
