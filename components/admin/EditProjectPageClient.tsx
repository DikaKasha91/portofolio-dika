"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { db } from "@/lib/firebase";
import { updateProject } from "@/lib/projects";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function EditProjectPageClient() {
  const params = useParams();
  const router = useRouter();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [technologyInput, setTechnologyInput] = useState("");
  const [featured, setFeatured] = useState(false);

  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const projectRef = doc(db, "projects", id);
        const snapshot = await getDoc(projectRef);

        if (!snapshot.exists()) {
          setError("Project not found.");
          return;
        }

        const data = snapshot.data();

        setTitle(data.title ?? "");
        setSlug(data.slug ?? "");
        setDescription(data.description ?? "");
        setCategory(data.category ?? "");
        setYear(
          data.year !== undefined && data.year !== null
            ? String(data.year)
            : ""
        );

        setTechnologies(
          Array.isArray(data.technologies)
            ? data.technologies
            : []
        );

        setFeatured(Boolean(data.featured));

        setGithubUrl(data.githubUrl ?? "");
        setLiveUrl(data.liveUrl ?? "");

        setImageUrl(data.imageUrl ?? "");
        setImagePreview(data.imageUrl ?? "");
      } catch (err) {
        console.error(err);
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleAddTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    if (
      technologies.some(
        (technology) =>
          technology.toLowerCase() === value.toLowerCase()
      )
    ) {
      setTechnologyInput("");
      return;
    }

    setTechnologies((current) => [...current, value]);
    setTechnologyInput("");
  };

  const handleRemoveTechnology = (technology: string) => {
    setTechnologies((current) =>
      current.filter((item) => item !== technology)
    );
  };

  const handleTechnologyKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTechnology();
    }
  };

  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
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
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      setUploadingImage(true);
      setUploadProgress(0);

      const uploadedUrl = await uploadToCloudinary(
        file,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      setImageUrl(uploadedUrl);
      setImagePreview(uploadedUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!id) return;

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

    const numericYear = Number(cleanYear);

    if (Number.isNaN(numericYear)) {
      setError("Project year must be a valid number.");
      return;
    }

    try {
      setSaving(true);

      await updateProject(id, {
        title: cleanTitle,
        slug: cleanSlug,
        description: cleanDescription,
        category: cleanCategory,
        technologies,
        year: numericYear,
        featured,
        githubUrl: githubUrl.trim(),
        liveUrl: liveUrl.trim(),
        imageUrl: imageUrl.trim(),
      });

      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      setError("Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-white/30">
          <Loader2
            size={16}
            className="animate-spin"
          />
          <span className="text-[10px] uppercase tracking-[0.25em]">
            Loading project...
          </span>
        </div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/admin/projects"
          className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 transition hover:text-white"
        >
          <ArrowLeft size={13} />
          Projects
        </Link>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-6">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-10 border-b border-white/[0.08] pb-8">
        <Link
          href="/admin/projects"
          className="mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 transition hover:text-white"
        >
          <ArrowLeft size={13} />
          Projects
        </Link>

        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
          Portfolio Management
        </p>

        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Edit Project
        </h1>

        <p className="mt-3 text-sm text-white/35">
          Update the information displayed for this project.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-[1fr_320px]"
      >
        {/* Main */}
        <div className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                01
              </p>

              <h2 className="text-lg font-medium text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Core information about the project.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Project Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="e.g. Employee Archive System"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Slug
                </label>

                <input
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(event.target.value)
                  }
                  placeholder="project-slug"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={6}
                  placeholder="Describe the project..."
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Category
                  </label>

                  <input
                    type="text"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    placeholder="Web Development"
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Year
                  </label>

                  <input
                    type="number"
                    value={year}
                    onChange={(event) =>
                      setYear(event.target.value)
                    }
                    placeholder="2026"
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Technologies */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                02
              </p>

              <h2 className="text-lg font-medium text-white">
                Technologies
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Add the technologies used to build this project.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={technologyInput}
                onChange={(event) =>
                  setTechnologyInput(event.target.value)
                }
                onKeyDown={handleTechnologyKeyDown}
                placeholder="e.g. Next.js"
                className="h-11 min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
              />

              <button
                type="button"
                onClick={handleAddTechnology}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>

            {technologies.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white/55"
                  >
                    {technology}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveTechnology(technology)
                      }
                      className="text-white/25 transition hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Links & Image */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                03
              </p>

              <h2 className="text-lg font-medium text-white">
                Project Links & Image
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Connect the project to its external resources.
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(event) =>
                      setGithubUrl(event.target.value)
                    }
                    placeholder="https://github.com/..."
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Live URL
                  </label>

                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(event) =>
                      setLiveUrl(event.target.value)
                    }
                    placeholder="https://..."
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Project Image
                </label>

                <label className="block cursor-pointer">
                  <div className="relative flex min-h-48 overflow-hidden rounded-xl border border-dashed border-white/[0.1] bg-[#101010] transition hover:border-white/20">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Project preview"
                        width={1200}
                        height={675}
                        className="h-64 w-full object-cover"
                      />
                    ) : (
                      <div className="flex w-full flex-col items-center justify-center gap-3">
                        <ImageIcon
                          size={22}
                          className="text-white/20"
                        />

                        <div className="text-center">
                          <p className="text-xs text-white/45">
                            Click to upload an image
                          </p>

                          <p className="mt-1 text-[10px] text-white/20">
                            JPG, PNG or WEBP · Max 5MB
                          </p>
                        </div>
                      </div>
                    )}

                    {uploadingImage && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                        <Loader2
                          size={20}
                          className="mb-3 animate-spin text-white"
                        />

                        <p className="text-xs text-white">
                          Uploading {uploadProgress}%
                        </p>

                        <div className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-white transition-all"
                            style={{
                              width: `${uploadProgress}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-10">
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6">
            <div className="mb-6">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                04
              </p>

              <h2 className="text-lg font-medium text-white">
                Publish
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/30">
                Choose whether this project should appear as a
                featured project.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setFeatured((current) => !current)
              }
              className={`flex w-full items-center justify-between rounded-xl border p-4 transition ${
                featured
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-white/[0.08] bg-[#101010]"
              }`}
            >
              <div className="text-left">
                <p className="text-sm text-white">
                  Featured Project
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  Show on the homepage
                </p>
              </div>

              <div
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                  featured
                    ? "border-white bg-white text-black"
                    : "border-white/15 text-transparent"
                }`}
              >
                <Check size={12} strokeWidth={2.5} />
              </div>
            </button>

            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-xs font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Changes
                </>
              )}
            </button>

            <Link
              href="/admin/projects"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-white/10 text-xs text-white/45 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>
          </section>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Project Status
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-xs text-white/40">
                Ready to publish
              </span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}