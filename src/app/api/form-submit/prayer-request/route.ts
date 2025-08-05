import { NextRequest, NextResponse } from "next/server";
import { updateContactUsSheetData } from "./helper";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Validate required fields
    const { fullName, phoneNumber, email, subject, question } = formData;

    if (!fullName || !phoneNumber || !email || !subject || !question) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    // Submit form data to Google Sheets
    const result = await updateContactUsSheetData({
      fullName,
      phoneNumber,
      email,
      subject,
      question,
    });

    if (!result || !result.success) {
      throw new Error(result?.error || "Failed to submit form");
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
