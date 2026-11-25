import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: { default: "PustakaKu", template: "%s | PustakaKu" },
  description: "Aplikasi pencatatan buku perpustakaan SMA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen">
        <Suspense fallback={<div className="h-14 border-b border-gray-200 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">{children}</main>
        <footer className="mx-auto max-w-4xl px-4 pb-8 text-xs text-gray-500 sm:px-6">
          PustakaKu &mdash; perpustakaan SMA
        </footer>
      </body>
    </html>
  );
}