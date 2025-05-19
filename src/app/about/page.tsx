"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Heart, BookOpen, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useHash } from "@/hooks/useHash";

export default function AboutPage() {
  const hash = useHash();
  return (
    <main className="min-h-screen">
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="/images/church-interior.png"
          alt="Mar Thoma Church Sydney Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Church
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Learn about our History, Mission & Vision, Beliefs and Leadership
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-foreground">About</span>
          </div>
        </div>
      </div>
      {hash}
      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <Tabs defaultValue="history" className="w-full" value={hash}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="mission" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Mission & Vision</span>
              </TabsTrigger>
              <TabsTrigger value="beliefs" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Beliefs</span>
              </TabsTrigger>
              <TabsTrigger
                value="leadership"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Leadership</span>
              </TabsTrigger>
            </TabsList>

            {/* History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Our History
                      </h2>
                      <p className="mb-4">
                        The Mar Thoma Church Sydney was established in 1985 by a
                        small group of Mar Thoma families who migrated to
                        Australia. What began as a small prayer group in a
                        living room has now grown into a vibrant community of
                        faith.
                      </p>
                      <p className="mb-4">
                        In 1990, the congregation purchased its first property
                        and converted it into a worship space. As the community
                        grew, so did the need for a larger facility. In 2005, we
                        moved to our current location, which was consecrated by
                        the Metropolitan of the Mar Thoma Church.
                      </p>
                      <p>
                        Over the decades, our church has been blessed with
                        dedicated vicars and lay leaders who have guided the
                        spiritual growth of our community. Today, we continue to
                        honor our heritage while embracing the future.
                      </p>
                    </div>
                    <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
                      <Image
                        src="/images/church-history.png"
                        alt="Historical photo of Mar Thoma Church Sydney"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/about/former-vicars">
                      <Button variant="outline">View Former Vicars</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Mission & Vision Tab */}
            <TabsContent value="mission" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Our Mission
                      </h2>
                      <p className="mb-6">
                        The mission of Mar Thoma Church Sydney is to proclaim
                        the Gospel of Jesus Christ, to promote spiritual growth
                        through worship and fellowship, and to serve the
                        community with love and compassion.
                      </p>

                      <h2 className="text-2xl font-bold text-primary mb-4">
                        Our Vision
                      </h2>
                      <p className="mb-4">We envision a church that:</p>
                      <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>
                          Nurtures spiritual growth through meaningful worship
                          and biblical teaching
                        </li>
                        <li>
                          Builds a loving community that welcomes people of all
                          backgrounds
                        </li>
                        <li>
                          Equips members to use their gifts in service to God
                          and others
                        </li>
                        <li>
                          Reaches out to the wider community with the love of
                          Christ
                        </li>
                        <li>
                          Preserves our Mar Thoma heritage while embracing
                          contemporary relevance
                        </li>
                      </ul>
                    </div>
                    <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
                      <Image
                        src="/images/church-community.png"
                        alt="Mar Thoma Church Sydney Community"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Beliefs Tab */}
            <TabsContent value="beliefs" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    Our Beliefs
                  </h2>
                  <p className="mb-6">
                    The Mar Thoma Church is an ancient church with apostolic
                    origins, reformed in the 19th century. We hold to the
                    following core beliefs:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          The Holy Trinity
                        </h3>
                        <p>
                          We believe in one God who exists eternally in three
                          persons: Father, Son, and Holy Spirit.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">The Bible</h3>
                        <p>
                          We believe the Holy Bible is the inspired Word of God
                          and the ultimate authority for faith and practice.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">Salvation</h3>
                        <p>
                          We believe salvation is by grace through faith in
                          Jesus Christ, who died for our sins and rose again.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">The Church</h3>
                        <p>
                          We believe the Church is the body of Christ, called to
                          worship, fellowship, and service.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">Sacraments</h3>
                        <p>
                          We observe Baptism and Holy Communion as sacraments
                          instituted by Christ.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          Second Coming
                        </h3>
                        <p>
                          We believe in the personal return of Jesus Christ and
                          the final judgment.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leadership Tab */}
            <TabsContent value="leadership" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Our Leadership
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Current Vicar</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                        <Image
                          src="/images/vicar.png"
                          alt="Rev. Dr. Thomas Mathew"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">
                          Rev. Dr. Thomas Mathew
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Vicar (2020 - Present)
                        </p>
                        <p className="mb-4">
                          Rev. Dr. Thomas Mathew has been serving as the vicar
                          of Mar Thoma Church Sydney since 2020. He holds a
                          Doctorate in Theology from Oxford University and has
                          served in parishes across India and the Middle East
                          before coming to Australia.
                        </p>
                        <p>
                          Under his leadership, our church has strengthened its
                          community outreach programs and youth ministries. His
                          passion for biblical teaching and pastoral care has
                          been a blessing to our congregation.
                        </p>
                      </div>
                    </div>
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
                          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                            <Image
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
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

                    <div className="mt-8">
                      <Link href="/about/former-vicars">
                        <Button>View Former Vicars</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}

const committeeMembers = [
  {
    name: "John Abraham",
    role: "Secretary",
    image: "/images/committee-1.png",
  },
  {
    name: "Sarah Thomas",
    role: "Treasurer",
    image: "/images/committee-2.png",
  },
  {
    name: "Jacob Mathew",
    role: "Trustee",
    image: "/images/committee-3.png",
  },
  {
    name: "Rachel Philip",
    role: "Sunday School Director",
    image: "/images/committee-4.png",
  },
  {
    name: "Samuel George",
    role: "Youth Fellowship President",
    image: "/images/committee-5.png",
  },
  {
    name: "Elizabeth Varghese",
    role: "Women's Fellowship President",
    image: "/images/committee-6.png",
  },
];
