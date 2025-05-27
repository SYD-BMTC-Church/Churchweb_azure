import { NextResponse } from "next/server";
import getLectionaryList from "./helper";

export async function GET() {
  try {
    const result = await getLectionaryList();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch lectionary:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lectionary. Please try again later.",
      },
      { status: 500 }
    );
  }
}
