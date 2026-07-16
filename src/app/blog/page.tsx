import Image from "next/image";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          NestFind Blog
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Tips and guides for renters and hosts across Bangladesh.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm"
          >
            <div className="relative h-44 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-base font-semibold text-foreground">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-foreground/70">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-foreground/50">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
