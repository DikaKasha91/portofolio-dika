"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ProjectGrid from "@/components/ProjectGrid";
import type { Project } from "@/types/project";

type ProjectsPageProps = {
  projects: Project[];
};

export default function ProjectsPage({
  projects,
}: ProjectsPageProps) {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-4 pb-20 pt-32 md:px-6 md:pb-28 md:pt-40">
        <div
          className="
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
          "
        >
          <div className="relative px-6 py-20 md:px-12 md:py-28">
            {/* Decorative Grid */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-40
                [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
                [background-size:48px_48px]
              "
            />

            {/* Decorative Circles */}
            <div
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-[420px]
                w-[420px]
                rounded-full
                border
                border-white/[0.05]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-16
                -top-16
                h-[260px]
                w-[260px]
                rounded-full
                border
                border-white/[0.04]
              "
            />

            <div className="relative z-10">
              {/* LABEL */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-white/25" />

                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                  01 — Selected Work
                </span>
              </motion.div>

              {/* HEADING */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="
                  mt-10
                  max-w-5xl
                  text-6xl
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  md:text-8xl
                "
              >
                Things I&apos;ve
                <br />
                <span className="text-white/20">
                  built with purpose.
                </span>
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="
                  mt-10
                  flex
                  flex-col
                  justify-between
                  gap-8
                  md:flex-row
                  md:items-end
                "
              >
                <p className="max-w-xl text-sm leading-7 text-white/40 md:text-base">
                  A collection of projects exploring artificial
                  intelligence, software development, computer vision,
                  and thoughtful digital experiences.
                </p>

                <a
                  href="#projects"
                  className="
                    flex
                    w-fit
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-white/10
                    px-5
                    py-3
                    text-xs
                    text-white/60
                    transition-all
                    duration-300
                    hover:border-white/25
                    hover:bg-white
                    hover:text-black
                  "
                >
                  Explore work
                  <ArrowDown size={14} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}
      <section
        id="projects"
        className="px-4 pb-24 md:px-6 md:pb-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
                02 — Projects
              </p>

              <h2 className="text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                Selected work.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Projects will be added and managed through the portfolio
              admin panel.
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="px-4 pb-24 md:px-6 md:pb-32">
        <div
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-30
              [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
              [background-size:48px_48px]
            "
          />

          <div className="relative z-10 flex flex-col justify-between gap-10 px-6 py-16 md:flex-row md:items-end md:px-12 md:py-20">
            <div>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
                03 — Next
              </p>

              <h2 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
                More ideas are
                <br />
                <span className="text-white/20">
                  already in progress.
                </span>
              </h2>
            </div>

            <Link
              href="/#contact"
              className="
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                border
                border-white/10
                px-5
                py-3
                text-xs
                text-white/60
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white
                hover:text-black
              "
            >
              Let&apos;s work together
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}