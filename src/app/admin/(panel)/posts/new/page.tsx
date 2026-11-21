import { PostEditorClient as PostEditor } from "@/components/admin/post-editor-client";
import { requirePageUser, canPublish } from "@/lib/admin/guard";
import { taxonomy } from "@/lib/blog/admin-repo";
import { linkTargets } from "@/lib/blog/link-targets";
import { EMPTY_FORM } from "@/lib/admin/form";

export const metadata = { title: "New post" };

export default async function NewPost() {
  const user = await requirePageUser();
  const [tax, targets] = await Promise.all([taxonomy(), linkTargets()]);
  return (
    <PostEditor
      id={null}
      initial={EMPTY_FORM}
      taxonomy={tax}
      targets={targets}
      revisions={[]}
      canPublish={canPublish(user.role)}
      liveSlug={null}
      publishedAtIso={null}
    />
  );
}
