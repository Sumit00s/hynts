"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import InterviewCard from "@/app/_components/InterviewCard";
import { Interview } from "@/types/interview";
import { getMoreInterviews } from "@/app/actions/interviews/getMoreInterviews";

interface InfiniteInterviewListProps {
  initialInterviews: Interview[];
  totalInterviews: number;
}

export default function InfiniteInterviewList({
  initialInterviews,
  totalInterviews,
}: InfiniteInterviewListProps) {
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);
  const [page, setPage] = useState(1); // Page 1 = first 10 interviews already loaded
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(
    initialInterviews.length < totalInterviews
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false);

  const pageSize = 6;
  const initialPageSize = 10; // First page has 10 interviews

  // Intersection observer callback for infinite scroll
  const lastInterviewRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch more interviews when page changes
  useEffect(() => {
    // Skip initial page (already loaded from server)
    if (page === 1 || isFetchingRef.current) return;

    const fetchMoreInterviews = async () => {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        // Calculate offset: first 10 interviews already loaded, then 6 per page
        const offset = initialPageSize + (page - 2) * pageSize;
        const res = await getMoreInterviews(offset, pageSize);

        setInterviews((prev) => {
          // Deduplicate interviews by id
          const newInterviews = res.interviews.filter(
            (newInterview) =>
              !prev.some((interview) => interview.id === newInterview.id)
          );
          const updated = [...prev, ...newInterviews];

          // Check if there are more interviews to load
          setHasMore(updated.length < totalInterviews);

          return updated;
        });
      } catch (err) {
        console.error("Failed to fetch more interviews:", err);
        setError("Failed to load more interviews. Please try again.");
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchMoreInterviews();
  }, [page, pageSize, totalInterviews]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <>
      <div className="space-y-6">
        {interviews.map((interview, idx) => {
          // Attach observer to last item for infinite scroll
          if (idx === interviews.length - 1 && hasMore) {
            return (
              <div ref={lastInterviewRef} key={interview.id}>
                <InterviewCard interview={interview} />
              </div>
            );
          }
          return <InterviewCard key={interview.id} interview={interview} />;
        })}
      </div>

      {/* Error message with retry button */}
      {error && (
        <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg mt-6">
          <p className="font-medium">{error}</p>
          <button
            onClick={() => {
              setError(null);
              isFetchingRef.current = false;
              setPage((prev) => prev); // Trigger refetch
            }}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading indicator for infinite scroll */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-gray-600 font-medium">
            Loading more experiences...
          </p>
        </div>
      )}

      {/* End of list message */}
      {!hasMore && interviews.length > 0 && !loading && (
        <div className="text-center py-8 text-gray-600">
          <p className="font-medium">
            🎉 You've seen all {interviews.length} experiences!
          </p>
          <p className="text-sm mt-1">Check back later for new experiences</p>
        </div>
      )}
    </>
  );
}
