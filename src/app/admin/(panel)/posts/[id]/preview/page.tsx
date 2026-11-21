import { notFound } from "next/navigation";
import { PostArticle, pickRelated } from "@/components/blog/post-article";
import { requirePageUser } from "@/lib/admin/guard";
import { AdminError, getAdminPreview } from "@/lib/blog/admin-repo";
import { getPublishedByIds, listPublished } from "@/lib/blog/repo";

export const metadata = { title: "Preview" };

// Shows the last saved version of any post (drafts too), exactly as the public
// page renders it. Only signed-in users get here; never indexed.
export default async function Preview({ params }: { params: Promise<{ id: string }> }) {
  await requirePageUser();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const p = await getAdminPreview(id).catch((e) => {
    if (e instanceof AdminError && e.status === 404) return null;
    throw e;
  });
  if (!p) notFound();
  const [all, picked] = await Promise.all([listPublished(), getPublishedByIds(p.relatedIds)]);
  return (
    <div className="-mx-4 -my-6 bg-white">
      <PostArticle p={p} related={pickRelated(p, all, picked)} preview />
    </div>
  );
}
