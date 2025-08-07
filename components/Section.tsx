import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  title: string;
  children: React.ReactNode;
  titleClassName?: string;
}

export default function Section({
  id,
  className = '',
  title,
  children,
  titleClassName = 'mb-4 text-3xl font-bold tracking-tight',
}: SectionProps) {
  return (
    <section id={id} className={className}>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </section>
  );
}