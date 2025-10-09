import Image from "next/image";
import Link from "next/link";
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

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;

  const job = {
    id: parseInt(id),
    company: "Intel",
    logo: "https://logo.clearbit.com/intel.com",
    role: "Embedded Engineer",
    location: "Chennai, India",
    type: "Full-time",
    experience: "0–2 years",
    batch: "2025–2026",
    skills: "React, Next.js,TypeScript",
    salary: "$9,000/month",
    date: "Sept 20, 2025",
    carriers_link: "https://intel.com/careers",
    description: `
      <h2>About the Role</h2>
      <p>Join Intel's cutting-edge embedded systems division as an <strong>Embedded Engineer</strong>. You'll work on microcontroller-based systems, firmware development, and real-time applications powering the next generation of IoT and AI-driven hardware.</p>

      <h2>Responsibilities</h2>
      <ul>
        <li>Design and implement embedded software for Intel processors.</li>
        <li>Optimize system performance and power efficiency.</li>
        <li>Work closely with cross-functional hardware and software teams.</li>
        <li>Debug and validate embedded systems through simulations and lab testing.</li>
      </ul>

      <h2>Requirements</h2>
      <ul>
        <li>Strong proficiency in <strong>C/C++</strong> and embedded programming.</li>
        <li>Knowledge of <strong>Verilog</strong> and microcontroller architecture.</li>
        <li>Experience with real-time operating systems (RTOS) preferred.</li>
        <li>Analytical mindset and a passion for low-level system design.</li>
      </ul>

      <h2>Perks & Benefits</h2>
      <ul>
        <li>Work with world-class engineers on innovative technologies.</li>
        <li>Health insurance, relocation benefits, and learning resources.</li>
        <li>Access to Intel innovation labs and mentorship programs.</li>
      </ul>

    `,
  };

  if (!job) return notFound();

  return (
    <section className="max-w-7xl mt-15 mx-auto px-2 sm:px-6 py-8 sm:py-16 font-lexend">
      {/* Back to Jobs Link */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Jobs
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Job Details (80%) */}
        <div className="lg:w-[70%] w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={job.logo}
              alt={job.company}
              width={64}
              height={64}
              className="rounded-lg border bg-gray-50"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.role}</h1>
              <p className="text-gray-600 text-lg">{job.company}</p>
            </div>
          </div>

          {/* Job Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 mb-6 text-[15px]">
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-600" /> {job.location}
            </p>
            <p className="flex items-center gap-2">
              <Briefcase size={18} className="text-blue-600" /> {job.type}
            </p>
            <p className="flex items-center gap-2">
              <Brain size={18} className="text-blue-600" /> {job.experience}
            </p>
            <p className="flex items-center gap-2">
              <GraduationCap size={18} className="text-blue-600" /> {job.batch}
            </p>
            <p className="flex items-center gap-2">
              <IndianRupee size={18} className="text-blue-600" /> {job.salary}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays size={18} className="text-blue-600" /> {job.date}
            </p>
          </div>

          {/* Apply Now Button */}
          <div className="mt-6 mb-8">
            <Button
              asChild
              className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-medium px-8 py-3 rounded-md"
            >
              <Link href={job.carriers_link} target="_blank">
                Apply Now
              </Link>
            </Button>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Job Description */}
          <article
            className="max-w-none leading-relaxed text-gray-800 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-gray-700 [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-gray-900"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        {/* Right Side: WhatsApp Section (20%) */}
        <aside className="lg:w-[30%] w-full">
          <div className="border border-green-200 rounded-xl bg-green-50 p-6 text-center sticky top-24 shadow-sm">
            <div className="flex justify-center mb-4">
              <Image
                src="https://logo.clearbit.com/whatsapp.com"
                alt="WhatsApp"
                width={56}
                height={56}
                className="rounded-full"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Join Our WhatsApp Community 💬
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Stay updated with daily job alerts, resume tips, and interview
              guidance.
            </p>

            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-white w-full font-medium rounded-md px-6 py-2"
            >
              <Link
                href="https://chat.whatsapp.com/your-community-link"
                target="_blank"
              >
                Join Now
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
