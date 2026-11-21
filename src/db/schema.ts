import {
  pgTable, text, integer, boolean, timestamp, numeric, jsonb, uniqueIndex, index, pgEnum, date, serial,
} from "drizzle-orm/pg-core";

// One admin, many sites: every content row belongs to a site.

export const pageStatus = pgEnum("page_status", ["draft", "review", "scheduled", "published"]);
export const pageType = pgEnum("page_type", ["hub", "ticket", "tour", "day_trip", "plan", "guide", "blog", "legal"]);
export const userRole = pgEnum("user_role", ["admin", "editor", "writer"]);
export const factState = pgEnum("fact_state", ["open", "closed", "limited", "value"]);

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // "alhambra"
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: userRole("role").notNull().default("writer"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url"),
});

// Keyword registry: one primary keyword owns one page per site.
export const keywords = pgTable("keywords", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  keyword: text("keyword").notNull(),
  cluster: text("cluster").notNull(), // tickets | tours | day-trips | plan | guide | blog
  intent: text("intent").notNull(), // transactional | commercial | informational
  priority: text("priority").notNull().default("P2"),
  targetPath: text("target_path").notNull(),
  monthlyVolume: integer("monthly_volume"),
  notes: text("notes"),
}, (t) => [uniqueIndex("keywords_site_keyword").on(t.siteId, t.keyword)]);

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  type: pageType("type").notNull(),
  path: text("path").notNull(),
  title: text("title").notNull(),
  h1: text("h1").notNull(),
  metaDescription: text("meta_description").notNull(),
  primaryKeywordId: integer("primary_keyword_id").references(() => keywords.id),
  body: jsonb("body").$type<unknown[]>().notNull().default([]), // block editor content
  schemaTypes: text("schema_types").array().notNull().default([]),
  ogImage: text("og_image"),
  canonical: text("canonical"),
  noindex: boolean("noindex").notNull().default(false),
  authorId: integer("author_id").references(() => authors.id),
  status: pageStatus("status").notNull().default("draft"),
  publishAt: timestamp("publish_at"),
  lastCheckedAt: date("last_checked_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => [
  uniqueIndex("pages_site_path").on(t.siteId, t.path),
  // A keyword can be the primary keyword of only one page: this blocks cannibalisation.
  uniqueIndex("pages_primary_keyword").on(t.primaryKeywordId),
]);

// Facts library: prices, hours and statuses, referenced in content as {{key}}.
export const facts = pgTable("facts", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  key: text("key").notNull(), // "price.general"
  label: text("label").notNull(),
  value: text("value").notNull(),
  state: factState("state").notNull().default("value"),
  sourceUrl: text("source_url"),
  lastCheckedAt: date("last_checked_at").notNull(),
  showInStatusBar: boolean("show_in_status_bar").notNull().default(false),
}, (t) => [uniqueIndex("facts_site_key").on(t.siteId, t.key)]);

export const gygProducts = pgTable("gyg_products", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  gygId: text("gyg_id"), // GetYourGuide activity ID, e.g. "t12345"
  title: text("title").notNull(),
  bestFor: text("best_for").notNull(),
  url: text("url").notNull(),
  priceFrom: numeric("price_from", { precision: 8, scale: 2 }),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  reviewCount: integer("review_count"),
  includesNasrid: boolean("includes_nasrid").notNull().default(false),
  freeCancellation: boolean("free_cancellation").notNull().default(true),
  active: boolean("active").notNull().default(true),
  lastCheckedAt: date("last_checked_at"),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  url: text("url").notNull(),
  alt: text("alt").notNull(), // required: no image without alt text
  credit: text("credit").notNull(),
  width: integer("width"),
  height: integer("height"),
  ownPhoto: boolean("own_photo").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const redirects = pgTable("redirects", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  from: text("from_path").notNull(),
  to: text("to_path").notNull(),
  permanent: boolean("permanent").notNull().default(true),
}, (t) => [uniqueIndex("redirects_site_from").on(t.siteId, t.from)]);

export const affiliateClicks = pgTable("affiliate_clicks", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  pagePath: text("page_path").notNull(),
  position: text("position").notNull(),
  productId: integer("product_id").references(() => gygProducts.id),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
}, (t) => [index("clicks_site_page").on(t.siteId, t.pagePath)]);

export const availabilityChecks = pgTable("availability_checks", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  checkedOn: date("checked_on").notNull(),
  visitDate: date("visit_date").notNull(),
  ticketType: text("ticket_type").notNull(),
  available: boolean("available").notNull(),
  checkedBy: integer("checked_by").references(() => users.id),
});

export const gscDaily = pgTable("gsc_daily", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  day: date("day").notNull(),
  pagePath: text("page_path").notNull(),
  query: text("query"),
  clicks: integer("clicks").notNull(),
  impressions: integer("impressions").notNull(),
  position: numeric("position", { precision: 5, scale: 2 }).notNull(),
}, (t) => [index("gsc_site_day").on(t.siteId, t.day)]);

export const changelog = pgTable("changelog", {
  id: serial("id").primaryKey(),
  siteId: integer("site_id").references(() => sites.id).notNull(),
  entity: text("entity").notNull(), // "fact" | "page" | "product"
  entityId: integer("entity_id").notNull(),
  summary: text("summary").notNull(), // shown on /updates/
  public: boolean("public").notNull().default(true),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
