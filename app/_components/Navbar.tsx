"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, MessageCircleMore, X } from "lucide-react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  const links = [
    { name: "Jobs", href: "/jobs" },
    { name: "Interview", href: "/interview" },
    { name: "Resume", href: "/resume" },
  ];

  return (
    <>
      {/* Scroll Progress Bar above navbar */}
      <ScrollProgress className="fixed top-0 h-1 left-0 w-full z-[60]" />

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
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? "text-black font-semibold"
                    : "hover:text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button
              asChild
              size="lg"
              className="text-white bg-black hover:bg-gray-800"
            >
              <a href="/" className=" bg-green-600 text-white ">
                <MessageCircleMore />
                Join WhatsApp
              </a>
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
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`hover:text-black transition border-b w-full py-2 ${
                  pathname === link.href ? "text-black font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* LOGIN BUTTON */}
            <div className="w-full">
              <Button
                asChild
                size="lg"
                className="w-full flex justify-center items-center text-white bg-black hover:bg-gray-800"
              >
                <a href="/" className=" bg-green-600 text-white ">
                  <MessageCircleMore />
                  Join WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
