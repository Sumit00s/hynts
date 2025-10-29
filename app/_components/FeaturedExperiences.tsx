// File: app/_components/FeaturedExperiences.tsx
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { getFeaturedInterviews } from "@/app/actions/interviews/getFeaturedInterviews";

// Array of avatar URLs for random assignment
const AVATAR_NAMES = [
  "jack",
  "ava",
  "liam",
  "sophia",
  "ethan",
  "olivia",
  "noah",
  "emma",
  "lucas",
  "mia",
  "james",
  "isabella",
  "oliver",
  "charlotte",
  "william",
  "amelia",
  "henry",
  "harper",
];

// Function to get a consistent random avatar for a user
function getAvatarUrl(name: string | null, id: number): string {
  const safeName = name || "anonymous";
  const index = (id + safeName.length) % AVATAR_NAMES.length;
  return `https://avatar.vercel.sh/${AVATAR_NAMES[index]}`;
}

export default async function FeaturedExperiences() {
  const interviews = await getFeaturedInterviews();

  // If no interviews found, show a message or return null
  if (!interviews || interviews.length === 0) {
    return null;
  }

  // Transform interviews data to match the card format
  const experiences = interviews.map((interview) => ({
    id: interview.id,
    name: interview.is_anonymous
      ? "Anonymous"
      : interview.full_name || "Anonymous",
    role: interview.job_position_applied || "Not specified",
    company: interview.company_name || "Unknown Company",
    img: getAvatarUrl(interview.full_name, interview.id),
    salary: interview.salary_range || "Not disclosed",
    result: interview.interview_result,
  }));

  const firstRow = experiences.slice(0, 6);
  const secondRow = experiences.slice(6, 12);

  const ExperienceCard = ({
    img,
    name,
    role,
    company,
    salary,
    result,
  }: any) => (
    <div
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border p-5 font-lexend",
        "border-gray-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <img src={img} alt={name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">{company}</p>
        </div>
      </div>
      <p className="text-base font-medium text-gray-700 mb-2 line-clamp-2">
        {role}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-blue-600 font-semibold truncate">{salary}</p>
        {result && (
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              result.toLowerCase().includes("selected") ||
                result.toLowerCase().includes("offer")
                ? "bg-green-100 text-green-700"
                : result.toLowerCase().includes("rejected")
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            )}
          >
            {result}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-16 font-lexend">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900">
          Interview Experiences
        </h2>
        <Link
          href="/interview"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Explore More <MoveRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Marquee Rows */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        {firstRow.length > 0 && (
          <Marquee pauseOnHover className="[--duration:22s]">
            {firstRow.map((exp) => (
              <Link
                key={exp.id}
                href={`/interview/${exp.id}`}
                className="block"
              >
                <ExperienceCard {...exp} />
              </Link>
            ))}
          </Marquee>
        )}

        {secondRow.length > 0 && (
          <Marquee reverse pauseOnHover className="[--duration:22s]">
            {secondRow.map((exp) => (
              <Link
                key={exp.id}
                href={`/interview/${exp.id}`}
                className="block"
              >
                <ExperienceCard {...exp} />
              </Link>
            ))}
          </Marquee>
        )}

        {/* Fading Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
      </div>
    </section>
  );
}
