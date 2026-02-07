"use client";

import { Plus, Search, Users, X } from "lucide-react";
import { Pagination } from "@/shared/components/pagination";
import { Modal } from "@/shared/components/modal";
import { ConfirmDialog } from "@/shared/components/confirm-dialog";
import { ContactForm } from "../components/contact-form";
import { ContactCard } from "../components/contact-card";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { useContacts } from "../hooks/use-contacts";

export function ContactsContainer() {
  const {
    search,
    filtered,
    paginated,
    currentPage,
    totalPages,
    mounted,
    isCreateOpen,
    setIsCreateOpen,
    editingContact,
    setEditingContact,
    deletingContact,
    setDeletingContact,
    handleSearch,
    handlePageChange,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useContacts();

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
            Daftar Kontak
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {filtered.length} kontak ditemukan
          </p>
        </div>
        <Button type="button" onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" />
          Tambah Kontak
        </Button>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Cari nama, email, telepon, atau alamat..."
          className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleSearch("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {paginated.length === 0 ? (
        <Card
          padding="none"
          className="flex flex-col items-center justify-center py-16"
        >
          <Users className="h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Tidak ada kontak ditemukan
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {search
              ? "Coba ubah kata kunci pencarian"
              : "Mulai tambahkan kontak baru"}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginated.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => setEditingContact(contact)}
              onDelete={() => setDeletingContact(contact)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Tambah Kontak Baru"
      >
        <ContactForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingContact}
        onClose={() => setEditingContact(null)}
        title="Edit Kontak"
      >
        {editingContact && (
          <ContactForm
            initialData={editingContact}
            onSubmit={handleUpdate}
            onCancel={() => setEditingContact(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingContact}
        onClose={() => setDeletingContact(null)}
        onConfirm={handleDelete}
        title="Hapus Kontak"
        message={`Apakah Anda yakin ingin menghapus kontak "${deletingContact?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        variant="danger"
      />
    </div>
  );
}
