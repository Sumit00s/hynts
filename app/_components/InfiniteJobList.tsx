"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import JobCard from "@/app/_components/JobCard";
import { Job } from "@/types/job";
import { getMoreJobs } from "@/app/actions/jobs/getMoreJobs";

interface InfiniteJobListProps {
  initialJobs: Job[];
  totalJobs: number;
}

export default function InfiniteJobList({
  initialJobs,
  totalJobs,
}: InfiniteJobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [page, setPage] = useState(1); // Page 1 = first 10 jobs already loaded
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initialJobs.length < totalJobs);

  const observer = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false);

  const pageSize = 6;
  const initialPageSize = 10; // First page has 10 jobs

  // Intersection observer callback for infinite scroll
  const lastJobRef = useCallback(
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

  // Fetch more jobs when page changes
  useEffect(() => {
    // Skip initial page (already loaded from server)
    if (page === 1 || isFetchingRef.current) return;

    const fetchMoreJobs = async () => {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        // Calculate offset: first 10 jobs already loaded, then 6 per page
        const offset = initialPageSize + (page - 2) * pageSize;
        const res = await getMoreJobs(offset, pageSize);

        setJobs((prev) => {
          // Deduplicate jobs by id
          const newJobs = res.jobs.filter(
            (newJob) => !prev.some((job) => job.id === newJob.id)
          );
          const updated = [...prev, ...newJobs];

          // Check if there are more jobs to load (use updated array length)
          setHasMore(updated.length < totalJobs);

          return updated;
        });
      } catch (err) {
        console.error("Failed to fetch more jobs:", err);
        setError("Failed to load more jobs. Please try again.");
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchMoreJobs();
  }, [page, pageSize, jobs.length, totalJobs]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job, idx) => {
          // Attach observer to last item for infinite scroll
          if (idx === jobs.length - 1 && hasMore) {
            return (
              <div ref={lastJobRef} key={job.id}>
                <JobCard job={job} />
              </div>
            );
          }
          return <JobCard key={job.id} job={job} />;
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
          <p className="mt-3 text-gray-600 font-medium">Loading more jobs...</p>
        </div>
      )}

      {/* End of list message */}
      {!hasMore && jobs.length > 0 && !loading && (
        <div className="text-center py-8 text-gray-600">
          <p className="font-medium">🎉 You've seen all {jobs.length} jobs!</p>
          <p className="text-sm mt-1">Check back later for new opportunities</p>
        </div>
      )}
    </>
  );
}
