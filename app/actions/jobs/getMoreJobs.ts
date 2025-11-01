"use server";

import { supabase } from "@/app/_lib/supabaseClient";
import { Job } from "@/types/job";

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

// ✅ ONLY used for infinite scroll (when user scrolls)
// Makes edge requests but ONLY when needed
// Note: offset is the starting index, not page number
export async function getMoreJobs(offset: number, pageSize: number) {
  // Validate inputs
  if (offset < 0 || pageSize < 1 || pageSize > 50) {
    throw new Error("Invalid pagination parameters");
  }

  try {
    const from = offset;
    const to = offset + pageSize - 1;

    const { data, error } = await supabase
      .from("jobs")
      .select(JOB_FIELDS.trim())
      .order("date", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("❌ DB Error:", error.message);
      throw new Error("Unable to load jobs");
    }

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    return {
      jobs: data as unknown as Job[],
    };
  } catch (err) {
    console.error("❌ Fetch error:", err);
    throw err;
  }
}

// ✅ Cache invalidation for ISR
// Call this IMMEDIATELY after posting jobs at 10 PM
export async function revalidateJobsCache() {
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/jobs");
}
