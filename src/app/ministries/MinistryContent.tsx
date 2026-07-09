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
import Loading from "@/components/loading";

export default function MinistryContent({ pageTitle }: { pageTitle: string }) {
  const [Content, setContent] = useState<Ministry>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getContent()]).then(() => setLoading(false));
  }, []);
  const getContent = async () => {
    try {
      const response = await axios.get(`/api/ministries?org=${pageTitle}`);
      setContent(response.data);
    } catch (error) {
      console.error(`Error fetching ${pageTitle} content:`, error);
    }
  };
  return loading ? (
    <Loading className="h-screen" />
  ) : (
    Content && (
      <PageLayout
        heroSectionProps={{
          title: pageTitle,
          subText: Content.HeroTitle,
          imageSrc: Content.Image,
          altText: `${pageTitle} at Bethel Mar Thoma Church Sydney`,
          size: "compact",
        }}
        breadcrumbItems={[{ label: "Home", href: "/" }, navUrl(`${pageTitle}`)]}
      >
        {/* About ${pageTitle} */}
        <AboutSection ministry={`${pageTitle}`} content={Content.About} />
        <GetInvolvedSection
          //create a markdown of the above content with a new design add icons and make it better
          content={Content.GetInvolved}
        />
        {Content.Contact && <ContactSection content={Content.Contact} />}
        {/* Schedule Section */}
        {Content.CalendarId && (
          <ScheduleSection calendarId={Content.CalendarId} />
        )}
      </PageLayout>
    )
  );
}

function ContactSection({ content }: { content: string }) {
  // Parse markdown with #### Area headers followed by name and phone link
  const parseContacts = (text: string) => {
    if (!text) return null;

    const regex = /####\s*(.+?)\s*\n\s*(.+?)\s*\[([^\]]+)\]\(tel:([^)]+)\)/g;
    const contacts: { area: string; name: string; phone: string; tel: string }[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      contacts.push({
        area: match[1].trim(),
        name: match[2].trim(),
        phone: match[3].trim(),
        tel: match[4].trim(),
      });
    }

    return contacts.length > 0 ? contacts : null;
  };

  const contacts = parseContacts(content);

  return (
    <section className="pt-12 bg-background">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Contact</h2>
          <Card>
            <CardContent>
              {contacts ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-primary/20">
                        <th className="py-3 px-4 font-semibold text-primary">Area</th>
                        <th className="py-3 px-4 font-semibold text-primary">Coordinator</th>
                        <th className="py-3 px-4 font-semibold text-primary">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact, idx) => (
                        <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4 font-medium text-foreground">{contact.area}</td>
                          <td className="py-3 px-4 text-muted-foreground">{contact.name}</td>
                          <td className="py-3 px-4">
                            <a href={`tel:${contact.tel}`} className="text-primary underline hover:text-primary/80">
                              {contact.phone}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-muted-foreground">
                  <MDXRenderer markdown={content} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
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
    <section className="pt-12 bg-background">
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
  return (
    <section className="pt-12 bg-background">
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
  id: string;
  summary: string;
  description?: string | null;
  location?: string | null;
  start: string | null;
  end: string | null;
  isRecurring?: boolean;
  recurrenceLabel?: string | null;
  until?: string | null;
  htmlLink?: string | null;
}

const ScheduleSection = ({ calendarId }: { calendarId: string }) => {
  const [scheduleContent, setScheduleContent] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    fetchSchedule();
  }, [calendarId]);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        `/api/calendar-timing?calendar_id=${encodeURIComponent(calendarId)}`,
      );

      setScheduleContent(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  return (
    <section className="pt-12 bg-muted/30">
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
              scheduleContent.map((item) => (
                <EventCard key={item.id} {...item} />
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
  isRecurring,
  recurrenceLabel,
  until,
}: ScheduleItem) => {
  const startDt = start ? new Date(start) : null;
  const endDt = end ? new Date(end) : null;
  const untilDt = until ? new Date(until) : null;

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

  const dateText = isRecurring
    ? recurrenceLabel || "Recurring event"
    : startDt
      ? formatDate(startDt)
      : "Date TBC";

  const untilText = untilDt ? ` until ${formatDate(untilDt)}` : "";

  const timeText =
    startDt && endDt ? `${formatTime(startDt)} - ${formatTime(endDt)}` : null;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{summary}</CardTitle>

        <p className="text-sm text-muted-foreground">
          {isRecurring ? (
            <>
              {dateText}
              {untilText}
            </>
          ) : (
            dateText
          )}

          {timeText && (
            <>
              <br />
              {timeText}
            </>
          )}
        </p>
      </CardHeader>

      <CardContent>
        {description && <p className="mb-2">{description}</p>}

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
