"use client";
import React, { Suspense, useEffect, useState } from "react";
import HeroSection from "@/components/heroSection";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Church, UserRound, Users } from "lucide-react";
import Image from "next/image";
import FormerVicarsPage from "./formerVicarsPage";
import axios from "axios";
interface CommitteeMember {
  committee: string;
  name: string;
  role: string;
  image: string;
}
export default function Page() {
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(
    []
  );
  useEffect(() => {
    getCommitteeMembers();
  }, []);
  const getCommitteeMembers = async () => {
    try {
      const response = await axios.get("/api/about/leadership");
      setCommitteeMembers(response.data);
    } catch (error) {
      console.error("Error fetching former vicars:", error);
    }
  };
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        imageSrc="/images/church-altar.png"
        altText="Mar Thoma Church Sydney Altar"
        title="Leadership"
        subText="Mar Thoma Church Sydney has been blessed with dedicated vicars and leaders who have guided our congregation with wisdom and compassion. We honor their service and the lasting impact they have made on our community."
      />

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
      <div className="container mx-auto py-12">
        <section id="leadership" className="scroll-mt-40">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Our Leadership</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">President</h3>
                {committeeMembers[0] && (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={committeeMembers[0].image}
                        alt={committeeMembers[0].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{committeeMembers[0].name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {committeeMembers[0].role}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="text-xl font-bold mb-4">Church Committee</h3>
                <p className="mb-6">
                  Our church is governed by an elected committee that works
                  alongside the vicar to oversee the spiritual and
                  administrative affairs of the parish.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {committeeMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        <UserRound />
                      </div>
                      <div>
                        <h4 className="font-bold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-16" />

        {/* Former Vicars Timeline */}
        <Suspense fallback={<div>Loading...</div>}>
          <section id="leadership" className="scroll-mt-40">
            <div className="flex items-center gap-3 mb-6">
              <Church className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-primary">Former Vicars</h2>
            </div>
            <Card>
              <CardContent className="pt-6">
                <FormerVicarsPage />
              </CardContent>
            </Card>
          </section>
        </Suspense>
      </div>
    </main>
  );
}
