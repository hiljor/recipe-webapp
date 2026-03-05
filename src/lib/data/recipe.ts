import prisma from "../../prisma/connection";
import { RecipeDTO } from "../definitions";


/**
 * Helper function to map database data to a usable RecipeDTO object.
 * @param recipe 
 * @returns a complete recipe object
 */
function mapToRecipeDTO(recipe: any): RecipeDTO {
  return {
    id: recipe.id,
    title: recipe.title,
    flavourText: recipe.flavourText,
    servings: recipe.servings,
    time: recipe.time,
    imageUrl: recipe.imageUrl,
    authorName: recipe.author?.name ?? "Unkown chef",
    added: recipe.added.toISOString(),
    updated: recipe.updated.toISOString(),
    
    ingredients: recipe.recipeIngredient.map((ri: any) => ({
      name: ri.ingredient.name,
      quantity: Number(ri.quantity), // Konverterer Decimal til number
      unit: ri.unit ?? "",
    })),
    
    steps: recipe.step.map((s: any) => ({
      type: s.type,
      text: s.text,
    })),

    tags: recipe.recipeTag.map((rt: any) => rt.tag.name),
  };
}

const RECIPE_INCLUDE = {
  author: true, 
  step: {
    orderBy: { pos: 'asc' as const }
  },
  recipeIngredient: {
    include: {
      ingredient: true
    },
    orderBy: { pos: 'asc' as const }
  },
  recipeTag: {
    include: {
      tag: true
    }
  }
};

/**
 * 
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function fetchAllUserRecipes(recipeId: number, userId: string): Promise<RecipeDTO | null> {
  const recipe = await prisma.recipe.findMany({
    where: { id: recipeId, authorId: userId},
    include: RECIPE_INCLUDE
  });

  if (!recipe) return null;

  return mapToRecipeDTO(recipe);
}

/**
 * 
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function fetchUserRecipe(recipeId: number, userId: string): Promise<RecipeDTO | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId, authorId: userId },
    include: RECIPE_INCLUDE
  });

  if (!recipe) return null;

  return mapToRecipeDTO(recipe);
}

/**
 * 
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function fetchRecipeById(i: number): Promise<RecipeDTO | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: i },
    include: RECIPE_INCLUDE
  });

  if (!recipe) return null;

  return mapToRecipeDTO(recipe);
}

/**
 * 
 * @returns all recipes
 */
async function fetchAllRecipes(): Promise<RecipeDTO[]> {
  const recipes = await prisma.recipe.findMany({
    include: RECIPE_INCLUDE
  });

  return recipes.map(mapToRecipeDTO);
}



export {fetchAllRecipes, fetchRecipeById, fetchAllUserRecipes, fetchUserRecipe}