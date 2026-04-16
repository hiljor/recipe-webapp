"use client";

import { useState } from "react";
import { IngredientDTO } from "@/lib/definitions";
import { Icon, Plus, Trash2 } from "lucide-react";

export default function RecipeIngredientsEditor({
  ingredients: initialIngredients,
}: {
  ingredients?: IngredientDTO[];
}) {
  const [ingredients, setIngredients] = useState((initialIngredients ?? []).map((ing) => ({
    name: ing.ingredient.name,
    amount: Number(ing.quantity),
    unit: ing.unit
  })));

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: 0, unit: null },
    ]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Ingredients</h3>
      <div className="space-y-2">
        {ingredients.map((ing, index) => (
          <div key={index} className="group flex items-center gap-4">
            <div className="grid grid-cols-[3rem_2rem_5rem] gap-x-4 flex-1">
              <input
                type="text"
                name={`ingredient-name-${index}`}
                className="text-right font-medium text-gray-800"
                defaultValue={ing.name}
                placeholder="Sugar"
              />
              <input
                type="number"
                name={`ingredient-amount-${index}`}
                className="text-gray-500"
                defaultValue={ing.amount}
                placeholder="2"
              />
              <input
                type="text"
                name={`ingredient-unit-${index}`}
                className="text-gray-800"
                defaultValue={ing.unit || ""}
                placeholder="cups"
              />
            </div>
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
            >
              < Trash2 className="pt-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addIngredient}
        className="mt-4 px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Plus className="inline-block mr-1" />
      </button>
    </div>
  );
}
