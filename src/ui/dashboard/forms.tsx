'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createRecipe, State } from '@/lib/actions/recipe'; // Adjust your import
import { Button } from '@/ui/general/button'; // Adjust based on your UI components

export default function CreateRecipeForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createRecipe, initialState);

  return (
    <form action={formAction} encType="multipart/form-data">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Recipe Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Recipe Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Grandma's Famous Lasagna"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite">
            {state.errors?.title?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Servings & Time */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="servings" className="mb-2 block text-sm font-medium">Servings</label>
            <input id="servings" name="servings" type="number" className="w-full rounded-md border border-gray-200 p-2 text-sm" />
          </div>
          <div>
            <label htmlFor="time" className="mb-2 block text-sm font-medium">Cooking Time</label>
            <input id="time" name="time" type="text" placeholder="e.g. 45 mins" className="w-full rounded-md border border-gray-200 p-2 text-sm" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Recipe Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          <div id="image-error" aria-live="polite">
            {state.errors?.image?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Ingredients (Simplified for Server Action parsing) */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Ingredients</label>
          <textarea
            name="ingredientsRaw"
            placeholder="Enter ingredients (one per line)"
            rows={5}
            className="block w-full rounded-md border border-gray-200 p-2 text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">List each ingredient on a new line.</p>
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/myrecipes" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Save Recipe</Button>
      </div>
    </form>
  );
}