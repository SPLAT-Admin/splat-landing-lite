import React from 'react';

interface LegalLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function LegalLayout({ children, title }: LegalLayoutProps) {
  return (
    <div className="legal-layout">
      {title && <h1 className="sr-only">{title}</h1>}
      {children}
    </div>
  );
}
