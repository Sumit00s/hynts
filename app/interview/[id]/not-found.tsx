import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-6xl">🔍</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3 font-playfair">
          Interview Not Found
        </h1>
        <p className="text-gray-600 mb-8 font-lexend">
          Sorry, we couldn't find the interview experience you're looking for.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white font-medium"
          >
            <Link href="/interview">
              <Search size={18} className="mr-2" />
              Browse Interviews
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home size={18} className="mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
