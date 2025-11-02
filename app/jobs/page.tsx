import { Suspense } from "react";
import { supabase } from "@/app/_lib/supabaseClient";
import { Job } from "@/types/job";
import JobCardSkeleton from "@/app/_components/JobCardSkeleton";
import WhatsappCard from "@/app/_components/WhatsappCard";
import InfiniteJobList from "@/app/_components/InfiniteJobList";

// ✅ Force static rendering - NO edge requests for initial load
export const dynamic = "force-static";
export const revalidate = 43200; // 12 hours

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

export default async function JobsPage() {
  // ✅ Fetch first 6 jobs DIRECTLY in server component at BUILD TIME
  let initialJobs: Job[] = [];
  let totalJobs = 0;

  try {
    const { data, error, count } = await supabase
      .from("jobs")
      .select(JOB_FIELDS.trim(), { count: "exact" })
      .order("date", { ascending: false })
      .range(0, 9); // First 10 jobs (indices 0-9)

    if (!error && data) {
      initialJobs = data as unknown as Job[];
      totalJobs = count || 0;
    }
  } catch (err) {
    console.error("Failed to fetch initial jobs:", err);
  }

  return (
    <section className="max-w-7xl mx-auto mt-7 px-6 py-20 font-lexend">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-playfair">
        Explore Jobs
      </h1>
      <p className="text-gray-600 text-sm mt-1">
        All offcampus and internship opportunities in one place
      </p>

      <div className="flex flex-col mt-7 lg:flex-row gap-8">
        {/* Job Cards with Infinite Scroll */}
        <div className="lg:w-[70%] w-full">
          {initialJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm mt-1">Check back later for opportunities</p>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <JobCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <InfiniteJobList
                initialJobs={initialJobs}
                totalJobs={totalJobs}
              />
            </Suspense>
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
