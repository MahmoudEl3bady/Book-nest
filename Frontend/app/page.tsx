import Link from "next/link";
import { BookOpen, Search, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/books/BookCard";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import RecentReviews from "@/components/home/RecentReviews";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Track your reading, discover new books, and connect with fellow
            readers on BookNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Explore Books
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Start Your Library
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Books</h2>
          <Link
            href="/explore"
            className="text-primary hover:underline text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <FeaturedBooks />
      </section>

      {/* Trending Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <Link
            href="/explore?sort=trending"
            className="text-primary hover:underline text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            // <BookCard key={i} id={i} />
            <div key={i}>{i}</div>
          ))}
        </div>
      </section>

      {/* Recent Reviews */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Recent Reviews
            </h2>
            <Star className="h-5 w-5 text-primary" />
          </div>
          <Link
            href="/reviews"
            className="text-primary hover:underline text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <RecentReviews />
      </section>
    </div>
  );
}
