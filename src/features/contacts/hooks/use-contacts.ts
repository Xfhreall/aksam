"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import {
  type Contact,
  addContact,
  deleteContact,
  getContacts,
  updateContact,
} from "@/shared/libs/contacts";

const ITEMS_PER_PAGE = 6;

export function useContacts() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [mounted, setMounted] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  useEffect(() => {
    setContacts(getContacts());
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return contacts;
    const q = search.toLowerCase();
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.address.toLowerCase().includes(q),
    );
  }, [contacts, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handlePageChange = useCallback(
    (p: number) => {
      setPage(p);
    },
    [setPage],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value || null);
      setPage(1);
    },
    [setSearch, setPage],
  );

  const handleCreate = useCallback(
    (data: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
      addContact(data);
      setContacts(getContacts());
      setIsCreateOpen(false);
    },
    [],
  );

  const handleUpdate = useCallback(
    (data: Omit<Contact, "id" | "createdAt" | "updatedAt">) => {
      if (!editingContact) return;
      updateContact(editingContact.id, data);
      setContacts(getContacts());
      setEditingContact(null);
    },
    [editingContact],
  );

  const handleDelete = useCallback(() => {
    if (!deletingContact) return;
    deleteContact(deletingContact.id);
    setContacts(getContacts());
    setDeletingContact(null);
  }, [deletingContact]);

  return {
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
  };
}
