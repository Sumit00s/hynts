"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Interview } from "@/types/interview";

/**
 * Fetches interview by ID with 5-minute cache
 * Reduces database queries significantly
 */
export const getInterviewById = unstable_cache(
  async (id: string): Promise<Interview | null> => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(`❌ Error fetching interview ${id}:`, error.message);
        return null;
      }

      return data as Interview;
    } catch (error) {
      console.error(`❌ Unexpected error fetching interview ${id}:`, error);
      return null;
    }
  },
  ["interview-by-id"],
  {
    revalidate: 300, // 5 minutes cache
    tags: ["interviews"],
  }
);

/**
 * Revalidate interview cache manually
 * Call after creating/updating interviews
 */
export async function revalidateInterviewCache() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("interviews");
}
