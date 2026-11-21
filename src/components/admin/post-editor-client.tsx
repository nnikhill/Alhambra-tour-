"use client";

import dynamic from "next/dynamic";

// The editor only runs in the browser (Tiptap + local time zone for dates).
export const PostEditorClient = dynamic(() => import("./post-editor").then((m) => m.PostEditor), {
  ssr: false,
  loading: () => <p className="py-20 text-center text-muted">Loading editor…</p>,
});
