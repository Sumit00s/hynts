import { unstable_cache } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Job } from "@/types/job";

export async function getJobById(id: string) {
  // Validate ID
  if (!id || id.trim() === "") {
    console.log("❌ Invalid ID: empty or null");
    return null;
  }

  // Convert to number if your DB id is a number type
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    console.log("❌ Invalid ID: not a number");
    return null;
  }

  const getCachedJob = unstable_cache(
    async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", numericId) // Use numeric ID here
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
      revalidate: 600,
      tags: [`job-${id}`, "jobs"],
    }
  );

  return getCachedJob();
}
