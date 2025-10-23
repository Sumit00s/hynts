"use client";

import * as React from "react";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@radix-ui/react-toast";

export function useToast() {
  const [toasts, setToasts] = React.useState<
    { id: string; title?: string; description?: string }[]
  >([]);

  const toast = React.useCallback(
    (toast: { title?: string; description?: string }) => {
      const id = Math.random().toString(36).substring(2);
      setToasts((prev) => [...prev, { id, ...toast }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  return { toast, toasts };
}

/**
 * This is a real React component now — not just an element.
 * It can be used safely as <ToastContainer /> anywhere.
 */
export function ToastContainer({
  toasts,
}: {
  toasts: { id: string; title?: string; description?: string }[];
}) {
  return (
    <ToastProvider>
      {toasts.map(({ id, title, description }) => (
        <Toast
          key={id}
          className="bg-white border shadow-md rounded-md p-4 flex flex-col gap-1 w-80"
        >
          {title && <ToastTitle className="font-semibold">{title}</ToastTitle>}
          {description && (
            <ToastDescription className="text-gray-600 text-sm">
              {description}
            </ToastDescription>
          )}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 outline-none" />
    </ToastProvider>
  );
}
