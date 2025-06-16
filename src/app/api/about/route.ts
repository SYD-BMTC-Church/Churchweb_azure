import { getAllFromSheet } from "@/lib/sheetHelper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getAllFromSheet("About");
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data. Please try again later.",
      },
      { status: 500 }
    );
  }
}
