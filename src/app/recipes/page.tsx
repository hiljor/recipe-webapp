import type { Recipe } from "@/app/generated/prisma/client";
import { getAllRecipes } from "@/lib/data"
import { RecipeCard } from "@/ui/recipes/card"

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
      {<div className="bg-white px-6">
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          );
        })}
      </div>}
    </div>
  );
}