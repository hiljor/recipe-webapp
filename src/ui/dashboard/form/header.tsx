"use client";

import { RecipeDTO } from "@/lib/definitions";

export default function RecipeHeaderEditor({ recipe }: { recipe?: RecipeDTO }) {
  
  return (
    <div className="max-w-7xl flex-1 gap-6 items-start">
      <div className="flex flex-col gap-4 bg-sky-300 p-4 rounded-md">
        <div className="flex flex-row gap-4 items-center">
          {/* Tittel Input */}
          <input
            name="title"
            defaultValue={recipe && recipe.title}
            placeholder="Oppskriftstittel"
            className="text-3xl font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-sky-400 focus:border-white focus:outline-none w-full transition-colors"
          />

          {/* Tags (Visning med mulighet for å fjerne/legge til kan bygges ut her) */}
          <div className="flex flex-row gap-2 shrink-0">
            {recipe && recipe.recipeTag.map((t) => (
              <span key={t.tag.name} className="text-md bg-white px-2 py-1 rounded text-center shadow-sm">
                {t.tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* Forfatter (Ofte skrivebeskyttet, men lagt som tekst her) */}
        <p className="text-sm font-medium">
          By <span className="underline decoration-sky-500">{recipe && recipe.author.name}</span>
        </p>
      </div>

      {/* Flavour Text Input */}
      <div className="mt-4">
        <label htmlFor="flavourText" className="sr-only">Beskrivelse</label>
        <textarea
          id="flavourText"
          name="flavourText"
          defaultValue={recipe && recipe.flavourText || ""}
          placeholder="Skriv en kort introduksjon til oppskriften..."
          rows={2}
          className="w-full mt-2 text-md text-gray-600 italic leading-relaxed bg-transparent border-l-2 border-gray-200 pl-4 focus:border-sky-300 focus:outline-none resize-none transition-all"
        />
      </div>
    </div>
  );
}