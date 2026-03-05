import prisma from "@/prisma/connection";
import { RecipeSchema } from "../definitions";
import { z } from "zod";
import { auth } from "./auth";
import { headers } from "next/headers";

export type State = {
  errors?: {
    title?: string[];
    servings?: string[];
    time?: string[];
    image?: string[];
    ingredientsRaw?: string[]; // Matches the name in the textarea
    stepsRaw?: string[];
    message?: string | null;
  };
  message?: string | null;
};

export async function createRecipe(prevState: State, formData: FormData) {
  // 1. Validate fields using Zod
  const validatedFields = RecipeSchema.safeParse(formData);

  // 2. If validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error),
      message: 'Missing Fields. Failed to create recipe.',
    };
  }

  // 3. Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { message: 'Unauthorized: Must be logged in to create a recipe.' };
  }

  // 4. If successful, proceed to DB
  try {
    const { title, flavourText, servings, time, image, ingredients, steps, tags } = validatedFields.data;

    // Handle image upload (optional)
    let imageUrl: string | null = null;
    if (image && image instanceof File) {
      // TODO: Implement image upload to storage service
      // For now, we'll leave it null or you can upload to Cloudinary, S3, etc.
      imageUrl = null;
    }

    const now = new Date();

    // Create recipe with nested relations
    await prisma.recipe.create({
      data: {
        title,
        flavourText: flavourText || null,
        servings,
        length: time as any, // Maps to RecipeLength enum
        imageUrl,
        added: now,
        updated: now,
        authorId: session.user.id,
        // Create ingredients
        recipeIngredient: {
          createMany: {
            data: ingredients.map((ing, index) => ({
              ingredientId: ing.id || undefined, // Assume ingredient.id exists, else handle lookup
              quantity: ing.amount,
              unit: ing.unit || null,
              pos: index,
            })),
            skipDuplicates: true,
          },
        },
        // Create steps
        step: {
          createMany: {
            data: steps.map((step, index) => ({
              text: step.instruction,
              type: step.type as any, // Maps to InstructionType enum
              pos: index,
            })),
            skipDuplicates: true,
          },
        },
        // Create tags
        recipeTag: {
          createMany: {
            data: tags.map((tagName) => ({
              tagId: undefined, // TODO: Lookup or create tag by name
            })),
            skipDuplicates: true,
          },
        },
      },
      include: {
        author: { select: { name: true } },
        recipeIngredient: { include: { ingredient: true } },
        step: { orderBy: { pos: "asc" } },
        recipeTag: { include: { tag: true } },
      },
    });

    return { message: 'Recipe created successfully!' };
  } catch (error) {
    console.error('Recipe creation error:', error);
    return { message: 'Database Error: Failed to Create Recipe.' };
  }
}