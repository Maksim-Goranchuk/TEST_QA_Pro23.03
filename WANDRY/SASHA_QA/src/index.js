import dotenv from "dotenv";
dotenv.config();

import { fetchGoogleDocContent } from "./googleDocsReader.js";
import { updateGoogleDoc } from "./googleDocsWriter.js";
import { analyzeRisks } from "./llm.js";
import { formatRiskMatrix } from "./formatter.js";

async function run() {
  try {
    console.log("📥 Reading Google Doc...");
    const text = await fetchGoogleDocContent(process.env.SOURCE_DOC_ID);

    console.log("🤖 Analyzing risks...");
    const result = await analyzeRisks(text);

    console.log("📦 RESULT:", JSON.stringify(result, null, 2));

    console.log("📊 Formatting matrix (console preview)...");
    const table = formatRiskMatrix(result);
    console.log(table);

    console.log("📤 Writing to Google Sheets...");
    await updateGoogleDoc(process.env.RESULT_SPREADSHEET_ID, result);

    console.log("✅ DONE");
  } catch (err) {
    console.error("❌ PIPELINE FAILED:", err);
  }
}

run();