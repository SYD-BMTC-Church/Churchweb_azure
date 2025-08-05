"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";
import MDXRenderer from "@/lib/mdx-helper";
import { navUrl } from "@/lib/constant";
import PageLayout from "../page-layout";
import Icon from "@/lib/icon";
import LucidIcon from "@/lib/icon";

interface AboutContent {
  Title: string;
  Icon: string;
  Data: string;
  Tag: string;
  Image: string;
}

export default function AboutPage() {
  const [aboutContent, setAboutContent] = useState<AboutContent[]>([]);

  useEffect(() => {
    fetchMarkdown();
  }, []);

  const fetchMarkdown = async () => {
    await axios
      .get("/api/about")
      .then((response) => {
        setAboutContent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching about content:", error);
      });
  };

  return (
    <PageLayout
      heroSectionProps={{
        imageSrc: "/images/church-altar.png",
        altText: "Mar Thoma Church Sydney Altar",
        title: "About Us",
        subText: "Learn more about our church, its history, and our mission.",
      }}
      breadcrumbItems={[{ label: "Home", href: "/" }, navUrl("About")]}
    >
      {/* Navigation Links */}
      <div className="sticky top-[73px] bg-background z-30 border-b">
        <div className="container mx-auto py-4">
          <div className="flex justify-center space-x-2 overflow-x-auto">
            <a
              href="#history"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <LucidIcon name="Clock" className="h-4 w-4" />
              <span>History</span>
            </a>
            <a
              href="#mission & vision"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <LucidIcon name="Heart" className="h-4 w-4" />
              <span>Mission</span>
            </a>
            <a
              href="#beliefs"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <LucidIcon name="BookOpen" className="h-4 w-4" />
              <span>Beliefs</span>
            </a>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto py-12">
        {aboutContent.map((section) => (
          <section
            key={section.Title}
            id={section.Title.toLowerCase()}
            className="scroll-mt-40 mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <LucidIcon name={section.Icon} className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-primary">
                {section.Title}
              </h2>
            </div>
            <Card>
              <CardContent>
                {section.Image ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <MDXRenderer markdown={section.Data} />
                    </div>
                    <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
                      <Image
                        src={section.Image}
                        alt={section.Tag}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <MDXRenderer markdown={section.Data} />
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
