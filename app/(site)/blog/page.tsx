import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getPosts } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/client";
import { buildMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export const metadata: Metadata = buildMetadata({
  title: "Blog | IVR Pakistan",
  description: "Patient education and procedure guides from IVR Pakistan Karachi.",
  path: "/blog",
});

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen">
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
              Blog
            </span>
            <h1 className="mt-4 text-h1 font-bold tracking-tight text-navy dark:text-white">
              Patient Education &amp; Procedure Guides
            </h1>
          </div>

          {posts.length === 0 ? (
            <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
              New articles are on the way — check back soon, or WhatsApp us with any
              questions in the meantime.
            </p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post._id}
                  className="group flex flex-col overflow-hidden rounded-card border border-slate-200 bg-white shadow-rest transition-all duration-300 hover:-translate-y-1 hover:shadow-hover dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-50 dark:bg-slate-800">
                    {post.featuredImage ? (
                      <Image
                        src={urlFor(post.featuredImage).width(640).url()}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-1.5 text-small text-muted dark:text-slate-400">
                      <CalendarDays size={14} />
                      {formatDate(post.publishedDate)}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-navy dark:text-white">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-small text-muted dark:text-slate-400">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-primary hover:underline"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
