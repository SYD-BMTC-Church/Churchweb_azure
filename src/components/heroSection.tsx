import Image from "next/image";
import React from "react";

export interface HeroSectionProps {
  imageSrc: string;
  altText: string;
  title: string;
  subText: string;
  size?: "full" | "compact";
  children?: React.ReactNode;
}
export default function HeroSection({
  imageSrc,
  altText,
  title,
  subText,
  size = "full",
  children,
}: HeroSectionProps) {
  return (
    <section className={`relative w-full ${size === "compact" ? "h-[50vh]" : "h-[65vh]"}`}>
      <div className="absolute inset-0 bg-black/50 z-10" />
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover"
          priority
        />
      ) : null}
      <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p
          className={`text-base md:text-xl max-w-2xl mx-auto ${
            children ? "mb-8" : ""
          }`}
        >
          {subText}
        </p>
        {children}
      </div>
    </section>
  );
}
