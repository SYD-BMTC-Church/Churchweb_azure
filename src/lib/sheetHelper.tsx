"use server";
import { google } from "googleapis";

function SheetDataToJson(data: string[][]) {
  if (!Array.isArray(data) || data.length < 2) return [];
  const [title, ...rows] = data;
  return rows.map((row) =>
    Object.fromEntries(row.map((item, idx) => [title[idx], item])),
  );
}

async function getGlSheetAuth() {
  try {
    if (!process.env.PROJECT_ID) {
      throw new Error("PROJECT_ID is not defined in environment variables.");
    }
    if (!process.env.PRIVATE_KEY_ID) {
      throw new Error(
        "PRIVATE_KEY_ID is not defined in environment variables.",
      );
    }
    if (!process.env.PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY is not defined in environment variables.");
    }
    if (!process.env.CLIENT_EMAIL) {
      throw new Error("CLIENT_EMAIL is not defined in environment variables.");
    }
    if (!process.env.SHEETS_ID) {
      throw new Error("SHEETS_ID is not defined in environment variables.");
    }

    return await google.auth.getClient({
      projectId: process.env.PROJECT_ID,
      credentials: {
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch (error) {
    console.error("Error getting Google Sheets authentication:", error);
    throw new Error("Failed to get Google Sheets authentication.");
  }
}

export async function getAllFromSheet(sheet = "Sheet1") {
  try {
    const auth = await getGlSheetAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEETS_ID,
      range: sheet,
    });
    return SheetDataToJson(data.values ?? []);
  } catch (error) {
    console.error("Failed to fetch sheet data:", error);
    return [];
  }
}
