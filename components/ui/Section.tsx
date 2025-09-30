// components/Section.tsx
import React from "react";
import { Headline } from "./Typography";

interface SectionProps {
  id?: string;
  className?: string;            // extra classes for outer <section>
  title: string;
  children: React.ReactNode;
  titleClassName?: string;       // customize <h2>
  subtitle?: string;             // optional subheading under title
  showDivider?: boolean;         // show the crimson divider bar
  containerClassName?: string;   // width + horizontal padding container (aligns with Header)
  innerClassName?: string;       // wrap for the title/subtitle block
}

export default function Section({
  id,
  className = "",
  title,
  children,
  titleClassName = "",
  subtitle,
  showDivider = true,
  containerClassName = "mx-auto w-full max-w-7xl px-6 lg:px-8",
  innerClassName = "",
}: SectionProps) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section id={id} aria-labelledby={titleId} className={`py-16 ${className}`}>
      <div className={containerClassName}>
        <div className={`mb-8 text-center ${innerClassName}`}>
          <Headline as="h2" className={titleClassName || "mb-4"} {...(titleId && { id: titleId })}>
            {title}
          </Headline>
          {subtitle ? (
            <p className="mt-4 text-lg text-acid-white/80 max-w-3xl mx-auto">{subtitle}</p>
          ) : null}
          {showDivider ? (
            <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-deep-crimson shadow-sm" />
          ) : null}
        </div>
        <div className="text-center">
          {children}
        </div>
      </div>
    </section>
  );
}
