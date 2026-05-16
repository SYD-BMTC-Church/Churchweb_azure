import { Button } from "@/components/ui/button";
import { HeartHandshake, Users } from "lucide-react";
import Link from "next/link";

export interface NavigationMenuItem {
  label: string;
  url?: string;
  render?: () => React.ReactNode;
  subMenu?: {
    icon: string;
    label: string;
    url: string;
    description?: string;
    special?: boolean;
  }[];
}

export const navUrl = (label: string) => {
  return {
    label: label,
    href: navigationMenu.find((item) => item.label === label)?.url || "",
  };
};

export const navigationMenu: NavigationMenuItem[] = [
  { label: "Home", url: "/" },
  {
    label: "About",
    subMenu: [
      {
        icon: "Church",
        label: "Our Church",
        url: "/about",
        description:
          "Learn about our History, Mission & Vision, Beliefs and Leadership.",
        special: true,
      },
      {
        icon: "Heart",
        label: "Mission & Vision",
        url: "/about#mission & vision",
        description:
          "Discover our Mission & Vision, guiding our community and outreach.",
      },
      {
        icon: "BookOpen",
        label: "Beliefs",
        url: "/about#beliefs",
        description:
          "Explore our core beliefs and values that shape our faith community.",
      },
      {
        icon: "Users",
        label: "Leadership",
        url: "/leadership",
        description:
          "Meet our dedicated leaders who guide and support our church community.",
      },
    ],
  },
  { label: "Worship and Events", url: "/worship-events" },
  {
    label: "Ministries",
    subMenu: [
      { icon: "Music", label: "Choir", url: "/ministries/choir" },
      {
        icon: "Globe",
        label: "Edavaka Mission",
        url: "/ministries/edavaka-mission",
      },
      {
        icon: "UserCheck",
        label: "Senior Citizens",
        url: "/ministries/senior-citizens",
      },
      {
        icon: "HandHeart",
        label: "Sevika Sanghom",
        url: "/ministries/sevika-sanghom",
      },
      {
        icon: "GraduationCap",
        label: "Sunday School",
        url: "/ministries/sunday-school",
      },
      {
        icon: "UsersRound",
        label: "Young Family Fellowship",
        url: "/ministries/young-family-fellowship",
      },
      {
        icon: "Flame",
        label: "Yuvajana Sakhyam",
        url: "/ministries/yuvajana-sakhyam",
      },
      {
        icon: "HeartHandshake",
        label: "Area Prayer",
        url: "/ministries/area-prayer",
      },
    ],
  },
  {
    label: "Donate",
    render: () => (
      <Button asChild>
        <Link href="https://sydneymarthomachurch.square.site/">Donate</Link>
      </Button>
    ),
  },
];

export const requestForms = [
  {
    title: "New Here?",
    link: "/contact-us",
    content:
      "Welcome to our church family. Find out what to expect on your first visit.",
    icon: <Users size={24} />,
    buttonLabel: "Get in Touch",
  },
  {
    title: "Prayer Request",
    link: "/prayer-request",
    content: "Share your prayer needs with our church community.",
    icon: <HeartHandshake size={24} />,
    buttonLabel: "Submit Request",
  },
];

export const parsonageAddress = {
  AddressTitle: "Parsonage",
  MapLink: "https://maps.app.goo.gl/UkTG7DZf1MuWRpe96",
  Address: "3 Reservoir Rd, Blacktown NSW 2148, Australia",
};

export const churchAddress = {
  AddressTitle: "Bethel Mar Thoma Church",
  MapLink: "https://maps.app.goo.gl/sx7P4eyy4P4A6xXv9",
  Address: "1650 The Horsley Dr, Horsley Park NSW 2175, Australia",
  iframeSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.777223117319!2d150.8598136757075!3d-33.843855373236266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12970cec9961e3%3A0xaf5894cc2820cede!2sBethel%20Mar%20Thoma%20Church%20Sydney!5e0!3m2!1sen!2sin!4v1746607494800!5m2!1sen!2sin",
};
