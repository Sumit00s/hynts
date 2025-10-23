"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import JobCard from "@/app/_components/JobCard";
import JobCardSkeleton from "@/app/_components/JobCardSkeleton";
import WhatsappCard from "@/app/_components/WhatsappCard";
import { Job } from "@/types/job";
import { getAllJobs } from "@/app/actions/jobs/getAllJobs";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Start with true
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageSize = 6;
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetchingRef = useRef(false); // Prevent duplicate fetches

  // Ref callback for infinite scroll
  const lastJobRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
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

  // Fetch jobs - OPTIMIZED
  useEffect(() => {
    // Prevent duplicate fetches
    if (isFetchingRef.current) return;

    const fetchJobs = async () => {
      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const res = await getAllJobs(page, pageSize);

        setJobs((prev) => {
          // If page is 1, replace everything
          if (page === 1) {
            return res.jobs;
          }

          // Otherwise append and deduplicate
          const newJobs = res.jobs.filter(
            (newJob) => !prev.some((job) => job.id === newJob.id)
          );
          return [...prev, ...newJobs];
        });

        setTotal(res.total);

        // Calculate if there's more data
        const totalLoaded =
          page === 1 ? res.jobs.length : jobs.length + res.jobs.length;
        setHasMore(totalLoaded < res.total);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchJobs();
  }, [page]);

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto mt-7 px-6 py-20 font-lexend">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-playfair">
        Explore Jobs
      </h1>
      <p className="text-gray-600 text-sm mt-1">
        All offcampus and internship opportunities in one place
      </p>

      <div className="flex flex-col mt-7 lg:flex-row gap-8">
        {/* Job Cards */}
        <div className="lg:w-[70%] w-full grid grid-cols-1 gap-6">
          {/* Show initial loading skeleton */}
          {jobs.length === 0 && loading && (
            <>
              {[...Array(3)].map((_, i) => (
                <JobCardSkeleton key={i} />
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
                  setJobs([]);
                  setHasMore(true);
                  isFetchingRef.current = false;
                }}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Show jobs */}
          {jobs.map((job, idx) => {
            if (idx === jobs.length - 1) {
              return (
                <div ref={lastJobRef} key={job.id}>
                  <JobCard job={job} />
                </div>
              );
            }
            return <JobCard key={job.id} job={job} />;
          })}

          {/* Loading indicator for infinite scroll */}
          {loading && jobs.length > 0 && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-gray-600 font-medium">
                Loading more jobs...
              </p>
            </div>
          )}

          {/* No more jobs */}
          {!hasMore && jobs.length > 0 && !loading && (
            <div className="text-center py-8 text-gray-600">
              <p className="font-medium">🎉 You've seen all jobs!</p>
              <p className="text-sm mt-1">
                Check back later for new opportunities
              </p>
            </div>
          )}

          {/* No jobs found */}
          {jobs.length === 0 && !loading && !error && (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm mt-1">Check back later for opportunities</p>
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
