"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

// No backend: the form opens the visitor's email app with the message filled in,
// addressed to CONTACT_EMAIL. Nothing is sent or stored by this site, so the
// confirmation says exactly that instead of claiming a message was received.
export function ContactForm() {
  const [opened, setOpened] = useState(false);

  if (!CONTACT_EMAIL) {
    return (
      <p className="rounded-2xl border border-line bg-soft p-6 text-sm text-muted">
        Our contact email isn&rsquo;t set up yet. Please check back soon.
      </p>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `[${f.get("topic") ?? "Question"}] from ${f.get("name") ?? ""}`.slice(0, 150);
    const body = `${f.get("message") ?? ""}\n\nReply to: ${f.get("email") ?? ""}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  if (opened) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
        <h3 className="mt-3 text-xl font-bold text-ink">Your email app should now be open</h3>
        <p className="mt-2 text-sm text-muted">
          Press send there to reach us. If nothing opened, email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-ink underline">{CONTACT_EMAIL}</a>.
        </p>
        <button type="button" onClick={() => setOpened(false)} className="btn btn-outline mt-5">
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Maria Gonzalez"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="block text-sm font-semibold text-ink">
          What is this regarding?
        </label>
        <select
          id="topic"
          name="topic"
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
        >
          <option value="planning">Help with planning an Alhambra visit</option>
          <option value="sold-out">Question about sold-out tickets</option>
          <option value="tour-advice">Tour recommendation inquiry</option>
          <option value="feedback">Website correction or feedback</option>
          <option value="partnership">Partnership or commercial inquiry</option>
          <option value="other">Other question</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="How can we help? If asking about dates, please include your travel dates and group size."
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus:ring-1 focus:ring-brand"
        />
      </div>

      <button type="submit" className="btn btn-primary min-h-12 w-full text-base sm:w-auto sm:px-8">
        <Send className="size-4" /> Open in my email app
      </button>
    </form>
  );
}