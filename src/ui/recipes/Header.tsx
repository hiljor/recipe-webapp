import { RecipeDTO } from "@/lib/types";

export default function RecipeHeader({ recipe }: { recipe: RecipeDTO }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-48 w-48 overflow-hidden rounded-lg">
        < Image />
      </div>
      <div>
        <h2 id="title">
        </h2>
        <p id="flavourText">

        </p>
      </div>
    </div>
  );
}
