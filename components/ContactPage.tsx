"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            overflow-hidden
            rounded-[2.5rem]
            border
            border-white/[0.08]
            bg-[#151515]
            px-7
            py-16
            md:px-12
            md:py-20
            lg:px-20
            lg:py-28
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-[420px]
              w-[420px]
              rounded-full
              border
              border-white/[0.05]
            "
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/25" />

              <span className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                03 Contact
              </span>
            </div>

            <h1
              className="
                mt-12
                max-w-6xl
                text-[clamp(4rem,9vw,9rem)]
                font-medium
                leading-[0.82]
                tracking-[-0.075em]
              "
            >
              Let&apos;s make
              <br />
              <span className="text-white/25">
                something real.
              </span>
            </h1>

            <p className="mt-10 max-w-xl text-sm leading-7 text-white/45 md:text-base">
              Have a project, opportunity, or simply want
              to connect? Feel free to reach out.
            </p>

            <a
              href="mailto:your-email@example.com"
              className="
                mt-10
                inline-flex
                items-center
                gap-5
                rounded-full
                bg-white
                px-7
                py-4
                text-xs
                font-medium
                text-black
                transition-transform
                duration-300
                hover:scale-[1.03]
              "
            >
              Get in touch
              <span>↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}