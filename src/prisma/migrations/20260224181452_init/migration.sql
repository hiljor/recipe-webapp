CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- CreateEnum
CREATE TYPE "instructionType" AS ENUM ('step', 'tip', 'note');

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeIngredient" (
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DECIMAL(10,4) NOT NULL,
    "unit" TEXT,
    "pos" INTEGER NOT NULL,

    CONSTRAINT "recipeIngredient_pkey" PRIMARY KEY ("recipeId","ingredientId","pos")
);

-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "flavourText" TEXT,
    "servings" INTEGER NOT NULL,
    "added" DATE NOT NULL,
    "updated" DATE NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step" (
    "recipeId" INTEGER NOT NULL,
    "type" "instructionType" NOT NULL,
    "text" TEXT NOT NULL,
    "pos" INTEGER NOT NULL,

    CONSTRAINT "step_pkey" PRIMARY KEY ("recipeId","pos")
);

-- CreateTable
CREATE TABLE "user" (
    "pk" SERIAL NOT NULL,
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "displayName" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_name_key" ON "ingredient"("name");

-- CreateIndex
CREATE INDEX "recipe_authorId_idx" ON "recipe"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD CONSTRAINT "recipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD CONSTRAINT "recipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "step" ADD CONSTRAINT "step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
