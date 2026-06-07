const patientReviewSchema = {
  name: "patientReview",
  title: "Patient Review",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Patient Name",
      type: "string",
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Use 1-5 stars.",
    },
    {
      name: "text",
      title: "Text Review",
      type: "text",
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
      description: "Optional YouTube or video link.",
    },
  ],
};

export default patientReviewSchema;
