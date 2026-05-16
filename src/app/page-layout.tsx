import HeroSection, { HeroSectionProps } from "@/components/heroSection";
import Loading from "@/components/loading";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface PageLayoutProps {
  heroSectionProps: HeroSectionProps;
  loading?: boolean;
  breadcrumbItems: { label: string; href: string }[];
  children: React.ReactNode;
}

export default function PageLayout({
  heroSectionProps,
  loading,
  breadcrumbItems,
  children,
}: PageLayoutProps) {
  return loading ? (
    <Loading className="h-screen" />
  ) : (
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
