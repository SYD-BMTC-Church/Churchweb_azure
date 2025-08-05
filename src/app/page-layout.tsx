import HeroSection, { HeroSectionProps } from "@/components/heroSection";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface PageLayoutProps {
  heroSectionProps: HeroSectionProps;
  breadcrumbItems: { label: string; href: string }[];
  children: React.ReactNode;
}

export default function PageLayout({
  heroSectionProps,
  breadcrumbItems,
  children,
}: PageLayoutProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection {...heroSectionProps} />
      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      {children}
    </main>
  );
}
