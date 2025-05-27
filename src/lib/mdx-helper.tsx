"use client";

import { compile, run } from "@mdx-js/mdx";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";

interface MDXRendererProps {
  markdown: string;
}

export default function MDXRenderer({ markdown }: MDXRendererProps) {
  const [Content, setContent] = useState<React.ComponentType>(() => Fragment);

  useEffect(() => {
    (async () => {
      try {
        const compiledCode = await compile(markdown, {
          outputFormat: "function-body",
        });
        const mdxModule = await run(String(compiledCode), runtime);
        const MDXContent = mdxModule.default || Fragment;

        setContent(() => (props: any) => (
          <MDXContent
            {...props}
            components={{
              blockquote: ({ children }: { children: React.ReactNode }) => (
                <blockquote className="text-lg italic border-l-4 border-accent pl-4 mb-6">
                  {children}
                </blockquote>
              ),
            }}
          />
        ));
      } catch (error) {
        console.error("Error compiling MDX:", error);
      }
    })();
  }, [markdown]);

  return <Content />;
}
