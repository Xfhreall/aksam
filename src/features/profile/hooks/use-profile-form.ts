"use client";

import { useState } from "react";
import { useAuth } from "@/shared/hooks/use-auth";

export function useProfileForm() {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!fullName.trim()) {
      setMessage({ type: "error", text: "Nama lengkap tidak boleh kosong" });
      return;
    }

    setSubmitting(true);
    const err = await updateProfile(fullName.trim());
    setSubmitting(false);

    if (err) {
      setMessage({ type: "error", text: err });
    } else {
      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
    }
  };

  return {
    user,
    fullName,
    setFullName,
    message,
    submitting,
    handleSubmit,
  };
}
