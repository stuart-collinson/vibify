export type DashboardLayoutProps = {
  children: React.ReactNode;
};

export type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
