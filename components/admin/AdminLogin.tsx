"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/admin");
    } catch (error: unknown) {
      console.error(error);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#101010] px-5 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <section className="w-full">
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-medium tracking-[0.22em] text-white/35">
                DIKA.
              </span>

              <span className="text-[10px] tracking-[0.18em] text-white/25">
                ADMIN PANEL
              </span>
            </div>

            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-white/35">
              Welcome back
            </div>

            <h1 className="text-4xl font-medium tracking-[-0.04em] text-white md:text-5xl">
              Sign in.
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/40">
              Manage your portfolio projects and certificates from one place.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-[#151515] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-white/50"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#101010] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium text-white/50"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    strokeWidth={1.7}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#101010] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-white/20"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-400/10 bg-red-400/[0.05] px-4 py-3 text-xs text-red-300/80">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && (
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-white/20">
            <span>Portfolio Management</span>
            <span>01 — Admin</span>
          </div>
        </section>
      </div>
    </main>
  );
}