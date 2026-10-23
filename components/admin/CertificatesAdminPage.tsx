"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteDoc, doc } from "firebase/firestore";
import {
  ArrowLeft,
  Award,
  Edit3,
  ExternalLink,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";

import { db } from "@/lib/firebase";
import { getCertificates } from "@/lib/certificates";
import type { Certificate } from "@/types/certificate";

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadCertificates();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleDelete = async (
    id: string,
    title: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await deleteDoc(doc(db, "certificates", id));

      setCertificates((current) =>
        current.filter(
          (certificate) => certificate.id !== id
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete certificate.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">
        <div>
          <Link
            href="/admin"
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
            Dashboard
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
            Certificates
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/35">
            Manage the certificates displayed across your
            portfolio.
          </p>
        </div>

        {/* Add Certificate */}
        <Link
          href="/admin/certificates/new"
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-white/[0.12]
            bg-white/[0.04]
            px-5
            text-xs
            font-medium
            text-white/70
            transition-all
            duration-300
            hover:border-white/[0.2]
            hover:bg-white/[0.08]
            hover:text-white
          "
        >
          <Plus size={15} />
          Add Certificate
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08] bg-[#151515]">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
            Loading certificates...
          </p>
        </div>
      ) : certificates.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-[#151515] px-6 text-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <Award
              size={19}
              className="text-white/30"
            />
          </div>

          <h2 className="text-lg font-medium text-white">
            No certificates yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-white/30">
            Add your first certificate to start building
            your learning section.
          </p>

          <Link
            href="/admin/certificates/new"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              px-5
              py-2.5
              text-xs
              text-white
              transition
              hover:border-white/30
              hover:bg-white
              hover:text-black
            "
          >
            <Plus size={14} />
            Add Certificate
          </Link>
        </div>
      ) : (
        /* Certificate List */
        <div className="space-y-4">
          {certificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#151515]
                transition-colors
                hover:border-white/[0.14]
              "
            >
              <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">
                {/* Number */}
                <div className="hidden w-8 shrink-0 text-[10px] tabular-nums text-white/20 lg:block">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Certificate Image */}
                <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#101010] sm:h-32 sm:w-48">
                  {certificate.imageUrl ? (
                    <Image
                      src={certificate.imageUrl}
                      alt={certificate.title}
                      width={384}
                      height={256}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon
                        size={20}
                        className="text-white/20"
                      />
                    </div>
                  )}
                </div>

                {/* Certificate Information */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        px-2.5
                        py-1
                        text-[9px]
                        uppercase
                        tracking-[0.15em]
                        text-white/40
                      "
                    >
                      Certificate
                    </span>
                  </div>

                  <h2 className="text-lg font-medium text-white">
                    {certificate.title}
                  </h2>

                  <p className="mt-1 text-sm text-white/45">
                    {certificate.issuer}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {certificate.skills?.map(
                      (skill) => (
                        <span
                          key={skill}
                          className="
                            rounded-md
                            bg-white/[0.04]
                            px-2
                            py-1
                            text-[9px]
                            text-white/35
                          "
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Date */}
                <div className="hidden shrink-0 text-right sm:block">
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-white/20
                    "
                  >
                    Date
                  </p>

                  <p className="mt-1 text-sm text-white/50">
                    {certificate.date || "-"}
                  </p>
                </div>

                {/* Actions */}
                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    border-t
                    border-white/[0.06]
                    pt-4
                    lg:border-l
                    lg:border-t-0
                    lg:pl-6
                    lg:pt-0
                  "
                >
                  {/* Certificate Link */}
                  {certificate.certificateUrl && (
                    <a
                      href={certificate.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        text-white/35
                        transition
                        hover:border-white/20
                        hover:bg-white/[0.05]
                        hover:text-white
                      "
                      aria-label="Open certificate"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {/* Edit */}
                  <Link
                    href={`/admin/certificates/${certificate.id}/edit`}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/10
                      text-white/35
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.05]
                      hover:text-white
                    "
                    aria-label="Edit certificate"
                  >
                    <Edit3 size={15} />
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        certificate.id,
                        certificate.title
                      )
                    }
                    disabled={
                      deletingId === certificate.id
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-red-500/10
                      text-red-400/50
                      transition
                      hover:border-red-500/20
                      hover:bg-red-500/[0.05]
                      hover:text-red-400
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                    aria-label="Delete certificate"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}