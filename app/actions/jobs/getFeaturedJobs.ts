"use server";

import { supabase } from "@/app/_lib/supabaseClient";

// Type for better safety
export type Job = {
  id: number;
  company: string;
  logo_url: string;
  role: string;
  location: string;
  type: string;
  experience: string;
  batch: string;
  skills: string;
  salary: string;
  date_posted: string;
  careers_link: string;
  description: string;
};

export async function getFeaturedJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("date", { ascending: false }) // latest jobs first
    .limit(6); // only top 6 jobs

  if (error) {
    console.error("❌ Error fetching featured jobs:", error.message);
    return [];
  }

  return data || [];
}
