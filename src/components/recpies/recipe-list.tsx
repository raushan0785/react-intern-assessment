
import { useRecipeStore } from "@/store/recipes"
import RecipieCard from "./recipe-card"
import RecipeInfo from "./recipe-info"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function RecipeList() {
  
  const recipes = useRecipeStore(state => state.recipes)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
  const archiveRecipe = useRecipeStore(state => state.archiveRecipe)

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const ITEMS_PER_PAGE = 5

  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE)

  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const handleDelete = (id: string) => {
    if (confirm("Delete this recipe?")) {
      deleteRecipe(id)
    }
  }

  const handleArchive = (id: string) => {
    archiveRecipe(id)
  }

  return (
    <div className="flex gap-4 flex-col w-[500px]">

      {}
      <Input
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
      />

      {}
      {paginatedRecipes.length === 0 && (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}

      {}
      {paginatedRecipes.map(recipe => (
        <Dialog key={recipe.id}>
          <DialogTrigger asChild>
            <div>
              <RecipieCard
                index={recipe.id}
                title={recipe.title}
                description={recipe.description}
              />
            </div>
          </DialogTrigger>

          <RecipeInfo id={recipe.id} />

          <div className="flex gap-2 mt-2">
            <Button
              variant="destructive"
              onClick={() => handleDelete(recipe.id)}
            >
              Delete
            </Button>

            <Button
              variant="secondary"
              onClick={() => handleArchive(recipe.id)}
            >
              Archive
            </Button>
          </div>
        </Dialog>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

