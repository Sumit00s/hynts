"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Interview } from "@/types/interview";

const INTERVIEW_FIELDS = `
  id,
  created_at,
  full_name,
  is_anonymous,
  company_name,
  company_logo,
  job_position_applied,
  difficulty_level,
  interview_timeline,
  interview_mode,
  number_of_rounds,
  interview_result,
  work_experience,
  general_advice
`;

export async function searchInterviews(companyName: string) {
  if (!companyName || companyName.trim().length === 0) {
    return { interviews: [], total: 0 };
  }

  const sanitized = companyName.trim().substring(0, 100);

  const getCachedSearch = unstable_cache(
    async () => {
      try {
        const { data, error, count } = await supabase
          .from("interviews")
          .select(INTERVIEW_FIELDS.trim(), { count: "exact" })
          .ilike("company_name", `%${sanitized}%`)
          .order("created_at", { ascending: false })
          .limit(50); // Limit search results to 50

        if (error) {
          console.error("❌ Search Error:", error.message);
          throw new Error("Search failed");
        }

        return {
          interviews: (data || []) as unknown as Interview[],
          total: count || 0,
        };
      } catch (err) {
        console.error("❌ Search error:", err);
        throw err;
      }
    },
    [`interview-search-${sanitized.toLowerCase()}`],
    {
      revalidate: 36000, // 10 hours
      tags: [`interview-search`, `interviews`],
    }
  );

  return getCachedSearch();
}
