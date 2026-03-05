import { RecipeDTO } from "@/lib/types";

export default function RecipeHeader({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="max-w-7xl flex-1 gap-6 items-start">
      <div className="flex flex-col gap-4 bg-sky-300 p-4 rounded-md">
        <div className="flex flex-row gap-4">
          <h2 className="text-3xl font-bold text-gray-900">{recipe.title}</h2>
          <div className="flex flex-row gap-2">
          {recipe.tags.map((tag) => (
            <p key={tag} className="text-md bg-white px-2 py-1 rounded text-center">
              {tag}
            </p>
          ))}
        </div>
        </div>
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
