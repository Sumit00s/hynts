export interface Job {
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
  date: string; // Supabase returns date as string
  careers_link: string;
  description?: string;
}
