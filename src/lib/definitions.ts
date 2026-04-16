import { z } from "zod";
import { Prisma } from "@/app/generated/prisma/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const ACCEPTED_TIMES = [
  "UNDER_15",
  "FROM_15_TO_30",
  "FROM_30_TO_60",
  "OVER_60",
];
export const ACCEPTED_STEP_TYPES = [
  "step",
  "tip",
  "note"
]

export const RECIPE_INCLUDE = {
  author: {
    select: {
      name: true,
    },
  },
  step: {
    select: {
      type: true,
      text: true,
      pos: true
    },
    orderBy: { pos: "asc" as const },
  },
  recipeIngredient: {
    include: {
      ingredient: {},
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



// Helper schemas for nested data
const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.coerce.number().min(1, "Amount is required (e.g., 200 or 1.5)"),
  unit: z.string().optional()
});

const StepSchema = z.object({
  instruction: z
    .string()
    .min(1, "Step instruction must be a bit more detailed"),
  type: z.enum(['step', 'tip'], {
    message: "Please select a valid step type",
  }),
});

export const RecipeSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),

  flavourText: z
    .string()
    .max(250, "Keep the intro snappy!")
    .nullable()
    .optional(),

  servings: z.coerce.number().int().positive("Must serve at least 1 person"),

  time: z.enum(ACCEPTED_TIMES, {
    message: "Please select a valid recipe length",
  }),

  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),

  // Nested arrays for your ingredients and steps
  ingredients: z
    .array(IngredientSchema)
    .min(1, "You need at least one ingredient"),

  steps: z.array(StepSchema).min(1, "You need at least one step"),

  tags: z.array(z.string()).default([]),
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;

export type RecipeDTO = Prisma.RecipeGetPayload<typeof fullRecipeObject>;
export type IngredientDTO = RecipeDTO["recipeIngredient"][number];
export type StepDTO = RecipeDTO["step"][number];

export const IngredientsArraySchema = z.array(IngredientSchema);
export const StepsArraySchema = z.array(StepSchema);
