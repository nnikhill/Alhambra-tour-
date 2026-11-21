import Link from "next/link";
import { signOut } from "@/auth";
import { requirePageUser } from "@/lib/admin/guard";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requirePageUser();
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <nav aria-label="Admin" className="mx-auto flex h-14 max-w-7xl items-center gap-1 px-4">
          <Link href="/admin/posts" className="mr-4 font-serif text-[1.1rem] font-semibold">Blog admin</Link>
          <Link href="/admin/posts" className="rounded-lg px-3 py-2 text-[0.93rem] font-semibold hover:bg-soft">Posts</Link>
          <Link href="/admin/posts/new" className="rounded-lg px-3 py-2 text-[0.93rem] font-semibold hover:bg-soft">New post</Link>
          {user.role === "admin" && <Link href="/admin/authors" className="rounded-lg px-3 py-2 text-[0.93rem] font-semibold hover:bg-soft">Authors</Link>}
          <a href="/blog/" target="_blank" rel="noopener" className="rounded-lg px-3 py-2 text-[0.93rem] font-semibold hover:bg-soft">View blog ↗</a>
          <span className="ml-auto hidden text-[0.88rem] text-muted sm:inline">{user.name} · {user.role}</span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button type="submit" className="ml-2 cursor-pointer rounded-lg px-3 py-2 text-[0.93rem] font-semibold hover:bg-soft">Sign out</button>
          </form>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </>
  );
}
