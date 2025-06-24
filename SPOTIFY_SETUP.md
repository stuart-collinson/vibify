# Spotify Authentication Setup

To get your Vibify app working with Spotify, you'll need to set up a few environment variables.

## 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in the app details:
   - App name: "Vibify" (or whatever you prefer)
   - App description: "A music discovery app"
   - Redirect URI: `http://127.0.2.2:3000/api/auth/callback/spotify`
4. Click "Save"

## 2. Get Your Credentials

After creating the app, you'll see:
- **Client ID**: Copy this
- **Client Secret**: Click "Show Client Secret" and copy this

## 3. Set Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Spotify API Credentials
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

# NextAuth Configuration
AUTH_SECRET=your_random_secret_here

# NextAuth URL (for development)
NEXTAUTH_URL=http://127.0.2.2:3000
```

## 4. Generate AUTH_SECRET

You can generate a random secret using:
```bash
openssl rand -base64 32
```

## 5. Run the App

```bash
pnpm dev
```

Visit `http://127.0.2.2:3000` and you should see the beautiful Spotify login page!

## Features

- ✅ Beautiful, responsive login page
- ✅ Spotify OAuth authentication
- ✅ Access token display (first 50 characters)
- ✅ User profile information
- ✅ Sign out functionality
- ✅ Loading states and animations
- ✅ Mobile-friendly design

The app will show your access token in the console and on the page after successful login, which you can use to make Spotify API calls to fetch your favorite songs! 