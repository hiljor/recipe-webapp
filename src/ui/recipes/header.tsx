import { RecipeDTO } from "@/lib/types";

export default function RecipeHeader({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="max-w-7xl flex-1 gap-6 items-start">
      <div className="flex flex-row items-end gap-4 bg-sky-100 p-4 rounded-md">
        <h2 className="text-3xl font-bold text-gray-900">{recipe.title}</h2>
        <p> By {recipe.authorName}</p>
      </div>
      {recipe.flavourText && (
        <p className="mt-2 text-md text-gray-600 italic leading-relaxed">
          "{recipe.flavourText}"
        </p>
      )}
    </div>
  );
}
