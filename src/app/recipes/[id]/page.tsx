import { getRecipeById } from "@/lib/data";
import RecipeHeader from "@/ui/recipes/header";
import RecipeIngredients from "@/ui/recipes/ingredients";
import { notFound } from 'next/navigation';

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const recipe = await getRecipeById(parseInt(id));

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex-y p-8 gap-3">
      < RecipeHeader recipe={recipe} />
      < RecipeIngredients ingredients={recipe.ingredients} />
    </div>
  )
}