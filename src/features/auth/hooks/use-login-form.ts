"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/shared/hooks/use-auth";

export function useLoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const err = await login(username, password);
    if (err) {
      setError(err);
      setSubmitting(false);
    } else {
      router.push("/");
    }
  };

  return {
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
  };
}
