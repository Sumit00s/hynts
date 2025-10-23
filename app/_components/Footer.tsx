"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter/subscribeNewsletter";

export default function Footer() {
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
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <h1 className="font-playfair font-extrabold text-2xl">hynts.</h1>
          <p className="text-sm text-gray-600 font-lexend">
            Hynts is your go-to platform for fresh tech opportunities. Discover
            jobs, explore interview experiences, and gain insights to accelerate
            your career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg font-lexend mb-4">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 text-gray-700 font-lexend">
            <li>
              <Link href="/jobs" className="hover:text-black">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/interview" className="hover:text-black">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/resume" className="hover:text-black">
                Resume
              </Link>
            </li>
            <li>
              <Link
                href="/interview/share-experience"
                className="hover:text-black"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg font-lexend mb-4">Contact Us</h3>
          <ul className="flex flex-col gap-3 text-gray-700 font-lexend">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500" /> hyntsplatform@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" /> +91 8788705720
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" /> 123 Tech Street,
              Silicon Valley
            </li>
          </ul>
        </div>

        {/* Newsletter (mini version) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg font-lexend mb-2">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-600 font-lexend">
            Subscribe to our newsletter for the latest updates and
            opportunities.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm transition-colors"
              >
                {isLoading ? "..." : "Subscribe"}
              </button>
            </div>

            {/* Success/Error Message */}
            {message && (
              <p
                className={`text-xs font-lexend ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 font-lexend">
        © {new Date().getFullYear()} Hynts. All rights reserved.
      </div>
    </footer>
  );
}
