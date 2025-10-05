import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function FeaturedJobs() {
  const FEATURED_JOBS = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Remote",
      type: "Fresher",
      imageUrl: "/companylogos/microsoft_128.jpg",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Rapido",
      location: "New York, NY",
      type: "Internship",
      imageUrl: "/companylogos/rapido_128.jpg",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Groww",
      location: "San Francisco, CA",
      type: "Fresher",
      imageUrl: "/companylogos/groww_128.jpg",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "Qualcomm",
      location: "Remote",
      type: "Internship",
      imageUrl: "/companylogos/qualcomm_128.jpg",
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Uber",
      location: "Austin, TX",
      type: "Fresher",
      imageUrl: "/companylogos/uber_128.jpg",
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "Stripe",
      location: "Seattle, WA",
      type: "Internship",
      imageUrl: "/companylogos/stripe_128.jpg",
    },
  ];

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
        {FEATURED_JOBS.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="border border-gray-200 rounded-md p-5 hover:shadow-lg transition-all duration-200 flex flex-col gap-4 bg-white"
          >
            {/* Top Section */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={job.imageUrl}
                  width={56}
                  height={56}
                  alt={job.company}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 font-lexend">
                  {job.title}
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
        ))}
      </div>
    </section>
  );
}
