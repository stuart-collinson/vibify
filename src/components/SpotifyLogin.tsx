"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export function SpotifyLogin() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyLogin = async () => {
    setIsLoading(true);
    await signIn("spotify", { callbackUrl: "/" });
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  // Log the access token when user is logged in
  useEffect(() => {
    if (session?.user) {
        console.log("Session user: ", session.user);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-400 border-t-transparent"></div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {session.user.name ?? "Spotify User"}
              </h3>
              <p className="text-sm text-gray-300">
                {session.user.email}
              </p>
            </div>
          </div>
          
          {/* {session.user.accessToken && (
            <div className="mb-4 p-3 bg-black/20 rounded-lg">
              <p className="text-xs text-gray-300 mb-2">Access Token:</p>
              <p className="text-xs text-green-400 font-mono break-all">
                {session.user.accessToken.substring(0, 50)}...
              </p>
            </div>
          )} */}
          
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Signing out...</span>
              </div>
            ) : (
              "Sign Out"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Vibify
          </h1>
          <p className="text-gray-300 text-lg">
            Connect your Spotify account to discover your favorite music
          </p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-white">
              Get Started
            </h2>
            <p className="text-gray-300 text-sm">
              Sign in with your Spotify account to access your music library
            </p>
          </div>

          <button
            onClick={handleSpotifyLogin}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Continue with Spotify</span>
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              By continuing, you agree to our terms of service and privacy policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 