
export interface RecipeDTO {
  id: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  authorName?: string | null;
  createdAt: string; // keep as ISO string for the client
  ingredients: Ingredient[],
  steps: Step[]
}

export interface Ingredient {
  name: string,
  quantity: number,
  unit: string
}

export interface Step {
  type: string,
  text: string
}