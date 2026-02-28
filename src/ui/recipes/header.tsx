import { RecipeDTO } from "@/lib/types";
import RecipeIcon from "./icon";

export default function RecipeHeader({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="max-w-7xl flex-1 gap-6 items-start">
      <h2 className="text-3xl font-bold text-gray-900">{recipe.title}</h2>
      {recipe.flavourText && (
        <p className="mt-2 text-md text-gray-600 italic leading-relaxed">
          "{recipe.flavourText}"
        </p>
      )}
      <p> By {recipe.authorName}</p>
    </div>
  );
}
