import { SpotifyLogin } from "vib/components/SpotifyLogin";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-4">
      <div className="container flex flex-col items-center justify-center">
        <SpotifyLogin />
        </div>
      </main>
  );
}
