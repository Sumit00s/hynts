import { OrbitingCircles } from "@/components/ui/orbiting-circles";

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
    <img src="/open-ai.png" alt="OpenAI" className="w-10 h-10 rounded-full" />
  ),
  google: () => (
    <img src="/google.png" alt="Google" className="w-10 h-10 rounded-full" />
  ),
  microsoft: () => (
    <img
      src="/microsoft.png"
      alt="Microsoft"
      className="w-10 h-10 rounded-full"
    />
  ),
  meta: () => (
    <img src="/meta.jpeg" alt="LinkedIn" className="w-10 h-10 rounded-full" />
  ),
  netflix: () => (
    <img src="/netflix.png" alt="Netflix" className="w-10 h-10 rounded-full" />
  ),
};
