"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast, ToastContainer } from "@/components/ui/toast";

export default function ShareButton() {
  const { toast, toasts } = useToast();

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({
      title: "✅ Link copied!",
      description: "You can share this interview experience now.",
    });
  };

  return (
    <>
      <Button
        onClick={handleShare}
        variant="outline"
        size="icon"
        className="border-gray-300 hover:bg-gray-100"
      >
        <Share2 size={18} />
      </Button>

      {/* Toast system (safe for JSX now) */}
      <ToastContainer toasts={toasts} />
    </>
  );
}
