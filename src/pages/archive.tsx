import { useRecipeStore } from "@/store/recipes"
import { Button } from "@/components/ui/button"

export default function Archive() {
  
  const archivedRecipes = useRecipeStore(state => state.archivedRecipes)
  const unarchiveRecipe = useRecipeStore(state => state.unarchiveRecipe)
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Archived Recipes</h1>

      {archivedRecipes.length === 0 && (
        <p className="text-gray-500">No archived recipes.</p>
      )}

      {archivedRecipes.map(recipe => (
        <div
          key={recipe.id}
          className="border rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">{recipe.title}</h2>
            <p className="text-sm text-gray-500">{recipe.description}</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => unarchiveRecipe(recipe.id)}>
              Unarchive
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Delete this recipe permanently?")) {
                  deleteRecipe(recipe.id)
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
