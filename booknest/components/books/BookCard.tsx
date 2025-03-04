import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BookCardProps {
  id: number
  className?: string
  showAuthor?: boolean
  showRating?: boolean
}

export default function BookCard({ id, className, showAuthor = true, showRating = true }: BookCardProps) {
  // This would come from your API
  const book = {
    id,
    title: `Book Title ${id}`,
    author: "Author Name",
    coverImage: `/placeholder.svg?height=300&width=200&text=Book+${id}`,
    rating: 4.5,
    isNew: id % 3 === 0,
  }

  return (
    <Card className={cn("overflow-hidden border-none shadow-none", className)}>
      <Link href={`/books/${id}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {book.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
        </div>
      </Link>
      <CardContent className="p-2">
        <Link href={`/books/${id}`}>
          <h3 className="font-medium line-clamp-1 hover:underline">{book.title}</h3>
        </Link>
        {showAuthor && <p className="text-sm text-muted-foreground">{book.author}</p>}
        {showRating && (
          <div className="flex items-center mt-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
            <span className="text-sm">{book.rating}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

