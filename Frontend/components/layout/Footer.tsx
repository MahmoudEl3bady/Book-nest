import Link from "next/link";
import { BookOpen, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">BookNest</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your digital reading companion. Discover, track, and share your
              reading journey.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/my-books"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  My Books
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} BookNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
