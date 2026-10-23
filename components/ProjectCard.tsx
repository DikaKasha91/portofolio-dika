"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="
        group
        overflow-hidden
        rounded-[2rem]
        border
        border-white/[0.08]
        bg-[#151515]
      "
    >
      {/* =====================================================
          PROJECT IMAGE
      ===================================================== */}
      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          border-b
          border-white/[0.06]
          bg-[#191919]
        "
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={750}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.03]
            "
          />
        ) : (
          <div className="relative h-full w-full">
            {/* Decorative Grid */}
            <div
              className="
                absolute
                inset-0
                opacity-50
                [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                [background-size:32px_32px]
              "
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-xs
                  tracking-[0.15em]
                  text-white/30
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        )}

        {/* PROJECT NUMBER */}
        <div
          className="
            absolute
            left-5
            top-5
            rounded-full
            border
            border-white/10
            bg-[#101010]/70
            px-3
            py-1.5
            text-[10px]
            tracking-[0.15em]
            text-white/50
            backdrop-blur-md
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* YEAR */}
        <div
          className="
            absolute
            right-5
            top-5
            rounded-full
            border
            border-white/10
            bg-[#101010]/70
            px-3
            py-1.5
            text-[10px]
            text-white/50
            backdrop-blur-md
          "
        >
          {project.year}
        </div>
      </div>

      {/* =====================================================
          PROJECT INFORMATION
      ===================================================== */}
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              {project.category}
            </p>

            <h3
              className="
                text-2xl
                font-medium
                tracking-[-0.04em]
                text-white
                md:text-3xl
              "
            >
              {project.title}
            </h3>
          </div>

          {(project.githubUrl || project.liveUrl) && (
            <a
              href={project.liveUrl || project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/45
                transition-all
                duration-300
                hover:border-white/25
                hover:bg-white
                hover:text-black
              "
            >
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
          {project.description}
        </p>

        {/* TECHNOLOGIES */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map(
            (technology: string) => (
              <span
                key={technology}
                className="
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-3
                  py-1.5
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-white/45
                "
              >
                {technology}
              </span>
            )
          )}
        </div>

        {/* LINKS */}
        {(project.githubUrl || project.liveUrl) && (
          <div
            className="
              mt-7
              flex
              items-center
              gap-5
              border-t
              border-white/[0.06]
              pt-5
            "
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-xs
                  text-white/50
                  transition-colors
                  hover:text-white
                "
              >
                Live project ↗
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-xs
                  text-white/50
                  transition-colors
                  hover:text-white
                "
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}