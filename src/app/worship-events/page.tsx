import React from "react";

export default function page() {
  return (
    <section className="relative h-[80vh] w-full">
      <iframe
        src={process.env.CALENDAR_URL}
        style={{
          borderWidth: 0,
        }}
        width="100%"
        height="100%"
      />
    </section>
  );
}
