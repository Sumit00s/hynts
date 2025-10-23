"use client";

import Image from "next/image";
import Link from "next/link";
import { User, Clock } from "lucide-react";
import { Interview } from "@/types/interview";

interface InterviewCardProps {
  interview: Interview;
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  const verdictConfig: Record<
    string,
    { text: string; bg: string; border: string }
  > = {
    Selected: {
      text: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    Rejected: {
      text: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    Ghosted: {
      text: "text-yellow-700",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
  };

  const verdict = verdictConfig[interview.interview_result || ""] || {
    text: "text-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-200",
  };

  // Format the date to relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 604800)}w ago`;
    return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  };

  return (
    <Link
      href={`/interview/${interview.id}`}
      className="block w-full border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        {/* Left side - logo and company info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-gray-200 flex-shrink-0">
            <Image
              src={interview.company_logo}
              alt={interview.company_name}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate group-hover:text-blue-600 transition-colors">
              {interview.company_name} | {interview.job_position_applied}
            </h3>

            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs sm:text-sm text-gray-600">
              {interview.number_of_rounds && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {interview.number_of_rounds} Rounds
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Verdict badge */}
        <span
          className={`px-4 py-1.5 text-sm font-semibold rounded-full ${verdict.text} ${verdict.bg} whitespace-nowrap self-start sm:self-center`}
        >
          {interview.interview_result || "Pending"}
        </span>
      </div>

      {/* Divider line after header */}
      <div className="border-t border-gray-100 my-3 sm:my-4" />

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
        {[interview.difficulty_level, interview.interview_mode].map(
          (tag, idx) =>
            tag && (
              <span
                key={idx}
                className="px-3 py-1 text-xs sm:text-sm font-medium rounded-md bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            )
        )}
        {interview.work_experience && (
          <span className="px-3 py-1 text-xs sm:text-sm font-medium rounded-md bg-blue-100 text-blue-700">
            {interview.work_experience}
          </span>
        )}
      </div>

      {/* Advice Section */}
      <div className="mb-4 space-y-1.5 text-sm sm:text-base">
        {interview.general_advice &&
        interview.general_advice.trim().length > 0 ? (
          interview.general_advice
            .split(". ")
            .slice(0, 2)
            .map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="text-gray-400 mt-1">•</span>
                <p className="flex-1 line-clamp-2">{point.trim()}</p>
              </div>
            ))
        ) : (
          <p className="text-gray-500 italic">
            No advice shared for this interview
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
        {/* Author info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-gray-600" />
          </div>
          <p className="font-medium text-gray-900 truncate">
            {interview.full_name}
          </p>
        </div>

        {/* Date info */}
        <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">
          {getRelativeTime(interview.created_at)}
        </div>
      </div>
    </Link>
  );
}
