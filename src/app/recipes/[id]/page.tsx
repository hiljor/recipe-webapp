import { getRecipeById } from "@/lib/data";
import RecipeHeader from "@/ui/recipes/Header";
import { notFound } from 'next/navigation';

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const recipe = await getRecipeById(parseInt(id));

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex">
      < RecipeHeader recipe={recipe} />
    </div>
  )
}