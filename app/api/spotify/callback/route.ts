import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      {
        error: "Spotify environment variables are not configured.",
      },
      {
        status: 500,
      }
    );
  }

  const searchParams = request.nextUrl.searchParams;

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      {
        error: `Spotify authorization failed: ${error}`,
      },
      {
        status: 400,
      }
    );
  }

  if (!code || !state) {
    return NextResponse.json(
      {
        error: "Missing authorization code or state.",
      },
      {
        status: 400,
      }
    );
  }

  const storedState = request.cookies.get("spotify_auth_state")?.value;

  if (!storedState || storedState !== state) {
    return NextResponse.json(
      {
        error: "Invalid state parameter.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const credentials = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Spotify token error:", data);

      return NextResponse.json(
        {
          error: "Failed to exchange Spotify authorization code.",
          details: data,
        },
        {
          status: 500,
        }
      );
    }

    const responseRedirect = NextResponse.redirect(
      new URL("/", request.url)
    );

    responseRedirect.cookies.set(
      "spotify_refresh_token",
      data.refresh_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      }
    );

    responseRedirect.cookies.set(
      "spotify_auth_state",
      "",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      }
    );

    return responseRedirect;
  } catch (error) {
    console.error("Spotify callback error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong during Spotify authentication.",
      },
      {
        status: 500,
      }
    );
  }
}