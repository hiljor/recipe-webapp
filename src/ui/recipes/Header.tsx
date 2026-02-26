import { RecipeDTO } from "@/lib/types";
import RecipeIcon from "./RecipeIcon";

export default function RecipeHeader({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="flex gap-6 items-start">
      <RecipeIcon src={recipe.imageUrl} />
      <div>
      </div>
    </div>
  );
}
