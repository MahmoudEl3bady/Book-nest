"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewListProps {
  bookId: number;
}

export default function ReviewList({ bookId }: ReviewListProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [filter, setFilter] = useState("recent");

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
      rating: 5,
      content:
        "This book completely changed my perspective on life. The concept is fascinating and the execution is flawless. I would recommend it to anyone looking for a thought-provoking read.",
      date: "June 15, 2023",
      likes: 24,
      comments: 3,
    },
    {
      id: 2,
      user: {
        id: 102,
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40&text=ST",
        initials: "ST",
      },
      rating: 4,
      content:
        "A thrilling read with well-developed characters. The plot twists kept me engaged throughout, though the ending felt a bit rushed.",
      date: "May 22, 2023",
      likes: 18,
      comments: 5,
    },
    {
      id: 3,
      user: {
        id: 103,
        name: "Jamie Lee",
        avatar: "/placeholder.svg?height=40&width=40&text=JL",
        initials: "JL",
      },
      rating: 3,
      content:
        "Decent book with some interesting ideas, but the pacing was inconsistent. Some parts dragged on while others felt too rushed.",
      date: "April 10, 2023",
      likes: 7,
      comments: 2,
    },
  ];

  const handleSubmitReview = () => {
    // This would submit the review to your API
    console.log({ bookId, rating, reviewText });
    // Reset form
    setRating(null);
    setReviewText("");
  };

  return (
    <div className="space-y-6">
      {/* Review Form */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Write a Review</h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${star <= (rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`}
              />
            </button>
          ))}
          {rating ? <span className="ml-2 text-sm">{rating} stars</span> : null}
        </div>
        <Textarea
          placeholder="Share your thoughts about this book..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
        />
        <Button
          onClick={handleSubmitReview}
          disabled={!rating || !reviewText.trim()}
        >
          Submit Review
        </Button>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Reviews ({reviews.length})</h3>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={review.user.avatar}
                    alt={review.user.name}
                  />
                  <AvatarFallback>{review.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    href={`/users/${review.user.id}`}
                    className="font-medium hover:underline"
                  >
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
            <p className="mb-4">{review.content}</p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <ThumbsUp className="mr-1 h-4 w-4" />
                {review.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                {review.comments}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
