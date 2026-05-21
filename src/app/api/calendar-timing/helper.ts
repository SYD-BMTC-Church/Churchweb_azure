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

function getOrdinal(value: string | number) {
  const num = Number(value);

  const ordinals: Record<number, string> = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    "-1": "last",
  };

  return ordinals[num] || `${num}th`;
}

export function formatRecurrence(recurrence?: string[]) {
  if (!recurrence || recurrence.length === 0) {
    return null;
  }

  const rrule = recurrence.find((rule) => rule.startsWith("RRULE:"));

  if (!rrule) {
    return null;
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
  const bySetPos = parts.BYSETPOS;

  if (freq === "WEEKLY" && byDay) {
    const dayName = getDayName(byDay);

    if (interval === 1) {
      return `Every ${dayName}`;
    }

    return `Every ${interval} weeks on ${dayName}`;
  }

  if (freq === "MONTHLY" && byDay && bySetPos) {
    const dayName = getDayName(byDay);
    const ordinal = getOrdinal(bySetPos);

    return `Every ${ordinal} ${dayName}`;
  }

  if (freq === "MONTHLY" && byDay) {
    const dayName = getDayName(byDay);
    return `Monthly on ${dayName}`;
  }

  if (freq === "DAILY") {
    if (interval === 1) {
      return "Every day";
    }

    return `Every ${interval} days`;
  }

  if (freq === "YEARLY") {
    return "Every year";
  }

  return ruleText;
}
