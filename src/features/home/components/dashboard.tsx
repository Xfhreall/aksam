"use client";

import { Contact, Info, UserPen } from "lucide-react";
import { useAuth } from "@/shared/hooks/use-auth";
import { Card } from "@/shared/components/ui/card";
import Link from "next/link";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
          Selamat datang, {user?.fullName}
        </h1>
        <p className="mt-1 text-sm text-zinc-500 sm:text-base dark:text-zinc-400">
          Kelola data kontak Anda dengan mudah
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/contacts">
          <Card className="group transition-all hover:border-blue-300 hover:shadow-md dark:hover:border-blue-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <Contact className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Kelola Kontak
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Tambah, edit, hapus, dan cari data kontak
            </p>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="group transition-all hover:border-emerald-300 hover:shadow-md dark:hover:border-emerald-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
              <UserPen className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">
              Edit Profil
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Ubah nama lengkap Anda
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
