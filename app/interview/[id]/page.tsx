// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Metadata } from "next";
// import { getInterviewById } from "@/app/actions/interviews/getInterviewById";
// import { Badge } from "@/components/ui/badge";
// import BackButton from "@/app/_components/BackButton";
// import { ChevronDown, Layers } from "lucide-react";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import ShareButton from "@/app/_components/ShareButton";

// // ✅ Enable page caching for 5 minutes
// export const revalidate = 300;

// // ✅ Enable static params for better caching
// export const dynamicParams = true;

// type InterviewDetailPageProps = {
//   params: { id: string };
// };

// // Generate SEO metadata
// export async function generateMetadata({
//   params,
// }: InterviewDetailPageProps): Promise<Metadata> {
//   const interview = await getInterviewById(params.id);

//   if (!interview) {
//     return {
//       title: "Interview Not Found",
//     };
//   }

//   return {
//     title: `${interview.company_name} - ${interview.job_position_applied} Interview Experience`,
//     description: `Interview experience at ${interview.company_name} for ${
//       interview.job_position_applied
//     }. Result: ${interview.interview_result || "N/A"}`,
//     openGraph: {
//       title: `${interview.company_name} - ${interview.job_position_applied}`,
//       description:
//         interview.general_advice?.slice(0, 150) || "Interview experience",
//       images: [interview.company_logo],
//     },
//   };
// }

// export default async function InterviewDetailPage({
//   params,
// }: InterviewDetailPageProps) {
//   const interview = await getInterviewById(params.id);

//   // Use proper 404 handling
//   if (!interview) {
//     notFound();
//   }

//   // Helper function - same logic, cleaner
//   const getDifficultyColor = (level: string | null) => {
//     if (!level) return "bg-gray-100 text-gray-700";

//     const colorMap: Record<string, string> = {
//       easy: "bg-green-100 text-green-700",
//       medium: "bg-yellow-100 text-yellow-700",
//       hard: "bg-red-100 text-red-700",
//     };

//     return colorMap[level.toLowerCase()] || "bg-gray-100 text-gray-700";
//   };

//   // Helper for verdict colors
//   const getVerdictColor = (result: string | null) => {
//     if (!result) return "bg-gray-100 text-gray-700";

//     return result.toLowerCase() === "selected"
//       ? "bg-green-100 text-green-700"
//       : "bg-red-100 text-red-700";
//   };

//   return (
//     <section className="mt-10 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-lexend text-gray-800">
//       <BackButton />

//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 w-full">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
//           <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
//             <Image
//               src={interview.company_logo}
//               alt={interview.company_name}
//               width={64}
//               height={64}
//               className="object-contain"
//               priority
//             />
//           </div>

//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 flex flex-wrap items-center gap-2">
//               {interview.company_name}
//               <span className="text-gray-400">|</span>
//               <span className="text-gray-700 font-normal">
//                 {interview.job_position_applied}
//               </span>
//             </h1>

//             <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
//               <Layers size={16} />
//               <span>{interview.number_of_rounds} Rounds</span>
//             </div>
//           </div>
//         </div>

//         <div className="self-start md:self-center">
//           <ShareButton />
//         </div>
//       </div>

