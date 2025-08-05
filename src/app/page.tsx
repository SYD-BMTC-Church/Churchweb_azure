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
  navigationMenu,
  NavigationMenuItem,
  navUrl,
  requestForms,
} from "@/lib/constant";
import MDXRenderer from "@/lib/mdx-helper";
import axios from "axios";
import { Contact, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageLayout from "./page-layout";

export default function Home() {
  const [MessagefromtheVicar, setMessagefromtheVicar] = useState<{
    message: string | undefined;
    image: string | undefined;
  }>({
    message: undefined,
    image: undefined,
  });
  const [contact, setContact] = useState<{
    AddressTitle: string;
    MapLink: string;
    Address: string;
    Phone: string;
    Email: string;
  }>({
    AddressTitle: "",
    MapLink: "",
    Address: "",
    Phone: "",
    Email: "",
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
    <PageLayout
      heroSectionProps={{
        imageSrc: "/images/church1.jpeg",
        altText: "Mar Thoma Church Sydney Altar",
        title: "Welcome to Mar Thoma Church Sydney",
        subText:
          "A community of faith, hope, and love. Join us in worship and fellowship.",
        children: (
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={
                navigationMenu.find(
                  (item: NavigationMenuItem) =>
                    item.label === "Worship and Events"
                )?.url || ""
              }
              passHref
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                Sunday Service Times
              </Button>
            </Link>
            <Link
              href={
                navigationMenu
                  .find((item: NavigationMenuItem) => item.label === "About")
                  ?.subMenu?.find((subItem) => subItem.label === "Our Church")
                  ?.url || ""
              }
              passHref
            >
              <Button
                size="lg"
                variant="outline"
                className="text-zinc-600 border-white hover:bg-zinc-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        ),
      }}
      breadcrumbItems={[{ label: "Home", href: "/" }, navUrl("About")]}
    >
      {/* Hero Section */}

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
                  <Link href={contact.MapLink} target="_blank">
                    <p className="font-medium">{contact.AddressTitle}</p>
                    {contact.Address.split(", ").map((line) => (
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
                  <p>Phone: {contact.Phone}</p>
                  <p>Email: {contact.Email}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    className="w-full"
                    href={contact.MapLink}
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
