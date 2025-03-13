"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedBooks() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // This would come from your API
  const featuredBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      coverImage: "/placeholder.svg?height=400&width=250&text=Book+1",
      description:
        "A psychological thriller about a woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive.",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      coverImage: "/placeholder.svg?height=400&width=250&text=Book+2",
      description:
        "A novel about a young woman who raised herself in the marshes of the deep South becomes a suspect in the murder of a man she was once involved with.",
      rating: 4.7,
    },
    {
      id: 3,
      title: "Educated",
      author: "Tara Westover",
      coverImage: "/placeholder.svg?height=400&width=250&text=Book+3",
      description:
        "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
      rating: 4.6,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === featuredBooks.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredBooks.length - 1 : prevIndex - 1))
  }

  const book = featuredBooks[currentIndex]

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[3/4] md:aspect-auto">
            <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                <span className="font-medium">{book.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={prevSlide}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={nextSlide}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{book.title}</h3>
            <p className="text-muted-foreground mb-4">by {book.author}</p>
            <p className="mb-6">{book.description}</p>
            <div className="mt-auto">
              <Link href={`/books/${book.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

