// File: app/actions/jobs/getAllJobs.ts
"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Job } from "@/types/job";

// Cache key generator
const getCacheKey = (page: number, pageSize: number) => {
  return `jobs-${page}-${pageSize}`;
};

// ✅ OPTIMIZED: Only select fields needed for JobCard display
const JOB_FIELDS = `
  id,
  role,
  company,
  logo_url,
  location,
  type,
  experience,
  batch,
  salary,
  date,
  skills,
  careers_link
`;

export async function getAllJobs(page: number, pageSize: number) {
  // Validate inputs
  if (page < 1 || pageSize < 1 || pageSize > 50) {
    throw new Error("Invalid pagination parameters");
  }

  const getCachedJobs = unstable_cache(
    async () => {
      try {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
          .from("jobs")
          .select(JOB_FIELDS.trim(), { count: "exact" })
          .order("date", { ascending: false })
          .range(from, to);

        if (error) {
          console.error("❌ DB Error:", error.message, error.details);
          return {
            jobs: [],
            total: 0,
            error: "Unable to load jobs at this time",
          };
        }

        // Type-safe validation
        if (!data || !Array.isArray(data)) {
          return {
            jobs: [],
            total: 0,
          };
        }

        return {
          jobs: data as unknown as Job[],
          total: count || 0,
        };
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        return {
          jobs: [],
          total: 0,
          error: "Service temporarily unavailable",
        };
      }
    },
    [getCacheKey(page, pageSize)],
    {
      revalidate: 300, // 5 minutes cache
      tags: ["jobs"],
    }
  );

  return getCachedJobs();
}

// ✅ Cache invalidation when new job is posted
export async function revalidateJobsCache() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("jobs");
}

// ✅ Prefetch next page for smoother infinite scroll
export async function prefetchNextJobsPage(
  currentPage: number,
  pageSize: number
) {
  getAllJobs(currentPage + 1, pageSize).catch(() => {
    // Silently fail for prefetch
  });
}
