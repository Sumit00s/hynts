"use server";

import { supabase } from "@/app/_lib/supabaseClient";
import { Interview } from "@/types/interview";

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    console.log(`🔍 Fetching interview: ${id}`);

    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`❌ Error fetching interview ${id}:`, error.message);
      return null;
    }

    console.log(`✅ Successfully fetched interview: ${id}`);
    return data as Interview;
  } catch (error) {
    console.error(`❌ Unexpected error fetching interview ${id}:`, error);
    return null;
  }
}
