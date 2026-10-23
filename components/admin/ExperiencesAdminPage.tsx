"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";

import {
  deleteExperience,
  getExperiences,
} from "@/lib/experience";

import type { Experience } from "@/types/experience";

export default function ExperiencesAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );
  const [error, setError] = useState("");

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExperiences();

      setExperiences(data);
    } catch (err) {
      console.error("Failed to load experiences:", err);

      setError(
        "Failed to load experiences. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadExperiences();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await deleteExperience(id);

      setExperiences((current) =>
        current.filter(
          (experience) => experience.id !== id
        )
      );
    } catch (err) {
      console.error("Failed to delete experience:", err);

      setError(
        "Failed to delete experience. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatPeriod = (
    startDate?: string,
    endDate?: string
  ) => {
    const start = startDate?.trim() || "";
    const end = endDate?.trim() || "";

    if (!start && !end) {
      return "Date not specified";
    }

    if (!end || end.toLowerCase() === "present") {
      return `${start} — PRESENT`;
    }

    if (!start) {
      return end;
    }

    return `${start} — ${end}`;
  };

  return (
    <div className="min-h-screen bg-[#101010] px-5 py-8 text-white md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Top Navigation */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="
                inline-flex
                items-center
                gap-2
                text-xs
                uppercase
                tracking-[0.18em]
                text-white/35
                transition-colors
                hover:text-white
              "
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              Dashboard
            </Link>

            <div className="mt-6 flex items-center gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#151515]
                "
              >
                <BriefcaseBusiness
                  size={18}
                  strokeWidth={1.4}
                  className="text-white/60"
                />
              </div>

              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Admin
                </p>

                <h1
                  className="
                    mt-1
                    text-2xl
                    font-medium
                    tracking-[-0.04em]
                    md:text-3xl
                  "
                >
                  Experience
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadExperiences}
              disabled={loading}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.1]
                bg-white/[0.02]
                px-4
                py-2.5
                text-xs
                text-white/60
                transition-all
                hover:border-white/20
                hover:bg-white/[0.05]
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <RefreshCw
                size={13}
                className={loading ? "animate-spin" : ""}
              />

              Refresh
            </button>

            <Link
              href="/admin/experience/new"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-[#181818]
                px-5
                py-2.5
                text-xs
                font-medium
                text-white/70
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-[#202020]
                hover:text-white
              "
            >
              <Plus size={14} />
              Add Experience
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-400/10
              bg-red-400/[0.04]
              px-5
              py-4
              text-sm
              text-red-300/80
            "
          >
            {error}
          </div>
        )}

        {/* Summary */}
        <div
          className="
            mb-6
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-3
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-5
            "
          >
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/25
              "
            >
              Total Experience
            </p>

            <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
              {experiences.length}
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-5
            "
          >
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/25
              "
            >
              Current
            </p>

            <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
              {
                experiences.filter(
                  (experience) =>
                    !experience.endDate ||
                    experience.endDate
                      .toLowerCase()
                      .includes("present")
                ).length
              }
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#151515]
              p-5
            "
          >
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/25
              "
            >
              Categories
            </p>

            <p className="mt-3 text-3xl font-medium tracking-[-0.04em]">
              {
                new Set(
                  experiences
                    .map(
                      (experience) =>
                        experience.category?.trim()
                    )
                    .filter(Boolean)
                ).size
              }
            </p>
          </div>
        </div>

        {/* Experience List */}
        <div
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
          "
        >
          {/* Header */}
          <div
            className="
              hidden
              border-b
              border-white/[0.07]
              px-6
              py-4
              lg:grid
              lg:grid-cols-[1fr_170px_130px_100px]
              lg:gap-6
            "
          >
            <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
              Experience
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
              Period
            </span>

            <span className="text-[8px] uppercase tracking-[0.2em] text-white/20">
              Category
            </span>

            <span className="text-right text-[8px] uppercase tracking-[0.2em] text-white/20">
              Actions
            </span>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/25">
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Loading experience
              </div>
            </div>
          ) : experiences.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                "
              >
                <BriefcaseBusiness
                  size={18}
                  className="text-white/25"
                />
              </div>

              <p className="mt-5 text-sm text-white/50">
                No experience found.
              </p>

              <Link
                href="/admin/experience/new"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-5
                  py-2.5
                  text-xs
                  font-medium
                  text-black
                "
              >
                <Plus size={14} />
                Add your first experience
              </Link>
            </div>
          ) : (
            experiences.map((experience) => (
              <div
                key={experience.id}
                className="
                  border-b
                  border-white/[0.07]
                  px-6
                  py-6
                  last:border-b-0
                "
              >
                <div
                  className="
                    grid
                    gap-5
                    lg:grid-cols-[1fr_170px_130px_100px]
                    lg:items-center
                    lg:gap-6
                  "
                >
                  {/* Experience */}
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Logo */}
                    <div
                      className="
                        relative
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-[#101010]
                      "
                    >
                      {experience.logoUrl ? (
                        <Image
                          src={experience.logoUrl}
                          alt={`${experience.company} logo`}
                          fill
                          sizes="48px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <BriefcaseBusiness
                          size={18}
                          strokeWidth={1.4}
                          className="text-white/25"
                        />
                      )}
                    </div>

                    {/* Information */}
                    <div className="min-w-0">
                      <h2
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-white
                        "
                      >
                        {experience.position}
                      </h2>

                      <p
                        className="
                          mt-1
                          truncate
                          text-xs
                          text-white/45
                        "
                      >
                        {experience.company}
                      </p>

                      {experience.organization && (
                        <p
                          className="
                            mt-1
                            truncate
                            text-[9px]
                            uppercase
                            tracking-[0.15em]
                            text-white/20
                          "
                        >
                          {experience.organization}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Period */}
                  <div>
                    <p className="text-xs text-white/45">
                      {formatPeriod(
                        experience.startDate,
                        experience.endDate
                      )}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <span
                      className="
                        inline-flex
                        rounded-full
                        border
                        border-white/[0.08]
                        px-3
                        py-1.5
                        text-[8px]
                        uppercase
                        tracking-[0.15em]
                        text-white/30
                      "
                    >
                      {experience.category ||
                        "Uncategorized"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 lg:justify-end">
                    {experience.id && (
                      <>
                        <Link
                          href={`/admin/experience/${experience.id}`}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/[0.08]
                            text-white/35
                            transition-all
                            hover:border-white/20
                            hover:bg-white/[0.04]
                            hover:text-white
                          "
                          aria-label="Edit experience"
                          title="Edit"
                        >
                          <Pencil
                            size={13}
                            strokeWidth={1.5}
                          />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              experience.id as string
                            )
                          }
                          disabled={
                            deletingId === experience.id
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-red-400/10
                            text-red-300/40
                            transition-all
                            hover:border-red-400/20
                            hover:bg-red-400/[0.05]
                            hover:text-red-300
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                          "
                          aria-label="Delete experience"
                          title="Delete"
                        >
                          {deletingId ===
                          experience.id ? (
                            <Loader2
                              size={13}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2
                              size={13}
                              strokeWidth={1.5}
                            />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                {experience.description && (
                  <div
                    className="
                      mt-5
                      border-t
                      border-white/[0.05]
                      pt-4
                      lg:ml-16
                    "
                  >
                    <p
                      className="
                        max-w-4xl
                        text-xs
                        leading-6
                        text-white/30
                      "
                    >
                      {experience.description}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {experience.tags &&
                  experience.tags.length > 0 && (
                    <div
                      className="
                        mt-4
                        flex
                        flex-wrap
                        gap-2
                        lg:ml-16
                      "
                    >
                      {experience.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full
                            border
                            border-white/[0.07]
                            px-2.5
                            py-1
                            text-[8px]
                            uppercase
                            tracking-[0.12em]
                            text-white/20
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}