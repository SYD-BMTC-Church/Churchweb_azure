import { NextRequest, NextResponse } from "next/server";
import ICAL from "ical.js";

export async function GET(request: NextRequest) {
  try {
    const calendar_id = request.nextUrl.searchParams.get("calendar_id") || "";

    const res = await fetch(
      `https://calendar.google.com/calendar/ical/${calendar_id}%40group.calendar.google.com/public/basic.ics`
    );
    const text = await res.text();

    const jcalData = ICAL.parse(text);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent");
    const now = new Date();

    const result = vevents
      .map((event: ICAL.Component) => {
        const e = new ICAL.Event(event);
        const rrule = event.getFirstPropertyValue("rrule") as any;
        let recurrenceDetails: Record<string, any> = {};
        if (rrule) {
          recurrenceDetails = {
            frequency: rrule.freq,
            interval: rrule.interval,
            ...rrule.parts,
          };
          recurrenceDetails.until = rrule.until?.toJSDate().toISOString();
        }

        return {
          summary: e.summary,
          description: e.description || null,
          location: e.location,
          start: e.startDate.toJSDate().toISOString(),
          end: e.endDate.toJSDate().toISOString(),
          ...(Object.keys(recurrenceDetails).length > 0 && {
            recurrence: recurrenceDetails,
          }),
        };
      })
      .filter((e) => new Date(e.start) >= now)
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch calendar:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch calendar. Please try again later.",
      },
      { status: 500 }
    );
  }
}
