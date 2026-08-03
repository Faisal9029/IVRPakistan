import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { sanityFetch } from "@/lib/sanity";
import { allPostSlugsQuery, postBySlugQuery, Post } from "@/sanity/lib/queries";
import { getImageDimensions, urlFor } from "@/sanity/lib/client";
import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(allPostSlugsQuery);
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: "Post not found" };
  }

  return buildMetadata({
    title: `${post.title} | IVR Pakistan Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug.current}`,
    ogImage: post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug });

  if (!post) {
    return (
      <main className="min-h-screen">
        <Section>
          <Container className="max-w-3xl text-center">
            <h1 className="text-h1 font-bold text-navy dark:text-white">Post not found</h1>
            <p className="mt-4 text-body text-muted dark:text-slate-300">
              The article you&apos;re looking for could not be found.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex rounded-button bg-primary px-6 py-3 text-sm font-semibold text-white shadow-rest hover:shadow-hover"
            >
              Back to Blog
            </Link>
          </Container>
        </Section>
      </main>
    );
  }

  const featuredImageDimensions = post.featuredImage
    ? getImageDimensions(post.featuredImage)
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    url: `${SITE_URL}/blog/${post.slug.current}`,
    image: post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Section>
        <Container className="max-w-3xl">
          <p className="flex items-center justify-center gap-1.5 text-small text-muted dark:text-slate-400">
            <CalendarDays size={14} />
            {formatDate(post.publishedDate)}
          </p>
          <h1 className="mt-3 text-center text-h1 font-bold tracking-tight text-navy dark:text-white">
            {post.title}
          </h1>

          {post.featuredImage && featuredImageDimensions && (
            <div className="relative mt-8 w-full overflow-hidden rounded-card bg-slate-100 dark:bg-slate-800">
              <Image
                src={urlFor(post.featuredImage).width(1400).url()}
                alt={post.title}
                width={featuredImageDimensions.width}
                height={featuredImageDimensions.height}
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          )}

          <div className="mt-8 whitespace-pre-line text-body leading-8 text-muted dark:text-slate-300">
            {post.body}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex rounded-button border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:border-primary/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              Back to Blog
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
