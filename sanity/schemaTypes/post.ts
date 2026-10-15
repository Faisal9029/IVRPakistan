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
      description: "Internal record of when this post was actually published. Not shown on the site — used for sorting only.",
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "displayDate",
      title: "Display Date",
      type: "date",
      description: "The date shown publicly on the site for this post. Set this to whatever date you want visitors to see — it can be different from the actual publish date above.",
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      description: "Search, social sharing and structured-content settings for this post.",
      fields: [
        {
          name: "metaTitle",
          title: "SEO Title / Meta Title",
          type: "string",
          description: "Title used in search results and browser metadata.",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Description used in search results and page metadata.",
        },
        {
          name: "focusKeyword",
          title: "Focus Keyword",
          type: "string",
        },
        {
          name: "secondaryKeywords",
          title: "Secondary Keywords",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Leave blank to use the website's standard blog URL.",
        },
        {
          name: "featuredImageAltText",
          title: "Featured Image Alt Text",
          type: "string",
          description: "Accessible, descriptive alt text for the featured image.",
        },
        {
          name: "openGraphTitle",
          title: "Open Graph Title",
          type: "string",
        },
        {
          name: "openGraphDescription",
          title: "Open Graph Description",
          type: "text",
          rows: 3,
        },
        {
          name: "openGraphImage",
          title: "Open Graph Image",
          type: "image",
          options: { hotspot: true },
          description: "Optional social-sharing image; featured image is used when blank.",
        },
        {
          name: "robots",
          title: "Robots",
          type: "string",
          initialValue: "index, follow",
        },
        {
          name: "language",
          title: "Language",
          type: "string",
          initialValue: "en",
        },
        {
          name: "contentType",
          title: "Content Type",
          type: "string",
          initialValue: "BlogPosting",
        },
        {
          name: "category",
          title: "Category",
          type: "string",
        },
        {
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
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
