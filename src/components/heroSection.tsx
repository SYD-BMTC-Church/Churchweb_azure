import Image from "next/image";
import React from "react";

export default function HeroSection({
  imageSrc,
  altText,
  title,
  subText,
  children,
}: {
  imageSrc: string;
  altText: string;
  title: string;
  subText: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative h-[70vh] w-full">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        src={imageSrc}
        alt={altText}
        fill
        className="object-cover"
        priority
      />
      <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
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
