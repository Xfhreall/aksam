import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../shared/styles/globals.css";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { QueryProvider } from "@/shared/components/query-provider";
import { AuthProvider } from "@/shared/hooks/use-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aksamedia - Kelola Kontak",
  description: "Aplikasi manajemen kontak oleh Aksamedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
