 import { z } from "zod";
import { Prisma } from "@/app/generated/prisma/client";

export const RECIPE_INCLUDE = {
  author: {
    select: {
      name: true,
    },
  },
  step: {
    orderBy: { pos: "asc" as const },
  },
  recipeIngredient: {
    include: {
      ingredient: {
        
      },
    },
    orderBy: { pos: "asc" as const },
  },
  recipeTag: {
    include: {
      tag: true,
    },
  },
};

const fullRecipeObject = {
  include: RECIPE_INCLUDE,
} satisfies Prisma.RecipeDefaultArgs;

export type RecipeDTO = Prisma.RecipeGetPayload<typeof fullRecipeObject>;
export type IngredientDTO = RecipeDTO["recipeIngredient"][number];
export type StepDTO = RecipeDTO["step"][number];


// Helper schemas for nested data
const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.string().min(1, "Amount is required (e.g., 200g or 2 cups)"),
});

const StepSchema = z.object({
  instruction: z.string().min(5, "Step instruction must be a bit more detailed"),
});

export const CreateRecipeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),
  
  flavourText: z
    .string()
    .max(250, "Keep the intro snappy!")
    .nullable()
    .optional(),
    
  servings: z.coerce
    .number()
    .int()
    .positive("Must serve at least 1 person"),
    
  time: z.string().min(1, "Please provide an estimated time (e.g. 30 mins)"),
  
  imageUrl: z.string().url("Please provide a valid image link").optional().or(z.literal("")),
  
  // Nested arrays for your ingredients and steps
  ingredients: z
    .array(IngredientSchema)
    .min(1, "You need at least one ingredient"),
    
  steps: z
    .array(StepSchema)
    .min(1, "You need at least one step"),
    
  tags: z.array(z.string()).default([]),
});

// This extracts the TypeScript type from the Zod schema automatically
export type CreateRecipeInput = z.infer<typeof CreateRecipeSchema>;