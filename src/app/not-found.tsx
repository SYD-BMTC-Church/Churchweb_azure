import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="container max-w-3xl mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
          <p className="text-lg mb-8">
            We're sorry, but the page you're looking for doesn't exist or has
            been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold mb-4 text-center">
            You might be looking for:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              href="/about"
              className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>About Us</span>
            </Link>
            <Link
              href="/worship-events"
              className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>Worship & Events</span>
            </Link>
            <Link
              href="/ministries"
              className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>Ministries</span>
            </Link>
            <Link
              href="/new-here"
              className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>New Here</span>
            </Link>
            <Link
              href="/contact"
              className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/prayer-request"
              className="p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>Prayer Request</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
