import { ContactsContainer } from "@/features/contacts/containers/contacts-container";
import { Suspense } from "react";

export default function ContactsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
        </div>
      }
    >
      <ContactsContainer />
    </Suspense>
  );
}
