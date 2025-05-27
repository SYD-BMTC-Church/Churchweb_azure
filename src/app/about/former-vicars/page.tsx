import React, { Suspense } from "react";
import FormerVicarsPage from "./formerVicarsPage";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Image from "next/image";

export default function page() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/church-altar.png"
          alt="Mar Thoma Church Sydney Altar"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Former Vicars</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Since its establishment, Mar Thoma Church Sydney has been blessed
            with dedicated vicars who have guided our congregation with wisdom
            and compassion. We honor their service and the lasting impact they
            have made on our community.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Former Vicars", href: "/about/former-vicars" },
            ]}
          />
        </div>
      </div>

      {/* Former Vicars Timeline */}
      <Suspense fallback={<div>Loading...</div>}>
        <FormerVicarsPage />
      </Suspense>
    </main>
  );
}
