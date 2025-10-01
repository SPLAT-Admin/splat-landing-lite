import React, { type ElementType, type ReactNode } from "react";
import clsx from "clsx";

type TypographyVariant = "title" | "subtitle" | "body";

type TypographyProps = {
  as?: ElementType;
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
};

const baseClass = "font-sans";

const variantClassMap: Record<TypographyVariant, string> = {
  title: "text-4xl font-bold text-deep-crimson",
  subtitle: "text-xl font-semibold text-deep-crimson",
  body: "text-base text-acid-white",
};

export function Typography({
  as: Tag = "p",
  variant = "body",
  className,
  children,
}: TypographyProps) {
  return <Tag className={clsx(baseClass, variantClassMap[variant], className)}>{children}</Tag>;
}
