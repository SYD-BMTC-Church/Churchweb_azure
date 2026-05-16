"use client";
import { compile, run } from "@mdx-js/mdx";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import LucidIcon from "./icon";
import Image from "next/image";

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
          console.error("Markdown content is not a string");
          return;
        }
        // Compile the markdown to MDX
        const compiledCode = await compile(HTMLTOJSX(markdown), {
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
                img: ({ src, alt }: { src: string; alt: string }) => (
                  <Image src={src} alt={alt} fill className="object-cover" />
                ),
                a: ({
                  children,
                  href,
                }: {
                  children: React.ReactNode;
                  href: string;
                }) => {
                  return (
                    <a
                      href={href}
                      className="text-primary underline hover:text-primary/80 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
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

function HTMLTOJSX(input: string) {
  if (!input) return "";

  let html = input.toString();

  // Convert class → className, for → htmlFor
  html = html.replace(/\bclass=/g, "className=");
  html = html.replace(/\bfor=/g, "htmlFor=");

  // Convert kebab-case to camelCase, but ignore aria-* and data-*
  html = html.replace(/(\s)([a-zA-Z0-9\-]+)=/g, function (_, space, attr) {
    if (attr.startsWith("aria-") || attr.startsWith("data-")) {
      return space + attr + "=";
    }
    const camelAttr = attr.replace(/-([a-z])/g, (_: string, char: string) =>
      char.toUpperCase(),
    );
    return space + camelAttr + "=";
  });

  // Self-close void elements (if not already self-closed)
  const selfClosingTags = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "source",
    "track",
    "wbr",
  ];
  selfClosingTags.forEach((tag) => {
    const regex = new RegExp(`<${tag}([^>/]*)>(?!</${tag}>)`, "gi");
    html = html.replace(regex, `<${tag}$1 />`);
  });

  return html;
}
