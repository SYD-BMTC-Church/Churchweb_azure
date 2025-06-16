import { Button } from "@/components/ui/button";
import { HeartHandshake, Users } from "lucide-react";
import Link from "next/link";

export const navigationMenu: {
  label: string;
  url?: string;
  render?: () => React.ReactNode;
  subMenu?: {
    label: string;
    url: string;
    description?: string;
    special?: boolean;
  }[];
}[] = [
  { label: "Home", url: "/" },
  {
    label: "About",
    subMenu: [
      {
        label: "Our Church",
        url: "/about",
        description:
          "Learn about our History, Mission & Vision, Beliefs and Leadership.",
        special: true,
      },
      {
        label: "Mission & Vision",
        url: "/about#mission-vision",
        description:
          "Discover our Mission & Vision, guiding our community and outreach.",
      },
      {
        label: "Beliefs",
        url: "/about#beliefs",
        description:
          "Explore our core beliefs and values that shape our faith community.",
      },
      {
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
      { label: "Sunday School", url: "/sunday-school" },
      { label: "Yuvajana Sakhyam", url: "/yuvajana-sakhyam" },
      { label: "Sevika Sangham", url: "/sevika-sangham" },
      { label: "Choir", url: "/choir" },
      { label: "Young Family Fellowship", url: "/young-family-fellowship" },
      {
        label: "Senior Citizens Fellowship",
        url: "/senior-citizens-fellowship",
      },
      { label: "Edavaka Mission", url: "/edavaka-mission" },
      { label: "Prayer Groups", url: "/prayer-groups" },
    ],
  },
  {
    label: "Donate",
    render: () => (
      <Button>
        <Link href="https://sydneymarthomachurch.square.site/">Donate</Link>
      </Button>
    ),
  },
];

export const requestForms = [
  {
    title: "New Here?",
    link: "/new-here",
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

export const committeeMembers = [
  {
    name: "John Abraham",
    role: "Secretary",
    image: "/images/committee-1.png",
  },
  {
    name: "Sarah Thomas",
    role: "Treasurer",
    image: "/images/committee-2.png",
  },
  {
    name: "Jacob Mathew",
    role: "Trustee",
    image: "/images/committee-3.png",
  },
  {
    name: "Rachel Philip",
    role: "Sunday School Director",
    image: "/images/committee-4.png",
  },
  {
    name: "Samuel George",
    role: "Youth Fellowship President",
    image: "/images/committee-5.png",
  },
  {
    name: "Elizabeth Varghese",
    role: "Women's Fellowship President",
    image: "/images/committee-6.png",
  },
];
