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
            We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
            exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact-us">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
