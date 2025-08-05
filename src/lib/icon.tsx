"use client";
import React from "react";
import * as Icons from "lucide-react";
export default function LucidIcon({
  name,
  ...rest
}: {
  name: string;
  className?: string;
}) {
  const IconComponent = Icons[name as keyof typeof Icons];
  if (
    typeof IconComponent === "function" ||
    (typeof IconComponent === "object" &&
      IconComponent !== null &&
      "render" in IconComponent)
  ) {
    const Component = IconComponent as React.ComponentType<any>;
    return <Component {...rest} />;
  }
  return null;
}
