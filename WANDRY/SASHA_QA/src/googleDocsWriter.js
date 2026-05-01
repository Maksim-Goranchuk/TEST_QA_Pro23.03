import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  keyFile: "./service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1J_AR7AieziOxChS5hKbYHTsHLew5WtT_9lFcbKHt4zs";

const HEADERS = [
  "Component",
  "Risk",
  "Cause",
  "Probability",
  "Impact",
  "Priority",
  "Test Cases",
];

async function getFirstSheet(spreadsheetId) {
  const res = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = res.data.sheets?.[0];
  return {
    sheetId: sheet?.properties?.sheetId ?? 0,
    sheetName: sheet?.properties?.title ?? "Sheet1",
  };
}

export async function updateGoogleDoc(spreadsheetId, data) {
  const risks = data?.risks || [];

  if (!Array.isArray(risks)) {
    console.warn("⚠️ risks is not array:", risks);
    return;
  }

  const { sheetId, sheetName } = await getFirstSheet(SPREADSHEET_ID);
  console.log(`📋 Using sheet: "${sheetName}" (id: ${sheetId})`);

  // Build rows: header + data
  const rows = [
    HEADERS,
    ...risks.map((r) => [
      r.component ?? "-",
      r.risk ?? "-",
      r.cause ?? "-",
      r.probability ?? "-",
      r.impact ?? "-",
      r.priority ?? "-",
      r.test_cases ?? "-",
    ]),
  ];

  // Clear existing content
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
  });

  // Write all rows at once
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    requestBody: { values: rows },
  });

  // Apply formatting
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      requests: [
        // Bold header + dark background + white text
        {
          repeatCell: {
            range: {
              sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: HEADERS.length,
            },
            cell: {
              userEnteredFormat: {
                textFormat: {
                  bold: true,
                  foregroundColor: { red: 1, green: 1, blue: 1 },
                },
                backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
              },
            },
            fields: "userEnteredFormat(textFormat,backgroundColor)",
          },
        },
        // Auto-resize all columns
        {
          autoResizeDimensions: {
            dimensions: {
              sheetId,
              dimension: "COLUMNS",
              startIndex: 0,
              endIndex: HEADERS.length,
            },
          },
        },
        // Freeze header row
        {
          updateSheetProperties: {
            properties: {
              sheetId,
              gridProperties: { frozenRowCount: 1 },
            },
            fields: "gridProperties.frozenRowCount",
          },
        },
      ],
    },
  });

  console.log(`✅ Spreadsheet updated: ${risks.length} risks written`);
}