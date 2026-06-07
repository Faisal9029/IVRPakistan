import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("Missing Sanity project ID in environment variables.");
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    autoUpdates: true,
  },
});
