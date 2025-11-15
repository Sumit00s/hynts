import Image from "next/image";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

// Import images from assets (Next.js static imports)
import openaiImg from "@/assets/heroOrbit/open-ai.png";
import googleImg from "@/assets/heroOrbit/google.png";
import microsoftImg from "@/assets/heroOrbit/microsoft.png";
import metaImg from "@/assets/heroOrbit/meta.jpeg";
import netflixImg from "@/assets/heroOrbit/netflix.png";

export function CompanyLogosOrbit() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={50}>
        <Icons.openai />
        <Icons.google />
        <Icons.microsoft />
        <Icons.meta />
        <Icons.netflix />
      </OrbitingCircles>

      <OrbitingCircles iconSize={40} radius={120} reverse speed={2}>
        <Icons.google />
        <Icons.microsoft />
        <Icons.netflix />
        <Icons.openai />
        <Icons.meta />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  openai: () => (
    <Image src={openaiImg} alt="OpenAI" className="w-10 h-10 rounded-full" />
  ),
  google: () => (
    <Image src={googleImg} alt="Google" className="w-10 h-10 rounded-full" />
  ),
  microsoft: () => (
    <Image
      src={microsoftImg}
      alt="Microsoft"
      className="w-10 h-10 rounded-full"
    />
  ),
  meta: () => (
    <Image src={metaImg} alt="Meta" className="w-10 h-10 rounded-full" />
  ),
  netflix: () => (
    <Image src={netflixImg} alt="Netflix" className="w-10 h-10 rounded-full" />
  ),
};
