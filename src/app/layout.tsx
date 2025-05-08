import type React from "react";
import type { Metadata } from "next";
import { Cinzel, Lato } from "next/font/google";
import Link from "next/link";
import {
  Menu,
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import Image from "next/image";
import { initData, navigationMenu } from "@/lib/constant";
import { MenuBar } from "./MenuBar";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Mar Thoma Church Sydney",
  description:
    "Official website of Mar Thoma Church Sydney - A community of faith, hope, and love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${lato.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Mar Thoma Church Logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-cinzel font-bold text-primary">
                Bethel Mar Thoma Church
              </h1>
              <p className="text-sm text-muted-foreground">Sydney, Australia</p>
            </div>
          </div>
          <MenuBar />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/worship"
                  className="hover:text-accent transition-colors"
                >
                  Worship
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries"
                  className="hover:text-accent transition-colors"
                >
                  Ministries
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-accent transition-colors"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Worship Services</h3>
            <ul className="space-y-2">
              <li>Sunday: 9:30 AM (English)</li>
              <li>Sunday: 11:00 AM (Malayalam)</li>
              <li>Wednesday: 7:00 PM (Prayer)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="not-italic space-y-2">
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                123 Church Street, Sydney, NSW 2000
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} />
                (02) 1234 5678
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                info@marthomachurchsydney.org
              </p>
            </address>
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
