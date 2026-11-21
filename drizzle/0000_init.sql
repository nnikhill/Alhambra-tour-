CREATE TYPE "public"."fact_state" AS ENUM('open', 'closed', 'limited', 'value');--> statement-breakpoint
CREATE TYPE "public"."page_status" AS ENUM('draft', 'review', 'scheduled', 'published');--> statement-breakpoint
CREATE TYPE "public"."page_type" AS ENUM('hub', 'ticket', 'tour', 'day_trip', 'plan', 'guide', 'blog', 'legal');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'editor', 'writer');--> statement-breakpoint
CREATE TABLE "affiliate_clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"page_path" text NOT NULL,
	"position" text NOT NULL,
	"product_id" integer,
	"clicked_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_attempts" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"window_start" timestamp with time zone DEFAULT now() NOT NULL,
	"locked_until" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"bio" text NOT NULL,
	"photo_url" text
);
--> statement-breakpoint
CREATE TABLE "availability_checks" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"checked_on" date NOT NULL,
	"visit_date" date NOT NULL,
	"ticket_type" text NOT NULL,
	"available" boolean NOT NULL,
	"checked_by" integer
);
--> statement-breakpoint
CREATE TABLE "blog_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "blog_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changelog" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"entity" text NOT NULL,
	"entity_id" integer NOT NULL,
	"summary" text NOT NULL,
	"public" boolean DEFAULT true NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "facts" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"state" "fact_state" DEFAULT 'value' NOT NULL,
	"source_url" text,
	"last_checked_at" date NOT NULL,
	"show_in_status_bar" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gsc_daily" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"day" date NOT NULL,
	"page_path" text NOT NULL,
	"query" text,
	"clicks" integer NOT NULL,
	"impressions" integer NOT NULL,
	"position" numeric(5, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gyg_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"gyg_id" text,
	"title" text NOT NULL,
	"best_for" text NOT NULL,
	"url" text NOT NULL,
	"price_from" numeric(8, 2),
	"rating" numeric(2, 1),
	"review_count" integer,
	"includes_nasrid" boolean DEFAULT false NOT NULL,
	"free_cancellation" boolean DEFAULT true NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"last_checked_at" date
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"keyword" text NOT NULL,
	"cluster" text NOT NULL,
	"intent" text NOT NULL,
	"priority" text DEFAULT 'P2' NOT NULL,
	"target_path" text NOT NULL,
	"monthly_volume" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" text NOT NULL,
	"credit" text NOT NULL,
	"width" integer,
	"height" integer,
	"own_photo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"type" "page_type" NOT NULL,
	"path" text NOT NULL,
	"title" text NOT NULL,
	"h1" text NOT NULL,
	"meta_description" text NOT NULL,
	"primary_keyword_id" integer,
	"body" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"schema_types" text[] DEFAULT '{}' NOT NULL,
	"og_image" text,
	"canonical" text,
	"noindex" boolean DEFAULT false NOT NULL,
	"author_id" integer,
	"status" "page_status" DEFAULT 'draft' NOT NULL,
	"publish_at" timestamp,
	"last_checked_at" date,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_revisions" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"snapshot" jsonb NOT NULL,
	"note" text,
	"user_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"content" text DEFAULT '' NOT NULL,
	"status" "page_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"category_id" integer,
	"author_id" integer,
	"featured_image" text,
	"featured_src_set" text,
	"featured_alt" text DEFAULT '' NOT NULL,
	"featured_credit" text,
	"featured_width" integer,
	"featured_height" integer,
	"meta_title" text,
	"meta_description" text,
	"focus_keyword" text,
	"canonical_url" text,
	"noindex" boolean DEFAULT false NOT NULL,
	"og_title" text,
	"og_description" text,
	"og_image" text,
	"booking" jsonb,
	"faq" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"related_ids" integer[] DEFAULT '{}' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"read_mins" integer DEFAULT 1 NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "redirects" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"from_path" text NOT NULL,
	"to_path" text NOT NULL,
	"permanent" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"domain" text NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sites_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"role" "user_role" DEFAULT 'writer' NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "affiliate_clicks" ADD CONSTRAINT "affiliate_clicks_product_id_gyg_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."gyg_products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authors" ADD CONSTRAINT "authors_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability_checks" ADD CONSTRAINT "availability_checks_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "availability_checks" ADD CONSTRAINT "availability_checks_checked_by_users_id_fk" FOREIGN KEY ("checked_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_categories" ADD CONSTRAINT "blog_categories_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changelog" ADD CONSTRAINT "changelog_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changelog" ADD CONSTRAINT "changelog_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "facts" ADD CONSTRAINT "facts_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gsc_daily" ADD CONSTRAINT "gsc_daily_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gyg_products" ADD CONSTRAINT "gyg_products_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_primary_keyword_id_keywords_id_fk" FOREIGN KEY ("primary_keyword_id") REFERENCES "public"."keywords"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pages" ADD CONSTRAINT "pages_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_revisions" ADD CONSTRAINT "post_revisions_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_revisions" ADD CONSTRAINT "post_revisions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_blog_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects" ADD CONSTRAINT "redirects_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "clicks_site_page" ON "affiliate_clicks" USING btree ("site_id","page_path");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_categories_site_slug" ON "blog_categories" USING btree ("site_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_tags_site_slug" ON "blog_tags" USING btree ("site_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "facts_site_key" ON "facts" USING btree ("site_id","key");--> statement-breakpoint
CREATE INDEX "gsc_site_day" ON "gsc_daily" USING btree ("site_id","day");--> statement-breakpoint
CREATE UNIQUE INDEX "keywords_site_keyword" ON "keywords" USING btree ("site_id","keyword");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_site_path" ON "pages" USING btree ("site_id","path");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_primary_keyword" ON "pages" USING btree ("primary_keyword_id");--> statement-breakpoint
CREATE INDEX "post_revisions_post" ON "post_revisions" USING btree ("post_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "post_tags_pk" ON "post_tags" USING btree ("post_id","tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX "posts_site_slug" ON "posts" USING btree ("site_id","slug");--> statement-breakpoint
CREATE INDEX "posts_site_status" ON "posts" USING btree ("site_id","status","published_at");--> statement-breakpoint
CREATE UNIQUE INDEX "redirects_site_from" ON "redirects" USING btree ("site_id","from_path");