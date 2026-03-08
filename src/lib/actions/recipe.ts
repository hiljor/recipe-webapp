"use server"
import prisma from "@/prisma/connection";
import { RecipeSchema } from "../definitions";
import { z } from "zod";

// 1. Define a consistent State type
export type State = {
  errors?: {
    userId?: string[] | undefined;
    title?: string[] | undefined;
    servings?: string[] | undefined;
    time?: string[] | undefined;
    ingredients?: string[] | undefined;
    steps?: string[] | undefined;
    tags?: string[] | undefined;
    flavourText?: string[] | undefined;
    image?: string[] | undefined;
  };
  message?: string | null;
};

export async function createRecipe(prevState: State, formData: FormData) {

  const ingredientIds = Array.from(formData.keys())
    .filter((key) => key.startsWith("ingredient-name-"))
    .map((key) => key.replace("ingredient-name-", ""));

  const stepIds = Array.from(formData.keys())
    .filter((key) => key.startsWith("step-instruction-"))
    .map((key) => key.replace("step-instruction-", ""));

  // 2. Map those IDs into the nested arrays Zod expects
  const dataToValidate = {
    userId: formData.get("userId"), // Replace with actual auth logic
    title: formData.get("title"),
    flavourText: formData.get("flavourText") || null,
    servings: formData.get("servings"),
    time: formData.get("time"),
    image: formData.get("image") instanceof File ? formData.get("image") : undefined,
    
    ingredients: ingredientIds.map((id) => ({
      name: formData.get(`ingredient-name-${id}`),
      amount: formData.get(`ingredient-amount-${id}`),
      unit: formData.get(`ingredient-unit-${id}`),
    })),

    steps: stepIds.map((id) => ({
      instruction: formData.get(`step-instruction-${id}`),
      type: formData.get(`step-type-${id}`), // "tip" if checked, "step" if not
    })),
    
    tags: [], // Handle tags similarly if they are dynamic
  };

  // 3. Validate
  const validatedFields = RecipeSchema.safeParse(dataToValidate);

  // 2. If validation fails, return errors early
  if (!validatedFields.success) {
    return {
      // using flatten despite deprecation 
      // because the nextjs guide uses it
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create recipe.",
    };
  }

  // 3. If successful, proceed to DB
  try {
    const {
      userId,
      title,
      flavourText,
      servings,
      time,
      image,
      ingredients,
      steps,
      tags,
    } = validatedFields.data;

    // Handle image upload (optional)
    let imageUrl: string | null = null;
    if (image && image instanceof File) {
      // TODO: Implement image upload to storage service
      // For now, we'll leave it null or you can upload to Cloudinary, S3, etc.
      imageUrl = null;
    }

    // insert recipes in advance
    const ingredientRecords = await Promise.all(
      ingredients.map((ing) => {
        const ingName = ing.name.toLowerCase();
        return prisma.ingredient.upsert({
          where: { name: ingName },
          update: {},
          create: { name: ingName },
        });
      }),
    );
    const dbIngredients = ingredients.map((ing, index) => ({
      ...ing,
      id: ingredientRecords[index].id,
    }));

    const tagRecords = await Promise.all(
      tags.map((tag) => {
        const tagName = tag.toLowerCase();
        return prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      }),
    );

    const now = new Date();

    // Create recipe with nested relations
    await prisma.recipe.create({
      data: {
        title,
        flavourText: flavourText || null,
        servings,
        length: time as any,
        imageUrl,
        added: now,
        updated: now,
        authorId: userId,
        // Create ingredients
        recipeIngredient: {
          createMany: {
            data: dbIngredients.map((ing, index) => ({
              ingredientId: ing.id,
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
            data: tagRecords.map((tag) => ({
              tagId: tag.id,
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

    return { message: "Recipe created successfully!" };
  } catch (error) {
    console.error("Recipe creation error:", error);
    return { message: "Database Error: Failed to Create Recipe." };
  }
}
