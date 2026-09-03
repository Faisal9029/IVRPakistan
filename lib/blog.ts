import type { Post } from "@/sanity/lib/queries";

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getPostDisplayDate(post: Pick<Post, "publishedDate" | "displayDate">) {
  return post.displayDate || post.publishedDate;
}
