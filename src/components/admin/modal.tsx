"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

// Accessible modal on the native <dialog> element (focus trap + Esc built in).
export function Modal({ open, title, onClose, children, wide = false }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} onClose={onClose} className={`m-auto w-[calc(100%-2rem)] ${wide ? "max-w-3xl" : "max-w-lg"} rounded-2xl p-0 shadow-2xl backdrop:bg-black/40`}>
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <h2 className="text-[1.05rem] font-bold">{title}</h2>
        <button type="button" onClick={onClose} className="flex size-9 cursor-pointer items-center justify-center rounded-full hover:bg-soft" aria-label="Close">
          <X className="size-5" aria-hidden />
        </button>
      </div>
      <div className="max-h-[75vh] overflow-y-auto p-5">{open && children}</div>
    </dialog>
  );
}
