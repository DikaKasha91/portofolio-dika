"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiFlutter,
  SiDart,
  SiFlask,
  SiMysql,
  SiSqlite,
  SiFigma,
  SiGit,
  SiGithub,
  SiStreamlit,
  SiGooglecolab,
  SiNotion,
  SiGooglegemini,
} from "react-icons/si";

import {
  ArrowUpRight,
  Bot,
  Sparkles,
} from "lucide-react";

type ToolItem = {
  name: string;
  icon: React.ElementType;
  color: string;
};

const categories: {
  number: string;
  title: string;
  description: string;
  items: ToolItem[];
}[] = [
  {
    number: "01",
    title: "AI & DATA",
    description:
      "Tools I use to explore data, train models, and build intelligent systems.",
    items: [
      {
        name: "Python",
        icon: SiPython,
        color: "#3776AB",
      },
      {
        name: "TensorFlow",
        icon: SiTensorflow,
        color: "#FF6F00",
      },
      {
        name: "Keras",
        icon: SiKeras,
        color: "#D00000",
      },
      {
        name: "Scikit-learn",
        icon: SiScikitlearn,
        color: "#F7931E",
      },
      {
        name: "NumPy",
        icon: SiNumpy,
        color: "#4D77CF",
      },
      {
        name: "Pandas",
        icon: SiPandas,
        color: "#5B7DB1",
      },
    ],
  },

  {
    number: "02",
    title: "DEVELOPMENT",
    description:
      "Languages and frameworks I use to turn ideas into functional applications.",
    items: [
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "#F7DF1E",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "#3178C6",
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "#5FA04E",
      },
      {
        name: "Flutter",
        icon: SiFlutter,
        color: "#54C5F8",
      },
      {
        name: "Dart",
        icon: SiDart,
        color: "#0175C2",
      },
      {
        name: "Flask",
        icon: SiFlask,
        color: "#FFFFFF",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        color: "#4479A1",
      },
      {
        name: "SQLite",
        icon: SiSqlite,
        color: "#44A3D1",
      },
    ],
  },

  {
    number: "03",
    title: "DESIGN & WORKFLOW",
    description:
      "Tools that support my design process, development workflow, and experimentation.",
    items: [
      {
        name: "Figma",
        icon: SiFigma,
        color: "#A259FF",
      },
      {
        name: "Git",
        icon: SiGit,
        color: "#F05032",
      },
      {
        name: "GitHub",
        icon: SiGithub,
        color: "#FFFFFF",
      },
      {
        name: "Streamlit",
        icon: SiStreamlit,
        color: "#FF4B4B",
      },
      {
        name: "Google Colab",
        icon: SiGooglecolab,
        color: "#F9AB00",
      },
    ],
  },

  {
    number: "04",
    title: "AI PRODUCTIVITY",
    description:
      "AI-powered tools I use for research, ideation, documentation, and productivity.",
    items: [
      {
        name: "ChatGPT",
        icon: Bot,
        color: "#74AA9C",
      },
      {
        name: "Notion",
        icon: SiNotion,
        color: "#FFFFFF",
      },
      {
        name: "Gemini",
        icon: SiGooglegemini,
        color: "#8E75FF",
      },
    ],
  },
];

