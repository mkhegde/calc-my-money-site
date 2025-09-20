import Link from "next/link";
import { posts } from "../../data/posts";

export default function BlogIndex() {
  const live = posts
    .filter((p) => p.status === "live")
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="container space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Blog</h1>

      {live.length === 0 ? (
        <p className="text-slate-300">No posts yet. Check back soon.</p>
      ) : (
        <ul className="grid gap-4">
          {live.map((p) => (
            <li key={p.slug} className="card">
              <h2 className="text-xl font-semibold">
                <Link className="hover:underline" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </h2>
              <div className="text-xs text-slate-400 mb-2">{new Date(p.date).toLocaleDateString("en-GB")}</div>
              <p className="text-slate-300">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
