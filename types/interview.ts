export type RoundDetail = {
  round_name: string;
  round_type: string;
  round_mode: string;
  difficulty_level: string;
  duration: string;
  summary: string;
};

export type Interview = {
  id: number;
  created_at: string;
  full_name: string | null;
  email: string | null;
  is_anonymous: boolean;
  work_experience: string | null;
  current_job_role: string | null;
  about_yourself: string | null;
  company_name: string;
  company_logo: string;
  job_position_applied: string;
  difficulty_level: string | null;
  interview_timeline: string | null;
  application_source: string | null;
  interview_mode: string | null;
  number_of_rounds: number | null;
  interview_result: string | null;
  salary_range: string | null;
  preparation_tips: string | null;
  general_advice: string | null;
  round_details: RoundDetail[] | null;
};
