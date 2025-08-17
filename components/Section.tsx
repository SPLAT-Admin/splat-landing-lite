import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  title: string;
  children: React.ReactNode;
  titleClassName?: string;
}

export default function Section({
  id,
  className = "",
  title,
  children,
  titleClassName = "mb-6 text-3xl font-extrabold tracking-tight text-crimson-primary",
}: SectionProps) {
  return (
    <section id={id} className={`mb-16 ${className}`}>
      <div className="mb-4">
        <h2 className={titleClassName}>{title}</h2>
        <div className="h-1 w-16 rounded-full bg-crimson-primary" />
      </div>
      {children}
    </section>
  );
}
