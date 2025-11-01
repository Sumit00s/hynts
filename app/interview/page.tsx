import { Suspense } from "react";
import { supabase } from "@/app/_lib/supabaseClient";
import { Interview } from "@/types/interview";
import InterviewCardSkeleton from "@/app/_components/InterviewCardSkeleton";
import WhatsappCard from "@/app/_components/WhatsappCard";
import InterviewClientWrapper from "@/app/_components/InterviewClientWrapper";

// ✅ Force static rendering - NO edge requests for initial load
export const dynamic = "force-static";
export const revalidate = 36000; // 10 hours

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

export default async function InterviewPage() {
  // ✅ Fetch first 10 interviews DIRECTLY in server component at BUILD TIME
  let initialInterviews: Interview[] = [];
  let totalInterviews = 0;

  try {
    const { data, error, count } = await supabase
      .from("interviews")
      .select(INTERVIEW_FIELDS.trim(), { count: "exact" })
      .order("created_at", { ascending: false })
      .range(0, 9); // First 10 interviews (indices 0-9)

    if (!error && data) {
      initialInterviews = data as unknown as Interview[];
      totalInterviews = count || 0;
    }
  } catch (err) {
    console.error("Failed to fetch initial interviews:", err);
  }

  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 py-10 font-lexend">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Interview Content - 70% */}
        <div className="lg:w-[70%] w-full">
          {initialInterviews.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg font-medium">
                No interview experiences yet
              </p>
              <p className="text-sm mt-1">
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <InterviewCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <InterviewClientWrapper
                initialInterviews={initialInterviews}
                totalInterviews={totalInterviews}
              />
            </Suspense>
          )}
        </div>

        {/* WhatsApp Sidebar - 30% */}
        <aside className="lg:w-[30%] w-full mt-5">
          <WhatsappCard />
        </aside>
      </div>
    </section>
  );
}
