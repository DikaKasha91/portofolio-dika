"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiArrowDownRight,
  FiArrowUpRight,
} from "react-icons/fi";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        px-5
        md:px-8
        lg:px-10
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[36%]
          top-[18%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-white/[0.018]
          blur-[140px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-[35%]
          bg-gradient-to-t
          from-black/20
          to-transparent
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          min-h-screen
          max-w-[1500px]
          flex-col
          justify-center
          pb-20
          pt-28
          lg:pb-16
          lg:pt-24
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:gap-12
            xl:grid-cols-[minmax(0,1fr)_390px]
            xl:gap-16
          "
        >
          {/* =================================================
              LEFT — INTRODUCTION
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              max-w-5xl
            "
          >
            {/* Eyebrow */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.12,
              }}
              className="
                mb-7
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-9
                  bg-white/25
                "
              />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.32em]
                  text-white/35
                "
              >
                Computer Engineering × AI
              </span>
            </motion.div>

            {/* =================================================
                NAME
            ================================================= */}

            <div
              className="
                select-none
                leading-[0.81]
              "
            >
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  text-[clamp(4.6rem,10.5vw,9.5rem)]
                  font-medium
                  tracking-[-0.075em]
                  text-white
                "
              >
                DIKA
              </motion.h1>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  text-[clamp(4.6rem,10.5vw,9.5rem)]
                  font-medium
                  tracking-[-0.075em]
                  text-white/25
                "
              >
                RAFI.
              </motion.h1>
            </div>

            {/* Full name */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.45,
              }}
              className="
                mt-7
                text-[9px]
                uppercase
                tracking-[0.28em]
                text-white/30
                md:text-[10px]
              "
            >
              Muhammad Dika Rafi Kasha
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.52,
              }}
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-white/45
                md:text-base
                md:leading-8
              "
            >
              Computer Engineering graduate focused on{" "}
              <span className="text-white/80">
                Artificial Intelligence
              </span>
              , Machine Learning, Computer Vision, and
              thoughtful digital experiences.
            </motion.p>

            {/* CTA + fields */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.65,
                delay: 0.62,
              }}
              className="
                mt-8
                flex
                flex-col
                gap-6
                sm:flex-row
                sm:items-center
              "
            >
              {/* CTA */}
              <motion.a
                href="#projects"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  inline-flex
                  w-fit
                  min-w-[155px]
                  shrink-0
                  items-center
                  justify-between
                  gap-4
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-[#181818]
                  px-4
                  py-3
                  text-xs
                  font-medium
                  text-white
                  whitespace-nowrap
                  transition-all
                  duration-300
                  hover:border-white/[0.22]
                  hover:bg-[#202020]
                  hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]
                "
              >
                <span className="text-white">
                  Explore my work
                </span>

                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/[0.10]
                    bg-white/[0.06]
                    text-white
                    transition-all
                    duration-300
                    group-hover:bg-white/[0.10]
                  "
                >
                  <FiArrowUpRight size={13} />
                </span>
              </motion.a>

              {/* Focus areas */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/20
                "
              >
                <span>AI</span>

                <span className="h-3 w-px bg-white/10" />

                <span>ML</span>

                <span className="h-3 w-px bg-white/10" />

                <span>CV</span>
              </div>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT — PROFILE IMAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.975,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.95,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[330px]
              lg:mx-0
              lg:ml-auto
              lg:max-w-[360px]
            "
          >
            <div
              className="
                relative
                aspect-[0.76]
                overflow-hidden
                rounded-[2.5rem]
                border
                border-white/[0.08]
                bg-[#151515]
              "
            >
              {/* Inner frame */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-3
                  z-20
                  rounded-[2rem]
                  border
                  border-white/[0.07]
                "
              />

              {/* Profile image */}
              <Image
                src="/images/profile2.jpeg"
                alt="Muhammad Dika Rafi Kasha"
                width={360}
                height={474}
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-1000
                  hover:scale-[1.025]
                "
              />

              {/* Gradient */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/75
                  via-black/5
                  to-transparent
                "
              />

              {/* Top label */}
              <div
                className="
                  absolute
                  left-7
                  top-7
                  z-30
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-white/60
                  "
                />

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/40
                  "
                >
                  Portfolio
                </span>
              </div>

              {/* Bottom information */}
              <div
                className="
                  absolute
                  bottom-6
                  left-7
                  right-7
                  z-30
                  flex
                  items-end
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.25em]
                      text-white/35
                    "
                  >
                    Muhammad Dika Rafi Kasha
                  </p>

                  <p
                    className="
                      mt-2
                      text-[10px]
                      text-white/70
                    "
                  >
                    AI · Machine Learning · Computer Vision
                  </p>
                </div>

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
                    border-white/15
                    bg-black/20
                    text-white/50
                    backdrop-blur-sm
                  "
                >
                  <FiArrowUpRight size={15} />
                </div>
              </div>
            </div>

            {/* Floating index */}
            <div
              className="
                absolute
                -bottom-4
                -right-3
                hidden
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-[#151515]
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-white/30
                md:flex
              "
            >
              01
            </div>
          </motion.div>
        </div>

        {/* =================================================
            BOTTOM META
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.9,
          }}
          className="
            absolute
            bottom-7
            left-0
            right-0
            hidden
            items-center
            justify-between
            md:flex
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white/20
            "
          >
            <span>
              Selected work
            </span>

            <span className="h-px w-8 bg-white/10" />

            <span>
              Selected ideas
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white/20
            "
          >
            Scroll

            <FiArrowDownRight size={12} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}