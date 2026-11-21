import Link from "next/link";
import { listAdminPosts } from "@/lib/blog/admin-repo";
import { requirePageUser } from "@/lib/admin/guard";
import { PostRowActions } from "@/components/admin/post-row-actions";

export const metadata = { title: "Posts" };

const isPast = (d: Date | null) => !!d && d.getTime() <= Date.now();

const fmt = (d: Date | null) =>
  d ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Madrid" }).format(d) : "—";

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; trash?: string; error?: string }> }) {
  const user = await requirePageUser();
  const sp = await searchParams;
  const trash = sp.trash === "1";
  const rows = await listAdminPosts({ q: sp.q?.slice(0, 100), status: sp.status, trash });
  const badge = (s: string, at: Date | null) => {
    const label = s === "scheduled" && isPast(at) ? "published" : s;
    const cls = label === "published" ? "bg-[#e3f3e8] text-[#1c6b3a]" : label === "scheduled" ? "bg-[#fff1dc] text-amber-deep" : "bg-soft text-muted";
    return <span className={`rounded-full px-2.5 py-1 text-[0.78rem] font-bold uppercase tracking-wide ${cls}`}>{label}</span>;
  };
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-serif text-[1.8rem] font-semibold">{trash ? "Trash" : "Posts"}</h1>
        <Link href="/admin/posts/new" className="btn btn-primary ml-auto h-10 px-4">New post</Link>
      </div>
      {sp.error === "forbidden" && <p role="alert" className="mt-3 text-[0.93rem] font-semibold text-alert">That page needs a higher role.</p>}
      <form className="mt-4 flex flex-wrap gap-2" role="search">
        <input name="q" defaultValue={sp.q} placeholder="Search title or slug" aria-label="Search posts" className="h-10 min-w-56 flex-1 rounded-xl border border-line bg-white px-3" />
        {!trash && (
          <select name="status" defaultValue={sp.status ?? ""} aria-label="Status" className="h-10 cursor-pointer rounded-xl border border-line bg-white px-3">
            <option value="">All statuses</option>
            <option value="draft">Drafts</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        )}
        {trash && <input type="hidden" name="trash" value="1" />}
        <button className="btn btn-outline h-10 px-4">Filter</button>
        <Link href={trash ? "/admin/posts" : "/admin/posts?trash=1"} className="btn btn-outline h-10 px-4">{trash ? "Back to posts" : "Trash"}</Link>
      </form>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[760px] text-left text-[0.93rem]">
          <thead className="border-b border-line bg-soft/60 text-[0.8rem] uppercase tracking-wide text-muted">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Published</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3"><span className="sr-only">Actions</span></th></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-muted">{trash ? "The trash is empty." : "No posts match. Try another search or write a new post."}</td></tr>}
            {rows.map((r) => (
              <tr key={r.id} className="align-top">
                <td className="px-4 py-3">
                  {trash ? <span className="font-semibold">{r.title}</span> : <Link href={`/admin/posts/${r.id}`} className="font-semibold hover:underline">{r.title}</Link>}
                  {r.featured && <span className="ml-2 text-[0.78rem] font-bold text-amber-deep">★ Featured</span>}
                  <div className="text-[0.82rem] text-muted">/blog/{r.slug}/{r.focusKeyword ? ` · “${r.focusKeyword}”` : ""}</div>
                </td>
                <td className="px-4 py-3">{badge(r.status, r.publishedAt)}</td>
                <td className="px-4 py-3">{r.category ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{fmt(r.publishedAt)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{fmt(r.updatedAt)}</td>
                <td className="px-4 py-3"><PostRowActions id={r.id} slug={r.slug} trash={trash} live={r.status !== "draft"} isAdmin={user.role === "admin"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
