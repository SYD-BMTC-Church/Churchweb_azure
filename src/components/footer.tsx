"use client";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
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
    getContactDetails();
  }, []);
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
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {contact.Address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} />
                {contact.Phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                {contact.Email}
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-xl font-cinzel font-bold mb-4">
              Mar Thoma Church
            </h3>
            <p className="mb-4">
              A community of faith, hope, and love in Sydney, Australia.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-primary-foreground hover:text-accent transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        <div className="text-center text-sm text-primary-foreground/70">
          <p>
            © {new Date().getFullYear()} Mar Thoma Church Sydney. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
