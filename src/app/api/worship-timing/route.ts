import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const calendarId = process.env.CALENDAR_ID!;
  const apiKey = process.env.API_KEY!;

  const today = new Date();
  const nextSunday = new Date();
  nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));

  const sundayStart = new Date(nextSunday.setHours(0, 0, 0, 0)).toISOString();
  const sundayEnd = new Date(
    nextSunday.setHours(23, 59, 59, 999)
  ).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events?key=${apiKey}&timeMin=${sundayStart}&timeMax=${sundayEnd}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const simplified = (data.items || []).map((event: any) => ({
      summary: event.summary,
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
    }));

    return NextResponse.json({ sunday: simplified });
  } catch (err) {
    console.error("Failed to fetch public calendar:", err);
    return NextResponse.json(
      { error: "Could not fetch events" },
      { status: 500 }
    );
  }
}
