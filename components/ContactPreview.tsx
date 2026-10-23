"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const contacts = [
  {
    title: "Email",
    description: "For inquiries and opportunities",
    href: "mailto:muhammaddikarafikasha@gmail.com",
    icon: Mail,
  },
  {
    title: "LinkedIn",
    description: "Connect professionally",
    href: "https://www.linkedin.com/in/muhammaddikarafikasha",
    icon: FaLinkedinIn,
  },
  {
    title: "GitHub",
    description: "Explore my projects",
    href: "https://github.com/DikaKasha91",
    icon: FaGithub,
  },
];

export default function ContactPreview() {
  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        px-5
        pb-16
        pt-24
        md:px-8
        md:pb-20
        md:pt-32
        lg:px-10
        lg:pb-24
        lg:pt-40
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[8%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-white/[0.018]
          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Main contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.09]
            bg-[#151515]
            md:rounded-[2.5rem]
          "
        >
          {/* Decorative grid */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-40
              [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]
              [background-size:70px_70px]
            "
          />

          {/* Decorative circle */}
          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-[480px]
              w-[480px]
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
              -top-20
              h-[350px]
              w-[350px]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          {/* Diagonal decorative line */}
          <div
            className="
              pointer-events-none
              absolute
              right-[-5%]
              top-[45%]
              h-px
              w-[55%]
              rotate-[-7deg]
              bg-white/[0.045]
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              min-h-[430px]
              px-7
              pb-14
              pt-12
              md:px-12
              md:pb-16
              md:pt-14
              lg:min-h-[500px]
              lg:px-12
              lg:pt-16
            "
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
                Contact
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                mt-8
                max-w-3xl
                text-[clamp(4rem,8vw,8rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.07em]
                text-white
              "
            >
              Let&apos;s
              <br />
              <span className="text-white/25">
                connect.
              </span>
            </h2>

            {/* Description */}
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
              Whether you have a project in mind, an
              opportunity to discuss, or simply want to
              connect, I&apos;d be happy to hear from you.
            </p>

            {/* Availability */}
            <div
              className="
                mt-8
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-white/[0.09]
                bg-white/[0.015]
                px-4
                py-2.5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-white/60
                  shadow-[0_0_10px_rgba(255,255,255,0.25)]
                "
              />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Contact links */}
          <div
            className="
              relative
              z-10
              grid
              border-t
              border-white/[0.08]
              md:grid-cols-3
            "
          >
            {contacts.map((contact, index) => {
              const Icon = contact.icon;

              return (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  target={
                    contact.title === "Email"
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    contact.title === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  whileHover={{
                    backgroundColor:
                      "rgba(255,255,255,0.025)",
                  }}
                  className={`
                    group
                    relative
                    flex
                    min-h-[105px]
                    items-center
                    justify-between
                    gap-5
                    px-7
                    py-6
                    transition-colors
                    duration-300
                    md:px-8
                    lg:px-10
                    ${
                      index !== contacts.length - 1
                        ? "border-b border-white/[0.08] md:border-b-0 md:border-r"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.09]
                        bg-white/[0.02]
                        text-white/35
                        transition-all
                        duration-300
                        group-hover:border-white/[0.16]
                        group-hover:bg-white/[0.04]
                        group-hover:text-white/70
                      "
                    >
                      <Icon className="h-[15px] w-[15px]" />
                    </div>

                    {/* Text */}
                    <div>
                      <p
                        className="
                          text-xs
                          font-medium
                          text-white/70
                          transition-colors
                          duration-300
                          group-hover:text-white
                        "
                      >
                        {contact.title}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-white/25
                        "
                      >
                        {contact.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.09]
                      text-white/25
                      transition-all
                      duration-300
                      group-hover:border-white/20
                      group-hover:bg-white/[0.05]
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-3
                        w-3
                        transition-transform
                        duration-300
                        group-hover:translate-x-[1px]
                        group-hover:-translate-y-[1px]
                      "
                    />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom micro information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="
            mt-6
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white/20
            "
          >
            Let&apos;s build something meaningful.
          </span>

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >
            07 — Contact
          </span>
        </motion.div>
      </div>
    </section>
  );
}