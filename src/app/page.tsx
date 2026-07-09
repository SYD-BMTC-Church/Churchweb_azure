"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  churchAddress,
  navigationMenu,
  NavigationMenuItem,
  navUrl,
  parsonageAddress,
  requestForms,
} from "@/lib/constant";
import MDXRenderer from "@/lib/mdx-helper";
import axios from "axios";
import { Calendar, Church, Clock, Contact, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageLayout from "./page-layout";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [MessagefromtheVicar, setMessagefromtheVicar] = useState<{
    message: string | undefined;
    image: string | undefined;
  }>({
    message: undefined,
    image: undefined,
  });
  const [contact, setContact] = useState<{
    Phone: string;
    Email: string;
  }>({
    Phone: "",
    Email: "",
  });
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchMarkdown(), getContactDetails(), fetchUpcomingEvents()]).then(() =>
      setLoading(false),
    );
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      // Try multiple calendars to find Holy Communion events
      const calendarIds = [
        "c_56a6e0c46fa5f864d1689c4c64d903df60090f3748e6c8f8fe373fb5fb5ba73c",
        "c_006dcca0d08d706b39da31d4f09a25289f56c71d50be6fbd027631cd21fba6e5",
        "c_09e72818dd2eee3e5af4a59b53842a559ef129e64601d195e254c733021c979",
        "c_12c0c33444baf1460937e3ffe666d0db8e4270b7afc3e2dc38d8351a489997b4",
        "c_5f03a325a4b60f2572185205aa8a0cb5e9feff5db62aa03d67470f08061fc95d",
        "c_8afaaf875b76d8dd4fcbb69fd2e68759f41679e43e7d75a27b84d4f6758348f6",
        "c_ad213ef183b68d1376a7d5f73fae7f2bafd88240bc5e8c29af91fff6731df93f",
        "c_afa76cbdf84dbd4a161f0bc911d79ce6e2454b3066edc22997431367b543b823",
      ];

      let allEvents: any[] = [];
      for (const calId of calendarIds) {
        try {
          const response = await axios.get("/api/calendar-timing?calendar_id=" + encodeURIComponent(calId + "@group.calendar.google.com") + "&upcoming=true");
          if (response.data && Array.isArray(response.data)) {
            allEvents = [...allEvents, ...response.data];
          }
        } catch {
          // Skip calendars that fail
        }
      }

      // Filter for Holy Communion events and sort by date
      const worshipEvents = allEvents
        .filter((event: any) => event.summary?.toLowerCase().includes("holy communion"))
        .sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());

      setUpcomingEvents(worshipEvents.slice(0, 2));
    } catch (error) {
      // Silently fail - section won't show if no events available
    }
  };

  const fetchMarkdown = async () => {
    await axios.get("/api/home").then((response) => {
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
      if (response.data && response.data[0] && response.data[0]) {
        setContact(response.data[0]);
      } else {
        console.error("No markdown content found in response");
      }
    });
  };
  return (
    <PageLayout
      heroSectionProps={{
        imageSrc: "/images/church1.jpeg",
        altText: "Bethel Mar Thoma Church Sydney Altar",
        title: "Welcome to Bethel Mar Thoma Church Sydney",
        subText:
          "A community of faith, hope, and love. Join us in worship and fellowship.",
      }}
      loading={loading}
      breadcrumbItems={[{ label: "Home", href: "/" }, navUrl("About")]}
    >
      {/* Hero Section */}

      {/* Upcoming Worship Times */}
      {upcomingEvents.length > 0 && (
        <section className="py-2 bg-background">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary flex items-center justify-center gap-2">
              <Church size={18} />
              Upcoming Worship
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.map((event, index) => {
                const startDate = event.start ? new Date(event.start) : null;
                return (
                  <Card key={event.id || index} className="hover:shadow-md transition-shadow border-primary/20">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Church size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{event.summary}</p>
                        {startDate && (
                          <>
                            <p className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                              <Calendar size={12} />
                              {startDate.toLocaleDateString("en-AU", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                              <span className="mx-1">•</span>
                              <Clock size={12} />
                              {startDate.toLocaleTimeString("en-AU", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <Link href="/worship-events" passHref>
                <Button variant="outline" size="sm">View All Events</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quick Links Section */}
      <section className="py-8 text-primary-foreground bg-primary/10">
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

      {/* Message from Vicar */}
      <section className="py-12 bg-background">
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
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Location Section */}
      <section className="pt-12 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Find Us
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-full bg-muted rounded-lg overflow-hidden">
                <iframe
                  src={churchAddress.iframeSrc}
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
                  <Link href={churchAddress.MapLink} target="_blank">
                    <p className="font-medium">{churchAddress.AddressTitle}</p>
                    {churchAddress.Address.split(", ").map((line) => (
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
                  <p>
                    {"Phone: "}
                    <Link
                      className="text-primary underline"
                      href={`tel:${contact.Phone}`}
                    >
                      {contact.Phone}
                    </Link>
                  </p>
                  <p>
                    {"Email: "}
                    <Link
                      className="text-primary underline"
                      href={`mailto:${contact.Email}`}
                    >
                      {contact.Email}
                    </Link>
                  </p>
                  <p>
                    {`${parsonageAddress.AddressTitle}: `}
                    <Link
                      className="text-primary underline"
                      href={parsonageAddress.MapLink}
                    >
                      {parsonageAddress.Address}
                    </Link>
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    className="w-full"
                    href={churchAddress.MapLink}
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
    </PageLayout>
  );
}
