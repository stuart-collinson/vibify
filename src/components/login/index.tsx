"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Background } from "./Background";
import { Logo } from "./Logo";
import { FeatureGrid } from "./FeatureGrid";
import { LoginButton } from "./LoginButton";
import { Footer } from "./Footer";

export const LoginPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSpotifyLogin = async () => {
    await signIn("spotify", { callbackUrl: "/" });
  };

  return (
    <Background>
      <div
        className={`relative z-10 w-full max-w-md transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <Logo />
        <FeatureGrid />
        <LoginButton onClick={handleSpotifyLogin} />
        <Footer />
      </div>
    </Background>
  );
};
