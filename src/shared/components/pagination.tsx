import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function getPageNumbers() {
    const pages: (number | "...")[] = [];
    const delta = 1;

    pages.push(1);

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2.5 py-2 text-sm sm:px-3"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx.toString()}`}
            className="px-2 text-sm text-zinc-400 dark:text-zinc-500"
          >
            ...
          </span>
        ) : (
          <Button
            type="button"
            key={page}
            variant={currentPage === page ? "primary" : "secondary"}
            onClick={() => onPageChange(page)}
            className={`min-w-9 rounded-lg px-2.5 py-2 text-sm sm:min-w-10 sm:px-3 ${
              currentPage === page ? "shadow-sm" : ""
            }`}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2.5 py-2 text-sm sm:px-3"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
