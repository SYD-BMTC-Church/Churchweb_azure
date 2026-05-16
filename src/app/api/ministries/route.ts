import { getAllFromSheet } from "@/lib/sheetHelper";
import { NextRequest, NextResponse } from "next/server";

export interface Ministry {
  CalendarId?: string;
  Image: string;
  HeroTitle: string;
  About: string;
  GetInvolved: {
    icon: string;
    title: string;
    details: string;
  }[];
  Contact?: string;
}
export async function GET(request: NextRequest) {
  try {
    const org = request.nextUrl.searchParams.get("org") || "";
    const result = await getAllFromSheet(`${org}!A1:F2`);
    const ministries: Ministry = result.map((item) => ({
      ...(item as any),
      Image: convertToDriveDirectLink(item.Image || ""),
      GetInvolved: JSON.parse(item.GetInvolved || "[]"),
    }))[0];
    return NextResponse.json(ministries, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data. Please try again later.",
      },
      { status: 500 },
    );
  }
}

function convertToDriveDirectLink(input: string): string {
  const fileIdMatch =
    input.match(/drive\.google\.com.*\/d\/([a-zA-Z0-9_-]{25,})/) ||
    (/^[a-zA-Z0-9_-]{25,}$/.test(input) ? [null, input] : null);

  return fileIdMatch
    ? `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
    : input;
}
