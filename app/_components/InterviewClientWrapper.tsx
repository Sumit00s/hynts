"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { Interview } from "@/types/interview";
import InterviewSearchAndList from "./InterviewSearchAndList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface InterviewClientWrapperProps {
  initialInterviews: Interview[];
  totalInterviews: number;
}

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

export default function InterviewClientWrapper({
  initialInterviews,
  totalInterviews,
}: InterviewClientWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between mt-5 items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-playfair">
            Interview Experiences
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Learn from real interview experiences shared by the community
          </p>
        </div>
        <Button
          asChild
          className="bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Link href="/interview/share-experience">
            <Share2 size={18} />
            Share Experience
          </Link>
        </Button>
      </div>

      {/* Search and List Component */}
      <InterviewSearchAndList
        initialInterviews={initialInterviews}
        totalInterviews={totalInterviews}
      />
    </QueryClientProvider>
  );
}
