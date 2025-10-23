"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchCompany() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    // Convert to URL-friendly slug
    const slug = search
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-"); // Replace spaces with hyphens

    router.push(`/interview/company/${slug}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 w-full mb-8 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
    >
      <Search size={20} className="text-gray-400 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search company (e.g., Google, Amazon)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 outline-none text-gray-800 bg-transparent font-lexend text-base placeholder:text-gray-400"
      />
      <Button
        type="submit"
        size="sm"
        className="bg-black hover:bg-black text-white font-medium px-6 rounded-md transition-colors"
        disabled={!search.trim()}
      >
        Search
      </Button>
    </form>
  );
}
