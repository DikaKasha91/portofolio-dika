"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import type { Experience } from "@/types/experience";

function ExperienceLogo({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  if (!src) {
    return (
      <div
        className="
          relative
          flex
          h-[68px]
          w-[68px]
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.09]
          bg-[#181818]
          md:h-[72px]
          md:w-[72px]
        "
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">
          Logo
        </span>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        flex
        h-[68px]
        w-[68px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.09]
        bg-[#181818]
        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.015)]
        transition-all
        duration-500
        group-hover:border-white/[0.18]
        group-hover:bg-[#1b1b1b]
        md:h-[72px]
        md:w-[72px]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-2xl
          bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06),transparent_65%)]
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <Image
        src={src}
        alt={alt}
        fill
        sizes="72px"
        className="
          relative
          z-10
          object-contain
          p-2.5
          opacity-70
          grayscale
          transition-all
          duration-500
          group-hover:scale-105
          group-hover:opacity-100
          group-hover:grayscale-0
        "
      />
    </div>
  );
}

function getYear(date: string) {
  if (!date) return "";

  const match = date.match(/\d{4}/);

  return match?.[0] ?? "";
}

function getPeriod(
  startDate: string,
  endDate: string
) {
  const start = startDate.trim();
  const end = endDate.trim();

  if (!start) return end;

  if (!end) {
    return `${start} — PRESENT`;
  }

  return `${start} — ${end}`;
}

