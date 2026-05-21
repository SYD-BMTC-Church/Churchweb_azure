import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function getDayName(dayCode: string) {
  const days: Record<string, string> = {
    MO: "Monday",
    TU: "Tuesday",
    WE: "Wednesday",
    TH: "Thursday",
    FR: "Friday",
    SA: "Saturday",
    SU: "Sunday",
  };

  return days[dayCode] || dayCode;
}

function getOrdinal(num: number) {
  if (num === -1) return "last";

  const suffix =
    num % 10 === 1 && num % 100 !== 11
      ? "st"
      : num % 10 === 2 && num % 100 !== 12
        ? "nd"
        : num % 10 === 3 && num % 100 !== 13
          ? "rd"
          : "th";

  return `${num}${suffix}`;
}

function parseRRule(recurrence?: string[]) {
  if (!recurrence || recurrence.length === 0) {
    return {
      isRecurring: false,
      recurrenceLabel: null,
      until: null,
    };
  }

  const rrule = recurrence.find((rule) => rule.startsWith("RRULE:"));

  if (!rrule) {
    return {
      isRecurring: false,
      recurrenceLabel: null,
      until: null,
    };
  }

  const ruleText = rrule.replace("RRULE:", "");

  const parts = Object.fromEntries(
    ruleText.split(";").map((part) => {
      const [key, value] = part.split("=");
      return [key, value];
    }),
  );

  const freq = parts.FREQ;
  const interval = parts.INTERVAL ? Number(parts.INTERVAL) : 1;
  const byDay = parts.BYDAY;
  const byMonthDay = parts.BYMONTHDAY;
  const until = parts.UNTIL || null;

  let recurrenceLabel = ruleText;

  if (freq === "DAILY") {
    recurrenceLabel = interval === 1 ? "Every day" : `Every ${interval} days`;
  }

  if (freq === "WEEKLY") {
    if (byDay) {
      const days = byDay
        .split(",")
        .map((day) => getDayName(day.slice(-2)))
        .join(", ");

      recurrenceLabel =
        interval === 1 ? `Every ${days}` : `Every ${interval} weeks on ${days}`;
    } else {
      recurrenceLabel =
        interval === 1 ? "Every week" : `Every ${interval} weeks`;
    }
  }

  if (freq === "MONTHLY") {
    if (byDay) {
      const match = byDay.match(/^(-?\d)?([A-Z]{2})$/);

      if (match) {
        const ordinalNumber = match[1] ? Number(match[1]) : null;
        const dayCode = match[2];
        const dayName = getDayName(dayCode);

        if (ordinalNumber) {
          recurrenceLabel = `Every ${getOrdinal(ordinalNumber)} ${dayName}`;
        } else {
          recurrenceLabel = `Every month on ${dayName}`;
        }
      }
    } else if (byMonthDay) {
      recurrenceLabel = `Every month on day ${byMonthDay}`;
    } else {
      recurrenceLabel = "Every month";
    }
  }

  if (freq === "YEARLY") {
    recurrenceLabel = interval === 1 ? "Every year" : `Every ${interval} years`;
  }

  return {
    isRecurring: true,
    recurrenceLabel,
    until,
  };
}

function formatGoogleUntil(until: string | null) {
  if (!until) return null;

  // Google RRULE UNTIL can look like 20251231T125959Z
  const match = until.match(/^(\d{4})(\d{2})(\d{2})/);

  if (!match) return until;

  const [, year, month, day] = match;

  return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
}

export async function GET(request: NextRequest) {
  try {
    const rawCalendarId = request.nextUrl.searchParams.get("calendar_id");

    if (!rawCalendarId) {
      return NextResponse.json(
        {
          success: false,
          message: "calendar_id is required.",
        },
        { status: 400 },
      );
    }

    const calendarId = rawCalendarId.includes("@")
      ? rawCalendarId
      : `${rawCalendarId}@group.calendar.google.com`;

    const clientEmail = process.env.CLIENT_EMAIL;
    const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Google service account credentials.",
        },
        { status: 500 },
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({
      version: "v3",
      auth,
    });

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: false,
      maxResults: 100,
    });

    const events = response.data.items || [];

    const result = events
      .filter((event) => event.summary && event.summary.trim() !== "")
      .map((event) => {
        const start = event.start?.dateTime || event.start?.date || null;
        const end = event.end?.dateTime || event.end?.date || null;

        const recurrence = parseRRule(event.recurrence || undefined);

        return {
          id: event.id || "",
          summary: event.summary || "",
          description: event.description || null,
          location: event.location || null,
          start,
          end,
          isRecurring: recurrence.isRecurring,
          recurrenceLabel: recurrence.recurrenceLabel,
          until: formatGoogleUntil(recurrence.until),
          htmlLink: event.htmlLink || null,
        };
      })
      .sort((a, b) => {
        if (!a.start) return 1;
        if (!b.start) return -1;

        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Google Calendar API error:", {
      message: error.message,
      code: error.code,
      status: error.status,
      errors: error.errors,
      response: error.response?.data,
    });

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch calendar.",
        errorMessage: error.message,
        errorCode: error.code,
        googleResponse: error.response?.data,
      },
      { status: error.code || 500 },
    );
  }
}
