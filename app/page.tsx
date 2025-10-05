import Hero from "./_components/Hero";
import FeaturedJobs from "./_components/FeaturedJobs";
import FeaturedExperiences from "./_components/FeaturedExperiences";
import CompanyLogoMarquee from "./_components/CompanyLogoMarquee";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedJobs />
      <FeaturedExperiences />
      <CompanyLogoMarquee />
    </div>
  );
}
