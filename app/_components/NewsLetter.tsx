"use client";

import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  return (
    <section className="py-8 px-6 my-10 bg-white border border-gray-200 rounded-xl max-w-4xl mx-auto">
      <div className="text-center flex flex-col items-center gap-6 p-6">
        {/* Mail Icon */}
        <div className="bg-blue-500 p-5 rounded-full">
          <Mail className="text-white w-6 h-6" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-playfair font-bold text-gray-900">
          Stay Ahead in Your Career
        </h2>

        {/* Input + Button */}
        <div className="flex w-full max-w-lg gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow px-4 py-6 outline-none font-lexend"
          />
          <Button className="px-6 py-6 cursor-pointer font-lexend">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
