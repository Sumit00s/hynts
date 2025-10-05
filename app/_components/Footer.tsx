"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
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
              <Link href="/experiences" className="hover:text-black">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-black">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-black">
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
              <Mail className="w-5 h-5 text-blue-500" /> contact@hynts.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" /> +1 (555) 123-4567
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
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500 font-lexend">
        © {new Date().getFullYear()} Hynts. All rights reserved.
      </div>
    </footer>
  );
}
