import React from 'react';
import LandingAdminLayout from '@/components/layouts/LandingAdminLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <LandingAdminLayout>{children}</LandingAdminLayout>;
}