export default function ExperiencePreview() {
  const [experiences, setExperiences] = useState<
    Experience[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperiences() {
      try {
        const response = await fetch(
          "/api/experiences"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch experiences"
          );
        }

        const data: Experience[] =
          await response.json();

        setExperiences(data);
      } catch (error) {
        console.error(
          "Failed to load experiences:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        px-5
        py-24
        md:px-8
        md:py-32
        lg:px-10
        lg:py-40
      "
    >
      {/* Background atmosphere */}

      <div
        className="
          pointer-events-none
          absolute
          left-[45%]
          top-[30%]
          h-[550px]
          w-[750px]
          -translate-x-1/2
          rounded-full
          bg-white/[0.018]
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-10%]
          top-[45%]
          h-[400px]
          w-[400px]
          rounded-full
          border
          border-white/[0.025]
        "
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/25" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-white/35
              "
            >
              Experience
            </span>
          </div>

          <h2
            className="
              mt-7
              max-w-5xl
              text-[clamp(3.5rem,7vw,7.5rem)]
              font-medium
              leading-[0.86]
              tracking-[-0.065em]
              text-white
            "
          >
            Experience that
            <br />
            shaped how I{" "}
            <span className="text-white/25">
              build.
            </span>
          </h2>

          <p
            className="
              mt-8
              max-w-2xl
              text-sm
              leading-7
              text-white/45
              md:text-base
              md:leading-8
            "
          >
            From teaching and organizational work to
            technology and human resources, each
            experience has shaped the way I approach
            problems, people, and digital products.
          </p>
        </motion.div>

        {/* Experience card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-16
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
            md:rounded-[2.5rem]
          "
        >
          {/* Grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-20
              [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
              [background-size:70px_70px]
            "
          />

          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-15%]
              top-[15%]
              h-[600px]
              w-[600px]
              rounded-full
              bg-white/[0.018]
              blur-[120px]
            "
          />

          <div className="relative z-10">
            {loading ? (
              <div className="px-6 py-20 text-center">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                  Loading experience...
                </span>
              </div>
            ) : experiences.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                  No experience available
                </span>
              </div>
            ) : (
              experiences.map(
                (experience, index) => {
                  const organization =
                    experience.company ||
                    experience.organization;

                  const parent =
                    experience.company &&
                    experience.organization
                      ? experience.organization
                      : "";

                  const year = getYear(
                    experience.startDate
                  );

                  const period = getPeriod(
                    experience.startDate,
                    experience.endDate
                  );

                  return (
                    <motion.article
                      key={
                        experience.id ??
                        `${experience.position}-${index}`
                      }
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.12,
                      }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.055,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        group
                        relative
                        border-b
                        border-white/[0.07]
                        last:border-b-0
                      "
                    >
                      <div
                        className="
                          grid
                          grid-cols-1
                          lg:grid-cols-[135px_1fr]
                        "
                      >
                        {/* Year */}

                        <div
                          className="
                            border-b
                            border-white/[0.07]
                            px-6
                            py-6
                            lg:border-b-0
                            lg:border-r
                            lg:px-8
                            lg:py-9
                          "
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              lg:flex-col
                              lg:items-start
                              lg:gap-4
                            "
                          >
                            <span
                              className="
                                text-[10px]
                                font-medium
                                tracking-[0.2em]
                                text-white/35
                              "
                            >
                              {year}
                            </span>

                            <span
                              className="
                                h-px
                                w-7
                                bg-white/15
                                lg:w-5
                              "
                            />

                            <span
                              className="
                                text-[7px]
                                uppercase
                                tracking-[0.2em]
                                text-white/20
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        {/* Content */}

                        <div
                          className="
                            relative
                            px-6
                            py-8
                            md:px-8
                            md:py-9
                            lg:px-10
                            lg:py-9
                          "
                        >
                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-r
                              from-white/[0.025]
                              via-transparent
                              to-transparent
                              opacity-0
                              transition-opacity
                              duration-500
                              group-hover:opacity-100
                            "
                          />

                          <div
                            className="
                              relative
                              flex
                              items-start
                              gap-6
                              md:gap-7
                            "
                          >
                            <ExperienceLogo
                              src={
                                experience.logoUrl
                              }
                              alt={`${organization} logo`}
                            />

                            <div className="min-w-0 flex-1">
                              {/* Category + period */}

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-3
                                "
                              >
                                <span
                                  className="
                                    text-[8px]
                                    uppercase
                                    tracking-[0.28em]
                                    text-white/30
                                  "
                                >
                                  {
                                    experience.category
                                  }
                                </span>

                                <span
                                  className="
                                    h-px
                                    w-5
                                    bg-white/10
                                  "
                                />

                                <span
                                  className="
                                    text-[8px]
                                    uppercase
                                    tracking-[0.22em]
                                    text-white/25
                                  "
                                >
                                  {period}
                                </span>
                              </div>

                              {/* Position */}

                              <h3
                                className="
                                  mt-3
                                  max-w-4xl
                                  text-xl
                                  font-medium
                                  leading-[1.15]
                                  tracking-[-0.04em]
                                  text-white
                                  md:text-[1.65rem]
                                "
                              >
                                {
                                  experience.position
                                }
                              </h3>

                              {/* Company */}

                              <div
                                className="
                                  mt-2.5
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-2
                                "
                              >
                                <span
                                  className="
                                    text-xs
                                    font-medium
                                    text-white/55
                                    md:text-sm
                                  "
                                >
                                  {organization}
                                </span>

                                {parent && (
                                  <>
                                    <span className="text-white/15">
                                      •
                                    </span>

                                    <span
                                      className="
                                        text-xs
                                        text-white/28
                                        md:text-sm
                                      "
                                    >
                                      {parent}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Description */}

                              {experience.description && (
                                <p
                                  className="
                                    mt-5
                                    max-w-3xl
                                    text-xs
                                    leading-6
                                    text-white/35
                                    md:mt-6
                                    md:text-sm
                                    md:leading-7
                                  "
                                >
                                  {
                                    experience.description
                                  }
                                </p>
                              )}

                              {/* Tags */}

                              {experience.tags
                                .length >
                                0 && (
                                <div
                                  className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    gap-2
                                  "
                                >
                                  {experience.tags.map(
                                    (tag) => (
                                      <span
                                        key={tag}
                                        className="
                                          rounded-full
                                          border
                                          border-white/[0.08]
                                          bg-white/[0.015]
                                          px-3
                                          py-1.5
                                          text-[7px]
                                          uppercase
                                          tracking-[0.18em]
                                          text-white/30
                                          transition-all
                                          duration-300
                                          group-hover:border-white/[0.13]
                                          group-hover:text-white/45
                                        "
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>

                            <div
                              className="
                                hidden
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/[0.08]
                                text-white/25
                                transition-all
                                duration-500
                                group-hover:border-white/[0.18]
                                group-hover:bg-white/[0.04]
                                group-hover:text-white/75
                                md:flex
                              "
                            >
                              <ArrowUpRight
                                size={15}
                                strokeWidth={1.4}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )
            )}
          </div>

          {/* Footer */}

          <div
            className="
              relative
              flex
              items-center
              justify-between
              gap-5
              border-t
              border-white/[0.07]
              px-6
              py-6
              md:px-8
              lg:px-10
            "
          >
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white/20
              "
            >
              Latest experience
            </span>

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/20
              "
            >
              AUG 2026 — PRESENT
            </span>
          </div>
        </motion.div>

        <div
          className="
            mt-6
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/20
            "
          >
            Experience & growth
          </span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >
            01 — 06
          </span>
        </div>
      </div>
    </section>
  );
}