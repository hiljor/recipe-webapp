import { prisma } from "../prisma/connection";
import { Recipe, User } from "../app/generated/prisma/client";
/**
 * Gets a user by their integer ID or hidden string ID.
 * @param name
 * @returns The user, or null
 */
async function getUserbyPk(i: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { pk: i },
  });
}

/**
 * Gets a recipe by its integer ID.
 * @param id
 * @returns The recipe, or null
 */
async function getRecipeById(i: number): Promise<Recipe | null>{
  return prisma.recipe.findUnique({
    where: { id: i },
  });
}

/**
 * 
 * @returns All recipes in database
 */
async function getAllRecipes(): Promise<Recipe[] | null>{
  return prisma.recipe.findMany();
}
