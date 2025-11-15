"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

import google from "@/assets/companylogos/google.png";
import meta from "@/assets/companylogos/meta.jpeg";
import microsoft from "@/assets/companylogos/microsoft_128.jpg";
import linkedin from "@/assets/companylogos/linkedin.png";
import openai from "@/assets/companylogos/open-ai.png";
import autodesk from "@/assets/companylogos/autodesk_128.jpg";
import groww from "@/assets/companylogos/groww_128.jpg";
import netflix from "@/assets/companylogos/netflix.png";
import qualcomm from "@/assets/companylogos/qualcomm_128.jpg";
import rapido from "@/assets/companylogos/rapido_128.jpg";
import uber from "@/assets/companylogos/uber_128.jpg";
import stripe from "@/assets/companylogos/stripe_128.jpg";

export default function CompanyLogoMarquee() {
  const COMPANIES = [
    { name: "Google", logo: google },
    { name: "Meta", logo: meta },
    { name: "Microsoft", logo: microsoft },
    { name: "LinkedIn", logo: linkedin },
    { name: "OpenAI", logo: openai },
    { name: "Autodesk", logo: autodesk },
    { name: "Groww", logo: groww },
    { name: "Netflix", logo: netflix },
    { name: "Qualcomm", logo: qualcomm },
    { name: "Rapido", logo: rapido },
    { name: "Uber", logo: uber },
    { name: "Stripe", logo: stripe },
  ];

  const LogoCard = ({ name, logo }: { name: string; logo: any }) => (
    <div className="flex items-center gap-3 mx-6">
      <Image
        src={logo}
        alt={name}
        className="h-12 w-12 object-contain rounded-full"
      />
      <span className="text-lg font-medium text-gray-700 font-lexend">
        {name}
      </span>
    </div>
  );

  return (
    <section className="w-full py-6 bg-white">
      <Marquee pauseOnHover className="[--duration:25s]">
        {COMPANIES.map((company, index) => (
          <LogoCard key={index} {...company} />
        ))}
      </Marquee>
    </section>
  );
}
