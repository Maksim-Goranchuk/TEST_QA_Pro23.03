import { google } from "googleapis";
import dotenv from "dotenv";
 
dotenv.config();
 
const auth = new google.auth.GoogleAuth({
  keyFile: "./service-account.json",
  scopes: ["https://www.googleapis.com/auth/documents.readonly"],
});
 
const docs = google.docs({ version: "v1", auth });
 
export async function fetchGoogleDocContent(documentId) {
  const res = await docs.documents.get({ documentId });
 
  let text = "";
 
  const content = res.data.body?.content || [];
 
  for (const item of content) {
    const elements = item.paragraph?.elements || [];
    for (const el of elements) {
      if (el.textRun?.content) {
        text += el.textRun.content;
      }
    }
  }
 
  return text.trim();
}