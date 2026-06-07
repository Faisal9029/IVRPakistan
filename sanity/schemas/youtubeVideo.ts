const youtubeVideoSchema = {
  name: "youtubeVideo",
  title: "YouTube Video",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "youtubeId",
      title: "YouTube ID",
      type: "string",
      description: "Enter the video ID or full YouTube URL.",
    },
  ],
};

export default youtubeVideoSchema;
