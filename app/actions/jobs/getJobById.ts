import { unstable_cache } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Job } from "@/types/job";

export async function getJobById(id: string) {
  // Validate ID
  if (!id || id.trim() === "") {
    return null;
  }

  const getCachedJob = unstable_cache(
    async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("❌ Error fetching job:", error.message);
          return null;
        }

        return data as Job;
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        return null;
      }
    },
    [`job-${id}`],
    {
      revalidate: 600, // 10 minutes (job details don't change often)
      tags: [`job-${id}`, "jobs"],
    }
  );

  return getCachedJob();
}
