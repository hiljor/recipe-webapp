import { fetchRecipeById } from "@/lib/data/recipe";
import RecipeHeader from "@/ui/recipes/header";
import RecipeIcon from "@/ui/recipes/icon";
import RecipeIngredients from "@/ui/recipes/ingredients";
import RecipeSteps from "@/ui/recipes/steps";
import { notFound } from "next/navigation";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recipe = await fetchRecipeById(parseInt(id));

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex flex-col p-8 gap-5">
      <RecipeIcon />
      <RecipeHeader recipe={recipe} />
      <div className="flex flex-row gap-6">
        <RecipeIngredients ingredients={recipe.ingredients} />
        <RecipeSteps steps={recipe.steps} />
      </div>
    </div>
  );
}
