"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
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

import { db } from "@/lib/firebase";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function NewCertificatePageClient() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [certificateUrl, setCertificateUrl] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleAddSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (
      skills.some(
        (skill) =>
          skill.toLowerCase() === value.toLowerCase()
      )
    ) {
      setSkillInput("");
      return;
    }

    setSkills((current) => [...current, value]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((current) =>
      current.filter((item) => item !== skill)
    );
  };

  const handleSkillKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddSkill();
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
      setError("Failed to upload certificate image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanTitle = title.trim();
    const cleanIssuer = issuer.trim();
    const cleanDate = date.trim();
    const cleanExpiryDate = expiryDate.trim();
    const cleanCertificateUrl = certificateUrl.trim();

    if (!cleanTitle) {
      setError("Certificate title is required.");
      return;
    }

    if (!cleanIssuer) {
      setError("Certificate issuer is required.");
      return;
    }

    if (!cleanDate) {
      setError("Certificate date is required.");
      return;
    }

    if (!imageUrl) {
      setError("Please upload a certificate image.");
      return;
    }

    try {
      setSaving(true);

      const now = new Date();

      await addDoc(collection(db, "certificates"), {
        title: cleanTitle,
        issuer: cleanIssuer,
        date: cleanDate,
        expiryDate: cleanExpiryDate,
        skills,
        imageUrl: imageUrl.trim(),
        certificateUrl: cleanCertificateUrl,
        createdAt: now,
        updatedAt: now,
      });

      router.push("/admin/certificates");
    } catch (err) {
      console.error(err);
      setError("Failed to create certificate.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-10 border-b border-white/[0.08] pb-8">
        <Link
          href="/admin/certificates"
          className="
            mb-5
            inline-flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-white/30
            transition
            hover:text-white
          "
        >
          <ArrowLeft size={13} />
          Certificates
        </Link>

        <p
          className="
            mb-3
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-white/25
          "
        >
          Portfolio Management
        </p>

        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Add Certificate
        </h1>

        <p className="mt-3 text-sm text-white/35">
          Add a new certificate to your portfolio.
        </p>
      </div>

      {/* Error */}
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
                Core information about the certificate.
              </p>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Certificate Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="e.g. Belajar Dasar AI"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#101010]
                    px-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-white/20
                    focus:border-white/20
                  "
                />
              </div>

              {/* Issuer */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Issuer
                </label>

                <input
                  type="text"
                  value={issuer}
                  onChange={(event) =>
                    setIssuer(event.target.value)
                  }
                  placeholder="e.g. Dicoding Indonesia"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#101010]
                    px-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-white/20
                    focus:border-white/20
                  "
                />
              </div>

              {/* Dates */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Date
                  </label>

                  <input
                    type="text"
                    value={date}
                    onChange={(event) =>
                      setDate(event.target.value)
                    }
                    placeholder="May 2026"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-[#101010]
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/20
                      focus:border-white/20
                    "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(event) =>
                      setExpiryDate(event.target.value)
                    }
                    placeholder="Optional"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-[#101010]
                      px-4
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-white/20
                      focus:border-white/20
                    "
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                02
              </p>

              <h2 className="text-lg font-medium text-white">
                Skills
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Add the skills covered by this certificate.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(event) =>
                  setSkillInput(event.target.value)
                }
                onKeyDown={handleSkillKeyDown}
                placeholder="e.g. Deep Learning"
                className="
                  h-11
                  min-w-0
                  flex-1
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-[#101010]
                  px-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-white/20
                "
              />

              <button
                type="button"
                onClick={handleAddSkill}
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  text-white/50
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <Plus size={16} />
              </button>
            </div>

            {skills.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-white/[0.08]
                      bg-white/[0.03]
                      px-3
                      py-2
                      text-xs
                      text-white/55
                    "
                  >
                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveSkill(skill)
                      }
                      className="
                        text-white/25
                        transition
                        hover:text-white
                      "
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Image & URL */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#151515] p-6 sm:p-8">
            <div className="mb-8">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                03
              </p>

              <h2 className="text-lg font-medium text-white">
                Certificate Image & Link
              </h2>

              <p className="mt-1 text-xs text-white/30">
                Upload the certificate image and optionally
                add its verification link.
              </p>
            </div>

            <div className="space-y-5">
              {/* Certificate URL */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Certificate URL
                </label>

                <input
                  type="url"
                  value={certificateUrl}
                  onChange={(event) =>
                    setCertificateUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#101010]
                    px-4
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-white/20
                    focus:border-white/20
                  "
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.15em] text-white/35">
                  Certificate Image
                </label>

                <label className="block cursor-pointer">
                  <div className="relative flex min-h-48 overflow-hidden rounded-xl border border-dashed border-white/[0.1] bg-[#101010] transition hover:border-white/20">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Certificate preview"
                        width={1200}
                        height={800}
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
                          Uploading{" "}
                          {uploadProgress}%
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

        {/* Publish Sidebar */}
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
                Save this certificate to your portfolio.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#101010] p-4">
              <div className="flex items-center gap-3">
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
                    Certificate will appear in Learning.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="
                mt-5
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                text-xs
                font-medium
                text-black
                transition
                hover:bg-white/90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
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
                  Save Certificate
                </>
              )}
            </button>

            <Link
              href="/admin/certificates"
              className="
                mt-3
                flex
                h-11
                w-full
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-xs
                text-white/45
                transition
                hover:border-white/20
                hover:text-white
              "
            >
              Cancel
            </Link>
          </section>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
              Certificate Status
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