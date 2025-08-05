import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function htmlDecode(input: string) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export function toPascalCase(str: string) {
  return str
    .toLowerCase()
    .replace(/(?:^|[^a-zA-Z0-9]+)(\w)/g, (_, c) => c.toUpperCase());
}
