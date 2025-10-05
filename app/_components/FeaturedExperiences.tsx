"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export default function FeaturedExperiences() {
  const FEATURED_EXPERIENCES = [
    {
      id: 1,
      name: "Jack",
      role: "Software Engineer",
      company: "Google",
      img: "https://avatar.vercel.sh/jack",
      salary: "$120,000",
    },
    {
      id: 2,
      name: "Ava",
      role: "Frontend Developer Intern",
      company: "Meta",
      img: "https://avatar.vercel.sh/ava",
      salary: "$2,500 / mo",
    },
    {
      id: 3,
      name: "Liam",
      role: "Data Analyst",
      company: "Amazon",
      img: "https://avatar.vercel.sh/liam",
      salary: "$95,000",
    },
    {
      id: 4,
      name: "Sophia",
      role: "UI/UX Designer",
      company: "Figma",
      img: "https://avatar.vercel.sh/sophia",
      salary: "$88,000",
    },
    {
      id: 5,
      name: "Ethan",
      role: "Machine Learning Engineer",
      company: "OpenAI",
      img: "https://avatar.vercel.sh/ethan",
      salary: "$150,000",
    },
    {
      id: 6,
      name: "Olivia",
      role: "Product Manager",
      company: "Stripe",
      img: "https://avatar.vercel.sh/olivia",
      salary: "$130,000",
    },
    {
      id: 7,
      name: "Noah",
      role: "Backend Developer",
      company: "Netflix",
      img: "https://avatar.vercel.sh/noah",
      salary: "$110,000",
    },
    {
      id: 8,
      name: "Emma",
      role: "Cloud Engineer Intern",
      company: "Microsoft",
      img: "https://avatar.vercel.sh/emma",
      salary: "$3,000 / mo",
    },
    {
      id: 9,
      name: "Lucas",
      role: "DevOps Engineer",
      company: "Spotify",
      img: "https://avatar.vercel.sh/lucas",
      salary: "$105,000",
    },
    {
      id: 10,
      name: "Mia",
      role: "AI Research Intern",
      company: "DeepMind",
      img: "https://avatar.vercel.sh/mia",
      salary: "$4,000 / mo",
    },
    {
      id: 11,
      name: "James",
      role: "Mobile App Developer",
      company: "Uber",
      img: "https://avatar.vercel.sh/james",
      salary: "$100,000",
    },
    {
      id: 12,
      name: "Isabella",
      role: "Security Engineer",
      company: "Tesla",
      img: "https://avatar.vercel.sh/isabella",
      salary: "$140,000",
    },
  ];

  const firstRow = FEATURED_EXPERIENCES.slice(0, 6);
  const secondRow = FEATURED_EXPERIENCES.slice(6, 12);

  const ExperienceCard = ({ img, name, role, company, salary }: any) => (
    <div
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border p-5 font-lexend",
        "border-gray-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <img src={img} alt={name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>
      <p className="text-base font-medium text-gray-700 mb-1">{role}</p>
      <p className="text-sm text-blue-600 font-semibold">{salary}</p>
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
          href="/experiences"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Explore More <MoveRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Marquee Rows */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:22s]">
          {firstRow.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="block"
            >
              <ExperienceCard {...exp} />
            </Link>
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:22s]">
          {secondRow.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="block"
            >
              <ExperienceCard {...exp} />
            </Link>
          ))}
        </Marquee>

        {/* Fading Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
      </div>
    </section>
  );
}
