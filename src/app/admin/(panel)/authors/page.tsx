import { requirePageUser } from "@/lib/admin/guard";
import { taxonomy } from "@/lib/blog/admin-repo";
import { AuthorForm } from "@/components/admin/author-form";

export const metadata = { title: "Authors" };

export default async function AuthorsPage() {
  await requirePageUser("admin");
  const { authors } = await taxonomy();
  return (
    <>
      <h1 className="font-serif text-[1.8rem] font-semibold">Authors</h1>
      <p className="mt-1 max-w-2xl text-[0.93rem] text-muted">
        Shown in the “About this guide” box on each post. Use real names and real details only.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {authors.map((a) => <AuthorForm key={a.id} author={{ id: a.id, name: a.name, bio: a.bio ?? "", photoUrl: a.photoUrl ?? "" }} />)}
        <AuthorForm author={{ name: "", bio: "", photoUrl: "" }} />
      </div>
    </>
  );
}
