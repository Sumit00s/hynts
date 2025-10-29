// File: app/actions/interviews/getFeaturedInterviews.ts
"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Interview } from "@/types/interview";

export async function getFeaturedInterviews() {
  const getCachedInterviews = unstable_cache(
    async () => {
      try {
        const { data, error } = await supabase
          .from("interviews")
          .select(
            `
            id,
            full_name,
            is_anonymous,
            company_name,
            company_logo,
            job_position_applied,
            salary_range,
            interview_result
          `
          )
          .order("created_at", { ascending: false })
          .limit(12);

        if (error) {
          console.error(
            "❌ Error fetching featured interviews:",
            error.message
          );
          return [];
        }

        return data as Interview[];
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        return [];
      }
    },
    ["featured-interviews"],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: ["interviews", "featured-interviews"],
    }
  );

  return getCachedInterviews();
}
