import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      logo: "https://logo.clearbit.com/google.com",
      company: "Google",
      role: "Frontend Developer",
      location: "Bangalore, India",
      type: "Internship",
      experience: "0-1 years",
      batch: "2026",
      skills: ["React", "Next.js", "TypeScript"],
      salary: "$10,000/month",
      date: "Oct 5, 2025",
      carriers_link: "https://careers.google.com",
    },
    {
      id: 2,
      logo: "https://logo.clearbit.com/microsoft.com",
      company: "Microsoft",
      role: "Software Engineer",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "1-2 years",
      batch: "2025",
      skills: ["C++", "DSA", "Azure"],
      salary: "$12,000/month",
      date: "Oct 4, 2025",
      carriers_link: "https://careers.microsoft.com",
    },
    {
      id: 3,
      logo: "https://logo.clearbit.com/meta.com",
      company: "Meta",
      role: "Backend Developer",
      location: "Remote",
      type: "Remote",
      experience: "0-1 years",
      batch: "2026",
      skills: ["Node.js", "Express", "MongoDB"],
      salary: "$11,000/month",
      date: "Oct 2, 2025",
      carriers_link: "https://www.metacareers.com",
    },
    {
      id: 4,
      logo: "https://logo.clearbit.com/amazon.com",
      company: "Amazon",
      role: "SDE Intern",
      location: "Pune, India",
      type: "Internship",
      experience: "0 years",
      batch: "2026",
      skills: ["Java", "Spring Boot", "AWS"],
      salary: "$9,500/month",
      date: "Oct 1, 2025",
      carriers_link: "https://www.amazon.jobs",
    },
    {
      id: 5,
      logo: "https://logo.clearbit.com/tesla.com",
      company: "Tesla",
      role: "Full Stack Developer",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "1-3 years",
      batch: "2024-2025",
      skills: ["React", "Node.js", "SQL"],
      salary: "$13,000/month",
      date: "Sept 30, 2025",
      carriers_link: "https://www.tesla.com/careers",
    },
    {
      id: 6,
      logo: "https://logo.clearbit.com/nvidia.com",
      company: "NVIDIA",
      role: "AI Engineer",
      location: "Remote",
      type: "Remote",
      experience: "1-2 years",
      batch: "2025",
      skills: ["Python", "TensorFlow", "CUDA"],
      salary: "$14,000/month",
      date: "Sept 28, 2025",
      carriers_link: "https://nvidia.com/careers",
    },
    {
      id: 7,
      logo: "https://logo.clearbit.com/adobe.com",
      company: "Adobe",
      role: "UI/UX Designer",
      location: "Delhi, India",
      type: "Full-time",
      experience: "0-2 years",
      batch: "2025-2026",
      skills: ["Figma", "Design Systems", "Illustrator"],
      salary: "$10,000/month",
      date: "Sept 27, 2025",
      carriers_link: "https://adobe.com/careers",
    },
    {
      id: 8,
      logo: "https://logo.clearbit.com/spotify.com",
      company: "Spotify",
      role: "Data Analyst",
      location: "Remote",
      type: "Remote",
      experience: "0-1 years",
      batch: "2026",
      skills: ["SQL", "Python", "Tableau"],
      salary: "$10,500/month",
      date: "Sept 25, 2025",
      carriers_link: "https://www.spotifyjobs.com",
    },
    {
      id: 9,
      logo: "https://logo.clearbit.com/apple.com",
      company: "Apple",
      role: "iOS Developer",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "1-3 years",
      batch: "2025",
      skills: ["Swift", "Xcode", "iOS SDK"],
      salary: "$13,500/month",
      date: "Sept 22, 2025",
      carriers_link: "https://apple.com/careers",
    },
    {
      id: 10,
      logo: "https://logo.clearbit.com/intel.com",
      company: "Intel",
      role: "Embedded Engineer",
      location: "Chennai, India",
      type: "Full-time",
      experience: "0-2 years",
      batch: "2025-2026",
      skills: ["C", "Embedded Systems", "Verilog"],
      salary: "$9,000/month",
      date: "Sept 20, 2025",
      carriers_link: "https://intel.com/careers",
    },
    {
      id: 11,
      logo: "https://logo.clearbit.com/zoho.com",
      company: "Zoho",
      role: "Software Developer",
      location: "Chennai, India",
      type: "Full-time",
      experience: "0 years",
      batch: "2026",
      skills: ["JavaScript", "MySQL", "React"],
      salary: "$8,500/month",
      date: "Sept 18, 2025",
      carriers_link: "https://zoho.com/careers",
    },
    {
      id: 12,
      logo: "https://logo.clearbit.com/openai.com",
      company: "OpenAI",
      role: "ML Research Intern",
      location: "Remote",
      type: "Internship",
      experience: "0-1 years",
      batch: "2026",
      skills: ["Python", "PyTorch", "LLMs"],
      salary: "$15,000/month",
      date: "Sept 15, 2025",
      carriers_link: "https://openai.com/careers",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-10 px-6 py-20 font-lexend">
      <h1 className="text-2xl font-playfair font-bold mb-12 text-gray-900">
        Explore Opportunities
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Job Cards Section */}
        <div className="lg:w-[70%] w-full grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 flex flex-col gap-4 bg-white"
            >
              {/* Top Section */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={job.logo}
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

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full font-lexend">
                  {job.type}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full font-lexend">
                  {job.location}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mt-2">
                <p>
                  <span className="font-medium text-gray-800">Batch:</span>{" "}
                  {job.batch}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Salary:</span>{" "}
                  <span className="text-green-600 font-medium">
                    {job.salary}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-800">Experience:</span>{" "}
                  {job.experience}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Posted:</span>{" "}
                  {job.date}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 mt-3">
                <Button
                  asChild
                  className="flex-1 bg-black hover:bg-slate-700 text-white font-medium"
                >
                  <a
                    href={job.carriers_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-100 text-gray-800 font-medium"
                >
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Community  Section */}
        <aside className="lg:w-[30%] w-full">
          <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4 text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center">
                <Image
                  src="https://logo.clearbit.com/whatsapp.com"
                  alt="WhatsApp"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 font-lexend">
                Join Our WhatsApp Community 💬
              </h2>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                Get daily job alerts, connect with developers, and grow with our
                tech network.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-1 text-sm text-gray-700 text-left px-2">
              <p>✅ Job Updates & Internships</p>
              <p>💡 Developer Networking</p>
              <p>🚀 Growth Opportunities</p>
            </div>

            {/* Join Button */}
            <Button
              asChild
              className="bg-green-500 hover:bg-green-600 text-white font-medium mt-3"
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
