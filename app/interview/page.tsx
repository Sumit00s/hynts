"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InterviewCard from "../_components/InterviewCard";
import InterviewCardSkeleton from "../_components/InterviewCardSkeleton";
import WhatsappCard from "@/app/_components/WhatsappCard";
import { Share2, X, Search } from "lucide-react";
import { Interview } from "@/types/interview";
import { getAllInterviews } from "@/app/actions/interviews/getAllInterviews";

export default function InterviewPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ Starts false, no blocking
  const [initialLoad, setInitialLoad] = useState(true); // ✅ Separate initial state
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const pageSize = 6;
  const observer = useRef<IntersectionObserver | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef(false);
  const currentSearchRef = useRef("");

  // Debounce search input
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (debouncedQuery !== searchQuery) {
        setDebouncedQuery(searchQuery);
        // Reset everything for new search
        setPage(1);
        setInterviews([]);
        setHasMore(true);
        setTotal(0);
        currentSearchRef.current = searchQuery;
      }
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  // Ref callback for infinite scroll
  const lastInterviewRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || initialLoad) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !isFetchingRef.current
        ) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, initialLoad]
  );

  // Fetch interviews - FIXED VERSION
  useEffect(() => {
    // Prevent duplicate fetches
    if (isFetchingRef.current) return;

    const fetchInterviews = async () => {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        console.log("🔍 Fetching:", {
          page,
          query: debouncedQuery,
          currentCount: interviews.length,
        });

        const res = await getAllInterviews(
          page,
          pageSize,
          debouncedQuery || undefined
        );

        console.log("✅ Received:", {
          count: res.interviews.length,
          total: res.total,
          hasError: !!res.error,
        });

        // Check if search changed while fetching
        if (currentSearchRef.current !== debouncedQuery) {
          console.log("⚠️ Search changed, ignoring stale results");
          isFetchingRef.current = false;
          setLoading(false);
          return;
        }

        setInterviews((prev) => {
          // If page is 1, replace everything (new search or refresh)
          if (page === 1) {
            return res.interviews;
          }

          // Otherwise append and deduplicate
          const existingIds = new Set(prev.map((i) => i.id));
          const newInterviews = res.interviews.filter(
            (newInterview) => !existingIds.has(newInterview.id)
          );
          return [...prev, ...newInterviews];
        });

        setTotal(res.total);

        // FIXED: Calculate hasMore based on current page and fetched data
        const currentTotalLoaded =
          page === 1
            ? res.interviews.length
            : interviews.length +
              res.interviews.filter(
                (newInterview) =>
                  !interviews.some(
                    (interview) => interview.id === newInterview.id
                  )
              ).length;

        setHasMore(
          currentTotalLoaded < res.total && res.interviews.length === pageSize
        );

        if (initialLoad) setInitialLoad(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load interviews. Please try again.");
        setHasMore(false);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchInterviews();
    // FIXED: Only depend on page and debouncedQuery
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedQuery]);

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setPage(1);
    setInterviews([]);
    setHasMore(true);
    setTotal(0);
    currentSearchRef.current = "";
  };

  // Calculate display states
  const showInitialSkeleton = initialLoad && interviews.length === 0;
  const showNoResults = !loading && interviews.length === 0 && !error;
  const showLoadMore = loading && interviews.length > 0;

  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 py-10 font-lexend">
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Interview Cards */}
        <div className="lg:w-[70%] w-full space-y-6">
          {/* Show initial loading skeleton */}
          {showInitialSkeleton && (
            <>
              {[...Array(3)].map((_, i) => (
                <InterviewCardSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          )}

          {/* Show error */}
          {error && (
            <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">
              <p className="font-medium">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setPage(1);
                  setInterviews([]);
                  setHasMore(true);
                  isFetchingRef.current = false;
                }}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Show interviews */}
          {interviews.map((interview, idx) => {
            if (idx === interviews.length - 1) {
              return (
                <div ref={lastInterviewRef} key={interview.id}>
                  <InterviewCard interview={interview} />
                </div>
              );
            }
            return <InterviewCard key={interview.id} interview={interview} />;
          })}

          {/* Loading indicator for infinite scroll */}
          {showLoadMore && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-gray-600 font-medium">
                Loading more experiences...
              </p>
            </div>
          )}

          {/* No more interviews */}
          {!hasMore && interviews.length > 0 && !loading && (
            <div className="text-center py-8 text-gray-600">
              <p className="font-medium">🎉 You've seen all experiences!</p>
              <p className="text-sm mt-1">
                {debouncedQuery
                  ? `No more experiences for "${debouncedQuery}"`
                  : "Check back later for new interview experiences"}
              </p>
            </div>
          )}

          {/* No interviews found */}
          {showNoResults && (
            <div className="text-center py-12 text-gray-600">
              {debouncedQuery ? (
                <>
                  <p className="text-lg font-medium">
                    No experiences found for "{debouncedQuery}"
                  </p>
                  <p className="text-sm mt-1">Try a different company name</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">
                    No interview experiences yet
                  </p>
                  <p className="text-sm mt-1">
                    Be the first to share your experience!
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Sidebar */}
        <aside className="lg:w-[30%] w-full">
          <WhatsappCard />
        </aside>
      </div>
    </section>
  );
}
