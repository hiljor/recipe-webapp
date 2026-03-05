import { getAllRecipes } from "@/lib/data"
import { RecipeCard } from "@/ui/recipes/card"

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex grow flex-col justify-between rounded-xl p-4">
      {<div className="flex flex-col gap-y-6">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>}
      
    </div>
  );
}