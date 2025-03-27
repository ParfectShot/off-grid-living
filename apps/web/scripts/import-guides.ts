import { api } from "../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { guideCategories } from "../src/data/guides";

// Initialize the Convex client
const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL as string);

async function importGuides() {
  console.log("Starting guide import...");
  
  try {
    const result = await client.mutation(api.bulkImport.importGuideData, { 
      categories: guideCategories 
    });
    
    console.log("Import completed successfully!");
    console.log("Stats:", result.stats);
  } catch (error) {
    console.error("Error importing guides:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    }
  }
}

// Run the import
importGuides().catch(err => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
