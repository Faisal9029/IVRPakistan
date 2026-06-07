export const socialVideo = {
  name: "socialVideo",
  title: "Social Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (Rule) => Rule.required(),
      description: "Paste the full YouTube or TikTok video URL.",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "publishedDate",
      title: "Published Date",
      type: "datetime",
      description: "Optional publish date for sorting.",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured videos can be filtered in Sanity.",
      initialValue: false,
    },
    {
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "platform",
      media: "thumbnail",
    },
  },
}
