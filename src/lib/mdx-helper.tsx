"use client";
import { compile, run } from "@mdx-js/mdx";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import LucidIcon from "./icon";

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
        console.log("Compiling MDX content...", markdown);
        // Compile the markdown to MDX
        const compiledCode = await compile(markdown, {
          outputFormat: "function-body",
        });
        const mdxModule = await run(String(compiledCode), runtime);
        const MDXContent = mdxModule.default || Fragment;

        setContent(() => {
          const AnonymousMDXComponent = (props: any) => (
            <MDXContent
              {...props}
              components={{
                h2: ({ children }: { children: React.ReactNode }) => (
                  <h2 className="text-3xl font-bold text-primary">
                    {children}
                  </h2>
                ),
                h3: ({ children }: { children: React.ReactNode }) => (
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {children}
                  </h3>
                ),
                h4: ({ children }: { children: React.ReactNode }) => (
                  <h4 className="text-2xl font-bold mb-4">{children}</h4>
                ),
                h5: ({ children }: { children: React.ReactNode }) => (
                  <h5 className="text-xl font-bold mb-4">{children}</h5>
                ),
                p: ({ children }: { children: React.ReactNode }) => (
                  <p className="mb-8">{children}</p>
                ),
                blockquote: ({ children }: { children: React.ReactNode }) => (
                  <blockquote className="text-lg italic border-l-4 border-accent pl-4 mb-6">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }: { children: React.ReactNode }) => (
                  <ul className="list-disc pl-5 space-y-2 mb-6">{children}</ul>
                ),
                Icon(props: any) {
                  return <LucidIcon {...props} />;
                },
              }}
            />
          );
          AnonymousMDXComponent.displayName = "AnonymousMDXComponent";
          return AnonymousMDXComponent;
        });
      } catch (error) {
        console.error("Error compiling MDX:", error);
      }
    })();
  }, [markdown]);

  return <Content />;
}
