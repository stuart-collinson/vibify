import type { LucideIcon } from "lucide-react";

export type FeatureCardProps = {
  icon: LucideIcon;
  label: string;
  delay: number;
};

export type LoginButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

export type BackgroundProps = {
  children: React.ReactNode;
};
