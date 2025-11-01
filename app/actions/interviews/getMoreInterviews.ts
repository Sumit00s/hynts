"use server";

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

// ✅ ONLY used for infinite scroll (when user scrolls)
export async function getMoreInterviews(offset: number, pageSize: number) {
  // Validate inputs
  if (offset < 0 || pageSize < 1 || pageSize > 50) {
    throw new Error("Invalid pagination parameters");
  }

  try {
    const from = offset;
    const to = offset + pageSize - 1;

    const { data, error } = await supabase
      .from("interviews")
      .select(INTERVIEW_FIELDS.trim())
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("❌ DB Error:", error.message);
      throw new Error("Unable to load interviews");
    }

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    return {
      interviews: data as unknown as Interview[],
    };
  } catch (err) {
    console.error("❌ Fetch error:", err);
    throw err;
  }
}

// ✅ Cache invalidation for ISR
export async function revalidateInterviewsCache() {
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/interview");
}
