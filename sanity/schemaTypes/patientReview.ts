export const patientReview = {
  name: "patientReview",
  title: "Patient Review",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Patient Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "patientImage",
      title: "Patient Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "designation",
      title: "Designation",
      type: "string",
      description: "Optional patient title or role.",
    },
    {
      name: "text",
      title: "Review Text",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1).max(5),
      description: "Enter a number between 1 and 5.",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured reviews can be filtered in Sanity.",
      initialValue: false,
    },
    {
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    },
    {
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      description: "Optional audio testimonial link.",
    },
    {
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Optional YouTube or TikTok URL.",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "patientImage",
    },
  },
};