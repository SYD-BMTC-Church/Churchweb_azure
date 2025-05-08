import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    navigationMenu: [
      { label: "Home", url: "/" },
      {
        label: "About",
        subMenu: [
          {
            label: "Our Church",
            url: "/about",
            description:
              "Learn about our history, vision, and mission as a church community.",
          },
          {
            label: "History",
            url: "/about/history",
            description: "The story of Mar Thoma Church Sydney",
          },
          {
            label: "Beliefs",
            url: "/about/beliefs",
            description: "Our faith and theological foundations",
          },
          {
            label: "Leadership",
            url: "/about/leadership",
            description: "Meet our vicar and church committee",
          },
        ],
      },
      { label: "Worship", url: "/worship" },
      { label: "Ministries", url: "/ministries" },
      { label: "Events", url: "/events" },
      { label: "Contact", url: "/contact" },
    ],
    footer: {
      about: {
        title: "Mar Thoma Church",
        description:
          "A community of faith, hope, and love in Sydney, Australia.",
        socialLinks: [
          { platform: "Facebook", url: "#" },
          { platform: "Instagram", url: "#" },
          { platform: "YouTube", url: "#" },
        ],
      },
      worshipServices: [
        { day: "Sunday", time: "9:30 AM", language: "English" },
        { day: "Sunday", time: "11:00 AM", language: "Malayalam" },
        { day: "Wednesday", time: "7:00 PM", type: "Prayer" },
      ],
      contact: {
        address: "123 Church Street, Sydney, NSW 2000",
        phone: "(02) 1234 5678",
        email: "info@marthomachurchsydney.org",
      },
      copyright: "© 2025 Mar Thoma Church Sydney. All rights reserved.",
    },
  };

  return NextResponse.json(data);
}
