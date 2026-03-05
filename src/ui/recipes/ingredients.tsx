import { IngredientDTO } from "@/lib/definitions";

export default function RecipeIngredients({ingredients} : {ingredients: IngredientDTO[]}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Ingredients</h3>
      <div className="grid grid-cols-[3rem_2rem_1fr] gap-x-4 gap-y-1">
      {ingredients.map( (ing, index) => {
        return (
          <div key={index} className="contents group">
            <span className="text-right font-medium text-gray-800">
              {ing.ingredient.name}
            </span>
            <span className="text-gray-500">
              {ing.quantity.toString()}
            </span>
            <span className="text-gray-800">
              {ing.unit}
            </span>
          </div>
        )
      })}
    </div>
    </div>
  )
}