-- Alter table names
ALTER TABLE "user" RENAME TO "User";
ALTER TABLE "ingredient" RENAME TO "Ingredient";
ALTER TABLE "recipeIngredient" RENAME TO "RecipeIngredient";
ALTER TABLE "step" RENAME TO "Step";
ALTER TABLE "recipe" RENAME TO "Recipe";
ALTER TYPE "instructionType" RENAME TO "InstructionType";

-- AlterTable
ALTER TABLE "Ingredient" RENAME CONSTRAINT "ingredient_pkey" TO "Ingredient_pkey";

-- AlterTable
ALTER TABLE "Recipe" RENAME CONSTRAINT "recipe_pkey" TO "Recipe_pkey";

-- AlterTable
ALTER TABLE "RecipeIngredient" RENAME CONSTRAINT "recipeIngredient_pkey" TO "RecipeIngredient_pkey";

-- AlterTable
ALTER TABLE "Step" RENAME CONSTRAINT "step_pkey" TO "Step_pkey";

-- AlterTable
ALTER TABLE "User" RENAME CONSTRAINT "user_pkey" TO "User_pkey";

-- RenameForeignKey
ALTER TABLE "Recipe" RENAME CONSTRAINT "recipe_authorId_fkey" TO "Recipe_authorId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeIngredient" RENAME CONSTRAINT "recipeIngredient_ingredientId_fkey" TO "RecipeIngredient_ingredientId_fkey";

-- RenameForeignKey
ALTER TABLE "RecipeIngredient" RENAME CONSTRAINT "recipeIngredient_recipeId_fkey" TO "RecipeIngredient_recipeId_fkey";

-- RenameForeignKey
ALTER TABLE "Step" RENAME CONSTRAINT "step_recipeId_fkey" TO "Step_recipeId_fkey";

-- RenameIndex
ALTER INDEX "ingredient_name_key" RENAME TO "Ingredient_name_key";

-- RenameIndex
ALTER INDEX "recipe_authorId_idx" RENAME TO "Recipe_authorId_idx";

-- RenameIndex
ALTER INDEX "user_email_key" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "user_id_key" RENAME TO "User_id_key";
