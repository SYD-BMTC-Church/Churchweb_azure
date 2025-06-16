"use client";

import { compile, run } from "@mdx-js/mdx";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";

interface MDXRendererProps {
  markdown: string | undefined;
}

export default function MDXRenderer({ markdown }: MDXRendererProps) {
  const [Content, setContent] = useState<React.ComponentType>(() => Fragment);

  useEffect(() => {
    (async () => {
      try {
        if (markdown === undefined) {
          console.warn("No markdown content provided");
          return;
        }
        // Ensure markdown is a string
        if (typeof markdown !== "string") {
          console.error("Markdown content is not a string:", markdown);
          return;
        }
        // Compile the markdown to MDX
        const compiledCode = await compile(markdown, {
          outputFormat: "function-body",
        });
        const mdxModule = await run(String(compiledCode), runtime);
        const MDXContent = mdxModule.default || Fragment;

        setContent(() => (props: any) => (
          <MDXContent
            {...props}
            components={
              {
                // blockquote: ({ children }: { children: React.ReactNode }) => (
                //   <blockquote className="text-lg italic border-l-4 border-accent pl-4 mb-6">
                //     {children}
                //   </blockquote>
                // ),
                // image to NextJS Image component
                // img: ({ src, alt, ...props }: { src: string; alt?: string }) => (
                //   <img
                //     src={src}
                //     alt={alt}
                //     className="rounded-lg shadow-md mb-4"
                //     {...props}
              }
            }
          />
        ));
      } catch (error) {
        console.error("Error compiling MDX:", error);
      }
    })();
  }, [markdown]);

  return <Content />;
}
