// components/Section.tsx
import React from "react";

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
  titleClassName = "mb-6 text-3xl font-extrabold tracking-tight text-crimson-primary",
  subtitle,
  showDivider = true,
  containerClassName = "mx-auto w-full max-w-[1800px] px-6 lg:px-10",
  innerClassName = "",
}: SectionProps) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section id={id} aria-labelledby={titleId} className={`mb-16 ${className}`}>
      <div className={containerClassName}>
        <div className={`mb-4 ${innerClassName}`}>
          <h2 id={titleId} className={titleClassName}>
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-base text-white/80">{subtitle}</p>
          ) : null}
          {showDivider ? <div className="mt-2 h-1 w-16 rounded-full bg-crimson-primary" /> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
