// File: app/actions/interviews/getAllInterviews.ts
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

export async function getAllInterviews(
  page: number,
  pageSize: number,
  companyName?: string
) {
  // Validate inputs
  if (page < 1 || pageSize < 1 || pageSize > 50) {
    console.error("❌ Invalid pagination:", { page, pageSize });
    return { interviews: [], total: 0 };
  }

  const cacheKey = `interviews-${page}-${pageSize}-${companyName || "all"}`;
  console.log("🔍 Server: Fetching", { page, pageSize, companyName, cacheKey });

  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("interviews")
      .select(INTERVIEW_FIELDS.trim(), { count: "exact" })
      .order("created_at", { ascending: false });

    // Search by company name
    if (companyName && companyName.trim()) {
      const sanitized = companyName.trim().substring(0, 100);
      query = query.ilike("company_name", `%${sanitized}%`);
      console.log("🔎 Searching for:", sanitized);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("❌ Supabase Error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      // Return empty but don't cache errors
      return {
        interviews: [],
        total: 0,
        error: "Database error occurred",
      };
    }

    // Check for null/undefined data
    if (!data) {
      console.warn("⚠️ No data returned from query");
      return { interviews: [], total: 0 };
    }

    console.log("✅ Server: Success", {
      returned: data.length,
      total: count,
      from,
      to,
    });

    return {
      interviews: data as unknown as Interview[],
      total: count || 0,
    };
  } catch (err) {
    console.error("❌ Unexpected server error:", err);
    return {
      interviews: [],
      total: 0,
      error: "Service temporarily unavailable",
    };
  }
}

// Add manual cache busting for testing
export async function clearInterviewsCache() {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/interview"); // Only revalidate /interviews page
    console.log("✅ Cache cleared");
    return { success: true };
  } catch (err) {
    console.error("❌ Cache clear failed:", err);
    return { success: false };
  }
}
