# Vibify 🤝 Spotify

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How do I use this?

If you want to fork this repo and start running it locally you'll need to do something to get yourself up and running:

### Setup

Create a `.env.local`

You'll need to create an application of the Spotify developer dashboard https://developer.spotify.com/ and add the client secret and ID you're given into your `.env.local` which should look something like this:

```
AUTH_SECRET=ABCDEF
SPOTIFY_CLIENT_ID=XXX
SPOTIFY_CLIENT_SECRET=YYY
NEXTAUTH_URL=X_ngrokUrl_X (we'll come back to this)
```

Since 2023, Spotify have prevented the use of 'localhost' in their Redirect URI whitelisting. As a result of both this and the combination of NextAuth's persistance to inherit 'localhost' over '127.0.0.1' which caused me hours of pain - you have to use an alternative. I'd recommend tunneling your local dev via 'ngrok'.

### Installation

- Create an account on ngroks website, this is needed to get your access token.

`brew install ngrok`

Once you have installed it and got your access token you'll need to run:

`ngrok config add-authtoken <your-auth-token>`

### Usage

Once this has been done you'll want to start a local ngrok tunnel:

`ngrok http 3000`

This will output a URL for you that you'll want to put into you `.env.local` as the value of the `NEXTAUTH_URL` key. Similtanously, you'll also need to add this into the Spotify developer dashboard as a whitelisted Redirect URI (sadly you'll have to update your .env.local and Spotify Redirect URI on their dashboard each time you start a new ngrok terminal which isn't ideal but it's all I could get to work) here is an example of one of my expired redirects:

https://6d0e-2a09-bac1-800-54b0-00-55-59.ngrok-free.app/api/auth/callback/spotify

^ Yes you'll need to keep those suffix dirs due to how I've setup the Next.js routing.

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
