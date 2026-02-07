"use client";

import { AuthGuard } from "@/features/auth/components/auth-guard";
import { Navbar } from "@/shared/components/navbar";
import type { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
