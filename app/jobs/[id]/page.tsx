import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Brain,
  GraduationCap,
  IndianRupee,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getJobById } from "@/app/actions/jobs/getJobById";
import WhatsappCard from "@/app/_components/WhatsappCard";
import { getRelativeTime } from "@/app/_lib/utils";

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

// ✅ Generate SEO metadata for job pages
export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const job = await getJobById(params.id);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.role} at ${job.company} - ${job.location}`,
    description: `${job.role} position at ${job.company} in ${job.location}. ${
      job.type
    } | ${job.experience} | Salary: ${job.salary}. ${
      job.skills ? `Skills: ${job.skills}` : ""
    }`,
    openGraph: {
      title: `${job.role} at ${job.company}`,
      description: `${job.type} position in ${job.location}. Experience: ${job.experience} | Salary: ${job.salary}`,
      images: [job.logo_url],
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;

  const job = await getJobById(id);

  if (!job) {
    return notFound();
  }

  return (
    <section className="max-w-7xl mt-15 mx-auto px-4 sm:px-6 py-8 sm:py-16 font-lexend">
      {/* Back to Jobs Link */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Job Details (70%) */}
        <div className="lg:w-[70%] w-full bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border">
              <Image
                src={job.logo_url}
                alt={job.company}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-playfair">
                {job.role}
              </h1>
              <p className="text-gray-600 text-lg">{job.company}</p>
            </div>
          </div>

          {/* Job Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 mb-6 text-[15px]">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-600 flex-shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-blue-600 flex-shrink-0" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-blue-600 flex-shrink-0" />
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap
                size={18}
                className="text-blue-600 flex-shrink-0"
              />
              <span>{job.batch}</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee size={18} className="text-green-600 flex-shrink-0" />
              <span className="text-green-600 font-semibold">{job.salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-blue-600 flex-shrink-0" />
              <span>{getRelativeTime(job.date)}</span>
            </div>
          </div>

          {/* Skills */}
          {job.skills && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Required Skills:
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.split(",").map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Apply Now Button */}
          <div className="mb-8">
            <Button
              asChild
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              <a
                href={job.careers_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Job Description */}
          {job.description ? (
            <article
              className="prose prose-gray max-w-none leading-relaxed text-gray-800 
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-gray-900 [&_h2]:font-playfair
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-gray-900
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
              [&_li]:text-gray-700 [&_li]:leading-relaxed
              [&_p]:mb-4 [&_p]:leading-relaxed
              [&_strong]:font-bold [&_strong]:text-gray-900
              [&_a]:text-blue-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          ) : (
            <div className="text-gray-500 text-center py-8">
              <p>No detailed description available for this job.</p>
              <p className="text-sm mt-2">
                Please visit the company's career page for more information.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: WhatsApp Section (30%) */}
        <aside className="lg:w-[30%] w-full">
          <div className="sticky top-24">
            <WhatsappCard />
          </div>
        </aside>
      </div>
    </section>
  );
}
