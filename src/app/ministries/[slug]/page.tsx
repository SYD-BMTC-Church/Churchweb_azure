import NotFound from "@/app/not-found";
import MinistryContent from "../MinistryContent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  switch (slug) {
    case "choir":
      return <MinistryContent pageTitle="Choir" />;
    case "edavaka-mission":
      return <MinistryContent pageTitle="Edavaka Mission" />;
    case "senior-citizen":
      return <MinistryContent pageTitle="Senior Citizen" />;
    case "sevika-sanghom":
      return <MinistryContent pageTitle="Sevika Sanghom" />;
    case "sunday-school":
      return <MinistryContent pageTitle="Sunday School" />;
    case "young-family-fellowship":
      return <MinistryContent pageTitle="Young Family Fellowship" />;
    case "yuvajana-sakhyam":
      return <MinistryContent pageTitle="Yuvajana Sakhyam" />;
    case "area-prayer":
      return <MinistryContent pageTitle="Area Prayer" />;
    default:
      //return 404 not found page
      return <NotFound />;
  }
}
