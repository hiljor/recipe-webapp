import { RecipeDTO } from "@/lib/types";
import RecipeIcon from "./icon";

export default function RecipeHeader({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="max-w-7xl flex gap-6 items-start">
      <RecipeIcon src={recipe.imageUrl} />
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-900">
          {recipe.title}
        </h2>
        {recipe.flavourText && (
          <p className="mt-2 text-lg text-gray-600 italic leading-relaxed">
            "{recipe.flavourText}"
          </p>
        )}
      </div>
    </div>
  );
}
