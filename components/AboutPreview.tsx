"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiCpu,
  FiLayers,
  FiCode,
} from "react-icons/fi";

import { usePageTransition } from "@/components/PageTransition";

const focusAreas = [
  {
    number: "01",
    title: "Artificial Intelligence",
    description:
      "Exploring intelligent systems through machine learning and deep learning.",
    icon: FiCpu,
  },
  {
    number: "02",
    title: "Computer Vision",
    description:
      "Building systems that understand and interpret visual information.",
    icon: FiCode,
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Designing interfaces that make technology clearer and easier to use.",
    icon: FiLayers,
  },
];

export default function AboutPreview() {
  const { navigate } = usePageTransition();

  const handleAbout = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    navigate("/about");
  };

  return (
    <section
      id="about-preview"
      className="
        relative
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-32
        lg:px-14
        lg:py-40
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/[0.018]
          blur-[130px]
        "
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/25" />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/35
            "
          >
            About me
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-10
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
            md:rounded-[2.5rem]
          "
        >
          {/* Decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[500px]
              w-[500px]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              top-20
              h-[300px]
              w-[300px]
              rounded-full
              bg-white/[0.015]
              blur-[100px]
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              grid
              lg:grid-cols-[1.15fr_0.85fr]
            "
          >
            {/* Text side */}
            <div
              className="
                flex
                flex-col
                justify-between
                p-7
                md:p-10
                lg:p-14
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Computer Engineering × AI
                </p>

                <h2
                  className="
                    mt-7
                    max-w-3xl
                    text-[clamp(3rem,5.5vw,6rem)]
                    font-medium
                    leading-[0.88]
                    tracking-[-0.065em]
                    text-white
                  "
                >
                  More than
                  <br />
                  <span className="text-white/25">
                    just code.
                  </span>
                </h2>

                <p
                  className="
                    mt-8
                    max-w-xl
                    text-sm
                    leading-7
                    text-white/45
                    md:text-base
                    md:leading-8
                  "
                >
                  I&apos;m Muhammad Dika Rafi Kasha, a
                  Computer Engineering graduate focused on
                  Artificial Intelligence, Machine Learning,
                  and Computer Vision.
                </p>

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-sm
                    leading-7
                    text-white/35
                    md:text-base
                    md:leading-8
                  "
                >
                  I enjoy combining intelligent technologies
                  with thoughtful user experiences, turning
                  complex ideas into useful and intuitive
                  digital products.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <motion.a
                  href="/about"
                  onClick={handleAbout}
                  whileHover={{
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-4
                    text-sm
                    font-medium
                    text-white/75
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  <span
                    className="
                      border-b
                      border-white/20
                      pb-1
                      transition-colors
                      duration-300
                      group-hover:border-white/60
                    "
                  >
                    More about me
                  </span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.1]
                      text-white/40
                      transition-all
                      duration-300
                      group-hover:border-white/25
                      group-hover:text-white
                    "
                  >
                    <FiArrowUpRight size={15} />
                  </span>
                </motion.a>
              </div>
            </div>

            {/* Photo side */}
            <div
              className="
                relative
                min-h-[500px]
                border-t
                border-white/[0.07]
                lg:min-h-[620px]
                lg:border-l
                lg:border-t-0
              "
            >
              {/* Image */}
              <Image
                src="/images/profile.png"
                alt="Muhammad Dika Rafi Kasha"
                fill
                className="
                  object-cover
                  object-center
                  grayscale
                  transition-all
                  duration-700
                  group-hover:grayscale-0
                "
                sizes="
                  (max-width: 1024px) 100vw,
                  45vw
                "
              />

              {/* Overlay */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-black/5
                  to-transparent
                "
              />

              {/* Image label */}
              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
                  flex
                  items-end
                  justify-between
                  md:bottom-8
                  md:left-8
                  md:right-8
                "
              >
                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.25em]
                      text-white/40
                    "
                  >
                    Muhammad Dika Rafi Kasha
                  </p>

                  <p
                    className="
                      mt-2
                      text-xs
                      text-white/65
                    "
                  >
                    Computer Engineering
                  </p>
                </div>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  01
                </span>
              </div>
            </div>
          </div>

          {/* Focus areas */}
          <div
            className="
              relative
              z-10
              grid
              border-t
              border-white/[0.07]
              md:grid-cols-3
            "
          >
            {focusAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <motion.div
                  key={area.number}
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
                    delay: index * 0.08,
                  }}
                  className={`
                    group
                    p-6
                    transition-colors
                    duration-300
                    hover:bg-white/[0.02]
                    md:p-8
                    lg:p-10
                    ${
                      index !== 0
                        ? "border-t border-white/[0.07] md:border-l md:border-t-0"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-white/20
                      "
                    >
                      {area.number}
                    </span>

                    <Icon
                      size={17}
                      className="
                        text-white/20
                        transition-colors
                        duration-300
                        group-hover:text-white/60
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-7
                      text-sm
                      font-medium
                      text-white/70
                      transition-colors
                      duration-300
                      group-hover:text-white
                    "
                  >
                    {area.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-xs
                      text-xs
                      leading-6
                      text-white/30
                    "
                  >
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
          }}
          className="
            mt-7
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              max-w-md
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/20
            "
          >
            Technology, intelligence, and thoughtful
            experiences.
          </span>

          <span
            className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/20
              md:block
            "
          >
            03 — About
          </span>
        </motion.div>
      </div>
    </section>
  );
}