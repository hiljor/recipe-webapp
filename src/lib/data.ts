import prisma from "../prisma/connection";
import { RecipeDTO } from "./types";
import { User, Recipe, Ingredient, RecipeIngredient, Step } from "@/app/generated/prisma/client";


/**
 * Gets a user by their integer ID or hidden string ID.
 * @param name
 * @returns The user, or null
 */
async function getUserbyId(inputId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: inputId },
  });
}

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

/**
 * 
 * @param i the recipe id
 * @returns recipe, if exist
 */
async function getRecipeById(i: number): Promise<RecipeDTO | null> {
  const recipe = await prisma.recipe.findUnique({
    where: { id: i },
    include: {
      author: true, 
      step: {
        orderBy: { pos: 'asc' }
      },
      recipeIngredient: {
        include: {
          ingredient: true
        },
        orderBy: { pos: 'asc' }
      },
      recipeTag: {
        include: {
          tag: true
        }
      }
    }
  });

  if (!recipe) return null;

  return mapToRecipeDTO(recipe);
}

/**
 * 
 * @returns all recipes
 */
async function getAllRecipes(): Promise<RecipeDTO[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: true, 
      step: {
        orderBy: { pos: 'asc' }
      },
      recipeIngredient: {
        include: {
          ingredient: true
        },
        orderBy: { pos: 'asc' }
      },
      recipeTag: {
        include: {
          tag: true
        }
      }
    }
  });

  return recipes.map(mapToRecipeDTO);
}

export {getUserbyId, getRecipeById, getAllRecipes}