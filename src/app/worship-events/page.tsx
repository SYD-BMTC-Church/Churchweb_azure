import React from "react";

export default function page() {
  return (
    <section className="relative h-[80vh] w-full">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Australia%2FSydney&showPrint=0&mode=WEEK&showCalendars=0&showTz=0&showTitle=0&src=MWUzZWY3NThiNzJmZjBiZTE4Njg4OTljNjA4NmMwOWE4NjA2MTIwYjRhMzg5Mjk1MTE4NGE5ZjFmNzUwYzdkY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NTA4MDM2NDZhMzIxZTU3NzI2MWE2M2FiYWEzNjQ2ZDQ1MWJjNjM0YTg5ZTExOTE4YTg4NDdhZGJiMmMyMGJmZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NzdhZmI2Njc1ZDgyMGU5YjNmNGNmZWZkMTJiYTNkMjkyOTVlZGZjMmY4MmExNWFkMWQwOGUzYzAxYTM5M2E3MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f4511e&color=%23d50000&color=%23e67c73"
        style={{
          borderWidth: 0,
        }}
        width="100%"
        height="100%"
      />
    </section>
  );
}
