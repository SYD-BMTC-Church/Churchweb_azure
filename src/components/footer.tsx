"use client";
import { parsonageAddress } from "@/lib/constant";
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
    Phone: string;
    Email: string;
  }>({
    Phone: "",
    Email: "",
  });

  useEffect(() => {
    getContactDetails();
  }, []);

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
    <footer className="bg-primary text-primary-foreground py-12 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {parsonageAddress.Address}
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
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:underline transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-cinzel font-bold mb-4">
              Bethel Mar Thoma Church
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
                href="https://www.youtube.com/@sydneymarthomachurch"
                className="text-primary-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />
        <div className="text-center text-sm text-primary-foreground/70">
          <p>
            © {new Date().getFullYear()} Bethel Mar Thoma Church, Sydney. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
