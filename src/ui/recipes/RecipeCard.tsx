import { Recipe } from "@/app/generated/prisma/client";
import { RecipeDTO } from "@/lib/types";

export function RecipeCard({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="mt-4">
      <h1 className="text-4xl text-black font-bold">{recipe.title}</h1>
      <div className="mt-2 text-m text-gray-600 flex items-center space-x-4">
        {recipe.authorName && <span>by {recipe.authorName}</span>}
        {recipe.added && (
          <span>{new Date(recipe.added).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
