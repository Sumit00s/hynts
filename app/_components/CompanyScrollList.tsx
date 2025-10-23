"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const COMPANIES = [
  { name: "Google", logo: "/companylogos/google.png" },
  { name: "Meta", logo: "/companylogos/meta.jpeg" },
  { name: "Microsoft", logo: "/companylogos/microsoft_128.jpg" },
  { name: "LinkedIn", logo: "/companylogos/linkedin.png" },
  { name: "OpenAI", logo: "/companylogos/open-ai.png" },
  { name: "Autodesk", logo: "/companylogos/autodesk_128.jpg" },
  { name: "Groww", logo: "/companylogos/groww_128.jpg" },
  { name: "Netflix", logo: "/companylogos/netflix.png" },
  { name: "Qualcomm", logo: "/companylogos/qualcomm_128.jpg" },
  { name: "Rapido", logo: "/companylogos/rapido_128.jpg" },
  { name: "Uber", logo: "/companylogos/uber_128.jpg" },
  { name: "Stripe", logo: "/companylogos/stripe_128.jpg" },
];

export default function CompanyScrollList() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-14 px-6 max-w-7xl mx-auto">
      {/* Carousel + Controls */}
      <div className="flex items-center gap-4">
        {/* Left Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          className="rounded-full shadow-sm border-gray-300 bg-white hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </Button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-2 py-4 scroll-smooth hide-scrollbar flex-1"
        >
          {COMPANIES.map((company, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={`/interview/company/${company.name.toLowerCase()}`}>
                <Card className="w-44 sm:w-48 h-48 flex flex-col items-center justify-center cursor-pointer border border-gray-200 hover:shadow-xl transition-all duration-200 rounded-2xl bg-white">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    {/* Rounded Logo */}
                    <div className="w-20 h-20 mb-4 bg-gray-50 rounded-full overflow-hidden flex items-center justify-center">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={70}
                        height={70}
                        className="object-contain rounded-full"
                      />
                    </div>
                    <span className="text-base sm:text-lg font-medium text-gray-800 font-lexend group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          className="rounded-full shadow-sm border-gray-300 bg-white hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </Button>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
