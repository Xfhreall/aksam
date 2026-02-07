"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {
  ChevronDown,
  Contact,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useAuth } from "@/shared/hooks/use-auth";
import { useClickOutside } from "@/shared/hooks/use-click-outside";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";

export function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(
    useCallback(() => setDropdownOpen(false), []),
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 cursor-pointer">
            Aksa<span className="text-blue-600 dark:text-blue-400">media</span>
          </h1>

          <div className="hidden items-center gap-1 sm:flex">
            <Link
              href={"/dashboard"}
              className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                pathname === "/dashboard"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href={"/contacts"}
              className={`px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                pathname === "/contacts"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              Kontak
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <span className="hidden max-w-30 truncate sm:inline">
                {user?.fullName || "User"}
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 px-2">
                <div className="border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    @{user?.username}
                  </p>
                </div>

                <div className="py-1 sm:hidden">
                  <Link href={"/dashboard"}>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-2 text-sm ${
                        pathname === "/dashboard"
                          ? "bg-blue-600/40 rounded-xl text-blue-700 dark:text-blue-300"
                          : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <LayoutDashboard
                        className={`h-4 w-4 ${pathname === "/dashboard" ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`}
                      />
                      Dashboard
                    </button>
                  </Link>
                  <Link href={"/contacts"}>
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-2 text-sm ${
                        pathname === "/contacts"
                          ? "bg-blue-600/40 rounded-xl text-blue-700 dark:text-blue-300"
                          : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <Contact
                        className={`h-4 w-4 ${pathname === "/contacts" ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`}
                      />
                      Kontak
                    </button>
                  </Link>
                </div>
                <Link href={"/profile"}>
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/profile");
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <User className="h-4 w-4 text-zinc-400" />
                    Edit Profil
                  </button>
                </Link>

                <div className="border-t border-zinc-100 py-1 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
