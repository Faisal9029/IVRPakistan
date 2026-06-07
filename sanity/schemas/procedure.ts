const procedureSchema = {
  name: "procedure",
  title: "Procedure",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "desc",
      title: "Description",
      type: "text",
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Optional icon key like Target, ShieldCheck, or ArrowRight.",
    },
  ],
};

export default procedureSchema;
