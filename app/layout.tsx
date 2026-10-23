import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Suspense } from "react";

import PublicHeader from "@/components/PublicHeader";
import PageTransition from "@/components/PageTransition";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dika Rafi — Portfolio",
  description:
    "Portfolio of Muhammad Dika Rafi Kasha — Computer Engineering, Artificial Intelligence, Machine Learning, Computer Vision, and UI/UX Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Suspense fallback={null}>
          <PageTransition>
            <PublicHeader />
            {children}
          </PageTransition>
        </Suspense>
      </body>
    </html>
  );
}