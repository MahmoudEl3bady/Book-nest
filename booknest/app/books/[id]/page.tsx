import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import BookCard from "@/components/books/BookCard"
import ReviewList from "@/components/books/ReviewList"
import AddToShelfButton from "@/components/books/AddToShelfButton"

interface BookPageProps {
  params: {
    id: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return notFound()
  }

  // This would come from your API
  const book = {
    id,
    title: `The Great Novel ${id}`,
    author: "Jane Author",
    coverImage: `/placeholder.svg?height=600&width=400&text=Book+${id}`,
    rating: 4.5,
    ratingsCount: 1250,
    reviewsCount: 350,
    publishDate: "January 15, 2023",
    publisher: "Penguin Books",
    pages: 320,
    isbn: "978-3-16-148410-0",
    genres: ["Fiction", "Mystery", "Thriller"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-muted-foreground">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/explore" className="hover:text-primary">
              Books
            </Link>
          </li>
          <li>/</li>
          <li className="text-primary font-medium truncate max-w-[200px]">{book.title}</li>
        </ol>
      </nav>

      {/* Book Details */}
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-4">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Image
              src={book.coverImage || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-2">
            <AddToShelfButton bookId={id} />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Favorite
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl mb-4">
            by{" "}
            <Link
              href={`/authors/${book.author.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-primary hover:underline"
            >
              {book.author}
            </Link>
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(book.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
              <span className="ml-2 font-medium">{book.rating}</span>
              <span className="text-muted-foreground ml-1">({book.ratingsCount})</span>
            </div>
            <div className="text-muted-foreground">{book.reviewsCount} reviews</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {book.genres.map((genre) => (
              <Link href={`/explore?genre=${genre.toLowerCase()}`} key={genre}>
                <Badge variant="secondary">{genre}</Badge>
              </Link>
            ))}
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="similar">Similar Books</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4">
              <div>
                <h2 className="font-semibold text-lg mb-2">Description</h2>
                <p>{book.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="font-semibold text-lg mb-2">Details</h2>
                  <dl className="grid grid-cols-[120px_1fr] gap-2 text-sm">
                    <dt className="text-muted-foreground">Published:</dt>
                    <dd>{book.publishDate}</dd>

                    <dt className="text-muted-foreground">Publisher:</dt>
                    <dd>{book.publisher}</dd>

                    <dt className="text-muted-foreground">Pages:</dt>
                    <dd>{book.pages}</dd>

                    <dt className="text-muted-foreground">ISBN:</dt>
                    <dd>{book.isbn}</dd>
                  </dl>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <ReviewList bookId={id} />
            </TabsContent>
            <TabsContent value="similar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <BookCard key={i} id={id + i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

