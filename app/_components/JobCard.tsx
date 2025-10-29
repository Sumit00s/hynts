import Image from "next/image";
import Link from "next/link";
import { Job } from "@/types/job";
import { getRelativeTime } from "@/app/_lib/utils";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-lg flex flex-col gap-4 bg-white transition transform hover:-translate-y-1">
      {/* Top Section */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
          <Image
            src={job.logo_url}
            width={56}
            height={56}
            alt={job.company}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{job.role}</h3>
          <p className="text-gray-500">{job.company}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
          {job.type}
        </span>
        <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
          {job.location}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mt-2">
        <p>
          <span className="font-medium">Batch:</span> {job.batch}
        </p>
        <p>
          <span className="font-medium">Salary:</span>{" "}
          <span className="text-green-600 font-medium">{job.salary}</span>
        </p>
        <p>
          <span className="font-medium">Experience:</span> {job.experience}
        </p>
        <p>
          <span className="font-medium">Posted:</span>{" "}
          {getRelativeTime(job.date)}
        </p>
      </div>

      {/* Skills */}
      {job.skills && (
        <div className="flex flex-wrap gap-2 mt-2">
          {job.skills.split(",").map((skill, idx) => (
            <span
              key={`${skill}-${idx}`}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Footer - Simple <a> tags, no Button wrapper */}
      <div className="flex gap-3 mt-3">
        {/* External Link - Direct <a> tag styled as button */}
        <a
          href={job.careers_link}
          target="_blank"
          className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 h-10 px-4 py-2 transition-colors"
        >
          Apply
        </a>

        {/* Internal Link - Next.js Link styled as button */}
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100 text-gray-800 h-10 px-4 py-2 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
