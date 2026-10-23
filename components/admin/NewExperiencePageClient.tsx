"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { createExperience } from "@/lib/experience";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function NewExperiencePageClient() {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");

  const [company, setCompany] = useState("");
  const [organization, setOrganization] =
    useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [description, setDescription] =
    useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [logoUrl, setLogoUrl] = useState("");
  const [logoPreview, setLogoPreview] =
    useState("");

  const [order, setOrder] = useState("1");

  const [uploadingLogo, setUploadingLogo] =
    useState(false);
  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleAddTag = () => {
    const value = tagInput.trim();

    if (!value) return;

    const alreadyExists = tags.some(
      (tag) =>
        tag.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      setTagInput("");
      return;
    }

    setTags((current) => [...current, value]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((current) =>
      current.filter((item) => item !== tag)
    );
  };

  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleLogoUpload = async (
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
      setError(
        "Please upload a JPG, PNG, or WEBP image."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setLogoPreview(previewUrl);

    try {
      setUploadingLogo(true);
      setUploadProgress(0);

      const uploadedUrl =
        await uploadToCloudinary(
          file,
          (progress) => {
            setUploadProgress(progress);
          }
        );

      setLogoUrl(uploadedUrl);
      setLogoPreview(uploadedUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to upload logo.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanCategory = category.trim();
    const cleanPosition = position.trim();
    const cleanCompany = company.trim();
    const cleanOrganization =
      organization.trim();
    const cleanStartDate = startDate.trim();
    const cleanEndDate = endDate.trim();
    const cleanDescription =
      description.trim();
    const cleanLogoUrl = logoUrl.trim();

    const numericOrder = Number(order);

    if (!cleanCategory) {
      setError("Category is required.");
      return;
    }

    if (!cleanPosition) {
      setError("Position is required.");
      return;
    }

    if (!cleanCompany) {
      setError("Company is required.");
      return;
    }

    if (!cleanStartDate) {
      setError("Start date is required.");
      return;
    }

    if (!cleanEndDate) {
      setError("End date is required.");
      return;
    }

    if (!cleanDescription) {
      setError("Description is required.");
      return;
    }

    if (!cleanLogoUrl) {
      setError("Experience logo is required.");
      return;
    }

    if (
      !Number.isFinite(numericOrder) ||
      numericOrder < 1
    ) {
      setError(
        "Display order must be a number greater than 0."
      );
      return;
    }

    try {
      setSaving(true);

      await createExperience({
        category: cleanCategory,
        position: cleanPosition,

        company: cleanCompany,
        organization:
          cleanOrganization || "",

        startDate: cleanStartDate,
        endDate: cleanEndDate,

        description: cleanDescription,

        tags,

        logoUrl: cleanLogoUrl,

        order: numericOrder,
      });

      router.push("/admin/experience");
    } catch (err) {
      console.error(err);
      setError("Failed to create experience.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-10 border-b border-white/[0.08] pb-8">
        <Link
          href="/admin/experience"
          className="mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 transition hover:text-white"
        >
          <ArrowLeft size={13} />
          Experience
        </Link>

        <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/25">
          Portfolio Management
        </p>

        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Add Experience
        </h1>

        <p className="mt-3 text-sm text-white/35">
          Add a professional or organizational
          experience to your portfolio.
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
        <div className="space-y-6">
          {/* 01 Basic Information */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                01
              </p>

              <h2 className="text-lg font-medium text-white">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Core information about this experience.
              </p>
            </div>

            <div className="space-y-5">
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
                  placeholder="e.g. Human Resources"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Position
                </label>

                <input
                  type="text"
                  value={position}
                  onChange={(event) =>
                    setPosition(event.target.value)
                  }
                  placeholder="e.g. Human Resources Management Assistant"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Company
                  </label>

                  <input
                    type="text"
                    value={company}
                    onChange={(event) =>
                      setCompany(event.target.value)
                    }
                    placeholder="e.g. Lapas Narkotika Kelas IIB Langsa"
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Organization
                  </label>

                  <input
                    type="text"
                    value={organization}
                    onChange={(event) =>
                      setOrganization(
                        event.target.value
                      )
                    }
                    placeholder="Optional"
                    className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 02 Period */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                02
              </p>

              <h2 className="text-lg font-medium text-white">
                Period
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Define when this experience took place.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Start Date
                </label>

                <input
                  type="text"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  placeholder="Aug 2026"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  End Date
                </label>

                <input
                  type="text"
                  value={endDate}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                  placeholder="Present"
                  className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>
            </div>
          </section>

          {/* 03 Description & Tags */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                03
              </p>

              <h2 className="text-lg font-medium text-white">
                Description & Tags
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Describe your role and add relevant tags.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={6}
                  placeholder="Describe your responsibilities, contributions, and impact..."
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#101010] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Tags
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(event) =>
                      setTagInput(event.target.value)
                    }
                    onKeyDown={handleTagKeyDown}
                    placeholder="e.g. Web Development"
                    className="h-11 min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/20"
                  />

                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white/55"
                      >
                        {tag}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveTag(tag)
                          }
                          className="text-white/25 transition hover:text-white"
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 04 Logo */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                04
              </p>

              <h2 className="text-lg font-medium text-white">
                Experience Logo
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Upload the organization or company logo.
              </p>
            </div>

            <label className="block cursor-pointer">
              <div className="relative flex min-h-56 overflow-hidden rounded-xl border border-dashed border-white/[0.1] bg-[#101010] transition hover:border-white/20">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Experience logo preview"
                    width={1200}
                    height={800}
                    className="h-56 w-full object-contain p-8"
                  />
                ) : (
                  <div className="flex w-full flex-col items-center justify-center gap-3">
                    <ImageIcon
                      size={22}
                      className="text-white/20"
                    />

                    <div className="text-center">
                      <p className="text-xs text-white/45">
                        Click to upload a logo
                      </p>

                      <p className="mt-1 text-[10px] text-white/20">
                        JPG, PNG or WEBP · Max 5MB
                      </p>
                    </div>
                  </div>
                )}

                {uploadingLogo && (
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
                onChange={handleLogoUpload}
                className="hidden"
                disabled={uploadingLogo}
              />
            </label>
          </section>
        </div>

        {/* Publish */}
        <aside className="h-fit space-y-6 lg:sticky lg:top-10">
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6">
            <div className="mb-6">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                05
              </p>

              <h2 className="text-lg font-medium text-white">
                Publish
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/30">
                Save this experience to your portfolio.
              </p>
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                Display Order
              </label>

              <input
                type="number"
                min="1"
                value={order}
                onChange={(event) =>
                  setOrder(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101010] px-4 text-sm text-white outline-none transition focus:border-white/20"
              />

              <p className="mt-2 text-[10px] leading-5 text-white/20">
                Lower numbers appear first.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#101010] p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                <Check
                  size={14}
                  className="text-white/50"
                />
              </div>

              <div>
                <p className="text-sm text-white">
                  Ready to publish
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  Experience will appear in your portfolio.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || uploadingLogo}
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
                  Save Experience
                </>
              )}
            </button>

            <Link
              href="/admin/experience"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-full border border-white/10 text-xs text-white/45 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>
          </section>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Experience Status
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