"use client"

import { useState } from "react"
import { BookOpen, Check, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddToShelfButtonProps {
  bookId: number
}

export default function AddToShelfButton({ bookId }: AddToShelfButtonProps) {
  const [isInLibrary, setIsInLibrary] = useState(false)
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null)
  const [isCreateShelfOpen, setIsCreateShelfOpen] = useState(false)
  const [newShelfName, setNewShelfName] = useState("")

  // This would come from your API
  const shelves = [
    { id: 1, name: "Want to Read" },
    { id: 2, name: "Currently Reading" },
    { id: 3, name: "Read" },
    { id: 4, name: "Favorites" },
  ]

  const handleAddToShelf = (shelfName: string) => {
    // This would add the book to the shelf in your API
    console.log(`Adding book ${bookId} to shelf: ${shelfName}`)
    setSelectedShelf(shelfName)
    setIsInLibrary(true)
  }

  const handleCreateShelf = () => {
    // This would create a new shelf in your API
    console.log(`Creating new shelf: ${newShelfName}`)
    setNewShelfName("")
    setIsCreateShelfOpen(false)
    // After creating, you would add the book to this shelf
  }

  return (
    <>
      {isInLibrary ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full justify-between">
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4" />
                {selectedShelf || "In Your Library"}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {shelves.map((shelf) => (
              <DropdownMenuItem key={shelf.id} onClick={() => handleAddToShelf(shelf.name)} className="cursor-pointer">
                {shelf.name === selectedShelf && <Check className="mr-2 h-4 w-4" />}
                {shelf.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsCreateShelfOpen(true)} className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Create New Shelf
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsInLibrary(false)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              Remove from Library
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full justify-between">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Add to Library
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            {shelves.map((shelf) => (
              <DropdownMenuItem key={shelf.id} onClick={() => handleAddToShelf(shelf.name)} className="cursor-pointer">
                {shelf.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsCreateShelfOpen(true)} className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Create New Shelf
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={isCreateShelfOpen} onOpenChange={setIsCreateShelfOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Shelf</DialogTitle>
            <DialogDescription>Create a new shelf to organize your books.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="shelf-name">Shelf Name</Label>
              <Input
                id="shelf-name"
                value={newShelfName}
                onChange={(e) => setNewShelfName(e.target.value)}
                placeholder="e.g., Science Fiction, Summer Reads"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateShelfOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateShelf} disabled={!newShelfName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

