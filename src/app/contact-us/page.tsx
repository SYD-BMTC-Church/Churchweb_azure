"use client";

import { useState } from "react";
import { Lock, Send } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import HeroSection from "@/components/heroSection";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { navUrl } from "@/lib/constant";

const contactUsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  emailOrPhone: z
    .string()
    .trim()
    .min(1, "Email or phone is required")
    .refine((value) => {
      const emailOk = z.string().email().safeParse(value).success;
      const phoneOk = /^(?:\+61|0)\(?[23478]\)?\d{8}$/.test(value);
      return emailOk || phoneOk;
    }, "Enter a valid email address or phone number"),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(150, "Subject must be under 150 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

type ContactUsFormValues = z.infer<typeof contactUsSchema>;

export default function ContactUsPage() {
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      emailOrPhone: "",
      subject: "",
      message: "",
    },
    mode: "onBlur",
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ContactUsFormValues) => {
    setSubmitResult(null);

    const formURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSdVhjzfCm8jAXXNCI3GTvdcq-NUkm335z4jrjarcqAIZZT9jQ/formResponse";
    const formData = new URLSearchParams();
    formData.append("entry.1932960689", values.name);
    formData.append("entry.2028445071", values.emailOrPhone);
    formData.append("entry.147613505", values.subject);
    formData.append("entry.737150498", values.message);
    try {
      const response = await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      setSubmitResult({
        success: true,
        message: "Your message has been sent. We will get back to you soon.",
      });

      setSubmitResult({
        success: true,
        message: "Your message has been sent. We will get back to you soon.",
      });

      form.reset();
    } catch (error) {
      setSubmitResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <main className="min-h-screen">
      <HeroSection
        imageSrc="/images/contact-us-banner.png"
        altText="Contact Us"
        title="Contact Us"
        subText="We'd love to hear from you"
      />

      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              navUrl("Contact Us"),
            ]}
          />
        </div>
      </div>

      <section className="py-2 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Fill out the form below to send us a message
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                autoComplete="name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="emailOrPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email or Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Your email address or phone number"
                                autoComplete="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Subject of your message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your message here"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Please avoid sharing highly sensitive personal data.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <p>
                        Your privacy is important to us. We will handle your
                        information with care.
                      </p>
                    </div>

                    {submitResult && (
                      <div
                        className={`rounded-md p-4 ${
                          submitResult.success
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                      >
                        {submitResult.message}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
