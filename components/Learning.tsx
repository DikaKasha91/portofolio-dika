"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  Code2,
  Database,
  PenTool,
  ScanFace,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Certificate } from "@/types/certificate";

const learningJourney = [
  {
    year: "2026",
    number: "01",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "Building with AI",
    description:
      "Deepening my understanding of Artificial Intelligence, Machine Learning, and Deep Learning through structured learning and applied projects.",
    tags: ["AI", "MACHINE LEARNING", "DEEP LEARNING"],
    icon: Brain,
  },
  {
    year: "2025",
    number: "02",
    category: "SOFTWARE DEVELOPMENT",
    title: "Turning ideas into products",
    description:
      "Learning to transform ideas and real-world requirements into practical digital products through web and application development.",
    tags: ["WEB DEVELOPMENT", "APPLICATIONS", "PROGRAMMING"],
    icon: Code2,
  },
  {
    year: "2024",
    number: "03",
    category: "UI/UX DESIGN",
    title: "Designing with people in mind",
    description:
      "Exploring user-centered design, interface design, and prototyping to create digital experiences that are useful and intuitive.",
    tags: ["UI/UX", "FIGMA", "USER-CENTERED DESIGN"],
    icon: PenTool,
  },
  {
    year: "2024",
    number: "04",
    category: "COMPUTER VISION",
    title: "Teaching machines to see",
    description:
      "Exploring image classification, Convolutional Neural Networks, lightweight architectures, and explainable AI through research and experimentation.",
    tags: ["CNN", "COMPUTER VISION", "GRAD-CAM"],
    icon: ScanFace,
  },
  {
    year: "2024",
    number: "05",
    category: "DATA & NLP",
    title: "Learning from data",
    description:
      "Developing practical skills in data analysis, natural language processing, visualization, and machine learning for real-world problems.",
    tags: ["DATA SCIENCE", "NLP", "DATA ANALYSIS"],
    icon: BarChart3,
  },
];

