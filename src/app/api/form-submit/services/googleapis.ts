'use server'
import { google } from "googleapis";
import { z } from "zod";


const contactUsSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    question: z.string().min(1, "Question is required"),
});

async function updateContactUsSheetData(input: { 
    fullName: string;
    phoneNumber: string;
    email: string;
    subject: string;
    question: string;
}) {
    // Validate input data
    const validatedData = contactUsSchema.parse(input);
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
        throw new Error("Missing required environment variable: GOOGLE_CLIENT_EMAIL");
    }

    const glAuth = await google.auth.getClient({
        projectId:process.env.GOOGLE_PROJECT_ID,
        credentials: {
            "type": "service_account",
            "project_id": process.env.GOOGLE_PROJECT_ID,
            "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
            "private_key": process.env.GOOGLE_PRIVATE_KEY,
            "client_email": process.env.GOOGLE_CLIENT_EMAIL,
            "universe_domain": "googleapis.com"
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    // Prepare data to append to the sheet
    const rowData = [
        validatedData.fullName,
        validatedData.phoneNumber,
        validatedData.email,
        validatedData.subject,
        validatedData.question,
        new Date().toISOString(), // Add timestamp
    ];

    // Append data to the sheet
    try {
        // Use environment variable for spreadsheet ID
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID || "1rcXmwfzCAm0dHlsoqIKcRyJxvH9EKf9jYaW9G9RI1NY";
        
        const response = await glSheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'contact-us!A:F',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
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

export {updateContactUsSheetData}