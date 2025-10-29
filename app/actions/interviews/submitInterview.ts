// File: app/actions/interviews/submitInterview.ts

"use server";

import { revalidateTag } from "next/cache";
import { supabase } from "@/app/_lib/supabaseClient";
import { Interview, RoundDetail } from "@/types/interview";

export type SubmitInterviewInput = {
  full_name: string;
  email: string;
  is_anonymous: boolean;
  work_experience: string;
  current_job_role: string;
  about_yourself: string;
  company_name: string;
  job_position_applied: string;
  difficulty_level: string;
  interview_timeline: string;
  application_source: string;
  interview_mode: string;
  number_of_rounds: string;
  interview_result: string;
  salary_range: string;
  preparation_tips: string;
  general_advice: string;
  round_details: RoundDetail[];
};

export async function submitInterviewExperience(
  data: SubmitInterviewInput
): Promise<{ success: boolean; message: string; id?: number }> {
  try {
    // Prepare the data for insertion
    const insertData = {
      full_name: data.is_anonymous ? "Anonymous" : data.full_name,
      email: data.is_anonymous ? null : data.email,
      is_anonymous: data.is_anonymous,
      work_experience: data.work_experience || null,
      current_job_role: data.current_job_role || null,
      about_yourself: data.about_yourself || null,
      company_name: data.company_name,
      company_logo:
        "https://gacqoofijmmefmavblni.supabase.co/storage/v1/object/public/hynts/logos/Company-Default.png",
      job_position_applied: data.job_position_applied,
      difficulty_level: data.difficulty_level || null,
      interview_timeline: data.interview_timeline || null,
      application_source: data.application_source || null,
      interview_mode: data.interview_mode || null,
      number_of_rounds: data.number_of_rounds
        ? Number(data.number_of_rounds)
        : null,
      interview_result: data.interview_result || null,
      salary_range: data.salary_range || null,
      preparation_tips: data.preparation_tips || null,
      general_advice: data.general_advice || null,
      round_details:
        data.round_details && data.round_details.length > 0
          ? data.round_details
          : null,
    };

    const { data: result, error } = await supabase
      .from("interviews")
      .insert([insertData])
      .select("id")
      .single();

    if (error) {
      console.error("❌ Error submitting interview:", error.message);
      return {
        success: false,
        message: `Failed to submit: ${error.message}`,
      };
    }

    // ✅ Revalidate cache after successful submission (Next.js 15 syntax)
    revalidateTag("interviews", "default");
    revalidateTag("company-suggestions", "default");

    console.log("✅ Interview submitted successfully:", result);
    return {
      success: true,
      message: "Interview experience shared successfully!",
      id: result?.id,
    };
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
