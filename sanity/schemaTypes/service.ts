type ValidationRule = {
  required: () => ValidationRule;
};

export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Name",
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
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "fullDescription",
      title: "Full Description",
      type: "text",
      validation: (Rule: ValidationRule) => Rule.required(),
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
      name: "seo",
      title: "SEO",
      type: "object",
      description: "Primary search metadata for this procedure page.",
      fields: [
        {
          name: "metaTitle",
          title: "SEO Title / Meta Title",
          type: "string",
          description: "Recommended: clear procedure name plus location or IVR Pakistan.",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Patient-friendly description for search results.",
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
          description: "Leave blank to use the standard procedure URL.",
        },
        {
          name: "featuredImageAltText",
          title: "Featured Image Alt Text",
          type: "string",
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
          name: "robots",
          title: "Robots",
          type: "string",
          initialValue: "index, follow",
        },
      ],
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
