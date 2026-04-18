"use client";

import { Component, type ReactNode } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { isAuthError } from "vib/lib/utils";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught an error:", error);

    if (isAuthError(error)) {
      toast.error("Session expired. Please log in again.");
      void signOut({ callbackUrl: "/" });
      return;
    }

    if (error.message.includes("fetch") || error.message.includes("network")) {
      toast.error("Network error. Please check your connection and try again.");
      return;
    }

    toast.error("Something went wrong. Please try refreshing the page.");
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-white">Oops! Something went wrong</h1>
            <p className="mb-6 text-gray-400">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