function ToolChip({
  name,
  icon: Icon,
  color,
}: {
  name: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        borderColor: "rgba(255,255,255,0.16)",
        backgroundColor: "rgba(255,255,255,0.035)",
      }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        flex
        items-center
        gap-3
        rounded-full
        border
        border-white/[0.07]
        bg-white/[0.012]
        px-4
        py-2.5
        transition-colors
      "
    >
      <span
        className="
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          border-white/[0.07]
          bg-white/[0.025]
        "
      >
        <Icon
          style={{
            color,
          }}
          className="
            h-[14px]
            w-[14px]
            opacity-90
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:opacity-100
          "
        />
      </span>

      <span
        className="
          whitespace-nowrap
          text-xs
          text-white/55
          transition-colors
          duration-300
          group-hover:text-white/90
        "
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Tools() {
  return (
    <section
      id="tools"
      className="
        relative
        overflow-hidden
        px-5
        py-24
        md:px-8
        md:py-32
        lg:px-10
        lg:py-40
      "
    >
      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-[55%]
          top-[30%]
          h-[550px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-white/[0.018]
          blur-[130px]
        "
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <motion.div
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Section label */}

          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-white/25" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-white/35
              "
            >
              Tech Stack
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-7
              max-w-5xl
              text-[clamp(3.5rem,7.5vw,8rem)]
              font-medium
              leading-[0.84]
              tracking-[-0.07em]
              text-white
            "
          >
            Tools behind
            <br />
            the things I{" "}
            <span className="text-white/[0.23]">
              build.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-8
              max-w-2xl
              text-sm
              leading-7
              text-white/40
              md:text-base
              md:leading-8
            "
          >
            Technologies, frameworks, and tools I use across
            software development, artificial intelligence,
            data, and digital experiences.
          </p>
        </motion.div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-16
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
            md:rounded-[2.5rem]
          "
        >
          {/* Grid background */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
              [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
              [background-size:72px_72px]
            "
          />

          {/* Decorative circles */}

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
              border-white/[0.045]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-48
              -top-48
              h-[600px]
              w-[600px]
              rounded-full
              border
              border-white/[0.025]
            "
          />

          {/* Bottom glow */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-180px]
              left-[25%]
              h-[400px]
              w-[600px]
              rounded-full
              bg-white/[0.018]
              blur-[110px]
            "
          />

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <div
            className="
              relative
              z-10
              p-6
              md:p-10
              lg:p-14
            "
          >
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
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
                  duration: 0.6,
                  delay: categoryIndex * 0.08,
                }}
                className={`
                  ${
                    categoryIndex !== 0
                      ? "mt-12 border-t border-white/[0.07] pt-12 md:mt-14 md:pt-14"
                      : ""
                  }
                `}
              >
                <div
                  className="
                    grid
                    gap-8
                    lg:grid-cols-[240px_1fr]
                    lg:gap-14
                  "
                >
                  {/* Category information */}

                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          text-[8px]
                          tracking-[0.2em]
                          text-white/20
                        "
                      >
                        {category.number}
                      </span>

                      <span className="h-px w-5 bg-white/15" />

                      <p
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.25em]
                          text-white/35
                        "
                      >
                        {category.title}
                      </p>
                    </div>

                    <p
                      className="
                        mt-5
                        max-w-[230px]
                        text-xs
                        leading-6
                        text-white/30
                      "
                    >
                      {category.description}
                    </p>
                  </div>

                  {/* Tool chips */}

                  <div className="flex flex-wrap content-start gap-2.5">
                    {category.items.map((item) => (
                      <ToolChip
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                        color={item.color}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* =================================================
              TOOL STRIP
          ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              border-t
              border-white/[0.07]
              px-6
              py-7
              md:px-10
              lg:px-14
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-5
              "
            >
              <div
                className="
                  flex
                  min-w-max
                  items-center
                  gap-8
                  md:gap-12
                "
              >
                {[
                  {
                    name: "Python",
                    icon: SiPython,
                    color: "#3776AB",
                  },
                  {
                    name: "TensorFlow",
                    icon: SiTensorflow,
                    color: "#FF6F00",
                  },
                  {
                    name: "Figma",
                    icon: SiFigma,
                    color: "#A259FF",
                  },
                  {
                    name: "GitHub",
                    icon: SiGithub,
                    color: "#FFFFFF",
                  },
                  {
                    name: "Flutter",
                    icon: SiFlutter,
                    color: "#54C5F8",
                  },
                  {
                    name: "MySQL",
                    icon: SiMysql,
                    color: "#4479A1",
                  },
                  {
                    name: "OpenAI",
                    icon: Sparkles,
                    color: "#74AA9C",
                  },
                  {
                    name: "TypeScript",
                    icon: SiTypescript,
                    color: "#3178C6",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={`${item.name}-${index}`}
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 3.5 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        group
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Icon
                        style={{
                          color: item.color,
                        }}
                        className="
                          h-5
                          w-5
                          opacity-70
                          transition-all
                          duration-300
                          group-hover:scale-110
                          group-hover:opacity-100
                        "
                      />

                      <span
                        className="
                          hidden
                          text-[8px]
                          uppercase
                          tracking-[0.18em]
                          text-white/35
                          transition-colors
                          duration-300
                          group-hover:text-white/60
                          md:block
                        "
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            FOOTNOTE
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            mt-7
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <span
            className="
              max-w-md
              text-[9px]
              uppercase
              leading-5
              tracking-[0.2em]
              text-white/20
            "
          >
            Tools are only useful when they help ideas
            move forward.
          </span>

          <div className="hidden items-center gap-3 md:flex">
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/20
              "
            >
              Explore the stack
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
                border-white/[0.08]
                text-white/30
              "
            >
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}