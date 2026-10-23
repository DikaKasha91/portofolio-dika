"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Award,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    name: "Certificates",
    href: "/admin/certificates",
    icon: Award,
  },
  {
    name: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
];

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --------------------------------
  // Authentication
  // --------------------------------

  useEffect(() => {
    // Login page does not need authentication
    if (pathname === "/admin/login") {
      const timer = window.setTimeout(() => {
        setCheckingAuth(false);
      }, 0);

      return () => {
        window.clearTimeout(timer);
      };
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          setUser(null);
          setCheckingAuth(false);
          router.replace("/admin/login");
          return;
        }

        setUser(currentUser);
        setCheckingAuth(false);
      }
    );

    return () => unsubscribe();
  }, [pathname, router]);

  // --------------------------------
  // Logout
  // --------------------------------

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // --------------------------------
  // Login page
  // --------------------------------

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // --------------------------------
  // Authentication loading
  // --------------------------------

  if (checkingAuth || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101010] text-white">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
          Checking access...
        </p>
      </div>
    );
  }

  // --------------------------------
  // Admin layout
  // --------------------------------

  return (
    <div className="min-h-screen bg-[#101010] text-white">

      {/* ================================
          Mobile Header
      ================================= */}

      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/[0.08] bg-[#101010]/90 px-5 backdrop-blur-xl lg:hidden">

        <Link
          href="/admin"
          className="text-sm font-semibold tracking-[0.2em]"
        >
          DIKA.
        </Link>

        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              (value) => !value
            )
          }
          className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </header>

      {/* ================================
          Desktop Sidebar
      ================================= */}

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.08] bg-[#111111] lg:flex lg:flex-col">

        {/* Logo */}

        <div className="flex h-20 items-center border-b border-white/[0.08] px-7">

          <Link
            href="/admin"
            className="text-sm font-semibold tracking-[0.2em]"
          >
            DIKA.
          </Link>

          <span className="ml-auto text-[9px] uppercase tracking-[0.18em] text-white/25">
            Admin
          </span>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4 py-7">

          <div className="mb-4 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">
            Manage
          </div>

          <div className="space-y-1">

            {navigation.map(
              (item) => {
                const Icon = item.icon;

                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(
                        item.href
                      );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-white/40 hover:bg-white/[0.04] hover:text-white/80"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                    />

                    <span>
                      {item.name}
                    </span>
                  </Link>
                );
              }
            )}

          </div>
        </nav>

        {/* Bottom */}

        <div className="border-t border-white/[0.08] p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/35 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut
              size={17}
              strokeWidth={1.7}
            />

            <span>
              Sign out
            </span>
          </button>

          <div className="mt-5 px-3 text-[9px] uppercase tracking-[0.18em] text-white/20">
            Portfolio Management
          </div>

        </div>
      </aside>

      {/* ================================
          Mobile Navigation
      ================================= */}

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#101010] pt-16 lg:hidden">

          <nav className="px-5 py-6">

            <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/25">
              Manage
            </div>

            <div className="space-y-1">

              {navigation.map(
                (item) => {
                  const Icon =
                    item.icon;

                  const active =
                    item.href ===
                    "/admin"
                      ? pathname ===
                        "/admin"
                      : pathname.startsWith(
                          item.href
                        );

                  return (
                    <Link
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${
                        active
                          ? "bg-white/[0.08] text-white"
                          : "text-white/40"
                      }`}
                    >
                      <Icon
                        size={17}
                        strokeWidth={
                          1.7
                        }
                      />

                      {item.name}
                    </Link>
                  );
                }
              )}

            </div>

            <button
              type="button"
              onClick={
                handleLogout
              }
              className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/40"
            >
              <LogOut
                size={17}
                strokeWidth={
                  1.7
                }
              />

              Sign out
            </button>

          </nav>
        </div>
      )}

      {/* ================================
          Main Content
      ================================= */}

      <main className="min-h-screen lg:ml-64">

        <div className="px-5 pb-10 pt-24 sm:px-8 lg:px-10 lg:pt-10">
          {children}
        </div>

      </main>
    </div>
  );
}