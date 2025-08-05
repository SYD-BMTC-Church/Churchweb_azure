import { appendData } from "@/lib/sheetHelper";
import { z } from "zod";

export const contactUsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  question: z.string().min(1, "Question is required"),
});

export async function updateContactUsSheetData(input: {
  fullName: string;
  phoneNumber: string;
  email: string;
  subject: string;
  question: string;
}) {
  // Validate input data
  const validatedData = contactUsSchema.parse(input);
  // Prepare data to append to the sheet
  const rowData = [
    validatedData.fullName,
    validatedData.phoneNumber,
    validatedData.email,
    validatedData.subject,
    validatedData.question,
    new Date().toISOString(), // Add timestamp
  ];
  try {
    const response = await appendData(rowData, "contact-us!A:F");
    return response;
  } catch (e) {
    console.error("Error appending data to Google Sheets:", e);
    return { success: false, error: "Failed to append data to the sheet" };
  }
}
