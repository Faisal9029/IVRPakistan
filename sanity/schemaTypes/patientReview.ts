type ValidationRule = {
  required: () => ValidationRule;
  min: (min: number) => ValidationRule;
  max: (max: number) => ValidationRule;
};

export const patientReview = {
  name: "patientReview",
  title: "Patient Review",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Patient Name",
      type: "string",
      validation: (Rule: ValidationRule) => Rule.required(),
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
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule: ValidationRule) => Rule.required().min(1).max(5),
      description: "Enter a number between 1 and 5.",
    },
    {
      name: "status",
      title: "Moderation Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
      validation: (Rule: ValidationRule) => Rule.required(),
      description: "Only Approved reviews appear on the public website.",
    },
    {
      name: "consentGiven",
      title: "Publication Consent",
      type: "boolean",
      description: "Patient agreed that this review may be displayed publicly.",
      initialValue: false,
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
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
      description: "Optional YouTube, TikTok, or public Facebook video URL.",
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