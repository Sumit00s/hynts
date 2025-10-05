import Hero from "./_components/Hero";
import FeaturedJobs from "./_components/FeaturedJobs";
import FeaturedExperiences from "./_components/FeaturedExperiences";
import CompanyLogoMarquee from "./_components/CompanyLogoMarquee";
import FeaturedBlogs from "./_components/FeaturedBlogs";
import Newsletter from "./_components/NewsLetter";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedJobs />
      <FeaturedExperiences />
      <FeaturedBlogs />
      <CompanyLogoMarquee />
      <Newsletter />
    </div>
  );
}
