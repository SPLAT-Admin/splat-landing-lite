import React from 'react';
import { cn } from '@/lib/utils';

type TypographyVariant = 
  | 'hero'
  | 'display' 
  | 'headline'
  | 'title'
  | 'subtitle'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption';

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface TypographyProps {
  variant: TypographyVariant;
  as?: TypographyElement;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-hero font-extrabold tracking-tight text-deep-crimson',
  display: 'text-3xl sm:text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-deep-crimson',
  headline: 'text-2xl sm:text-3xl md:text-4xl lg:text-headline font-bold tracking-tight text-deep-crimson',
  title: 'text-xl sm:text-2xl md:text-3xl lg:text-title font-semibold tracking-tight text-acid-white',
  subtitle: 'text-lg sm:text-xl md:text-2xl lg:text-subtitle font-semibold text-acid-white',
  'body-lg': 'text-base sm:text-lg md:text-xl lg:text-body-lg text-acid-white/90',
  body: 'text-sm sm:text-base md:text-lg lg:text-body text-acid-white/90',
  'body-sm': 'text-xs sm:text-sm md:text-base lg:text-body-sm text-acid-white/80',
  caption: 'text-xs sm:text-sm lg:text-caption text-acid-white/70',
};

const defaultElements: Record<TypographyVariant, TypographyElement> = {
  hero: 'h1',
  display: 'h1',
  headline: 'h2',
  title: 'h3',
  subtitle: 'h4',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
};

export default function Typography({ 
  variant, 
  as, 
  className, 
  children, 
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const Component = as || defaultElements[variant];
  
  return React.createElement(
    Component,
    {
      className: cn(variantStyles[variant], className),
      ...props,
    },
    children
  );
}

// Convenience components for common use cases
export const Hero = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="hero" className={className} {...props} />
);

export const Display = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="display" className={className} {...props} />
);

export const Headline = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="headline" className={className} {...props} />
);

export const Title = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="title" className={className} {...props} />
);

export const Subtitle = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="subtitle" className={className} {...props} />
);

export const BodyLarge = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="body-lg" className={className} {...props} />
);

export const Body = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="body" className={className} {...props} />
);

export const BodySmall = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="body-sm" className={className} {...props} />
);

export const Caption = ({ className, ...props }: Omit<TypographyProps, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography variant="caption" className={className} {...props} />
);
