import { fetchRecipeById } from "@/lib/data/recipe";
import RecipeHeader from "@/ui/recipes/header";
import RecipeIcon from "@/ui/recipes/icon";
import RecipeIngredients from "@/ui/recipes/ingredients";
import RecipeSteps from "@/ui/recipes/steps";
import { notFound } from "next/navigation";
import RecipeIconEditor from "./form/icon";
import RecipeHeaderEditor from "./form/header";
import RecipeIngredientsEditor from "./form/ingredients";
import RecipeStepsEditor from "./form/steps";

export default async function RecipePage() {
  return (
    <div className="flex flex-col p-8 gap-5">
      <RecipeIconEditor />
      <RecipeHeaderEditor />
      <div className="flex flex-row gap-6">
        <RecipeIngredientsEditor />
        <RecipeStepsEditor />
      </div>
    </div>
  );
}
