"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "2026",
    role: "Human Resources Management Intern",
    company: "Lapas Narkotika Langsa",
    type: "Internship — MagangHub Kemnaker",
  },
  {
    year: "2025",
    role: "Machine Learning Intern",
    company: "Bank Syariah Indonesia",
    type: "Machine Learning / NLP",
  },
  {
    year: "2024",
    role: "Teaching Assistant",
    company: "Universitas Syiah Kuala",
    type: "Programming / Algorithms / HCI",
  },
];

export default function ExperiencePage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/25" />

            <span className="text-[9px] uppercase tracking-[0.28em] text-white/35">
              02 Experience
            </span>
          </div>

          <h1
            className="
              mt-10
              max-w-5xl
              text-[clamp(4rem,9vw,9rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            The work
            <br />
            <span className="text-white/25">
              behind me.
            </span>
          </h1>
        </motion.div>

        <div className="mt-24 border-t border-white/10">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className="
                grid
                gap-8
                border-b
                border-white/10
                py-10
                md:grid-cols-[120px_1fr_0.7fr]
              "
            >
              <span className="text-[10px] tracking-[0.15em] text-white/25">
                {experience.year}
              </span>

              <div>
                <h2 className="text-2xl tracking-[-0.03em] text-white/80 md:text-3xl">
                  {experience.role}
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  {experience.company}
                </p>
              </div>

              <p className="text-sm leading-6 text-white/35">
                {experience.type}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}