"use server";
import { google } from "googleapis";

function GetSheetTemplate(data: any) {
  const rows = data;
  const title = rows[0];
  rows.shift();
  let newData: any = [];
  if (rows.length) {
    rows.map((row: any) => {
      const temp: { [key: string]: any } = {};
      row.map((item: any, index: any) => (temp[title[index]] = item));
      newData.push(temp);
    });
    return newData;
  }
}

async function getGlSheetAuth() {
  return await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function updateData(
  jwt: any,
  value: any,
  sheetName = "Sheet1",
  row: number
) {
  try {
    const sheets = google.sheets({ version: "v4", auth: jwt });
    const sheetRange = `${sheetName}!A${row + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: sheetRange,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [JSON.parse(value)],
      },
    });
    console.log(`sucess: ${sheetRange}`);
    return { sucess: sheetRange };
  } catch (err) {
    console.log(err);
  }
}

// export async function appendData(jwt: any, value: any, sheetName = "Sheet1") {
//   try {
//     const sheets = google.sheets({ version: "v4", auth: jwt });
//     await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.GOOGLE_SHEETS_ID,
//       range: sheetName,
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [JSON.parse(value)],
//       },
//     });
//     return { sucess: sheetName };
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function appendData(rowData: any, sheetName = "Sheet1") {
  // Append data to the sheet
  try {
    const auth = await getGlSheetAuth();
    const glSheets = google.sheets({ version: "v4", auth: auth });
    const response = await glSheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: sheetName,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowData],
      },
    });
    return { success: true, data: response.data };
  } catch (e) {
    console.error("Error appending data to Google Sheets:", e);
    return { success: false, error: "Failed to append data to the sheet" };
  }
}

export async function getData(sheet = "Sheet1") {
  const auth = await getGlSheetAuth();
  const sheets = google.sheets({ version: "v4", auth: auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: sheet.toString(), // sheet name
  });
  const data = GetSheetTemplate(response.data.values);
  return data;
}
