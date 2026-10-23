"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  FolderKanban,
  Plus,
  RefreshCw,
  Star,
} from "lucide-react";

import { getProjects } from "@/lib/projects";
import { getCertificates } from "@/lib/certificates";
import { getExperiences } from "@/lib/experience";

type DashboardStats = {
  totalProjects: number;
  featuredProjects: number;
  totalCertificates: number;
  totalExperiences: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    featuredProjects: 0,
    totalCertificates: 0,
    totalExperiences: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async () => {
    try {
      setRefreshing(true);

      const [projects, certificates, experiences] =
        await Promise.all([
          getProjects(),
          getCertificates(),
          getExperiences(),
        ]);

      setStats({
        totalProjects: projects.length,
        featuredProjects: projects.filter(
          (project) => project.featured
        ).length,
        totalCertificates: certificates.length,
        totalExperiences: experiences.length,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        {/* Page intro */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
              Admin
            </p>

            <h1 className="text-3xl font-medium tracking-[-0.03em] text-white md:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
              Manage your portfolio content, projects, certificates,
              and professional experience.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            disabled={refreshing}
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.02]
              px-4
              py-2.5
              text-xs
              font-medium
              text-white/60
              transition-all
              duration-300
              hover:border-white/20
              hover:bg-white/[0.05]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Projects */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-6
            "
          >
            <div className="mb-8 flex items-start justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >
                <FolderKanban
                  size={17}
                  strokeWidth={1.5}
                  className="text-white/60"
                />
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Portfolio
              </span>
            </div>

            <p className="text-sm text-white/40">
              Total Projects
            </p>

            <p className="mt-2 text-4xl font-medium tracking-[-0.04em] text-white">
              {loading ? "—" : stats.totalProjects}
            </p>
          </div>

          {/* Featured */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-6
            "
          >
            <div className="mb-8 flex items-start justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >
                <Star
                  size={17}
                  strokeWidth={1.5}
                  className="text-white/60"
                />
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Featured
              </span>
            </div>

            <p className="text-sm text-white/40">
              Featured Projects
            </p>

            <p className="mt-2 text-4xl font-medium tracking-[-0.04em] text-white">
              {loading ? "—" : stats.featuredProjects}
            </p>
          </div>

          {/* Certificates */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-6
            "
          >
            <div className="mb-8 flex items-start justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >
                <Award
                  size={17}
                  strokeWidth={1.5}
                  className="text-white/60"
                />
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Learning
              </span>
            </div>

            <p className="text-sm text-white/40">
              Total Certificates
            </p>

            <p className="mt-2 text-4xl font-medium tracking-[-0.04em] text-white">
              {loading ? "—" : stats.totalCertificates}
            </p>
          </div>

          {/* Experience */}
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-6
            "
          >
            <div className="mb-8 flex items-start justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                "
              >
                <BriefcaseBusiness
                  size={17}
                  strokeWidth={1.5}
                  className="text-white/60"
                />
              </div>

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                Career
              </span>
            </div>

            <p className="text-sm text-white/40">
              Total Experience
            </p>

            <p className="mt-2 text-4xl font-medium tracking-[-0.04em] text-white">
              {loading ? "—" : stats.totalExperiences}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mt-12">
          <div className="mb-6">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
              Quick Actions
            </p>

            <h2 className="text-xl font-medium tracking-[-0.025em] text-white">
              Manage content
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {/* Add Project */}
            <Link
              href="/admin/projects/new"
              className="
                group
                relative
                min-h-[205px]
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#151515]
                p-6
                transition-all
                duration-300
                hover:border-white/[0.16]
                hover:bg-[#181818]
              "
            >
              <div className="flex items-start justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    transition-all
                    duration-300
                    group-hover:border-white/20
                    group-hover:bg-white/[0.05]
                  "
                >
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    className="text-white/60 transition-colors group-hover:text-white"
                  />
                </div>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    text-white/20
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white/70
                  "
                />
              </div>

              <div className="mt-8">
                <h3 className="text-base font-medium text-white">
                  Add Project
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/35">
                  Add a new project to your portfolio and selected
                  projects.
                </p>
              </div>
            </Link>

            {/* Add Certificate */}
            <Link
              href="/admin/certificates/new"
              className="
                group
                relative
                min-h-[205px]
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#151515]
                p-6
                transition-all
                duration-300
                hover:border-white/[0.16]
                hover:bg-[#181818]
              "
            >
              <div className="flex items-start justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    transition-all
                    duration-300
                    group-hover:border-white/20
                    group-hover:bg-white/[0.05]
                  "
                >
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    className="text-white/60 transition-colors group-hover:text-white"
                  />
                </div>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    text-white/20
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white/70
                  "
                />
              </div>

              <div className="mt-8">
                <h3 className="text-base font-medium text-white">
                  Add Certificate
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/35">
                  Add a new certificate to your learning and
                  credentials section.
                </p>
              </div>
            </Link>

            {/* Add Experience */}
            <Link
              href="/admin/experience/new"
              className="
                group
                relative
                min-h-[205px]
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#151515]
                p-6
                transition-all
                duration-300
                hover:border-white/[0.16]
                hover:bg-[#181818]
              "
            >
              <div className="flex items-start justify-between">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.02]
                    transition-all
                    duration-300
                    group-hover:border-white/20
                    group-hover:bg-white/[0.05]
                  "
                >
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    className="text-white/60 transition-colors group-hover:text-white"
                  />
                </div>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="
                    text-white/20
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white/70
                  "
                />
              </div>

              <div className="mt-8">
                <h3 className="text-base font-medium text-white">
                  Add Experience
                </h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-white/35">
                  Add a new professional experience to your
                  portfolio timeline.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Footer info */}
        <div className="mt-10 flex items-center justify-between border-t border-white/[0.08] pt-6">
          <p className="text-xs text-white/25">
            Portfolio Content Management
          </p>

          <div className="flex items-center gap-2 text-xs text-white/25">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            Firebase connected
          </div>
        </div>
      </div>
    </div>
  );
}