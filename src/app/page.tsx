import Image from "next/image";
import { Calendar, MapPin, MessageSquare, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { initData } from "@/lib/constant";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/church1.jpeg"
          alt="Mar Thoma Church Sydney"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mar Thoma Church Sydney
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            A community of faith, hope, and love
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Sunday Service Times
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-zinc-600 border-white hover:bg-zinc-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary-foreground/10 border-none text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <Users size={24} />
              <CardTitle>New Here?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Welcome to our church family. Find out what to expect on your
                first visit.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-primary-foreground/10 border-none text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare size={24} />
              <CardTitle>Prayer Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Share your prayer needs with our church community.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                Submit Request
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-primary-foreground/10 border-none text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4">
              <Calendar size={24} />
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View our calendar and join us for worship and fellowship.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Events
            </Button>
          </div>
        </div>
      </section>

      {/* Message from Vicar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                <Image
                  src="/images/vicar.png"
                  alt="Vicar of Mar Thoma Church Sydney"
                  fill
                  className="object-cover rounded-full border-4 border-accent"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Message from the Vicar
              </h2>
              <blockquote className="text-lg italic border-l-4 border-accent pl-4 mb-6">
                "In the 30 years since its formation, the Bethel Mar Thoma
                Parish has witnessed and established one of the most influential
                diasporas in Sydney. The unique identity as an 'Eastern Reformed
                Church', in the traditional lineage of Syrian Christian
                Churches, the Mar Thoma Church stands closer to both
                traditionalists and Evangelicals. The Mar Thoma church is
                evangelical in its faith, traditional in its framework and
                missional in its reflections. As long as faith keeps us
                inspired, challenged and motivated, we will eliminate divisions
                to develop strong bonds and nurture relationships. Sydney has
                become the preferred destination for people from South East
                Asia, as the government respects multicultural migrants and the
                country becomes polyphonic."
              </blockquote>
              <p className="text-right font-semibold">
                — Rev. Dr. Thomas Mathew
              </p>
              <div className="mt-6">
                <Button>Read Full Message</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Location Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Find Us
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-full bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.777223117319!2d150.8598136757075!3d-33.843855373236266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12970cec9961e3%3A0xaf5894cc2820cede!2sBethel%20Mar%20Thoma%20Church%20Sydney!5e0!3m2!1sen!2sin!4v1746607494800!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={"https://maps.app.goo.gl/sx7P4eyy4P4A6xXv9"}>
                    <p className="font-medium">
                      {initData.contact.addressTitle}
                    </p>
                    <p>{initData.contact.address.map((line) => line)}</p>
                  </Link>
                  <Separator className="my-4" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p>Phone: {initData.contact.phone}</p>
                    <p>Email: info@marthomachurchsydney.org</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Directions</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const events = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday, 9:30 AM",
    description:
      "Join us for our weekly worship service with praise, prayer, and teaching from God's Word.",
  },
  {
    title: "Bible Study",
    date: "Wednesday, 7:00 PM",
    description:
      "Midweek Bible study and prayer meeting for spiritual growth and fellowship.",
  },
  {
    title: "Youth Fellowship",
    date: "Friday, 6:30 PM",
    description:
      "A time for young people to connect, worship, and grow in their faith together.",
  },
];
