import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";

if (!projectId) {
  throw new Error("Missing Sanity project ID in environment variables.");
}

export default defineConfig({
  name: "default",
  title: "IVR Pakistan",
  projectId,
  dataset,
  apiVersion,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
