type ValidationRule = {
  required: () => ValidationRule;
};

export const post = {
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Short 1-2 line summary shown on the blog grid card.",
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "body",
      title: "Body",
      type: "text",
      description: "Full article content.",
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "publishedDate",
      title: "Published Date",
      type: "datetime",
      validation: (Rule: ValidationRule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedDate",
      media: "featuredImage",
    },
  },
}
