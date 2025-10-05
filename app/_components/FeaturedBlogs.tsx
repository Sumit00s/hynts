"use client";

import * as React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function FeaturedBlogs() {
  const BLOGS = [
    {
      id: 1,
      title: "Understanding React Hooks",
      author: "John Doe",
      date: "Sep 25, 2025",
      excerpt: "Learn how to use React hooks effectively in your projects.",
    },
    {
      id: 2,
      title: "Next.js 14 – What's New?",
      author: "Jane Smith",
      date: "Oct 1, 2025",
      excerpt: "Explore the latest features introduced in Next.js 14.",
    },
    {
      id: 3,
      title: "UI/UX Design Trends in 2025",
      author: "Alex Johnson",
      date: "Oct 3, 2025",
      excerpt: "A look at the most exciting UI/UX trends shaping the industry.",
    },
  ];

  const BlogCard = ({ title, author, date, excerpt }: any) => (
    <Card className="max-w-sm mx-auto">
      <CardContent className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold font-lexend">{title}</h3>
        <p className="text-sm text-gray-500 font-lexend">
          {author} — {date}
        </p>
        <p className="text-gray-700 font-lexend">{excerpt}</p>
        <Link
          href={`/blogs/${title}`}
          className="text-blue-600 font-medium hover:underline flex items-center gap-1"
        >
          Read More <MoveRight size={16} />
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900">
          Featured Blogs
        </h2>
        <Link
          href="/blogs"
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition font-lexend"
        >
          Explore All <MoveRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Carousel Section */}
      <div className="max-w-7xl mx-auto px-6">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {BLOGS.map((blog) => (
              <CarouselItem
                key={blog.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <BlogCard {...blog} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