export default function Learning() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  useEffect(() => {
    async function loadCertificates() {
      try {
        const response = await fetch("/api/certificates");

        if (!response.ok) {
          throw new Error("Failed to fetch certificates");
        }

        const data: Certificate[] = await response.json();

        setCertificates(data);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      }
    }

    loadCertificates();
  }, []);

  return (
    <>
      <section
        id="learning"
        className="
          relative
          overflow-hidden
          bg-[#101010]
          px-5
          py-28
          text-white
          md:px-10
          lg:py-36
        "
      >
        {/* Background decoration */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-180px]
            top-[20%]
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-white/[0.025]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-120px]
            top-[24%]
            h-[380px]
            w-[380px]
            rounded-full
            border
            border-white/[0.025]
          "
        />

        <div className="mx-auto max-w-[1120px]">
          {/* Section Heading */}
          <div className="mb-14">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-white/25" />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/35
                "
              >
                Learning
              </span>
            </div>

            <h2
              className="
                max-w-[700px]
                text-[clamp(4rem,8vw,7rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.065em]
              "
            >
              <span className="text-white">Learning by</span>
              <br />
              <span className="text-white/25">building.</span>
            </h2>

            <p
              className="
                mt-8
                max-w-[650px]
                text-sm
                leading-7
                text-white/40
                md:text-[15px]
              "
            >
              I believe the best way to learn technology is by putting
              knowledge into practice. My learning journey grows alongside
              the projects I build, the problems I solve, and the things I
              explore.
            </p>
          </div>

          {/* ============================= */}
          {/* LEARNING JOURNEY */}
          {/* ============================= */}

          <div
            className="
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-[#151515]
            "
          >
            {learningJourney.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                  }}
                  className="
                    relative
                    grid
                    min-h-[210px]
                    grid-cols-[100px_1fr]
                    border-b
                    border-white/[0.07]
                    last:border-b-0
                    md:grid-cols-[145px_1fr]
                  "
                >
                  {/* Subtle grid */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      opacity-50
                      [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
                      [background-size:36px_36px]
                    "
                  />

                  {/* Year */}
                  <div className="relative z-10 p-7 md:p-9">
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-white/35
                      "
                    >
                      {item.year}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-px w-5 bg-white/20" />

                      <span
                        className="
                          text-[8px]
                          tracking-[0.2em]
                          text-white/25
                        "
                      >
                        {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="
                      relative
                      z-10
                      border-l
                      border-white/[0.07]
                      px-7
                      py-8
                      md:px-10
                      md:py-9
                    "
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/[0.1]
                            bg-white/[0.02]
                          "
                        >
                          <Icon
                            size={15}
                            strokeWidth={1.4}
                            className="text-white/45"
                          />
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <span
                              className="
                                text-[8px]
                                uppercase
                                tracking-[0.25em]
                                text-white/30
                              "
                            >
                              {item.category}
                            </span>

                            <span className="h-px w-4 bg-white/15" />
                          </div>

                          <h3
                            className="
                              mt-3
                              text-xl
                              font-medium
                              tracking-[-0.035em]
                              text-white
                              md:text-[21px]
                            "
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div
                        className="
                          hidden
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/[0.1]
                          text-white/40
                          md:flex
                        "
                      >
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.3}
                        />
                      </div>
                    </div>

                    <p
                      className="
                        mt-6
                        max-w-[760px]
                        text-sm
                        leading-7
                        text-white/40
                      "
                    >
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            rounded-full
                            border
                            border-white/[0.1]
                            px-3
                            py-1.5
                            text-[8px]
                            uppercase
                            tracking-[0.15em]
                            text-white/30
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Learning Journey Footer */}
            <div
              className="
                flex
                items-center
                justify-between
                px-7
                py-5
                md:px-9
              "
            >
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  text-white/25
                "
              >
                Learning Journey
              </span>

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-white/20
                "
              >
                AI — ML — UI/UX — CV
              </span>
            </div>
          </div>

          {/* ============================= */}
          {/* CONTINUOUS LEARNING */}
          {/* ============================= */}

          <div className="mt-28">
            <h3
              className="
                text-[clamp(3.5rem,7vw,6.5rem)]
                font-medium
                leading-[0.85]
                tracking-[-0.065em]
              "
            >
              <span className="text-white">Continuous</span>
              <span className="text-white/25"> learning.</span>
            </h3>

            <div
              className="
                mt-10
                overflow-hidden
                rounded-[2rem]
                border
                border-white/[0.08]
                bg-[#151515]
              "
            >
              {certificates.length > 0 ? (
                certificates.map((certificate, index) => (
                  <motion.button
                    key={certificate.id}
                    type="button"
                    onClick={() =>
                      setSelectedCertificate(certificate)
                    }
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.04,
                    }}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      gap-4
                      border-b
                      border-white/[0.07]
                      px-7
                      py-5
                      text-left
                      transition-colors
                      duration-300
                      last:border-b-0
                      hover:bg-white/[0.025]
                      md:px-7
                    "
                  >
                    {/* Certificate Icon */}
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.1]
                        bg-white/[0.02]
                      "
                    >
                      {index === 0 ? (
                        <Brain
                          size={14}
                          strokeWidth={1.4}
                          className="text-white/45"
                        />
                      ) : index === 1 ? (
                        <BarChart3
                          size={14}
                          strokeWidth={1.4}
                          className="text-white/45"
                        />
                      ) : index === 2 ? (
                        <Database
                          size={14}
                          strokeWidth={1.4}
                          className="text-white/45"
                        />
                      ) : index === 3 ? (
                        <BarChart3
                          size={14}
                          strokeWidth={1.4}
                          className="text-white/45"
                        />
                      ) : index === 4 ? (
                        <PenTool
                          size={14}
                          strokeWidth={1.4}
                          className="text-white/45"
                        />
                      ) : (
                        <Code2
                          size={14}
                          strokeWidth={1.4}
                          className="text-white/45"
                        />
                      )}
                    </div>

                    {/* Certificate Information */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-white
                        "
                      >
                        {certificate.title}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[8px]
                          uppercase
                          tracking-[0.18em]
                          text-white/25
                        "
                      >
                        {certificate.issuer}
                      </p>
                    </div>

                    {/* Date */}
                    <span
                      className="
                        hidden
                        shrink-0
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-white/25
                        sm:block
                      "
                    >
                      {certificate.date}
                    </span>

                    {/* Arrow */}
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.1]
                        text-white/35
                        transition-all
                        duration-300
                        group-hover:border-white/20
                        group-hover:bg-white/[0.04]
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.3}
                      />
                    </div>
                  </motion.button>
                ))
              ) : (
                <div className="px-7 py-12 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/20">
                    No certifications available
                  </p>
                </div>
              )}

              {/* Certification Footer */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  px-7
                  py-5
                "
              >
                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  {certificates.length
                    .toString()
                    .padStart(2, "0")}{" "}
                  Certifications
                </span>

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  Dicoding Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* CERTIFICATE PREVIEW MODAL */}
      {/* ================================= */}

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/80
              px-5
              py-8
              backdrop-blur-md
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSelectedCertificate(null)
            }
          >
            <motion.div
              className="
                relative
                flex
                max-h-[90vh]
                w-full
                max-w-5xl
                flex-col
                overflow-hidden
                rounded-[2rem]
                border
                border-white/[0.1]
                bg-[#151515]
                shadow-2xl
                md:flex-row
              "
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() =>
                  setSelectedCertificate(null)
                }
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/[0.1]
                  bg-[#151515]/80
                  text-white/50
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-black
                "
                aria-label="Close certificate preview"
              >
                <X
                  size={15}
                  strokeWidth={1.5}
                />
              </button>

              {/* Certificate Image */}
              <div
                className="
                  flex
                  min-h-[300px]
                  flex-1
                  items-center
                  justify-center
                  bg-[#0d0d0d]
                  p-6
                  md:min-h-[520px]
                  md:p-10
                "
              >
                {selectedCertificate.imageUrl ? (
                  <Image
                    src={selectedCertificate.imageUrl}
                    alt={`${selectedCertificate.title} certificate`}
                    width={1200}
                    height={900}
                    className="
                      max-h-[70vh]
                      max-w-full
                      rounded-lg
                      object-contain
                      shadow-2xl
                    "
                  />
                ) : (
                  <div className="text-xs uppercase tracking-[0.2em] text-white/20">
                    Certificate image unavailable
                  </div>
                )}
              </div>

              {/* Certificate Information */}
              <div
                className="
                  flex
                  w-full
                  flex-col
                  justify-center
                  border-t
                  border-white/[0.08]
                  p-7
                  md:w-[320px]
                  md:border-l
                  md:border-t-0
                  md:p-8
                "
              >
                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Certificate
                </span>

                <h4
                  className="
                    mt-4
                    text-2xl
                    font-medium
                    leading-tight
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  {selectedCertificate.title}
                </h4>

                <p
                  className="
                    mt-3
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/30
                  "
                >
                  {selectedCertificate.issuer}
                </p>

                <p
                  className="
                    mt-8
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  Issued
                </p>

                <p className="mt-2 text-sm text-white/60">
                  {selectedCertificate.date}
                </p>

                {/* Skills */}
                <div className="mt-7">
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-white/25
                    "
                  >
                    Skills
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedCertificate.skills.map(
                      (skill) => (
                        <span
                          key={skill}
                          className="
                            rounded-full
                            border
                            border-white/[0.1]
                            px-3
                            py-1.5
                            text-[8px]
                            uppercase
                            tracking-[0.15em]
                            text-white/35
                          "
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Credential URL */}
                {selectedCertificate.certificateUrl && (
                  <a
                    href={
                      selectedCertificate.certificateUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      mt-8
                      inline-flex
                      w-fit
                      items-center
                      gap-4
                      rounded-full
                      border
                      border-white/[0.12]
                      bg-white/[0.04]
                      px-5
                      py-3
                      text-xs
                      font-medium
                      text-white/60
                      transition-all
                      duration-300
                      hover:border-white/[0.2]
                      hover:bg-white/[0.08]
                      hover:text-white
                    "
                  >
                    View Credential

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                    />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}