"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface PageTransitionContextType {
  navigate: (href: string) => void;
}

const PageTransitionContext =
  createContext<PageTransitionContextType | null>(null);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used inside PageTransition"
    );
  }

  return context;
}

type Phase = "idle" | "covering" | "revealing";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");

  const pendingRoute = useRef<string | null>(null);
  const coverTimeout = useRef<NodeJS.Timeout | null>(null);
  const revealTimeout = useRef<NodeJS.Timeout | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (
        href === pathname ||
        pendingRoute.current !== null
      ) {
        return;
      }

      pendingRoute.current = href;

      setPhase("covering");

      coverTimeout.current = setTimeout(() => {
        router.push(href);
      }, 650);
    },
    [pathname, router]
  );

  useEffect(() => {
    if (!pendingRoute.current) {
      return;
    }

    pendingRoute.current = null;

    revealTimeout.current = setTimeout(() => {
      setPhase("revealing");

      revealTimeout.current = setTimeout(() => {
        setPhase("idle");
      }, 650);
    }, 80);

    return () => {
      if (revealTimeout.current) {
        clearTimeout(revealTimeout.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (phase !== "idle") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      if (coverTimeout.current) {
        clearTimeout(coverTimeout.current);
      }

      if (revealTimeout.current) {
        clearTimeout(revealTimeout.current);
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}

      {phase !== "idle" && (
        <motion.div
          initial={{
            y: "-100%",
          }}
          animate={{
            y:
              phase === "covering"
                ? "0%"
                : "100%",
          }}
          transition={{
            duration: 0.65,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            fixed
            inset-0
            z-[9999]
            overflow-hidden
            bg-[#151515]
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.06),transparent_32%)]
            "
          />

          <div
            className="
              absolute
              bottom-8
              left-8
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/25
            "
          >
            Dika Rafi
          </div>

          <div
            className="
              absolute
              right-8
              top-8
              font-mono
              text-[9px]
              tracking-[0.2em]
              text-white/20
            "
          >
            {phase === "covering"
              ? "Loading"
              : "Welcome"}
          </div>
        </motion.div>
      )}
    </PageTransitionContext.Provider>
  );
}