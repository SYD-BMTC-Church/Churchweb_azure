"use client";
import { cn } from "@/lib/utils";
import React from "react";

export default function Loading(props: { className?: string }) {
  const { className } = props;
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="relative h-[55px] w-[55px]">
        <svg width="60" height="60" viewBox="0 0 50 50">
          <rect x="10" y="10" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="22" y="10" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.1s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.1s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="34" y="10" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.2s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.2s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="10" y="22" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.30000000000000004s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.30000000000000004s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="22" y="22" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.4s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.4s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="34" y="22" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.5s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.5s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="10" y="34" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.6000000000000001s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.6000000000000001s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="22" y="34" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.7000000000000001s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.7000000000000001s"
              repeatCount="indefinite"
            ></animate>
          </rect>
          <rect x="34" y="34" width="8" height="8" fill="#2B7FFF" opacity="0.2">
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="1.5s"
              begin="0.8s"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="rx"
              values="0;4;0"
              dur="1.5s"
              begin="0.8s"
              repeatCount="indefinite"
            ></animate>
          </rect>
        </svg>
      </div>
    </div>
  );
}
