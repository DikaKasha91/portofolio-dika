"use client";

import type { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export default function ProjectGrid({
  projects,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div
        className="
          rounded-[2rem]
          border
          border-white/[0.08]
          bg-[#151515]
          px-6
          py-24
          text-center
          md:px-10
          md:py-32
        "
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/25">
          Projects
        </p>

        <h3
          className="
            mt-5
            text-3xl
            font-medium
            tracking-[-0.04em]
            text-white
            md:text-5xl
          "
        >
          Something is coming.
        </h3>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/35">
          New projects and experiments will appear here as they are
          built.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((project: Project, index: number) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}