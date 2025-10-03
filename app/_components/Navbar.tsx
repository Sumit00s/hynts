"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b bg-white/30 backdrop-blur-lg transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="font-playfair font-extrabold text-2xl">
          <Link href="/">hynts.</Link>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-lexend font-medium text-gray-700">
          <Link href="/jobs" className="hover:text-black transition">
            Jobs
          </Link>
          <Link href="/experiences" className="hover:text-black transition">
            Experiences
          </Link>
          <Link href="/blogs" className="hover:text-black transition">
            Blogs
          </Link>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button
            asChild
            size="lg"
            className="text-white bg-black hover:bg-gray-800"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center text-gray-700"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 py-4 px-6 font-lexend text-gray-700 border-t bg-white/70 backdrop-blur-md w-full">
          <Link
            href="/jobs"
            onClick={() => setIsOpen(false)}
            className="hover:text-black transition border-b w-full py-2"
          >
            Jobs
          </Link>
          <Link
            href="/experiences"
            onClick={() => setIsOpen(false)}
            className="hover:text-black transition border-b w-full py-2"
          >
            Experiences
          </Link>
          <Link
            href="/blogs"
            onClick={() => setIsOpen(false)}
            className="hover:text-black transition border-b w-full py-2"
          >
            Blogs
          </Link>

          {/* LOGIN BUTTON */}
          <div className="w-full">
            <Button
              asChild
              size="lg"
              className="w-full block justify-center text-white bg-black hover:bg-gray-800"
            >
              <Link href="/login" className="w-full text-center block">
                Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
