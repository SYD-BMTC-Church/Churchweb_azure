"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Send } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { navUrl } from "@/lib/constant";

const prayerRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  emailOrPhone: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (value) => {
        const emailOk = z.string().email().safeParse(value).success;
        const phoneOk = /^(?:\+61|0)\(?[23478]\)?\d{8}$/.test(value);
        return emailOk || phoneOk;
      },
      { message: "Enter a valid email address or phone number" },
    ),
  prayerRequest: z
    .string()
    .min(10, "Prayer request must be at least 10 characters")
    .max(1000, "Prayer request must be under 1000 characters"),
  requestType: z.enum(["personal", "family", "friend", "other"]),
  isConfidential: z.boolean(),
});

type PrayerRequestValues = z.infer<typeof prayerRequestSchema>;

export default function PrayerRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<PrayerRequestValues>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: "",
      emailOrPhone: "",
      prayerRequest: "",
      requestType: "personal",
      isConfidential: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: PrayerRequestValues) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    const formURL =
      "https://docs.google.com/forms/d/e/1FAIpQLScEZs4CpM_srd91pA0DGXwWrO7y-j2OjUFo1wAspAHnRStIWQ/formResponse";

    const formData = new URLSearchParams();
    formData.append("entry.1932960689", values.name);
    formData.append("entry.2028445071", values.emailOrPhone);
    formData.append("entry.147613505", values.requestType);
    formData.append("entry.737150498", values.prayerRequest);
    formData.append("entry.1622986577", values.isConfidential ? "Yes" : "No");

    try {
      await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      setSubmitResult({
        success: true,
        message:
          "Your prayer request has been submitted. Our prayer team will be praying for you.",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <HeroSection
        imageSrc="https://drive.google.com/uc?export=view&id=1iHoUEbn2H6YYkbOdKbI-aLQvi5fof9UV"
        altText="Bethel Mar Thoma Church Sydney Altar"
        title="Prayer Request"
        subText="Share your prayer needs with our church community"
      />

      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, navUrl("Prayer Request")]}
          />
        </div>
      </div>

      {/* Introduction */}
      <section className="py-2 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              We&apos;re Here to Pray With You
            </h2>
            <blockquote className="text-xl italic mb-8">
              &quot;Do not be anxious about anything, but in every situation, by
              prayer and petition, with thanksgiving, present your requests to
              God. And the peace of God, which transcends all understanding,
              will guard your hearts and your minds in Christ Jesus.&quot;
            </blockquote>
            <p className="text-lg font-semibold">Philippians 4:6-7</p>
            <Separator className="mx-auto w-24 my-6" />
          </div>
        </div>
      </section>

      {/* Prayer Request Form */}
      <section className="py-2 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Prayer Request</CardTitle>
                <CardDescription>
                  Fill out the form below to share your prayer needs with us
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
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
                      name="requestType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Request Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="personal"
                                  id="personal"
                                />
                                <label htmlFor="personal">Personal</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="family" id="family" />
                                <label htmlFor="family">Family</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="friend" id="friend" />
                                <label htmlFor="friend">Friend</label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <label htmlFor="other">Other</label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="prayerRequest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prayer Request</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please share your prayer request here"
                              rows={5}
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

                    <FormField
                      control={form.control}
                      name="isConfidential"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(Boolean(checked))
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Keep this request confidential (only clergy will
                              see it)
                            </FormLabel>
                          </div>
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
                        className={`p-4 rounded-md ${
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
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Submit Prayer Request
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
