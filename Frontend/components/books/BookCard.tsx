"use client";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Book {
  title: string;
  rating: string;
  book_URL: string;
  description: string;
  image_url: string;
}
interface BookCardProps {
  book: Book;
  className?: string;
  showAuthor?: boolean;
  showRating?: boolean;
}

export default function BookCard({
  book,
  className,
  showAuthor,
  showRating = true,
}: BookCardProps) {
  return (
    <Card className={cn("overflow-hidden border-none shadow-none", className)}>
      <Link href={book.book_URL}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <Image
            src={book.image_url || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {/* {book.&& <Badge className="absolute top-2 right-2">New</Badge>} */}
        </div>
      </Link>
      <CardContent className="p-2">
        <Link href={book.book_URL}>
          <h3 className="font-medium line-clamp-1 hover:underline">
            {book.title}
          </h3>
        </Link>
        {/* {showAuthor && (
          <p className="text-sm text-muted-foreground">{book.}</p>
        )} */}
        {showRating && (
          <div className="flex items-center mt-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
            <span className="text-sm">{book.rating}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
