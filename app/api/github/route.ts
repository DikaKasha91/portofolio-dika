import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/graphql";

const query = `
  query GetContributions($username: String!) {
    user(login: $username) {
      login
      name
      avatarUrl

      contributionsCollection {
        contributionCalendar {
          totalContributions

          months {
            name
            totalWeeks
          }

          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error: "GITHUB_TOKEN is not configured.",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const response = await fetch(GITHUB_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        query,
        variables: {
          username: "DikaKasha91",
        },
      }),

      next: {
        revalidate: 3600,
      },
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      console.error("GitHub GraphQL error:", result.errors);

      return NextResponse.json(
        {
          error: "Failed to fetch GitHub data.",
          details: result.errors,
        },
        {
          status: 500,
        }
      );
    }

    const user = result.data?.user;

    if (!user) {
      return NextResponse.json(
        {
          error: "GitHub user not found.",
        },
        {
          status: 404,
        }
      );
    }

    const calendar =
      user.contributionsCollection.contributionCalendar;

    return NextResponse.json({
      username: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      totalContributions: calendar.totalContributions,
      months: calendar.months,
      weeks: calendar.weeks,
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while fetching GitHub data.",
      },
      {
        status: 500,
      }
    );
  }
}