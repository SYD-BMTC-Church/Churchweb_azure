import MinistryContent from "../MinistryContent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // { icon: "Music", label: "Choir", url: "/ministries/choir" },
  //     {
  //       icon: "Globe",
  //       label: "Edavaka Mission",
  //       url: "/ministries/edavaka-mission",
  //     },
  //     {
  //       icon: "UserCheck",
  //       label: "Senior Citizens Fellowship",
  //       url: "/ministries/senior-citizens-fellowship",
  //     },
  //     {
  //       icon: "HandHeart",
  //       label: "Sevika Sangham",
  //       url: "/ministries/sevika-sangham",
  //     },
  //     {
  //       icon: "GraduationCap",
  //       label: "Sunday School",
  //       url: "/ministries/sunday-school",
  //     },
  //     {
  //       icon: "UsersRound",
  //       label: "Young Family Fellowship",
  //       url: "/ministries/young-family-fellowship",
  //     },
  //     {
  //       icon: "Flame",
  //       label: "Yuvajana Sakhyam",
  //       url: "/ministries/yuvajana-sakhyam",
  //     },
  //     {
  //       icon: "HeartHandshake",
  //       label: "Prayer Groups",
  //       url: "/ministries/prayer-groups",
  //     },
  const { slug } = await params;
  switch (slug) {
    case "choir":
      return <MinistryContent pageTitle="Choir" />;
    case "edavaka-mission":
      return <MinistryContent pageTitle="Edavaka Mission" />;
    case "senior-citizens-fellowship":
      return <MinistryContent pageTitle="Senior Citizens Fellowship" />;
    case "sevika-sangham":
      return <MinistryContent pageTitle="Sevika Sangham" />;
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
      return (
        <div className="container mx-auto text-center py-12">
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          <p className="text-lg mt-4">
            The page you are looking for does not exist.
          </p>
        </div>
      );
  }
}
