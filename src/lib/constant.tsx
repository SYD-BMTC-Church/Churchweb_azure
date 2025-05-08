export const navigationMenu = [
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
];

export const initData = {
  about: {
    title: "Bethel Mar Thoma Church",
    description: "A community of faith, hope, and love in Sydney, Australia.",
    socialLinks: [
      { platform: "Facebook", url: "#" },
      { platform: "Instagram", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
  },
  contact: {
    addressTitle: "Bethel Mar Thoma Church",
    address: ["1650 The Horsley Dr,", "Horsley Park NSW 2175,", "Australia"],
    phone: "+61297035651",
    email: "info@marthomachurchsydney.org",
  },
};
