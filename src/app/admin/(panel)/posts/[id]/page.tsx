import { notFound } from "next/navigation";
import { PostEditorClient as PostEditor } from "@/components/admin/post-editor-client";
import { requirePageUser, canPublish } from "@/lib/admin/guard";
import { AdminError, getAdminPost, listRevisions, taxonomy } from "@/lib/blog/admin-repo";
import { linkTargets } from "@/lib/blog/link-targets";
import { rowToForm } from "@/lib/admin/form";

export const metadata = { title: "Edit post" };

export default async function EditPost({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const user = await requirePageUser();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const row = await getAdminPost(id).catch((e) => {
    if (e instanceof AdminError && e.status === 404) return null;
    throw e;
  });
  if (!row || row.deletedAt) notFound();
  const [tax, targets, revs] = await Promise.all([taxonomy(), linkTargets(), listRevisions(id)]);
  return (
    <PostEditor
      key={row.id}
      id={row.id}
      initial={rowToForm(row)}
      taxonomy={tax}
      targets={targets}
      revisions={revs.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))}
      canPublish={canPublish(user.role)}
      liveSlug={row.status === "draft" ? null : row.slug}
      publishedAtIso={row.publishedAt?.toISOString() ?? null}
      flash={(await searchParams).saved ?? null}
    />
  );
}
