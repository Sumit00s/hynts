"use client";

import { Marquee } from "@/components/ui/marquee";

export default function CompanyLogoMarquee() {
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

  const LogoCard = ({ name, logo }: { name: string; logo: string }) => (
    <div className="flex items-center gap-3 mx-6">
      <img
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
