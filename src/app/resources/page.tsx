import React from "react";
import PageLayout from "../page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import Link from "next/link";

const forms = [
  {
    title: "BMTC Membership Form",
    description: "Membership application form for Bethel Mar Thoma Church, Sydney.",
    href: "/forms/BMTC_membership_form.pdf",
  },
  {
    title: "Application for Baptism",
    description: "Form to apply for baptism at Bethel Mar Thoma Church.",
    href: "/forms/Application-for-Baptism.pdf",
  },
];

export default function ResourcesPage() {
  return (
    <PageLayout
      heroSectionProps={{
        title: "Resources",
        subText: "Download forms and documents",
        imageSrc: "/images/church1.jpeg",
        altText: "Resources",
        size: "compact",
      }}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources" },
      ]}
    >
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Forms & Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {forms.map((form) => (
            <Link
              key={form.href}
              href={form.href}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileDown className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{form.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {form.description}
                    </p>
                    <span className="text-primary text-sm font-medium mt-2 inline-block">
                      Download PDF
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
