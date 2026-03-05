import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/prisma/connection";
import type { RecipeDTO } from "../definitions";
import { RECIPE_INCLUDE } from "../definitions";
/**
 *
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function fetchUserRecipe(
  recipeId: number,
  userId: string,
): Promise<RecipeDTO | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId, authorId: userId },
    include: RECIPE_INCLUDE,
  });

  if (!recipe) return null;

  return recipe;
}

/**
 *
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function fetchAllUserRecipes(
  recipeId: number,
  userId: string,
): Promise<RecipeDTO[] | null> {
  const recipe = await prisma.recipe.findMany({
    where: { id: recipeId, authorId: userId },
    include: RECIPE_INCLUDE,
  });

  if (!recipe) return null;

  return recipe;
}

/**
 *
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function fetchRecipeById(i: number): Promise<RecipeDTO | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: i },
    include: RECIPE_INCLUDE,
  });

  if (!recipe) return null;

  return recipe;
}

/**
 *
 * @returns all recipes
 */
async function fetchAllRecipes(): Promise<RecipeDTO[]> {
  const recipes = await prisma.recipe.findMany({
    include: RECIPE_INCLUDE,
  });

  return recipes;
}

export {
  fetchAllRecipes,
  fetchRecipeById,
  fetchAllUserRecipes,
  fetchUserRecipe,
};
