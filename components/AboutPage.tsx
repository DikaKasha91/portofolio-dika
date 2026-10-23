"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
} from "lucide-react";

const exploringItems = [
  {
    number: "01",
    title: "Artificial Intelligence",
  },
  {
    number: "02",
    title: "Machine Learning",
  },
  {
    number: "03",
    title: "Computer Vision",
  },
  {
    number: "04",
    title: "UI / UX Design",
  },
  {
    number: "05",
    title: "Software Development",
  },
];

const buildItems = [
  {
    number: "01",
    title: "Artificial Intelligence",
  },
  {
    number: "02",
    title: "Machine Learning",
  },
  {
    number: "03",
    title: "Computer Vision",
  },
  {
    number: "04",
    title: "Software",
  },
  {
    number: "05",
    title: "Interface",
  },
];

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="w-full overflow-hidden bg-[#101010] text-white">

      {/* ================================================= */}
      {/* 01 — ABOUT ME */}
      {/* ================================================= */}

      <section
        className="
          relative
          mx-3
          mt-2
          min-h-[calc(100vh-1rem)]
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.09]
          bg-[#151515]
          md:mx-6
          md:mt-3
          md:min-h-[calc(100vh-1.5rem)]
        "
      >
        {/* Decorative Lines */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-60
          "
        >
          <div
            className="
              absolute
              right-[24%]
              top-0
              h-full
              w-px
              bg-white/[0.055]
            "
          />

          <div
            className="
              absolute
              left-0
              top-[72%]
              h-px
              w-full
              bg-white/[0.055]
            "
          />
        </div>

        {/* Section Number */}

        <div
          className="
            absolute
            left-8
            top-16
            hidden
            items-center
            gap-3
            md:flex
          "
        >
          <span className="h-px w-8 bg-white/30" />

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            01 About Me
          </span>
        </div>

        {/* Main Content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[calc(100vh-1rem)]
            max-w-7xl
            items-center
            px-8
            py-28
            md:min-h-[calc(100vh-1.5rem)]
            md:px-16
            lg:px-20
          "
        >
          <div
            className="
              grid
              w-full
              items-center
              gap-14
              lg:grid-cols-[1.5fr_0.75fr]
              lg:gap-20
            "
          >
            {/* LEFT CONTENT */}

            <div className="max-w-3xl">
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
              >
                <p
                  className="
                    mb-5
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-white/30
                    md:hidden
                  "
                >
                  01 About Me
                </p>

                <h1
                  className="
                    text-[4.5rem]
                    font-medium
                    leading-[0.84]
                    tracking-[-0.065em]
                    text-white
                    sm:text-[6rem]
                    md:text-[7rem]
                    lg:text-[7.8rem]
                  "
                >
                  Beyond
                  <br />
                  the code.
                </h1>

                <p
                  className="
                    mt-7
                    max-w-2xl
                    text-2xl
                    font-normal
                    leading-tight
                    tracking-[-0.035em]
                    text-white/35
                    md:text-3xl
                    lg:text-[2.5rem]
                  "
                >
                  The person behind every
                  project.
                </p>
              </motion.div>

              {/* DESCRIPTION */}

              <motion.p
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="
                  mt-10
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/50
                  md:text-base
                  md:leading-8
                "
              >
                I&apos;m a Computer Engineering
                graduate from Universitas Syiah
                Kuala with a strong interest in
                the intersection of Artificial
                Intelligence, software development,
                and digital experiences.
              </motion.p>

              {/* CV DOWNLOAD BUTTONS */}

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="
                  mt-8
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >
                {/* AI / ML CV */}

                <a
                  href="/cv/CV-Muhammad-Dika-Rafi-Kasha-AI.pdf"
                  download
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-8
                    rounded-full
                    border
                    border-white/15
                    bg-white/[0.03]
                    px-5
                    py-3
                    text-xs
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:border-white/30
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <ArrowDownToLine
                      size={14}
                      strokeWidth={1.7}
                    />

                    AI / ML CV
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="
                      opacity-40
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>

                {/* FRONTEND CV */}

                <a
                  href="/cv/CV-Muhammad-Dika-Rafi-Kasha-FE.pdf"
                  download
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    gap-8
                    rounded-full
                    border
                    border-white/10
                    px-5
                    py-3
                    text-xs
                    font-medium
                    text-white/65
                    transition-all
                    duration-300
                    hover:border-white/25
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <span
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <ArrowDownToLine
                      size={14}
                      strokeWidth={1.7}
                    />

                    Frontend CV
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="
                      opacity-40
                      transition-all
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </a>
              </motion.div>

              {/* TAGS */}

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: 0.3,
                }}
                className="
                  mt-9
                  flex
                  flex-wrap
                  gap-x-7
                  gap-y-3
                "
              >
                {[
                  "Computer Engineering",
                  "Software + AI",
                  "UI / UX",
                  "Syiah Kuala University",
                ].map((item) => (
                  <span
                    key={item}
                    className="
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.18em]
                      text-white/25
                    "
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* PROFILE IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="
                relative
                mx-auto
                w-full
                max-w-[360px]
                lg:mx-0
                lg:ml-auto
              "
            >
              <div
                className="
                  relative
                  aspect-[0.78]
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/[0.08]
                  bg-[#202020]
                "
              >
                {/* PROFILE IMAGE */}

                <Image
                  src="/images/profile.png"
                  alt="Muhammad Dika Rafi Kasha"
                  width={360}
                  height={462}
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                  "
                />

                {/* IMAGE GRADIENT */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-transparent
                    to-transparent
                  "
                />

                {/* PORTRAIT LABEL */}

                <div
                  className="
                    absolute
                    bottom-6
                    left-6
                  "
                >
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-white/40
                    "
                  >
                    Portrait
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    Dika Rafi
                  </p>
                </div>

                {/* IMAGE ARROW */}

                <div
                  className="
                    absolute
                    bottom-5
                    right-5
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-black/20
                    backdrop-blur-md
                  "
                >
                  <ArrowUpRight
                    size={14}
                    className="text-white/70"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 02 — THE WORK BENEATH THE WORK */}
      {/* ================================================= */}

      <section
        className="
          relative
          mx-3
          mt-3
          min-h-[90vh]
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.09]
          bg-[#151515]
          md:mx-6
        "
      >
        {/* Decorative Circles */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-8%]
            top-[-20%]
            h-[520px]
            w-[520px]
            rounded-full
            border
            border-white/[0.045]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-[8%]
            h-[350px]
            w-[350px]
            rounded-full
            border
            border-white/[0.035]
          "
        />

        {/* Section Label */}

        <div
          className="
            absolute
            left-8
            top-16
            hidden
            items-center
            gap-3
            md:flex
          "
        >
          <span className="h-px w-8 bg-white/30" />

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            02 The Work Beneath The Work
          </span>
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-8
            py-28
            md:px-16
            md:py-32
            lg:px-20
          "
        >
          <p
            className="
              mb-5
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/30
              md:hidden
            "
          >
            02 The Work Beneath The Work
          </p>

          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              ml-auto
              max-w-5xl
              text-5xl
              font-medium
              leading-[0.92]
              tracking-[-0.06em]
              md:text-7xl
              lg:text-[5.7rem]
            "
          >
            <span className="text-white">
              Curiosity that turns into
            </span>

            <br />

            <span className="text-white/20">
              something useful.
            </span>
          </motion.h2>

          {/* CONTENT */}

          <div
            className="
              mt-20
              grid
              gap-12
              lg:grid-cols-[180px_1fr]
            "
          >
            {/* DESCRIPTION */}

            <div>
              <p
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-white/25
                "
              >
                Currently Exploring
              </p>

              <p
                className="
                  mt-5
                  max-w-[180px]
                  text-sm
                  leading-6
                  text-white/40
                "
              >
                Areas that continue to
                shape the way I think,
                design, and build.
              </p>
            </div>

            {/* EXPLORING LIST */}

            <div>
              {exploringItems.map(
                (item, index) => (
                  <motion.div
                    key={item.number}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                    }}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/[0.08]
                      py-6
                      transition-colors
                      duration-300
                      last:border-b
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-6
                      "
                    >
                      <span
                        className="
                          text-[9px]
                          text-white/20
                        "
                      >
                        {item.number}
                      </span>

                      <span
                        className="
                          text-base
                          text-white/55
                          transition-colors
                          duration-300
                          group-hover:text-white
                          md:text-lg
                        "
                      >
                        {item.title}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="
                        text-white/20
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-white/70
                      "
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 03 — WHAT I BUILD */}
      {/* ================================================= */}

      <section
        className="
          relative
          mx-3
          mt-3
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.09]
          bg-[#151515]
          md:mx-6
        "
      >
        {/* Decorative Line */}

        <div
          className="
            pointer-events-none
            absolute
            right-[23%]
            top-[-15%]
            h-[700px]
            w-px
            rotate-[14deg]
            bg-white/[0.045]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-5%]
            top-[10%]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-white/[0.035]
          "
        />

        {/* Section Label */}

        <div
          className="
            absolute
            left-8
            top-16
            hidden
            items-center
            gap-3
            md:flex
          "
        >
          <span className="h-px w-8 bg-white/30" />

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            03 What I Build
          </span>
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-6xl
            px-8
            py-28
            md:px-16
            md:py-32
            lg:px-20
          "
        >
          <p
            className="
              mb-5
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/30
              md:hidden
            "
          >
            03 What I Build
          </p>

          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="
              max-w-5xl
              text-5xl
              font-medium
              leading-[0.92]
              tracking-[-0.06em]
              md:text-7xl
              lg:text-[5.6rem]
            "
          >
            <span className="text-white">
              Technology
            </span>{" "}

            <span className="text-white/20">
              with purpose.
            </span>
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
              mt-10
              max-w-3xl
              text-sm
              leading-7
              text-white/45
              md:text-base
              md:leading-8
            "
          >
            I enjoy combining software,
            artificial intelligence, data, and
            thoughtful interfaces to turn
            complex ideas into useful digital
            experiences.
          </motion.p>

          {/* BUILD GRID */}

          <div
            className="
              mt-16
              grid
              border-t
              border-white/[0.08]
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {buildItems.map(
              (item, index) => (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  className="
                    flex
                    items-center
                    gap-5
                    border-b
                    border-white/[0.08]
                    py-6
                    md:pr-8
                    lg:border-l-0
                    lg:[&:nth-child(3n+2)]:border-l
                    lg:[&:nth-child(3n+2)]:pl-8
                    lg:[&:nth-child(3n+3)]:border-l
                    lg:[&:nth-child(3n+3)]:pl-8
                  "
                >
                  <span
                    className="
                      text-[9px]
                      text-white/20
                    "
                  >
                    {item.number}
                  </span>

                  <span
                    className="
                      text-sm
                      text-white/50
                      md:text-base
                    "
                  >
                    {item.title}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 04 — PERSONAL PHILOSOPHY */}
      {/* ================================================= */}

      <section
        className="
          relative
          mx-3
          mt-3
          min-h-[65vh]
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.09]
          bg-[#151515]
          md:mx-6
        "
      >
        {/* Decorative Circles */}

        <div
          className="
            pointer-events-none
            absolute
            -left-20
            top-[-30%]
            h-[520px]
            w-[520px]
            rounded-full
            border
            border-white/[0.045]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-5
            top-[-15%]
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-white/[0.035]
          "
        />

        {/* Section Label */}

        <div
          className="
            absolute
            left-8
            top-16
            hidden
            items-center
            gap-3
            md:flex
          "
        >
          <span className="h-px w-8 bg-white/30" />

          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/35
            "
          >
            04 Personal Philosophy
          </span>
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[65vh]
            max-w-7xl
            items-center
            px-8
            py-28
            md:px-16
            lg:px-20
          "
        >
          <div className="ml-auto w-full max-w-5xl">
            <p
              className="
                mb-5
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-white/30
                md:hidden
              "
            >
              04 Personal Philosophy
            </p>

            {/* HEADING */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
                md:text-7xl
                lg:text-[5.8rem]
              "
            >
              <span className="text-white">
                Always curious.
              </span>

              <br />

              <span className="text-white/20">
                Always building.
              </span>
            </motion.h2>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                delay: 0.12,
              }}
              className="
                mt-10
                max-w-3xl
                text-sm
                leading-7
                text-white/45
                md:text-base
                md:leading-8
              "
            >
              I believe growth comes from
              curiosity, experimentation, and
              the willingness to keep building
              even when the answer is not
              obvious yet.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 05 — BACK TO THE WORK */}
      {/* ================================================= */}

      <section
        className="
          relative
          mx-3
          mb-3
          mt-3
          overflow-hidden
          rounded-[2rem]
          border
          border-white/[0.09]
          bg-[#151515]
          md:mx-6
        "
      >
        {/* Decorative Line */}

        <div
          className="
            pointer-events-none
            absolute
            right-[24%]
            top-[-20%]
            h-[500px]
            w-px
            rotate-[8deg]
            bg-white/[0.045]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-7xl
            px-8
            py-24
            md:px-16
            md:py-28
            lg:px-20
          "
        >
          {/* Section Label */}

          <p
            className="
              mb-8
              flex
              items-center
              gap-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.22em]
              text-white/30
            "
          >
            <span className="h-px w-8 bg-white/30" />

            05 Back To The Work
          </p>

          <div
            className="
              flex
              flex-col
              gap-10
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            {/* CTA HEADING */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="
                max-w-4xl
                text-5xl
                font-medium
                leading-[0.9]
                tracking-[-0.06em]
                md:text-7xl
                lg:text-[5.7rem]
              "
            >
              <span className="text-white">
                See how curiosity
              </span>

              <span className="text-white/20">
                {" "}
                becomes
                <br />
                something real.
              </span>
            </motion.h2>

            {/* EXPLORE PROJECTS */}

            <motion.a
              href="/#projects"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="
                group
                flex
                shrink-0
                items-center
                justify-between
                gap-10
                rounded-full
                border
                border-white/15
                px-6
                py-4
                text-sm
                text-white/80
                transition-all
                duration-300
                hover:border-white/30
                hover:bg-white
                hover:text-black
                lg:mb-2
              "
            >
              <span>
                Explore projects
              </span>

              <ArrowUpRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}