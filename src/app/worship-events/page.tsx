import React from "react";

export default function page() {
  return (
    <section className="relative h-[80vh] w-full">
      <iframe
        src={
          "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Australia%2FSydney&showPrint=0&showTitle=0&showCalendars=0&showTabs=0&mode=WEEK" +
          process.env.CALENDAR_URL?.split("\n").join("") +
          "&color=%23009688&color=%23b39ddb&color=%234285f4&color=%237cb342&color=%233f51b5&color=%23ad1457&color=%239e69af&color=%23e67c73"
        }
        style={{
          borderWidth: 0,
        }}
        width="100%"
        height="100%"
      />
    </section>
  );
}
