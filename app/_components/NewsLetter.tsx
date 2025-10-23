"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/app/actions/newsletter/subscribeNewsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await subscribeNewsletter({ email });

      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });

      if (result.success) {
        setEmail(""); // Clear input on success
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-lg gap-3"
        >
          <div className="flex w-full gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="flex-grow px-4 py-6 outline-none font-lexend"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-6 cursor-pointer font-lexend"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {/* Success/Error Message */}
          {message && (
            <p
              className={`text-sm font-lexend ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
