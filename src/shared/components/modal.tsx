"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { useModal } from "@/shared/hooks/use-modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useModal(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          if (e.target === overlayRef.current) onClose();
        }
      }}
    >
      <Card className="w-full max-w-lg shadow-xl dark:border-zinc-700">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        {children}
      </Card>
    </div>
  );
}
