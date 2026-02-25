
export interface RecipeDTO {
  id: number;
  title: string;
  flavourText: string | null;
  servings: number;
  imageUrl?: string | null;
  authorName?: string | null;
  added: string; 
  updated: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export interface Ingredient {
  name: string,
  quantity: number,
  unit: string,
}

export interface Step {
  type: string,
  text: string,
}