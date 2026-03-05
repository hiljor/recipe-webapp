import { RecipeDTO } from "@/lib/definitions";
import Link from "next/link";
import RecipeIcon from "./icon";

export function RecipeCard({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="flex gap-6">
      <RecipeIcon src={recipe.imageUrl} size="sm" />
      <div className="mt-4">
        <div className="flex flex-row gap-3">
          <Link href={`/recipes/${recipe.id}`}>
            <h1 className="text-2xl text-black font-bold">{recipe.title}</h1>
          </Link>
          <div className="flex flex-row gap-2">
            {recipe.recipeTag.map((t) => (
              <p
                key={t.tag.name}
                className="text-md bg-blue-400 px-2 py-1 rounded text-center"
              >
                {t.tag.name}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-2 text-m text-gray-600 flex items-center space-x-4">
          {recipe.author.name && <span>by {recipe.author.name}</span>}
          {recipe.added && (
            <span>{new Date(recipe.added).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
