"use client";

import type React from "react";
import { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { navUrl } from "@/lib/constant";

export default function PrayerRequestPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    prayerRequest: "",
    requestType: "personal",
    isUrgent: false,
    isConfidential: false,
    shareWithPrayerTeam: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, requestType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Commented out actual API call for the user to fill in
      /*
      const response = await fetch('/api/prayer-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }
      */

      // Success simulation
      setSubmitResult({
        success: true,
        message:
          "Your prayer request has been submitted. Our prayer team will be praying for you.",
      });
      setFormState({
        name: "",
        email: "",
        phone: "",
        prayerRequest: "",
        requestType: "personal",
        isUrgent: false,
        isConfidential: false,
        shareWithPrayerTeam: true,
      });
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
      {/* Hero Section */}
      <HeroSection
        imageSrc="/images/church-altar.png"
        altText="Mar Thoma Church Sydney Altar"
        title="Prayer Request"
        subText="Share your prayer needs with our church community"
      />

      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3">
        <div className="container mx-auto">
          <Breadcrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              navUrl("Prayer Request"),
            ]}
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Request Type</Label>
                    <RadioGroup
                      value={formState.requestType}
                      onValueChange={handleRadioChange}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="personal" id="personal" />
                        <Label htmlFor="personal">Personal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="family" id="family" />
                        <Label htmlFor="family">Family</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friend" id="friend" />
                        <Label htmlFor="friend">Friend</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prayerRequest">Prayer Request</Label>
                    <Textarea
                      id="prayerRequest"
                      name="prayerRequest"
                      value={formState.prayerRequest}
                      onChange={handleChange}
                      placeholder="Please share your prayer request here"
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isUrgent"
                        checked={formState.isUrgent}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("isUrgent", checked as boolean)
                        }
                      />
                      <Label htmlFor="isUrgent">
                        This is an urgent request
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isConfidential"
                        checked={formState.isConfidential}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "isConfidential",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="isConfidential">
                        Keep this request confidential (only clergy will see it)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="shareWithPrayerTeam"
                        checked={formState.shareWithPrayerTeam}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            "shareWithPrayerTeam",
                            checked as boolean
                          )
                        }
                      />
                      <Label htmlFor="shareWithPrayerTeam">
                        Share with the prayer team
                      </Label>
                    </div>
                  </div>

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
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
