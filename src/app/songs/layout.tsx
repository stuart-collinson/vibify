"use client";

import DashboardLayout from "vib/components/layouts/DashboardLayout";
import type { DashboardLayoutProps } from "vib/types/dashboard";

export default function SongsLayout({ children }: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 