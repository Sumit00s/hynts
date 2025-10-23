import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { AuroraText } from "@/components/ui/aurora-text";
import { CompanyLogosOrbit } from "@/components/CompanyLogosOrbit";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-10 md:pb-24 bg-white text-black">
      <div className="container mx-auto px-4 text-center">
        <span className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium inline-block mb-6">
          🚀 Join 1 Million+ tech professionals{" "}
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl font-playfair md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto ">
          Find Off-Campus <AuroraText>Tech Jobs</AuroraText> & Ace Your
          Interviews.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl font-lexend text-gray-600 max-w-2xl mx-auto mb-8">
          find your first job and learn from real interview experiences.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="text-white bg-black hover:bg-gray-800"
          >
            <Link href="/jobs">Explore Jobs</Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-black text-black hover:bg-gray-100"
          >
            <Link href="/interview" className="flex items-center">
              Explore Experiences <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <CompanyLogosOrbit />
        {/* <SmoothCursor /> */}
      </div>
    </section>
  );
}
