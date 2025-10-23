"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhatsappCard() {
  return (
    <div className="sticky top-24 border p-5 bg-white flex flex-col gap-4 text-center rounded-lg shadow-lg hover:shadow-xl transition-all">
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
          <Image
            src="https://logo.clearbit.com/whatsapp.com"
            alt="WhatsApp"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold">Join Our WhatsApp Community 💬</h2>
      <p className="text-gray-600 text-sm">
        Get daily job alerts, connect with developers, and grow with our tech
        network.
      </p>

      <Button
        asChild
        className="bg-green-500 hover:bg-green-600 text-white font-medium"
      >
        <Link
          href="https://chat.whatsapp.com/your-community-link"
          target="_blank"
        >
          Join Now
        </Link>
      </Button>
    </div>
  );
}
