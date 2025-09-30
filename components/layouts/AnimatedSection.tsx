import React from 'react';
import { motion } from 'framer-motion';
import { Headline } from '@/components/ui/Typography';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  title: string;
  children: React.ReactNode;
  titleClassName?: string;
  subtitle?: string;
  showDivider?: boolean;
  containerClassName?: string;
  innerClassName?: string;
  delay?: number;
}

export default function AnimatedSection({
  id,
  className = "",
  title,
  children,
  titleClassName = "",
  subtitle,
  showDivider = true,
  containerClassName = "mx-auto w-full max-w-7xl px-6 lg:px-8",
  innerClassName = "",
  delay = 0,
}: AnimatedSectionProps) {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <motion.section
      id={id}
      aria-labelledby={titleId}
      className={`relative py-16 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-crimson/5 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-jet-black/20 via-transparent to-transparent" />
      <div className={containerClassName}>
        <motion.div 
          className={`mb-8 text-center ${innerClassName}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
        >
          <Headline as="h2" className={titleClassName || "mb-4"} {...(titleId && { id: titleId })}>
            {title}
          </Headline>
          {subtitle && (
            <motion.p 
              className="mt-4 text-lg text-acid-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
          {showDivider && (
            <motion.div 
              className="mt-6 mx-auto h-1 w-20 rounded-full bg-deep-crimson shadow-sm"
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
            />
          )}
        </motion.div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}
