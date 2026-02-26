import { getRecipeById } from "@/lib/data";
import RecipeHeader from "@/ui/recipes/Header";
import { useRouter } from "next/router";
import { notFound } from 'next/navigation';

export default async function RecipePage ({ params }: { params: { id: string } }) {

  const recipe = await getRecipeById(parseInt(params.id));

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex">
      < RecipeHeader recipe={recipe} />
    </div>
  )
}