"use client";
import { useEffect, useState } from "react";
import { Ministry } from "@/app/api/ministries/route";
import PageLayout from "@/app/page-layout";
import { navUrl } from "@/lib/constant";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LucidIcon from "@/lib/icon";
import MDXRenderer from "@/lib/mdx-helper";
import { toPascalCase } from "@/lib/utils";

export default function MinistryContent({ pageTitle }: { pageTitle: string }) {
  const [Content, setContent] = useState<Ministry>();
  useEffect(() => {
    getContent();
  }, []);
  const getContent = async () => {
    try {
      const response = await axios.get(`/api/ministries?org=${pageTitle}`);
      setContent(response.data);
    } catch (error) {
      console.error(`Error fetching ${pageTitle} content:`, error);
    }
  };
  return (
    Content?.About && (
      <PageLayout
        heroSectionProps={{
          title: pageTitle,
          subText: Content.HeroTitle,
          imageSrc: Content.Image,
          altText: `${pageTitle} at Mar Thoma Church Sydney`,
        }}
        breadcrumbItems={[{ label: "Home", href: "/" }, navUrl(`${pageTitle}`)]}
      >
        {/* About ${pageTitle} */}
        <AboutSection ministry={`${pageTitle}`} content={Content.About} />
        <GetInvolvedSection
          //create a markdown of the above content with a new design add icons and make it better
          content={Content.GetInvolved}
        />

        {/* Schedule Section */}
        <ScheduleSection calenderId={Content.CalendarId} />
      </PageLayout>
    )
  );
}

function AboutSection({
  ministry,
  content,
}: {
  ministry: string;
  content: string;
}) {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            About Our {ministry}
          </h2>
          <MDXRenderer markdown={content} />
        </div>
      </div>
    </section>
  );
}

function GetInvolvedSection({
  content,
}: {
  content: {
    title: string;
    details: string;
    icon: string;
  }[];
}) {
  console.log("GetInvolvedSection Content:", content);
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-center mb-2">
                    <LucidIcon
                      name={item.icon}
                      className="h-8 w-8 text-primary mx-auto mb-2"
                    />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <MDXRenderer markdown={item.details} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ScheduleItem {
  summary: string;
  description?: string | null;
  location?: string | null;
  start: string; // ISO date string
  end: string; // ISO date string
  recurrence?: {
    frequency: string;
    interval: number;
    BYDAY?: string[];
    until?: string;
  };
}

const ScheduleSection = ({ calenderId }: { calenderId: string }) => {
  const [scheduleContent, setScheduleContent] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        `/api/calendar-timing?calendar_id=${calenderId}`
      );
      setScheduleContent(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Schedule & Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scheduleContent.length === 0 ? (
              <p className="col-span-2 text-center text-muted-foreground">
                No upcoming events.
              </p>
            ) : (
              scheduleContent.map((item, index) => (
                <EventCard key={index} {...item} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const EventCard = ({
  summary,
  description,
  location,
  start,
  end,
  recurrence,
}: ScheduleItem) => {
  const startDt = start ? new Date(start) : null;
  const endDt = end ? new Date(end) : null;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const customDate = {
    start: startDt ? formatDate(startDt) : "N/A",
    weekday: startDt
      ? startDt.toLocaleDateString("en-AU", { weekday: "short" })
      : "N/A",
    end: endDt ? formatDate(endDt) : "N/A",
    time:
      startDt && endDt
        ? `${formatTime(startDt)} - ${formatTime(endDt)}`
        : "N/A",
    //camel case
    recurring: toPascalCase(recurrence?.frequency || ""),
    frequency: `Every ${recurrence?.frequency || "day"} ${
      recurrence?.BYDAY ? ` on ${convertBYDAYToWeekday(recurrence.BYDAY)}` : ""
    }`,
    until: recurrence?.until ? formatDate(new Date(recurrence.until)) : null,
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{summary}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {customDate.recurring
            ? `Recurring: ${customDate.recurring} ${
                customDate.until ? ` until ${customDate.until}` : ""
              }`
            : `${customDate.start}${
                customDate.start !== customDate.end
                  ? ` - ${customDate.end}`
                  : customDate.until
                  ? ` - ${customDate.until}`
                  : ""
              }`}
          <br />
          {customDate.time}
          <br />
        </p>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{description || ""}</p>
        {location && (
          <p className="text-sm text-muted-foreground">
            <strong>Location:</strong> {location}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const convertBYDAYToWeekday = (byday: string[]) => {
  if (!byday || byday.length === 0) return "";
  const bydayCodes = byday.map((day) => day.slice(-2));
  const weekdayMap: Record<string, string> = {
    SU: "Sunday",
    MO: "Monday",
    TU: "Tuesday",
    WE: "Wednesday",
    TH: "Thursday",
    FR: "Friday",
    SA: "Saturday",
  };
  return bydayCodes.map((code) => weekdayMap[code] || code).join(", ");
};
