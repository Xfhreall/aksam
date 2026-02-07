"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginForm() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    submitting,
    showPassword,
    setShowPassword,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Aksam<span className="text-blue-600 dark:text-blue-400">edia</span>
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Masuk ke akun Anda
          </p>
        </div>

        <Card padding="responsive">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                  placeholder="Masukkan username"
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                    placeholder="Masukkan password"
                    required
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-lg px-4 py-2.5 text-sm"
            >
              {submitting ? "Memproses..." : "Masuk"}
            </Button>

            <div className="mt-4 rounded-lg bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Kredensial demo:
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono">admin</span> /{" "}
                <span className="font-mono">admin123</span>
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono">user</span> /{" "}
                <span className="font-mono">user123</span>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