//       {/* Info Card - unified style */}
//       <div className="border border-gray-200 rounded-md bg-white p-6 mb-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
//           <div>
//             <span className="text-gray-500">Name: </span>
//             <span className="font-medium text-gray-800">
//               {interview.is_anonymous ? "Anonymous" : interview.full_name}
//             </span>
//           </div>
//           <div>
//             <span className="text-gray-500">Verdict: </span>
//             <Badge className={getVerdictColor(interview.interview_result)}>
//               {interview.interview_result || "N/A"}
//             </Badge>
//           </div>
//           <div>
//             <span className="text-gray-500">Difficulty: </span>
//             <Badge className={getDifficultyColor(interview.difficulty_level)}>
//               {interview.difficulty_level || "N/A"}
//             </Badge>
//           </div>
//           <div>
//             <span className="text-gray-500">Timeline: </span>
//             <span className="font-medium text-gray-800">
//               {interview.interview_timeline || "N/A"}
//             </span>
//           </div>
//           <div>
//             <span className="text-gray-500">Application Mode: </span>
//             <span className="font-medium text-gray-800">
//               {interview.application_source || "N/A"}
//             </span>
//           </div>
//           <div>
//             <span className="text-gray-500">Salary Range: </span>
//             <span className="font-medium text-green-700">
//               {interview.salary_range || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Interview Rounds */}
//       <div className="mb-10">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//           Interview Rounds
//         </h2>
//         {interview.round_details?.length ? (
//           <div className="space-y-4">
//             {interview.round_details.map((round, idx) => (
//               <Collapsible
//                 key={idx}
//                 className="border border-gray-200 rounded-md bg-white"
//               >
//                 <CollapsibleTrigger className="w-full flex flex-col text-left p-5 hover:bg-gray-50 transition rounded-md">
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center gap-3">
//                       <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
//                         {idx + 1}
//                       </div>
//                       <span className="font-medium text-gray-800 text-lg">
//                         {round.round_name}
//                       </span>
//                     </div>
//                     <ChevronDown className="text-gray-500" size={18} />
//                   </div>

//                   {/* Round Info */}
//                   <div className="flex flex-wrap gap-4 mt-1 text-sm">
//                     <div className="text-gray-500">
//                       Difficulty:{" "}
//                       <span className="font-medium text-gray-800">
//                         {round.difficulty_level || "N/A"}
//                       </span>
//                     </div>
//                     <div className="text-gray-500">
//                       Duration:{" "}
//                       <span className="font-medium text-gray-800">
//                         {round.duration || "N/A"}
//                       </span>
//                     </div>
//                     <div className="text-gray-500">
//                       Mode:{" "}
//                       <span className="font-medium text-gray-800">
//                         {round.round_mode || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </CollapsibleTrigger>

//                 <CollapsibleContent className="p-5 border-t border-gray-100 text-sm text-gray-700 leading-relaxed">
//                   <p>
//                     <span className="font-medium">Summary:</span>{" "}
//                     {round.summary || "N/A"}
//                   </p>
//                 </CollapsibleContent>
//               </Collapsible>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">No round details available.</p>
//         )}
//       </div>

//       {/* Preparation Tips */}
//       {interview.preparation_tips && (
//         <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//             💡 Preparation Tips
//           </h2>
//           <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//             {interview.preparation_tips}
//           </p>
//         </div>
//       )}

//       {/* General Advice */}
//       {interview.general_advice && (
//         <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//             🎯 General Advice
//           </h2>
//           <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//             {interview.general_advice}
//           </p>
//         </div>
//       )}

//       {/* Empty State for Tips/Advice */}
//       {!interview.preparation_tips && !interview.general_advice && (
//         <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
//           <p className="text-gray-500">No additional tips or advice shared.</p>
//         </div>
//       )}
//     </section>
//   );
// }

import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getInterviewById } from "@/app/actions/interviews/getInterviewById";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/app/_components/BackButton";
import { ChevronDown, Layers } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ShareButton from "@/app/_components/ShareButton";

// ✅ Enable page caching for 5 minutes
export const revalidate = 300;

// ✅ Enable static params for better caching
export const dynamicParams = true;

type InterviewDetailPageProps = {
  params: Promise<{ id: string }>; // ✅ Changed to Promise
};

// Generate SEO metadata
export async function generateMetadata({
  params,
}: InterviewDetailPageProps): Promise<Metadata> {
  const { id } = await params; // ✅ Await params
  const interview = await getInterviewById(id);

  if (!interview) {
    return {
      title: "Interview Not Found",
    };
  }

  return {
    title: `${interview.company_name} - ${interview.job_position_applied} Interview Experience`,
    description: `Interview experience at ${interview.company_name} for ${
      interview.job_position_applied
    }. Result: ${interview.interview_result || "N/A"}`,
    openGraph: {
      title: `${interview.company_name} - ${interview.job_position_applied}`,
      description:
        interview.general_advice?.slice(0, 150) || "Interview experience",
      images: [interview.company_logo],
    },
  };
}

