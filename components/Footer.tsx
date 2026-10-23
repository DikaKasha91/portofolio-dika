"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/#projects",
  },
  {
    label: "Experience",
    href: "/#experience",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammaddikarafikasha",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/DikaKasha91",
    icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#101010] px-5 pb-6 pt-4 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Main footer */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.08]
            bg-[#151515]
            px-7
            py-10
            md:rounded-[2.5rem]
            md:px-10
            md:py-12
            lg:px-12
            lg:py-14
          "
        >
          {/* Decorative grid */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-30
              [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
              [background-size:70px_70px]
            "
          />

          {/* Decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -right-40
              h-[420px]
              w-[420px]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -right-24
              h-[300px]
              w-[300px]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          {/* Main content */}
          <div
            className="
              relative
              z-10
              grid
              gap-12
              lg:grid-cols-[1fr_auto]
              lg:items-start
            "
          >
            {/* Brand */}
            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                "
              >
                Portfolio
              </p>

              <motion.a
                href="/"
                whileHover={{ x: 3 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  mt-5
                  inline-block
                  text-[clamp(3.5rem,8vw,7rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.07em]
                  text-white
                "
              >
                DIKA.
              </motion.a>

              <p
                className="
                  mt-5
                  max-w-sm
                  text-xs
                  leading-6
                  text-white/35
                  md:text-sm
                  md:leading-7
                "
              >
                Computer Engineering graduate focused on
                Artificial Intelligence, Machine Learning,
                Computer Vision, and UI/UX Design.
              </p>
            </div>

            {/* Navigation / Social / Availability */}
            <div
              className="
                grid
                grid-cols-2
                gap-x-12
                gap-y-8
                sm:grid-cols-3
                lg:min-w-[390px]
              "
            >
              {/* Navigation */}
              <div>
                <p
                  className="
                    mb-5
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Navigate
                </p>

                <div className="flex flex-col gap-3">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="
                        w-fit
                        text-xs
                        text-white/45
                        transition-colors
                        duration-300
                        hover:text-white
                      "
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <p
                  className="
                    mb-5
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Connect
                </p>

                <div className="flex flex-col gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group
                          flex
                          w-fit
                          items-center
                          gap-2
                          text-xs
                          text-white/45
                          transition-colors
                          duration-300
                          hover:text-white
                        "
                      >
                        <Icon className="h-3 w-3" />

                        <span>{social.label}</span>

                        <ArrowUpRight
                          className="
                            h-3
                            w-3
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                            group-hover:opacity-100
                          "
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p
                  className="
                    mb-5
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-white/25
                  "
                >
                  Availability
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-white/60
                      shadow-[0_0_10px_rgba(255,255,255,0.2)]
                    "
                  />

                  <span className="text-xs text-white/45">
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative z-10 my-10 h-px bg-white/[0.07]" />

          {/* Bottom information */}
          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/20
              "
            >
              © 2026 Muhammad Dika Rafi Kasha
            </p>

            <div className="flex items-center gap-6">
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-white/20
                "
              >
                Built with Next.js
              </span>

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-white/20
                "
              >
                08 — End
              </span>
            </div>
          </div>
        </div>

        {/* Very bottom */}
        <div className="flex items-center justify-between px-1 py-5">
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.3em]
              text-white/15
            "
          >
            Designed & built by Dika
          </span>

          <a
            href="#home"
            className="
              group
              flex
              items-center
              gap-2
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/20
              transition-colors
              duration-300
              hover:text-white/60
            "
          >
            Back to top

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                transition-all
                duration-300
                group-hover:border-white/20
                group-hover:bg-white/[0.04]
              "
            >
              <ArrowUpRight
                className="
                  h-3
                  w-3
                  rotate-[-45deg]
                "
              />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}