import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RecentReviews() {
  // This would come from your API
  const reviews = [
    {
      id: 1,
      user: {
        id: 101,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=AJ",
        initials: "AJ",
      },
      book: {
        id: 201,
        title: "The Midnight Library",
        author: "Matt Haig",
        coverImage: "/placeholder.svg?height=100&width=70&text=Book",
      },
      rating: 5,
      content:
        "This book completely changed my perspective on life. The concept is fascinating and the execution is flawless.",
      date: "2 days ago",
    },
    {
      id: 2,
      user: {
        id: 102,
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40&text=ST",
        initials: "ST",
      },
      book: {
        id: 202,
        title: "Project Hail Mary",
        author: "Andy Weir",
        coverImage: "/placeholder.svg?height=100&width=70&text=Book",
      },
      rating: 4,
      content: "A thrilling sci-fi adventure with a perfect blend of humor and science. Couldn't put it down!",
      date: "3 days ago",
    },
    {
      id: 3,
      user: {
        id: 103,
        name: "Jamie Lee",
        avatar: "/placeholder.svg?height=40&width=40&text=JL",
        initials: "JL",
      },
      book: {
        id: 203,
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        coverImage: "/placeholder.svg?height=100&width=70&text=Book",
      },
      rating: 4.5,
      content:
        "A beautiful and thought-provoking exploration of what it means to be human, told through the eyes of an artificial friend.",
      date: "5 days ago",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>{review.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/users/${review.user.id}`} className="font-medium hover:underline">
                    {review.user.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Link href={`/books/${review.book.id}`} className="shrink-0">
                <div className="relative h-24 w-16 overflow-hidden rounded">
                  <Image
                    src={review.book.coverImage || "/placeholder.svg"}
                    alt={review.book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div>
                <Link href={`/books/${review.book.id}`} className="font-medium hover:underline">
                  {review.book.title}
                </Link>
                <p className="text-sm text-muted-foreground mb-2">by {review.book.author}</p>
                <p className="text-sm line-clamp-3">{review.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

