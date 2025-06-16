"use client";
import HeroSection from "@/components/heroSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { requestForms } from "@/lib/constant";
import MDXRenderer from "@/lib/mdx-helper";
import axios from "axios";
import { Contact, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [MessagefromtheVicar, setMessagefromtheVicar] = useState<{
    message: string | undefined;
    image: string | undefined;
  }>({
    message: undefined,
    image: undefined,
  });
  const [contact, setContact] = useState<{
    addressTitle: string;
    mapLink: string;
    address: string;
    phone: string;
    email: string;
  }>({
    addressTitle: "",
    mapLink: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchMarkdown();
    getContactDetails();
  }, []);

  const fetchMarkdown = async () => {
    await axios.get("/api/home").then((response) => {
      console.log("Response from /api/home:", response.data[0]);
      if (response.data && response.data[0] && response.data[0]) {
        setMessagefromtheVicar({
          message: response.data[0].Message,
          image: response.data[0].Image,
        });
      } else {
        console.error("No markdown content found in response");
      }
    });
  };

  const getContactDetails = async () => {
    await axios.get("/api/contact-details").then((response) => {
      console.log("Response from /api/home:", response.data[0]);
      if (response.data && response.data[0] && response.data[0]) {
        setContact(response.data[0]);
      } else {
        console.error("No markdown content found in response");
      }
    });
  };
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <HeroSection
        imageSrc="/images/church1.jpeg"
        altText="Mar Thoma Church Sydney"
        title="Welcome to Mar Thoma Church Sydney"
        subText="A community of faith, hope, and love"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Sunday Service Times
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-zinc-600 border-white hover:bg-zinc-300"
          >
            Learn More
          </Button>
        </div>
      </HeroSection>

      {/* Quick Links Section */}
      <section className="py-12 text-primary-foreground bg-primary/10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {requestForms.map((form, index) => (
            <Card
              key={index}
              className="bg-primary border-none text-primary-foreground transition-colors"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {form.icon}
                <CardTitle>{form.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{form.content}</p>
              </CardContent>
              <Link href={form.link} passHref>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    {form.buttonLabel}
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Message from Vicar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                {MessagefromtheVicar.image ? (
                  <Image
                    src={MessagefromtheVicar.image}
                    alt="Message from the Vicar"
                    className="object-cover rounded-full border-4 border-accent"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Message from the Vicar
              </h2>
              <MDXRenderer markdown={MessagefromtheVicar.message} />
              {/* <div className="mt-6">
                <Button>Read Full Message</Button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Location Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Find Us
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-full bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.777223117319!2d150.8598136757075!3d-33.843855373236266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12970cec9961e3%3A0xaf5894cc2820cede!2sBethel%20Mar%20Thoma%20Church%20Sydney!5e0!3m2!1sen!2sin!4v1746607494800!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={contact.mapLink} target="_blank">
                    <p className="font-medium">{contact.addressTitle}</p>
                    {contact.address.split(", ").map((line) => (
                      <p key={line} className="text-primary underline">
                        {line},
                      </p>
                    ))}
                  </Link>
                </CardContent>
                <Separator className="my-4" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Contact size={20} className="text-primary" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Phone: {contact.phone}</p>
                  <p>Email: {contact.email}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    className="w-full"
                    href={contact.mapLink}
                    target="_blank"
                    passHref
                  >
                    <Button className="w-full">Get Directions</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const events = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday, 9:30 AM",
    description:
      "Join us for our weekly worship service with praise, prayer, and teaching from God's Word.",
  },
  {
    title: "Bible Study",
    date: "Wednesday, 7:00 PM",
    description:
      "Midweek Bible study and prayer meeting for spiritual growth and fellowship.",
  },
  {
    title: "Youth Fellowship",
    date: "Friday, 6:30 PM",
    description:
      "A time for young people to connect, worship, and grow in their faith together.",
  },
];
