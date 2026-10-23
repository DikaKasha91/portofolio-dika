"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";

import { getProjects } from "@/lib/projects";
import type { Project } from "@/types/project";

export default function SelectedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();

        const sortedProjects = [...data].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          return b.year - a.year;
        });

        setProjects(sortedProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const featuredProject = projects.find(
    (project) => project.featured
  );

  const secondaryProjects = projects.filter(
    (project) => !project.featured
  );

  const getProjectHref = (project: Project) => {
    if (project.liveUrl) return project.liveUrl;
    if (project.githubUrl) return project.githubUrl;

    return "#";
  };

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-[#101010]
        px-5
        pb-24
        pt-24
        md:px-8
        md:pb-32
        md:pt-32
        lg:px-10
        lg:pb-40
        lg:pt-40
      "
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-50
          [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
          [background-size:80px_80px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/[0.015]
          blur-[140px]
        "
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

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
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mb-14
            grid
            gap-7
            md:mb-20
            md:grid-cols-[1fr_0.7fr]
            md:items-end
          "
        >
          {/* Label + heading */}

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-white/25" />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/35
                "
              >
                Selected Projects
              </span>
            </div>

            <h2
              className="
                mt-7
                text-[clamp(3.8rem,8vw,8rem)]
                font-medium
                leading-[0.85]
                tracking-[-0.07em]
                text-white
              "
            >
              Things I&apos;ve
              <br />
              <span className="text-white/25">
                built.
              </span>
            </h2>
          </div>

          {/* Description */}

          <p
            className="
              max-w-md
              text-sm
              leading-7
              text-white/40
              md:justify-self-end
              md:text-base
              md:leading-8
            "
          >
            A selection of projects across artificial
            intelligence, web development, mobile
            applications, and digital experiences.
          </p>
        </motion.div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex items-center gap-3 text-white/25">
              <Loader2
                size={16}
                className="animate-spin"
              />

              <span className="text-[9px] uppercase tracking-[0.25em]">
                Loading projects...
              </span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-white/[0.08] bg-[#151515]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              No projects available
            </p>
          </div>
        ) : (
          <>
            {/* =====================================================
                FEATURED PROJECT
            ====================================================== */}

            {featuredProject && (
              <motion.article
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/[0.08]
                  bg-[#151515]
                  md:rounded-[2.5rem]
                "
              >
                <div
                  className="
                    grid
                    lg:grid-cols-[1.15fr_0.85fr]
                  "
                >
                  {/* =================================================
                      PROJECT VISUAL
                  ================================================== */}

                  <div
                    className="
                      relative
                      min-h-[340px]
                      overflow-hidden
                      border-b
                      border-white/[0.08]
                      bg-[#111111]
                      lg:min-h-[560px]
                      lg:border-b-0
                      lg:border-r
                    "
                  >
                    {featuredProject.imageUrl ? (
                      <Image
                        src={featuredProject.imageUrl}
                        alt={featuredProject.title}
                        width={1200}
                        height={1040}
                        className="
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-[1.015]
                        "
                      />
                    ) : (
                      <>
                        {/* Decorative grid */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            opacity-60
                            [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
                            [background-size:55px_55px]
                          "
                        />

                        {/* Decorative circles */}

                        <div
                          className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-[420px]
                            w-[420px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-white/[0.04]
                          "
                        />

                        <div
                          className="
                            pointer-events-none
                            absolute
                            left-1/2
                            top-1/2
                            h-[280px]
                            w-[280px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            border
                            border-white/[0.04]
                          "
                        />

                        {/* Browser mockup */}

                        <div
                          className="
                            absolute
                            left-[8%]
                            right-[8%]
                            top-[10%]
                            bottom-[10%]
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/[0.1]
                            bg-[#171717]
                            shadow-[0_30px_80px_rgba(0,0,0,0.35)]
                            transition-transform
                            duration-700
                            group-hover:scale-[1.015]
                          "
                        >
                          {/* Browser header */}

                          <div
                            className="
                              flex
                              h-10
                              items-center
                              gap-1.5
                              border-b
                              border-white/[0.07]
                              px-4
                            "
                          >
                            <span className="h-2 w-2 rounded-full bg-white/15" />
                            <span className="h-2 w-2 rounded-full bg-white/10" />
                            <span className="h-2 w-2 rounded-full bg-white/10" />

                            <div
                              className="
                                ml-4
                                h-5
                                flex-1
                                rounded-md
                                border
                                border-white/[0.05]
                                bg-white/[0.02]
                              "
                            />
                          </div>

                          {/* Dashboard placeholder */}

                          <div className="p-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="h-3 w-24 rounded bg-white/15" />
                                <div className="mt-2 h-2 w-32 rounded bg-white/[0.06]" />
                              </div>

                              <div className="h-7 w-20 rounded-full bg-white/[0.08]" />
                            </div>

                            <div
                              className="
                                mt-6
                                grid
                                grid-cols-3
                                gap-3
                              "
                            >
                              <div className="h-20 rounded-xl border border-white/[0.06] bg-white/[0.02]" />
                              <div className="h-20 rounded-xl border border-white/[0.06] bg-white/[0.02]" />
                              <div className="h-20 rounded-xl border border-white/[0.06] bg-white/[0.02]" />
                            </div>

                            <div className="mt-5 grid grid-cols-[1.4fr_0.6fr] gap-3">
                              <div className="h-36 rounded-xl border border-white/[0.06] bg-white/[0.02]" />
                              <div className="h-36 rounded-xl border border-white/[0.06] bg-white/[0.02]" />
                            </div>

                            <div className="mt-5 space-y-2">
                              <div className="h-8 rounded-lg bg-white/[0.035]" />
                              <div className="h-8 rounded-lg bg-white/[0.025]" />
                              <div className="h-8 rounded-lg bg-white/[0.025]" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Project number */}

                    <div
                      className="
                        absolute
                        bottom-6
                        left-6
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
                          text-white/25
                        "
                      >
                        Project
                      </span>

                      <span
                        className="
                          text-[9px]
                          tracking-[0.2em]
                          text-white/45
                        "
                      >
                        01
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      FEATURED PROJECT INFO
                  ================================================== */}

                  <div
                    className="
                      flex
                      flex-col
                      justify-between
                      p-7
                      md:p-10
                      lg:p-12
                    "
                  >
                    <div>
                      {/* Meta */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span
                          className="
                            text-[9px]
                            uppercase
                            tracking-[0.25em]
                            text-white/30
                          "
                        >
                          {featuredProject.category}
                        </span>

                        <span
                          className="
                            text-[9px]
                            tracking-[0.2em]
                            text-white/25
                          "
                        >
                          {featuredProject.year}
                        </span>
                      </div>

                      {/* Title */}

                      <h3
                        className="
                          mt-10
                          max-w-lg
                          text-[clamp(2.5rem,5vw,5rem)]
                          font-medium
                          leading-[0.9]
                          tracking-[-0.06em]
                          text-white
                        "
                      >
                        {featuredProject.title}
                      </h3>

                      {/* Description */}

                      <p
                        className="
                          mt-7
                          max-w-lg
                          text-sm
                          leading-7
                          text-white/40
                          md:text-base
                          md:leading-8
                        "
                      >
                        {featuredProject.description}
                      </p>

                      {/* Tags */}

                      <div className="mt-8 flex flex-wrap gap-2">
                        {featuredProject.technologies?.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="
                                rounded-full
                                border
                                border-white/[0.08]
                                bg-white/[0.02]
                                px-3
                                py-1.5
                                text-[8px]
                                uppercase
                                tracking-[0.16em]
                                text-white/35
                              "
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Bottom link */}

                    <div
                      className="
                        mt-12
                        flex
                        items-end
                        justify-between
                        gap-5
                      "
                    >
                      <span
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
                          text-white/20
                        "
                      >
                        Featured project
                      </span>

                      <a
                        href={getProjectHref(featuredProject)}
                        target={
                          featuredProject.liveUrl ||
                          featuredProject.githubUrl
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          featuredProject.liveUrl ||
                          featuredProject.githubUrl
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="
                          group/link
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/[0.1]
                          text-white/40
                          transition-all
                          duration-300
                          hover:border-white/25
                          hover:bg-white
                          hover:text-black
                        "
                        aria-label={`View ${featuredProject.title}`}
                      >
                        <ArrowUpRight
                          className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover/link:translate-x-0.5
                            group-hover/link:-translate-y-0.5
                          "
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* =====================================================
                SECONDARY PROJECTS
            ====================================================== */}

            {secondaryProjects.length > 0 && (
              <div
                className="
                  mt-5
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >
                {secondaryProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[2rem]
                      border
                      border-white/[0.08]
                      bg-[#151515]
                      transition-colors
                      duration-500
                      hover:border-white/[0.14]
                    "
                  >
                    {/* Project visual */}

                    <div
                      className="
                        relative
                        aspect-[1.65]
                        overflow-hidden
                        border-b
                        border-white/[0.08]
                        bg-[#111111]
                      "
                    >
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={1200}
                          height={727}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-[1.03]
                          "
                        />
                      ) : (
                        <>
                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              opacity-60
                              [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
                              [background-size:55px_55px]
                            "
                          />

                          <div
                            className="
                              absolute
                              left-1/2
                              top-1/2
                              h-40
                              w-40
                              -translate-x-1/2
                              -translate-y-1/2
                              rounded-full
                              border
                              border-white/[0.06]
                              transition-transform
                              duration-700
                              group-hover:scale-110
                            "
                          />

                          <div
                            className="
                              absolute
                              left-1/2
                              top-1/2
                              h-24
                              w-24
                              -translate-x-1/2
                              -translate-y-1/2
                              rounded-full
                              border
                              border-white/[0.06]
                            "
                          />
                        </>
                      )}

                      {/* Number */}

                      <span
                        className="
                          absolute
                          left-6
                          top-6
                          text-[9px]
                          tracking-[0.2em]
                          text-white/25
                        "
                      >
                        {String(index + 2).padStart(2, "0")}
                      </span>

                      {/* Category */}

                      <span
                        className="
                          absolute
                          bottom-6
                          left-6
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
                          text-white/25
                        "
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Project info */}

                    <div className="p-7 md:p-8">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <span
                            className="
                              text-[9px]
                              tracking-[0.2em]
                              text-white/20
                            "
                          >
                            {project.year}
                          </span>

                          <h3
                            className="
                              mt-3
                              max-w-sm
                              text-2xl
                              font-medium
                              leading-tight
                              tracking-[-0.04em]
                              text-white
                              transition-colors
                              duration-300
                              group-hover:text-white
                            "
                          >
                            {project.title}
                          </h3>
                        </div>

                        <a
                          href={getProjectHref(project)}
                          target={
                            project.liveUrl ||
                            project.githubUrl
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            project.liveUrl ||
                            project.githubUrl
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            text-white/30
                            transition-all
                            duration-300
                            group-hover:border-white/20
                            group-hover:bg-white
                            group-hover:text-black
                          "
                          aria-label={`View ${project.title}`}
                        >
                          <ArrowUpRight
                            className="
                              h-3.5
                              w-3.5
                              transition-transform
                              duration-300
                              group-hover:translate-x-0.5
                              group-hover:-translate-y-0.5
                            "
                          />
                        </a>
                      </div>

                      <p
                        className="
                          mt-5
                          max-w-lg
                          text-xs
                          leading-6
                          text-white/35
                        "
                      >
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies?.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="
                                rounded-full
                                border
                                border-white/[0.07]
                                px-2.5
                                py-1
                                text-[7px]
                                uppercase
                                tracking-[0.15em]
                                text-white/30
                              "
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </>
        )}

        {/* =====================================================
            BOTTOM INFORMATION
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="
            mt-8
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/15
            "
          >
            Selected ideas & experiments
          </span>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/15
            "
          >
            02 — Projects
          </span>
        </motion.div>
      </div>
    </section>
  );
}