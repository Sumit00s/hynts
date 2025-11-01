"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Interview } from "@/types/interview";
import InfiniteInterviewList from "./InfiniteInterviewList";
import { useQuery } from "@tanstack/react-query";
import { searchInterviews } from "@/app/actions/interviews/searchInterviews";
import InterviewCard from "./InterviewCard";
import InterviewCardSkeleton from "./InterviewCardSkeleton";

interface InterviewSearchAndListProps {
  initialInterviews: Interview[];
  totalInterviews: number;
}

export default function InterviewSearchAndList({
  initialInterviews,
  totalInterviews,
}: InterviewSearchAndListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // React Query for search
  const {
    data: searchResults,
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: ["interviews", "search", debouncedQuery],
    queryFn: () => searchInterviews(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  // Determine what to show
  const isSearchMode = debouncedQuery.length > 0;
  const displayInterviews = isSearchMode
    ? searchResults?.interviews || []
    : initialInterviews;
  const displayTotal = isSearchMode
    ? searchResults?.total || 0
    : totalInterviews;

  return (
    <>
      {/* Search Box */}
      <div className="mb-8">
        <div className="relative w-full">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors"
              size={20}
            />

            <Input
              type="text"
              placeholder="Search by company name... (e.g., Google, Amazon)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-6 rounded-sm border border-gray-300 bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-gray-400 text-base"
            />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {debouncedQuery && (
            <p className="text-sm text-gray-600 mt-3">
              Showing results for:{" "}
              <strong className="text-gray-800">{debouncedQuery}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Search Results or Infinite List */}
      {isSearchMode ? (
        <div className="space-y-6">
          {isSearching ? (
            <>
              {[...Array(3)].map((_, i) => (
                <InterviewCardSkeleton key={`search-skeleton-${i}`} />
              ))}
            </>
          ) : searchError ? (
            <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">
              <p className="font-medium">Failed to search interviews</p>
              <p className="text-sm mt-1">Please try again</p>
            </div>
          ) : displayInterviews.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">
                No experiences found for "{debouncedQuery}"
              </p>
              <p className="text-sm mt-1">Try a different company name</p>
            </div>
          ) : (
            <>
              {displayInterviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
              {displayInterviews.length > 0 && (
                <div className="text-center py-4 text-gray-600">
                  <p className="text-sm">
                    Showing {displayInterviews.length} of {displayTotal} results
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <InfiniteInterviewList
          initialInterviews={initialInterviews}
          totalInterviews={totalInterviews}
        />
      )}
    </>
  );
}
