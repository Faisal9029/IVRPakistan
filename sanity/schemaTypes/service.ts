export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Optional icon name from the theme icon list.",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
    },
    {
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "proceduresIncluded",
      title: "Procedures Included",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured services can be filtered in Sanity.",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "featuredImage",
    },
  },
}
