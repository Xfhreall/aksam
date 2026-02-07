"use client";

import type { Contact } from "@/shared/libs/contacts";
import { Button } from "@/shared/components/ui/button";
import { useContactForm } from "../hooks/use-contact-form";

interface ContactFormProps {
  initialData?: Contact;
  onSubmit: (data: Omit<Contact, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function ContactForm({
  initialData,
  onSubmit,
  onCancel,
}: ContactFormProps) {
  const {
    fields: { name, email, phone, address },
    setters: { setName, setEmail, setPhone, setAddress },
    errors,
    inputClass,
    handleSubmit,
  } = useContactForm(initialData, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Nama
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass("name")}
          placeholder="Nama lengkap"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass("email")}
          placeholder="email@contoh.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Telepon
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass("phone")}
          placeholder="08xxxxxxxxxx"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Alamat
        </label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          className={inputClass("address")}
          placeholder="Alamat lengkap"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.address}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit">
          {initialData ? "Simpan Perubahan" : "Tambah Kontak"}
        </Button>
      </div>
    </form>
  );
}
