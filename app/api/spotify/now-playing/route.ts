import { NextRequest, NextResponse } from "next/server";

type SpotifyArtist = {
  name: string;
};

type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: {
    name: string;
    images: SpotifyImage[];
  };
  external_urls?: {
    spotify?: string;
  };
};

type SpotifyPlayback = {
  is_playing: boolean;
  item?: SpotifyTrack | null;
};

type SpotifyApiError = {
  error?: {
    message?: string;
  };
  error_description?: string;
};

type SpotifyPlaybackResponse =
  SpotifyPlayback & SpotifyApiError;

type SpotifyRecentlyPlayed = {
  items?: Array<{
    track: SpotifyTrack;
    played_at?: string;
  }>;
} & SpotifyApiError;

async function getAccessToken(refreshToken: string) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify client credentials are not configured."
    );
  }

  const credentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "Spotify token refresh failed:",
      {
        status: response.status,
        data,
      }
    );

    throw new Error(
      `Spotify token refresh failed (${response.status}): ${
        data?.error_description ||
        data?.error ||
        "Unknown error"
      }`
    );
  }

  return data as {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  };
}

async function getCurrentlyPlaying(
  accessToken: string
) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  let data: SpotifyPlaybackResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    console.error(
      "Spotify playback returned invalid JSON:",
      text
    );
  }

  if (!response.ok) {
    console.error(
      "Spotify currently playing failed:",
      {
        status: response.status,
        data,
        raw: text,
      }
    );

    throw new Error(
      `Spotify currently playing failed (${response.status}): ${
        data?.error?.message ||
        text ||
        "Unknown error"
      }`
    );
  }

  return data;
}

async function getRecentlyPlayed(
  accessToken: string
) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  const text = await response.text();

  let data: SpotifyRecentlyPlayed | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    console.error(
      "Spotify recently played returned invalid JSON:",
      text
    );
  }

  if (!response.ok) {
    console.error(
      "Spotify recently played failed:",
      {
        status: response.status,
        data,
        raw: text,
      }
    );

    throw new Error(
      `Spotify recently played failed (${response.status}): ${
        data?.error?.message ||
        data?.error_description ||
        text ||
        "Unknown error"
      }`
    );
  }

  return data?.items?.[0] ?? null;
}

function formatTrack(track: SpotifyTrack) {
  return {
    title: track.name,

    artist: track.artists
      .map((artist) => artist.name)
      .join(", "),

    album: track.album.name,

    image:
      track.album.images?.[0]?.url ?? null,

    spotifyUrl:
      track.external_urls?.spotify ?? null,
  };
}

export async function GET(
  request: NextRequest
) {
  const refreshToken = request.cookies.get(
    "spotify_refresh_token"
  )?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        authenticated: false,
        error:
          "Spotify refresh token is missing. Please login again.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    /*
     * STEP 1
     * Get a fresh access token using
     * the refresh token stored in the HTTP-only cookie.
     */

    const tokenData =
      await getAccessToken(refreshToken);

    /*
     * STEP 2
     * Check whether Spotify is currently
     * playing something.
     */

    const playback =
      await getCurrentlyPlaying(
        tokenData.access_token
      );

    /*
     * STEP 3
     * If something is currently playing,
     * return it immediately.
     */

    if (playback?.item) {
      const response = NextResponse.json({
        authenticated: true,
        isPlaying: playback.is_playing,
        source: "currently_playing",

        track: formatTrack(
          playback.item
        ),
      });

      /*
       * Spotify may occasionally return
       * a new refresh token.
       */

      if (tokenData.refresh_token) {
        response.cookies.set(
          "spotify_refresh_token",
          tokenData.refresh_token,
          {
            httpOnly: true,
            secure:
              process.env.NODE_ENV ===
              "production",
            sameSite: "lax",
            maxAge:
              60 * 60 * 24 * 30,
            path: "/",
          }
        );
      }

      return response;
    }

    /*
     * STEP 4
     * Nothing is currently playing.
     *
     * Use the most recently played track
     * as fallback.
     */

    const recent =
      await getRecentlyPlayed(
        tokenData.access_token
      );

    if (recent?.track) {
      const response =
        NextResponse.json({
          authenticated: true,
          isPlaying: false,
          source: "recently_played",

          playedAt:
            recent.played_at ?? null,

          track: formatTrack(
            recent.track
          ),
        });

      if (tokenData.refresh_token) {
        response.cookies.set(
          "spotify_refresh_token",
          tokenData.refresh_token,
          {
            httpOnly: true,
            secure:
              process.env.NODE_ENV ===
              "production",
            sameSite: "lax",
            maxAge:
              60 * 60 * 24 * 30,
            path: "/",
          }
        );
      }

      return response;
    }

    /*
     * STEP 5
     * No currently playing song
     * and no recently played song.
     */

    const response = NextResponse.json({
      authenticated: true,
      isPlaying: false,
      source: null,
      track: null,
    });

    if (tokenData.refresh_token) {
      response.cookies.set(
        "spotify_refresh_token",
        tokenData.refresh_token,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            "production",
          sameSite: "lax",
          maxAge:
            60 * 60 * 24 * 30,
          path: "/",
        }
      );
    }

    return response;
  } catch (error) {
    console.error(
      "================================"
    );

    console.error(
      "SPOTIFY NOW PLAYING ERROR"
    );

    console.error(
      error
    );

    console.error(
      "================================"
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        authenticated: false,

        error:
          "Unable to retrieve Spotify activity.",

        debug:
          errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}