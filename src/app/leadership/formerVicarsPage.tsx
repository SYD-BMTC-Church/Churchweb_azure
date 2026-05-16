"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

interface FormerVicar {
  name: string;
  period: string;
  image: string;
  bio?: string;
  contributions?: string[];
}
export default function FormerVicarsPage() {
  const [formerVicars, setFormerVicars] = useState<FormerVicar[]>([]);
  useEffect(() => {
    getFormerVicars();
  }, []);
  const getFormerVicars = async () => {
    try {
      const response = await axios.get("/api/about/former-vicars");
      setFormerVicars(response.data.reverse());
    } catch (error) {
      console.error("Error fetching former vicars:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {formerVicars.map((vicar, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="relative h-72 w-full">
            <Image
              // style={{ objectFit: "contain" }}
              src={vicar.image}
              alt={vicar.name}
              fill
              className="object-cover"
              priority
            />
            {/* <Image
                      src={imageSrc}
                      alt={altText}
                      fill
                      className="object-cover"
                      priority
                    /> */}
          </div>
          <CardHeader>
            <CardTitle>{vicar.name}</CardTitle>
            <CardDescription>{vicar.period}</CardDescription>
          </CardHeader>
          {vicar.contributions && (
            <CardContent>
              <p className="mb-4">{vicar.bio}</p>
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Key Contributions:</strong>
                </p>
                <ul className="list-disc pl-5 mt-2">
                  {vicar.contributions.map((contribution, idx) => (
                    <li key={idx}>{contribution}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