export default async function InterviewDetailPage({
  params,
}: InterviewDetailPageProps) {
  const { id } = await params; // ✅ Await params

  const interview = await getInterviewById(id);

  // Use proper 404 handling
  if (!interview) {
    notFound();
  }

  // Helper function - same logic, cleaner
  const getDifficultyColor = (level: string | null) => {
    if (!level) return "bg-gray-100 text-gray-700";

    const colorMap: Record<string, string> = {
      easy: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      hard: "bg-red-100 text-red-700",
    };

    return colorMap[level.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  // Helper for verdict colors
  const getVerdictColor = (result: string | null) => {
    if (!result) return "bg-gray-100 text-gray-700";

    return result.toLowerCase() === "selected"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  return (
    <section className="mt-10 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-lexend text-gray-800">
      <BackButton />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
            <Image
              src={interview.company_logo}
              alt={interview.company_name}
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 flex flex-wrap items-center gap-2">
              {interview.company_name}
              <span className="text-gray-400">|</span>
              <span className="text-gray-700 font-normal">
                {interview.job_position_applied}
              </span>
            </h1>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Layers size={16} />
              <span>{interview.number_of_rounds} Rounds</span>
            </div>
          </div>
        </div>

        <div className="self-start md:self-center">
          <ShareButton />
        </div>
      </div>

      {/* Info Card - unified style */}
      <div className="border border-gray-200 rounded-md bg-white p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Name: </span>
            <span className="font-medium text-gray-800">
              {interview.is_anonymous ? "Anonymous" : interview.full_name}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Verdict: </span>
            <Badge className={getVerdictColor(interview.interview_result)}>
              {interview.interview_result || "N/A"}
            </Badge>
          </div>
          <div>
            <span className="text-gray-500">Difficulty: </span>
            <Badge className={getDifficultyColor(interview.difficulty_level)}>
              {interview.difficulty_level || "N/A"}
            </Badge>
          </div>
          <div>
            <span className="text-gray-500">Timeline: </span>
            <span className="font-medium text-gray-800">
              {interview.interview_timeline || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Application Mode: </span>
            <span className="font-medium text-gray-800">
              {interview.application_source || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Salary Range: </span>
            <span className="font-medium text-green-700">
              {interview.salary_range || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Interview Rounds */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Interview Rounds
        </h2>
        {interview.round_details?.length ? (
          <div className="space-y-4">
            {interview.round_details.map((round, idx) => (
              <Collapsible
                key={idx}
                className="border border-gray-200 rounded-md bg-white"
              >
                <CollapsibleTrigger className="w-full flex flex-col text-left p-5 hover:bg-gray-50 transition rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <span className="font-medium text-gray-800 text-lg">
                        {round.round_name}
                      </span>
                    </div>
                    <ChevronDown className="text-gray-500" size={18} />
                  </div>

                  {/* Round Info */}
                  <div className="flex flex-wrap gap-4 mt-1 text-sm">
                    <div className="text-gray-500">
                      Difficulty:{" "}
                      <span className="font-medium text-gray-800">
                        {round.difficulty_level || "N/A"}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      Duration:{" "}
                      <span className="font-medium text-gray-800">
                        {round.duration || "N/A"}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      Mode:{" "}
                      <span className="font-medium text-gray-800">
                        {round.round_mode || "N/A"}
                      </span>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="p-5 border-t border-gray-100 text-sm text-gray-700 leading-relaxed">
                  <p>
                    <span className="font-medium">Summary:</span>{" "}
                    {round.summary || "N/A"}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No round details available.</p>
        )}
      </div>

      {/* Preparation Tips */}
      {interview.preparation_tips && (
        <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            💡 Preparation Tips
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {interview.preparation_tips}
          </p>
        </div>
      )}

      {/* General Advice */}
      {interview.general_advice && (
        <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            🎯 General Advice
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {interview.general_advice}
          </p>
        </div>
      )}

      {/* Empty State for Tips/Advice */}
      {!interview.preparation_tips && !interview.general_advice && (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No additional tips or advice shared.</p>
        </div>
      )}
    </section>
  );
}
