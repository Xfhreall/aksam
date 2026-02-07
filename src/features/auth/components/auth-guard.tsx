"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/shared/hooks/use-auth";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading || !user?.isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Memuat...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
