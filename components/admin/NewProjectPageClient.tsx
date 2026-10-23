"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { createProject } from "@/lib/projects";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function NewProjectPage() {
  const router = useRouter();

  // --------------------------------
  // Form state
  // --------------------------------

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [year, setYear] = useState("2026");

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [technologyInput, setTechnologyInput] = useState("");

  const [featured, setFeatured] = useState(false);

  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------
  // Helpers
  // --------------------------------

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    const alreadyExists = technologies.some(
      (technology) => technology.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setTechnologyInput("");
      return;
    }

    setTechnologies((current) => [...current, value]);
    setTechnologyInput("");
  };

  const removeTechnology = (technology: string) => {
    setTechnologies((current) =>
      current.filter((item) => item !== technology)
    );
  };

  const handleTechnologyKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTechnology();
    }
  };

  // --------------------------------
  // Image upload
  // --------------------------------

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
    setUploadingImage(true);
    setUploadProgress(0);

    try {
      const uploadedUrl = await uploadToCloudinary(
        file,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setImageUrl(uploadedUrl);
      setUploadProgress(100);
    } catch (err) {
      console.error("Failed to upload image:", err);

      setImageUrl("");
      setImagePreview("");
      setUploadProgress(0);

      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  // --------------------------------
  // Form status
  // --------------------------------

  const isReady =
    title.trim() !== "" &&
    slug.trim() !== "" &&
    description.trim() !== "" &&
    category.trim() !== "" &&
    year.trim() !== "" &&
    /^\d{4}$/.test(year.trim()) &&
    technologies.length > 0;

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving || uploadingImage) return;

    setError("");

    const cleanTitle = title.trim();
    const cleanSlug = slug.trim();
    const cleanDescription = description.trim();
    const cleanCategory = category.trim();
    const cleanYear = year.trim();

    if (!cleanTitle) {
      setError("Project title is required.");
      return;
    }

    if (!cleanSlug) {
      setError("Project slug is required.");
      return;
    }

    if (!cleanDescription) {
      setError("Project description is required.");
      return;
    }

    if (!cleanCategory) {
      setError("Project category is required.");
      return;
    }

    if (!cleanYear) {
      setError("Project year is required.");
      return;
    }

    if (!/^\d{4}$/.test(cleanYear)) {
      setError("Project year must contain exactly 4 digits.");
      return;
    }

    if (technologies.length === 0) {
      setError("Add at least one technology.");
      return;
    }

    try {
      setSaving(true);

      await createProject({
        title: cleanTitle,
        slug: cleanSlug,
        description: cleanDescription,
        category: cleanCategory,
        technologies,
        year: Number(cleanYear),
        featured,
        githubUrl: githubUrl.trim(),
        liveUrl: liveUrl.trim(),
        imageUrl: imageUrl.trim(),
      });

      router.push("/admin/projects");
    } catch (err) {
      console.error("Failed to create project:", err);
      setError("Something went wrong while saving the project.");
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* --------------------------------
          Header
      -------------------------------- */}

      <div className="mb-10">
        <Link
          href="/admin/projects"
          className="mb-7 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/30">
              Content Management
            </p>

            <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Add Project
            </h1>

            <p className="mt-3 text-sm text-white/35">
              Add a new project to your portfolio.
            </p>
          </div>

          <p className="hidden pb-1 text-[10px] uppercase tracking-[0.25em] text-white/25 lg:block">
            Projects&nbsp;&nbsp;/&nbsp;&nbsp;New
          </p>
        </div>
      </div>

      {/* --------------------------------
          Form
      -------------------------------- */}

      <form onSubmit={handleSubmit}>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* =========================================
              LEFT — MAIN FORM
          ========================================= */}

          <div className="space-y-6">
            {/* --------------------------------
                01 — Basic Information
            -------------------------------- */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-6 sm:px-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                    01
                  </p>

                  <h2 className="mt-2 text-sm font-medium text-white">
                    Basic Information
                  </h2>
                </div>

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Required
                </span>
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                {/* Project Title */}

                <div>
                  <label className="mb-2 block text-xs text-white/50">
                    Project Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(event) =>
                      handleTitleChange(event.target.value)
                    }
                    placeholder="e.g. Arsip Khusus Kepegawaian"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>

                {/* Slug */}

                <div>
                  <label className="mb-2 block text-xs text-white/50">
                    Slug
                  </label>

                  <input
                    type="text"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    placeholder="project-slug"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white/70 outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />

                  <p className="mt-2 text-[10px] text-white/20">
                    Automatically generated from the project title.
                  </p>
                </div>

                {/* Description */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs text-white/50">
                      Description
                    </label>

                    <span className="text-[9px] text-white/20">
                      Portfolio summary
                    </span>
                  </div>

                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={5}
                    placeholder="Describe the project, what you built, and the problem it solves..."
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>

                {/* Category + Year */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs text-white/50">
                      Category
                    </label>

                    <select
                      value={category}
                      onChange={(event) =>
                        setCategory(event.target.value)
                      }
                      className="w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition focus:border-white/20"
                    >
                      <option value="Web Development">
                        Web Development
                      </option>

                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>

                      <option value="Machine Learning">
                        Machine Learning
                      </option>

                      <option value="Computer Vision">
                        Computer Vision
                      </option>

                      <option value="UI/UX Design">
                        UI/UX Design
                      </option>

                      <option value="Mobile Development">
                        Mobile Development
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs text-white/50">
                      Year
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                      placeholder="2026"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* --------------------------------
                02 — Technologies
            -------------------------------- */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515]">
              <div className="border-b border-white/[0.08] px-6 py-6 sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                  02
                </p>

                <h2 className="mt-2 text-sm font-medium text-white">
                  Technologies
                </h2>
              </div>

              <div className="p-6 sm:p-8">
                <label className="mb-2 block text-xs text-white/50">
                  Add Technology
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={technologyInput}
                    onChange={(event) =>
                      setTechnologyInput(event.target.value)
                    }
                    onKeyDown={handleTechnologyKeyDown}
                    placeholder="e.g. Next.js"
                    className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />

                  <button
                    type="button"
                    onClick={addTechnology}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.1] px-4 py-3 text-xs text-white/70 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>

                {technologies.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {technologies.map((technology) => (
                      <div
                        key={technology}
                        className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[10px] uppercase tracking-[0.08em] text-white/60"
                      >
                        <span>{technology}</span>

                        <button
                          type="button"
                          onClick={() => removeTechnology(technology)}
                          className="text-white/30 transition hover:text-white"
                          aria-label={`Remove ${technology}`}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-white/[0.08] px-4 py-6 text-center">
                    <p className="text-[10px] text-white/20">
                      No technologies added yet.
                    </p>
                  </div>
                )}

                <p className="mt-3 text-[10px] text-white/20">
                  Press Enter or click Add to add a technology.
                </p>
              </div>
            </section>

            {/* --------------------------------
                03 — Project Links
            -------------------------------- */}

            <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515]">
              <div className="border-b border-white/[0.08] px-6 py-6 sm:px-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                  03
                </p>

                <h2 className="mt-2 text-sm font-medium text-white">
                  Project Links
                </h2>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* GitHub */}

                  <div>
                    <label className="mb-2 block text-xs text-white/50">
                      GitHub URL
                    </label>

                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(event) =>
                        setGithubUrl(event.target.value)
                      }
                      placeholder="https://github.com/..."
                      className="w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                    />
                  </div>

                  {/* Live */}

                  <div>
                    <label className="mb-2 block text-xs text-white/50">
                      Live Project URL
                    </label>

                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(event) =>
                        setLiveUrl(event.target.value)
                      }
                      placeholder="https://..."
                      className="w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                    />
                  </div>
                </div>

                {/* Project Image */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-xs text-white/50">
                      Project Image
                    </label>

                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                      Optional
                    </span>
                  </div>

                  {imagePreview ? (
                    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#101010]">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Project preview"
                          width={1200}
                          height={675}
                          className="h-full w-full object-cover"
                        />

                        {uploadingImage && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="text-center">
                              <Loader2
                                size={20}
                                className="mx-auto animate-spin text-white"
                              />

                              <p className="mt-3 text-xs text-white/70">
                                Uploading...
                              </p>

                              <p className="mt-1 text-[10px] text-white/30">
                                {uploadProgress}%
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs text-white/60">
                            Project image
                          </p>

                          <p className="mt-1 text-[9px] text-white/20">
                            JPG · PNG · WEBP · Max 5 MB
                          </p>
                        </div>

                        <label className="shrink-0 cursor-pointer rounded-lg border border-white/[0.08] px-3 py-2 text-[10px] text-white/50 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white">
                          Replace
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-[#101010] px-6 py-10 text-center transition hover:border-white/20 hover:bg-white/[0.02]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                        <ArrowUpRight
                          size={16}
                          className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>

                      <p className="mt-4 text-xs text-white/60">
                        Upload project image
                      </p>

                      <p className="mt-1 text-[10px] text-white/20">
                        JPG, PNG or WEBP · Max 5 MB
                      </p>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </section>

            {/* --------------------------------
                Error
            -------------------------------- */}

            {error && (
              <div className="rounded-xl border border-red-400/10 bg-red-400/[0.05] px-4 py-3">
                <p className="text-xs text-red-300/80">{error}</p>
              </div>
            )}
          </div>

          {/* =========================================
              RIGHT — PUBLISH SIDEBAR
          ========================================= */}

          <aside className="lg:sticky lg:top-6">
            <div className="space-y-6">
              {/* Publish card */}

              <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#151515]">
                <div className="border-b border-white/[0.08] px-6 py-6">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                    04
                  </p>

                  <h2 className="mt-2 text-sm font-medium text-white">
                    Publish
                  </h2>
                </div>

                <div className="space-y-4 p-6">
                  {/* Featured */}

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#101010] p-4">
                    <div className="pr-4">
                      <p className="text-sm text-white/80">
                        Featured Project
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-white/25">
                        Display this project in the featured projects
                        section.
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={featured}
                      onClick={() => setFeatured((value) => !value)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        featured ? "bg-white" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full transition-all ${
                          featured
                            ? "left-6 bg-black"
                            : "left-1 bg-white/40"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Status */}

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3">
                    <span className="text-[9px] uppercase tracking-[0.15em] text-white/25">
                      Status
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isReady ? "bg-emerald-400" : "bg-white/20"
                        }`}
                      />

                      <span
                        className={`text-[9px] uppercase tracking-[0.12em] ${
                          isReady
                            ? "text-emerald-400/80"
                            : "text-white/30"
                        }`}
                      >
                        {isReady ? "Ready" : "Incomplete"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Actions */}

              <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-4">
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : uploadingImage ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                      Uploading Image...
                    </>
                  ) : (
                    <>
                      Save Project
                      <ArrowUpRight size={14} />
                    </>
                  )}
                </button>

                <Link
                  href="/admin/projects"
                  className="mt-2 flex w-full items-center justify-center rounded-xl px-5 py-3 text-xs text-white/45 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Cancel
                </Link>
              </section>

              {/* Helper */}

              <p className="px-2 text-[10px] leading-5 text-white/20">
                Your project will be added to Firestore and will become
                available to the portfolio once saved.
              </p>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}