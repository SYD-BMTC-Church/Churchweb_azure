import Footer from "@/components/footer";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Cinzel, Lato } from "next/font/google";
import Image from "next/image";
import type React from "react";
import "./globals.css";
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
                src="/images/logo.png"
                alt="Mar Thoma Church Logo"
                width={100}
                height={100}
                priority
              />
            </div>
            <div>
              <h1 className="text-sm lg:text-xl font-cinzel font-bold text-primary">
                Bethel Mar Thoma Church
              </h1>
              <p className="tsxt-xs md:text-sm text-muted-foreground">
                Sydney, Australia
              </p>
            </div>
          </div>
          <MenuBar />
        </div>
      </div>
    </header>
  );
}
