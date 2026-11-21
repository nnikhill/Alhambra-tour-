import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";

export const metadata = { title: "Sign in" };

async function login(formData: FormData) {
  "use server";
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin/posts",
    });
  } catch (e) {
    if (e instanceof AuthError) {
      const code = (e as AuthError & { code?: string }).code === "locked" ? "locked" : "invalid";
      redirect(`/admin/login?error=${code}`);
    }
    throw e; // the success redirect is thrown too
  }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if ((await auth())?.user) redirect("/admin/posts");
  const { error } = await searchParams;
  const msg =
    error === "locked" ? "Too many failed attempts. Try again in 15 minutes." : error ? "Email or password is incorrect." : "";
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form action={login} className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-sm">
        <h1 className="font-serif text-[1.6rem] font-semibold">Blog admin</h1>
        <p className="mt-1 text-[0.95rem] text-muted">Sign in to write and publish posts.</p>
        {msg && <p role="alert" className="mt-4 rounded-xl bg-alert/10 px-3 py-2.5 text-[0.92rem] font-semibold text-alert">{msg}</p>}
        <label className="mt-5 block text-[0.92rem] font-semibold" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="mt-1 h-11 w-full rounded-xl border border-line px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        <label className="mt-4 block text-[0.92rem] font-semibold" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} className="mt-1 h-11 w-full rounded-xl border border-line px-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        <button type="submit" className="btn btn-primary mt-6 h-11 w-full">Sign in</button>
      </form>
    </main>
  );
}
