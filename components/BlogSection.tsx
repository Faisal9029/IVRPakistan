import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getPosts } from "../lib/sanity";
import { urlFor } from "../sanity/lib/client";
import Section from "./ui/Section";
import Container from "./ui/Container";
import Card from "./ui/Card";

const HOMEPAGE_POST_COUNT = 3;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogSection() {
  const allPosts = await getPosts();
  const posts = allPosts.slice(0, HOMEPAGE_POST_COUNT);

  return (
    <Section className="bg-white dark:bg-navy">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-small font-semibold uppercase tracking-[0.32em] text-primary">
            From The Blog
          </span>
          <h2 className="mt-4 text-h2 font-bold tracking-tight text-navy dark:text-white">
            Patient Education &amp; Procedure Guides
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="mt-10 text-center text-body text-muted dark:text-slate-400">
            New articles are on the way — check back soon for procedure guides and
            patient education content, or WhatsApp us with any questions in the meantime.
          </p>
        ) : (
          <>
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
                    <h3 className="mt-2 text-lg font-semibold text-navy dark:text-white">
                      {post.title}
                    </h3>
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

            {allPosts.length > HOMEPAGE_POST_COUNT && (
              <div className="mt-10 text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-button border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  View All Posts <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
