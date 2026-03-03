import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const recipeData: Prisma.RecipeCreateInput[] = [
  {
    title: "Boiled Egg",
    author: {
      connect: { id: "re2PiN9vCC3WVIBKv4prhv5zcTvenNgw" },
    },
    servings: 1,
    added: new Date("1960-06-15"),
    updated: new Date("2025-11-14"),
    recipeIngredient: {
      create: [
        {
          ingredient: {
            create: { name: "egg" },
          },
          quantity: 1,
          unit: "",
          pos: 1,
        },
      ],
    },
    step: {
      create: [
        {
          type: "step",
          text: "Put egg(s) in a pot of cold water.",
          pos: 1,
        },
        {
          type: "step",
          text: "Place the pot on high heat on the stove.",
          pos: 2,
        },
        {
          type: "step",
          text: "Once water is boiling, put heat on medium and set a timer for 6 minutes. This makes for a perfectly cooked hard‑boiled egg.",
          pos: 3,
        },
        {
          type: "tip",
          text: "If you would rather have a soft boiled egg, cook for 4 minutes.",
          pos: 4,
        },
        {
          type: "step",
          text: "Pour the hot water out and add cold water to the pan. Wait 1 minute.",
          pos: 5,
        },
        {
          type: "step",
          text: "Lightly tap the egg on a hard surface to crack the shell. Peel it off and enjoy your egg.",
          pos: 6,
        },
      ],
    },
  },
  {
    title: "Simple Pasta",
    author: {
      connect: { id: "re2PiN9vCC3WVIBKv4prhv5zcTvenNgw" },
    },

    servings: 2,
    added: new Date("1995-03-20"),
    updated: new Date("2025-11-14"),

    recipeIngredient: {
      create: [
        {
          ingredient: { create: { name: "pasta" } },
          quantity: 200,
          unit: "g",
          pos: 1,
        },
        {
          ingredient: { create: { name: "salt" } },
          quantity: 1.5,
          unit: "tsp",
          pos: 2,
        },
        {
          ingredient: { create: { name: "olive oil" } },
          quantity: 2,
          unit: "tbsp",
          pos: 3,
        },
        {
          ingredient: { create: { name: "garlic" } },
          quantity: 2,
          unit: "cloves",
          pos: 4,
        },
      ],
    },
    step: {
      create: [
        {
          type: "step",
          text: "Fill a large pot with water and bring to a boil.",
          pos: 1,
        },
        { type: "step", text: "Add salt to the boiling water.", pos: 2 },
        {
          type: "step",
          text: "Add pasta and cook for 8‑10 minutes until al dente.",
          pos: 3,
        },
        { type: "step", text: "Drain pasta and set aside.", pos: 4 },
        {
          type: "step",
          text: "Heat olive oil in a pan and cook minced garlic until fragrant.",
          pos: 5,
        },
        { type: "step", text: "Toss pasta with garlic oil and serve.", pos: 6 },
        {
          type: "tip",
          text: "Reserve some pasta water to add creaminess if needed.",
          pos: 7,
        },
      ],
    },
  },
];

export async function main() {
  for (const r of recipeData) {
    await prisma.recipe.create({ data: r });
  }
}

main();
