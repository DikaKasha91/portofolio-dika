"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePageTransition } from "@/components/PageTransition";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAbout = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    navigate("/about");
  };

  const handleHome = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    navigate("/");
  };

  const transition = {
    duration: 0.5,
    ease: "easeInOut" as const,
  };

  return (
    <header
      className="
        fixed
        left-0
        top-0
        z-50
        w-full
        px-3
        md:px-5
      "
    >
      <motion.nav
        initial={false}
        animate={{
          y: scrolled ? 8 : 0,
          width: scrolled ? "90%" : "100%",
          maxWidth: scrolled ? 1152 : 2000,
          height: scrolled ? 56 : 80,
          borderRadius: scrolled ? 9999 : 0,
          paddingLeft: scrolled ? 28 : 20,
          paddingRight: scrolled ? 28 : 20,
          backgroundColor: scrolled
            ? "rgba(24, 24, 24, 0.90)"
            : "rgba(24, 24, 24, 0)",
          borderColor: scrolled
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 10px 40px rgba(0,0,0,0.25)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={transition}
        className="
          mx-auto
          flex
          items-center
          justify-between
        "
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          backdropFilter: scrolled
            ? "blur(20px)"
            : "blur(0px)",
          WebkitBackdropFilter: scrolled
            ? "blur(20px)"
            : "blur(0px)",
          willChange:
            "transform, width, max-width, height, border-radius, padding, background-color, border-color, box-shadow",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={handleHome}
          className="
            shrink-0
            text-sm
            font-semibold
            tracking-[0.2em]
            text-white
            transition-opacity
            duration-300
            hover:opacity-70
          "
        >
          DIKA.
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/about"
            onClick={handleAbout}
            className="
              text-sm
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            About
          </a>

          <Link
            href="/#projects"
            className="
              text-sm
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Projects
          </Link>

          <Link
            href="/#experience"
            className="
              text-sm
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Experience
          </Link>

          <Link
            href="/#contact"
            className="
              text-sm
              text-white/45
              transition-colors
              duration-300
              hover:text-white
            "
          >
            Contact
          </Link>
        </div>

        {/* Let's Talk */}
        <Link
          href="/#contact"
          className="
            shrink-0
            rounded-full
            border
            border-white/15
            px-5
            py-2
            text-xs
            font-medium
            text-white
            transition-all
            duration-300
            hover:border-white/30
            hover:bg-white/[0.06]
          "
        >
          Let&apos;s Talk
        </Link>
      </motion.nav>
    </header>
  );
}