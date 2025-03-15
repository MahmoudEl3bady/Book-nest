"use server";
import { BookOpen, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import BookCard from "@/components/books/BookCard";

export default async function ExplorePage() {
  // This would come from your API
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Thriller",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Poetry",
  ];

  interface Book {
    title: string;
    rating: string;
    book_URL: string;
    description: string;
    image_url: string;
  }

  const getBooks = async () => {
    const response = await fetch(`http://localhost:4000/api/books`);
    const data = await response.json();
    return data.books;
  };
  const books = await getBooks();

  console.log(books);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Explore Books</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, author, or ISBN..."
              className="pl-8 w-full"
            />
          </div>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 md:hidden">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your search results
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Genres</h3>
                  <div className="space-y-2">
                    {genres.slice(0, 8).map((genre) => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox id={`mobile-${genre}`} />
                        <label
                          htmlFor={`mobile-${genre}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`mobile-rating-${rating}`} />
                        <label
                          htmlFor={`mobile-rating-${rating}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {rating}+ Stars
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Filters (Desktop) */}
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-medium mb-2">Genres</h3>
            <div className="space-y-2">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox id={genre} />
                  <label
                    htmlFor={genre}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {rating}+ Stars
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Showing 24 of 1,240 results</p>
          </div>

          {/* No results state */}
          {false && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No books found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any books matching your search criteria. Try
                adjusting your filters or search terms.
              </p>
            </div>
          )}

          {/* Results grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.length > 0 &&
              books.map((book: Book) => (
                <BookCard book={book} key={book.title} />
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <span className="sr-only">Previous page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Next page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
