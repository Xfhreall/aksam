import { Mail, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import type { Contact } from "@/shared/libs/contacts";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

interface ContactCardProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <Card
      padding="none"
      className="group p-4 overflow-hidden transition-all hover:shadow-md sm:p-5 dark:hover:border-zinc-700"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:text-base">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              {contact.name}
            </h3>
            <div className="mt-1 space-y-0.5">
              <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{contact.email}</span>
              </p>
              <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {contact.phone}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{contact.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-end sm:self-start">
          <Button
            type="button"
            variant="secondary"
            onClick={onEdit}
            className="px-2 py-1.5 text-xs hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-400 xl:px-3"
          >
            <Pencil className="h-3 w-3" />
            <span className="hidden xl:inline">Edit</span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onDelete}
            className="px-2 py-1.5 text-xs hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:hover:border-red-700 dark:hover:bg-red-950/30 dark:hover:text-red-400 xl:px-3"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden xl:inline">Hapus</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
