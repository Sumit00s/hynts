import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { getFeaturedJobs } from "@/app/actions/jobs/getFeaturedJobs";

export const revalidate = 300; // ISR: revalidate every 5 mins

export default async function FeaturedJobs() {
  const FEATURED_JOBS = await getFeaturedJobs();

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold font-playfair text-gray-900">
          Featured Jobs
        </h1>
        <Link
          href="/jobs"
          className="text-blue-600 font-medium flex items-center gap-1 hover:underline font-lexend"
        >
          View All Jobs <MoveRight size={18} />
        </Link>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_JOBS.length > 0 ? (
          FEATURED_JOBS.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="border border-gray-200 rounded-md p-5 hover:shadow-lg transition-all duration-200 flex flex-col gap-4 bg-white"
            >
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
                  <h3 className="text-lg font-semibold text-gray-800 font-lexend">
                    {job.role}
                  </h3>
                  <p className="text-gray-500 font-lexend">{job.company}</p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center gap-3 mt-auto">
                <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full font-lexend">
                  {job.type}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full font-lexend">
                  {job.location}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No featured jobs available right now.</p>
        )}
      </div>
    </section>
  );
}
