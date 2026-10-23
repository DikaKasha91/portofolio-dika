"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaSpotify } from "react-icons/fa6";

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  color: string;
  weekday: number;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type ContributionMonth = {
  name: string;
  totalWeeks: number;
};

type GithubData = {
  username: string;
  name: string;
  avatarUrl: string;
  totalContributions: number;
  months: ContributionMonth[];
  weeks: ContributionWeek[];
};

export default function SocialActivity() {
  const [github, setGithub] =
    useState<GithubData | null>(null);

  const [githubLoading, setGithubLoading] =
    useState(true);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const response = await fetch("/api/github");

        if (!response.ok) {
          throw new Error(
            "Failed to fetch GitHub data"
          );
        }

        const data: GithubData =
          await response.json();

        setGithub(data);
      } catch (error) {
        console.error(
          "GitHub fetch error:",
          error
        );
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGithub();
  }, []);

  const activeDays =
    github?.weeks
      .flatMap(
        (week) => week.contributionDays
      )
      .filter(
        (day) => day.contributionCount > 0
      ).length ?? 0;

  const activeWeeks =
    github?.weeks.filter((week) =>
      week.contributionDays.some(
        (day) => day.contributionCount > 0
      )
    ).length ?? 0;

  return (
    <section
      className="
        px-4
        py-24
        md:px-6
        md:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ========================================= */}
        {/* SECTION HEADER */}
        {/* ========================================= */}

        <div className="mb-12 max-w-2xl">
          <p
            className="
              mb-4
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-white/35
            "
          >
            GitHub & Spotify
          </p>

          <h2
            className="
              text-4xl
              font-medium
              tracking-[-0.04em]
              text-white
              md:text-6xl
            "
          >
            What I&apos;m building.
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-white/45
              md:text-base
            "
          >
            A glimpse into my coding activity
            and what I&apos;m listening to while
            building things.
          </p>
        </div>

        {/* ========================================= */}
        {/* CARDS */}
        {/* ========================================= */}

        <div
          className="
            grid
            items-start
            gap-5
            lg:grid-cols-[1.35fr_0.65fr]
          "
        >

          {/* ======================================= */}
          {/* GITHUB CARD */}
          {/* ======================================= */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-[#151515]
              p-6
              md:p-8
            "
          >

            {/* Decorative Grid */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-40
                [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
                [background-size:32px_32px]
              "
            />

            <div className="relative z-10">

              {/* ================================= */}
              {/* GITHUB HEADER */}
              {/* ================================= */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >

                <div>
                  <div
                    className="
                      mb-4
                      flex
                      items-center
                      gap-3
                    "
                  >

                    {/* GitHub Icon */}

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.04]
                      "
                    >
                      <FaGithub
                        className="
                          text-lg
                          text-white/70
                          transition-colors
                          duration-300
                          group-hover:text-white
                        "
                      />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-medium
                          text-white
                        "
                      >
                        GitHub Activity
                      </p>

                      <p
                        className="
                          text-xs
                          text-white/35
                        "
                      >
                        @{github?.username ??
                          "DikaKasha91"}
                      </p>
                    </div>

                  </div>
                </div>

                {/* GitHub Link */}

                <a
                  href="https://github.com/DikaKasha91"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/50
                    transition-all
                    duration-300
                    hover:border-white/25
                    hover:bg-white/[0.06]
                    hover:text-white
                  "
                >
                  <ArrowUpRight size={16} />
                </a>

              </div>

              {/* ================================= */}
              {/* CONTRIBUTION COUNT */}
              {/* ================================= */}

              <div className="mt-7">

                {githubLoading ? (
                  <>
                    <div
                      className="
                        h-9
                        w-56
                        animate-pulse
                        rounded-lg
                        bg-white/[0.06]
                      "
                    />

                    <div
                      className="
                        mt-2
                        h-4
                        w-28
                        animate-pulse
                        rounded
                        bg-white/[0.04]
                      "
                    />
                  </>
                ) : github ? (
                  <>
                    <p
                      className="
                        text-3xl
                        font-medium
                        tracking-[-0.03em]
                        text-white
                      "
                    >
                      {github.totalContributions.toLocaleString()}{" "}
                      {github.totalContributions === 1
                        ? "contribution"
                        : "contributions"}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-white/35
                      "
                    >
                      in the last year
                    </p>
                  </>
                ) : (
                  <p
                    className="
                      text-sm
                      text-white/40
                    "
                  >
                    Unable to load GitHub
                    activity.
                  </p>
                )}

              </div>

              {/* ================================= */}
              {/* CONTRIBUTION GRAPH */}
              {/* ================================= */}

              <div className="mt-7 overflow-hidden">

                {githubLoading ? (
                  <div
                    className="
                      h-32
                      animate-pulse
                      rounded-xl
                      bg-white/[0.025]
                    "
                  />
                ) : github ? (
                  <>

                    {/* MONTH LABELS */}

                    <div
                      className="
                        mb-3
                        flex
                        justify-between
                        pl-8
                        text-[10px]
                        text-white/25
                      "
                    >
                      {github.months.map(
                        (month, index) => (
                          <span
                            key={`${month.name}-${index}`}
                          >
                            {month.name.slice(
                              0,
                              3
                            )}
                          </span>
                        )
                      )}
                    </div>

                    <div
                      className="
                        flex
                        gap-[3px]
                      "
                    >

                      {/* WEEKDAY LABELS */}

                      <div
                        className="
                          flex
                          w-5
                          shrink-0
                          flex-col
                          justify-between
                          py-[1px]
                          text-[9px]
                          text-white/20
                        "
                      >
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* REAL CONTRIBUTION GRAPH */}

                      <div
                        className="
                          grid
                          flex-1
                          grid-flow-col
                          grid-rows-7
                          gap-[3px]
                        "
                      >
                        {github.weeks.flatMap(
                          (
                            week,
                            weekIndex
                          ) =>
                            week.contributionDays.map(
                              (
                                day,
                                dayIndex
                              ) => {

                                let backgroundColor =
                                  "#1b1b1b";

                                if (
                                  day.contributionLevel ===
                                  "FIRST_QUARTILE"
                                ) {
                                  backgroundColor =
                                    "#0e4429";
                                }

                                if (
                                  day.contributionLevel ===
                                  "SECOND_QUARTILE"
                                ) {
                                  backgroundColor =
                                    "#006d32";
                                }

                                if (
                                  day.contributionLevel ===
                                  "THIRD_QUARTILE"
                                ) {
                                  backgroundColor =
                                    "#26a641";
                                }

                                if (
                                  day.contributionLevel ===
                                  "FOURTH_QUARTILE"
                                ) {
                                  backgroundColor =
                                    "#39d353";
                                }

                                return (
                                  <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    title={`${day.contributionCount} ${
                                      day.contributionCount ===
                                      1
                                        ? "contribution"
                                        : "contributions"
                                    } on ${day.date}`}
                                    className="
                                      aspect-square
                                      w-full
                                      max-w-[14px]
                                      rounded-[2px]
                                      transition-transform
                                      duration-200
                                      hover:scale-125
                                    "
                                    style={{
                                      backgroundColor,
                                    }}
                                  />
                                );
                              }
                            )
                        )}
                      </div>

                    </div>

                    {/* LEGEND */}

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-end
                        gap-2
                        text-[10px]
                        text-white/30
                      "
                    >
                      <span>Less</span>

                      <div
                        className="
                          flex
                          gap-[3px]
                        "
                      >
                        {[
                          "#1b1b1b",
                          "#0e4429",
                          "#006d32",
                          "#26a641",
                          "#39d353",
                        ].map((color) => (
                          <span
                            key={color}
                            className="
                              h-3
                              w-3
                              rounded-[2px]
                            "
                            style={{
                              backgroundColor:
                                color,
                            }}
                          />
                        ))}
                      </div>

                      <span>More</span>
                    </div>

                  </>
                ) : null}

              </div>

              {/* ================================= */}
              {/* GITHUB SNAPSHOT */}
              {/* ================================= */}

              {!githubLoading && github && (
                <div
                  className="
                    mt-7
                    grid
                    grid-cols-3
                    gap-3
                  "
                >

                  {/* Contributions */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      p-4
                      transition-colors
                      duration-300
                      hover:border-white/[0.12]
                      hover:bg-white/[0.035]
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.14em]
                        text-white/25
                      "
                    >
                      Contributions
                    </p>

                    <p
                      className="
                        mt-2
                        text-lg
                        font-medium
                        tracking-[-0.02em]
                        text-white
                      "
                    >
                      {github.totalContributions.toLocaleString()}
                    </p>
                  </div>

                  {/* Active Days */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      p-4
                      transition-colors
                      duration-300
                      hover:border-white/[0.12]
                      hover:bg-white/[0.035]
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.14em]
                        text-white/25
                      "
                    >
                      Active Days
                    </p>

                    <p
                      className="
                        mt-2
                        text-lg
                        font-medium
                        tracking-[-0.02em]
                        text-white
                      "
                    >
                      {activeDays}
                    </p>
                  </div>

                  {/* Active Weeks */}

                  <div
                    className="
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      p-4
                      transition-colors
                      duration-300
                      hover:border-white/[0.12]
                      hover:bg-white/[0.035]
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.14em]
                        text-white/25
                      "
                    >
                      Active Weeks
                    </p>

                    <p
                      className="
                        mt-2
                        text-lg
                        font-medium
                        tracking-[-0.02em]
                        text-white
                      "
                    >
                      {activeWeeks}
                    </p>
                  </div>

                </div>
              )}

              {/* ================================= */}
              {/* GITHUB FOOTNOTE */}
              {/* ================================= */}

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.06]
                  pt-5
                "
              >
                <p
                  className="
                    text-xs
                    text-white/30
                  "
                >
                  Building consistently,
                  one commit at a time.
                </p>

                <FaGithub
                  className="
                    text-white/20
                    transition-colors
                    duration-300
                    group-hover:text-white/50
                  "
                />
              </div>

            </div>
          </div>

          {/* ======================================= */}
          {/* SPOTIFY CARD */}
          {/* ======================================= */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-[#151515]
              p-6
              md:p-8
            "
          >

            {/* Spotify Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-60
                w-60
                rounded-full
                bg-[#1DB954]/[0.06]
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                flex
                h-full
                flex-col
              "
            >

              {/* ================================= */}
              {/* SPOTIFY HEADER */}
              {/* ================================= */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#1DB954]/20
                      bg-[#1DB954]/[0.08]
                    "
                  >
                    <FaSpotify
                      className="
                        text-lg
                        text-[#1DB954]
                      "
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      Spotify Picks
                    </p>

                    <p
                      className="
                        text-xs
                        text-white/35
                      "
                    >
                      What I listen to
                    </p>
                  </div>

                </div>

                <a
                  href="https://open.spotify.com/playlist/5YwahFRf9FkDHmfl5z9Ljy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Spotify playlist"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/50
                    transition-all
                    duration-300
                    hover:border-[#1DB954]/40
                    hover:bg-[#1DB954]
                    hover:text-black
                  "
                >
                  <ArrowUpRight size={16} />
                </a>

              </div>

              {/* ================================= */}
              {/* SPOTIFY PLAYLIST EMBED */}
              {/* ================================= */}

              <div
                className="
                  mt-8
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#121212]
                "
              >
                <iframe
                  src="https://open.spotify.com/embed/playlist/5YwahFRf9FkDHmfl5z9Ljy?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Dika Rafi Spotify Playlist"
                  className="
                    block
                    w-full
                  "
                />
              </div>

              {/* ================================= */}
              {/* PLAYLIST DESCRIPTION */}
              {/* ================================= */}

              <div className="mt-7">

                <p
                  className="
                    text-xl
                    font-medium
                    tracking-[-0.02em]
                    text-white
                  "
                >
                  Indos
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-white/40
                  "
                >
                  A collection of songs I
                  enjoy while building,
                  designing, and working on
                  new ideas.
                </p>

              </div>

              {/* ================================= */}
              {/* SPOTIFY FOOTNOTE */}
              {/* ================================= */}

              <div
                className="
                  mt-auto
                  pt-8
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.06]
                    pt-5
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.15em]
                        text-white/25
                      "
                    >
                      Spotify playlist
                    </p>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-white/60
                      "
                    >
                      Muhammad Dika Rafi Kasha
                    </p>

                  </div>

                  <FaSpotify
                    className="
                      text-white/20
                      transition-colors
                      duration-300
                      group-hover:text-[#1DB954]
                    "
                  />

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}