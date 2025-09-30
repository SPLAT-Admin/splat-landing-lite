import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

interface ButtonProps extends BaseButtonProps {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  onClick?: never;
  type?: never;
  target?: string;
  rel?: string;
}

type ButtonComponentProps = ButtonProps | LinkButtonProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-deep-crimson text-acid-white shadow-crimson ring-2 ring-deep-crimson/60 hover:bg-crimson-hover hover:shadow-crimson-lg hover:scale-105 focus-visible:ring-4 focus-visible:ring-deep-crimson/50 hover-glow transition-all duration-200',
  secondary: 'bg-crimson-primary text-acid-white shadow-crimson ring-2 ring-crimson-primary/60 hover:bg-deep-crimson hover:shadow-crimson-lg hover:scale-105 focus-visible:ring-4 focus-visible:ring-crimson-primary/50 hover-glow transition-all duration-200',
  outline: 'border-2 border-white/20 text-acid-white/80 hover:border-deep-crimson hover:text-acid-white hover:bg-deep-crimson/10 hover:scale-105 focus-visible:ring-4 focus-visible:ring-deep-crimson/50 transition-all duration-200',
  ghost: 'text-acid-white/80 hover:text-acid-white hover:bg-deep-crimson/10 hover:scale-105 focus-visible:ring-4 focus-visible:ring-deep-crimson/50 transition-all duration-200',
  link: 'text-acid-white/80 hover:text-deep-crimson underline-offset-4 hover:underline focus-visible:ring-4 focus-visible:ring-deep-crimson/50 transition-all duration-200',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm font-semibold',
  md: 'px-6 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-lg font-bold',
  xl: 'px-10 py-4 text-lg font-extrabold',
};

const baseStyles = 'inline-flex items-center justify-center rounded-xl font-sans uppercase tracking-[0.35em] transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled = false,
  ...props
}: ButtonComponentProps) {
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    variant !== 'link' && 'hover:scale-[1.03]',
    className
  );

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        className={buttonClasses}
        target={props.target}
        rel={props.rel}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      className={buttonClasses}
      onClick={props.onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Convenience components for common button types
export const PrimaryButton = ({ className, ...props }: Omit<ButtonProps, 'variant'> | Omit<LinkButtonProps, 'variant'>) => (
  <Button variant="primary" className={className} {...props as any} />
);

export const SecondaryButton = ({ className, ...props }: Omit<ButtonProps, 'variant'> | Omit<LinkButtonProps, 'variant'>) => (
  <Button variant="secondary" className={className} {...props as any} />
);

export const OutlineButton = ({ className, ...props }: Omit<ButtonProps, 'variant'> | Omit<LinkButtonProps, 'variant'>) => (
  <Button variant="outline" className={className} {...props as any} />
);

export const GhostButton = ({ className, ...props }: Omit<ButtonProps, 'variant'> | Omit<LinkButtonProps, 'variant'>) => (
  <Button variant="ghost" className={className} {...props as any} />
);

export const LinkButton = ({ className, ...props }: Omit<ButtonProps, 'variant'> | Omit<LinkButtonProps, 'variant'>) => (
  <Button variant="link" className={className} {...props as any} />
);
