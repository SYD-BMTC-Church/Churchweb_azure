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
import { navUrl } from "@/lib/constant";
import MDXRenderer from "@/lib/mdx-helper";
import Loading from "@/components/loading";
interface CommitteeMember {
  Sector: string;
  MemberName: string;
  Role: string;
  Image: string;
}
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(
    [],
  );

  useEffect(() => {
    setLoading(true);
    Promise.all([getCommitteeMembers()]).then(() => setLoading(false));
  }, []);

  const getCommitteeMembers = async () => {
    try {
      const response = await axios.get("/api/about/leadership");
      setCommitteeMembers(response.data);
    } catch (error) {
      console.error("Error fetching former vicars:", error);
    }
  };
  return loading ? (
    <Loading className="h-screen" />
  ) : (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        imageSrc="https://drive.google.com/uc?export=view&id=1iHoUEbn2H6YYkbOdKbI-aLQvi5fof9UV"
        altText="Bethel Mar Thoma Church Sydney Altar"
        title="Leadership"
        subText="Bethel Mar Thoma Church Sydney has been blessed with dedicated vicars and leaders who have guided our congregation with wisdom and compassion. We honor their service and the lasting impact they have made on our community."
        size="compact"
      />

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              navUrl("About"),
              navUrl("Former Vicars"),
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
            <CardContent>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">President</h3>
                {committeeMembers[0] && (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 content-center justify-items-center">
                      <MDXRenderer markdown={committeeMembers[0].Image} />
                      {/* <Image
                        src={committeeMembers[0].Image}
                        alt={committeeMembers[0].MemberName}
                        fill
                        className="object-cover"
                      /> */}
                    </div>
                    <div>
                      <h4 className="font-bold">
                        {committeeMembers[0].MemberName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {committeeMembers[0].Role}
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

                {/* Group members by sector */}
                {Object.entries(
                  committeeMembers
                    .filter((item) => !item.Role.includes("Vicar"))
                    .reduce<Record<string, CommitteeMember[]>>(
                      (acc, member) => {
                        acc[member.Sector] = acc[member.Sector] || [];
                        acc[member.Sector].push(member);
                        return acc;
                      },
                      {},
                    ),
                ).map(([sector, members]) => (
                  <div key={sector} className="mb-8">
                    <h4 className="text-lg font-semibold mb-2 text-primary">
                      {sector}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                            <MDXRenderer markdown={member.Image} />
                          </div>
                          <div>
                            <h4 className="font-bold">{member.MemberName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {member.Role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
              <CardContent>
                <FormerVicarsPage />
              </CardContent>
            </Card>
          </section>
        </Suspense>
      </div>
    </main>
  );
}
