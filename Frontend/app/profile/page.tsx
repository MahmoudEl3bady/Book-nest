"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Edit, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookCard from "@/components/books/BookCard"
import ReviewList from "@/components/books/ReviewList"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("shelves")

  // This would come from your API
  const user = {
    id: 1,
    name: "Alex Johnson",
    username: "alexjohnson",
    avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    initials: "AJ",
    bio: "Book enthusiast and aspiring writer. I love mystery novels and historical fiction.",
    location: "New York, NY",
    joinDate: "January 2022",
    booksRead: 87,
    booksWantToRead: 34,
    following: 156,
    followers: 142,
  }

  const shelves = [
    { id: 1, name: "Currently Reading", count: 3 },
    { id: 2, name: "Want to Read", count: 34 },
    { id: 3, name: "Read", count: 87 },
    { id: 4, name: "Favorites", count: 12 },
    { id: 5, name: "Science Fiction", count: 23 },
    { id: 6, name: "Mystery", count: 18 },
  ]

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="w-24 h-24 md:w-32 md:h-32">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="mb-4">{user.bio}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Member since {user.joinDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{user.booksRead} books read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{user.booksRead}</p>
          <p className="text-sm text-muted-foreground">Books Read</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{user.booksWantToRead}</p>
          <p className="text-sm text-muted-foreground">Want to Read</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{user.following}</p>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{user.followers}</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="shelves">Shelves</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="shelves" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shelves.map((shelf) => (
              <Link key={shelf.id} href={`/profile/shelves/${shelf.id}`} className="group">
                <div className="border rounded-lg p-4 h-full hover:border-primary transition-colors">
                  <h3 className="font-medium group-hover:text-primary">{shelf.name}</h3>
                  <p className="text-sm text-muted-foreground">{shelf.count} books</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Currently Reading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Currently Reading</h2>
              <Link href="/profile/shelves/1" className="text-primary hover:underline text-sm">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3].map((i) => (
                <BookCard key={i} id={i} />
              ))}
            </div>
          </div>

          {/* Recently Read */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recently Read</h2>
              <Link href="/profile/shelves/3" className="text-primary hover:underline text-sm">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[4, 5, 6, 7, 8].map((i) => (
                <BookCard key={i} id={i} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Recent Reviews</h2>
            <ReviewList bookId={0} />
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <div className="border rounded-lg divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        <span className="font-medium">{user.name}</span>{" "}
                        {i % 3 === 0 ? (
                          <>
                            added{" "}
                            <Link href={`/books/${i}`} className="text-primary hover:underline">
                              Book Title {i}
                            </Link>{" "}
                            to <span className="font-medium">Want to Read</span>
                          </>
                        ) : i % 3 === 1 ? (
                          <>
                            rated{" "}
                            <Link href={`/books/${i}`} className="text-primary hover:underline">
                              Book Title {i}
                            </Link>{" "}
                            {i} stars
                          </>
                        ) : (
                          <>
                            wrote a review for{" "}
                            <Link href={`/books/${i}`} className="text-primary hover:underline">
                              Book Title {i}
                            </Link>
                          </>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">{i} days ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

