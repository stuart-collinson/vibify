"use client";

import { Component, type ReactNode } from "react";
import { signOut } from "next-auth/react";
import { RefreshCw } from "lucide-react";
import { Button } from "vib/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: { componentStack: string }) {
    // Check if it's a token expiration error (401 Unauthorized)
    if (
      error.message.includes("401") ||
      error.message.includes("UNAUTHORIZED") ||
      error.message.includes("token") ||
      error.message.includes("expired")
    ) {
      // Log out the user for token expiration
      void signOut({ callbackUrl: "/" });
      return;
    }
  }

  render() {
    if (this.state.hasError) {
      // For non-token errors, show a loading state instead of crashing
      return (
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-center">
            <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-emerald-400" />
            <h2 className="mb-2 text-xl font-semibold text-white">
              Loading your music data...
            </h2>
            <p className="mb-6 text-gray-400">
              Please wait while we fetch your latest listening data
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-emerald-500 text-black hover:bg-emerald-600"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
