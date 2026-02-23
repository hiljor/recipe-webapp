import { text } from "stream/consumers";

const recipes = [
  {
    title: 'Boiled Egg',
    id: 1,
    author_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    added: '1960-06-15',
    updated: '2025-11-14',
    servings: '1',
    ingredients: [
      {
        name: 'egg', quantity: '1', unit: '', id: '1', pos: '1'
      }
    ],
    steps: [
      { type: 'instruction',
        text: 'Put egg(s) in a pot of cold water.',
        pos: '1'
      },
      { type: 'instruction',
        text: 'Place the pot on high heat on the stove.',
        pos: '2'
      },
      {
        type: 'instruction',
        text: 'Once water is boiling, put heat on medium and set a timer for 6 minutes. This makes for a perfectly cooked hard-boiled egg.',
        pos: '3'
      },
      { type: 'tip',
        text: 'If you would rather have a soft boiled egg, cook for 4 minutes.',
        pos: '4'
      },
      {
        type: 'instruction',
        text: 'Pour the hot water out and add cold water to the pan. Wait 1 minute.',
        pos: '5'
      },
      {
        type: 'instruction',
        text: 'Lightly tap the egg on a hard surface to crack the shell. Peel it off and enjoy your egg.',
        pos: '6'
      }
    ]
  },
  {
    title: 'Simple Pasta',
    id: '2',
    author_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    added: '1995-03-20',
    updated: '2025-11-14',
    servings: '2',
    ingredients: [
      {
        name: 'pasta', quantity: '200', unit: 'g', pos: '1', id: '2'
      },
      {
        name: 'salt', quantity: '1.5', unit: 'tsp', pos: '2', id: '3'
      },
      {
        name: 'olive oil', quantity: '2', unit: 'tbsp', pos: '3', id: '4'
      },
      {
        name: 'garlic', quantity: '2', unit: 'cloves', pos: '4', id: '5'
      }
    ],
    steps: [
      { type: 'instruction',
        text: 'Fill a large pot with water and bring to a boil.',
        pos: '1'
      },
      { type: 'instruction',
        text: 'Add salt to the boiling water.',
        pos: '2'
      },
      { type: 'instruction',
        text: 'Add pasta and cook for 8-10 minutes until al dente.',
        pos: '3'
      },
      { type: 'instruction',
        text: 'Drain pasta and set aside.',
        pos: '4'
      },
      { type: 'instruction',
        text: 'Heat olive oil in a pan and cook minced garlic until fragrant.',
        pos: '5'
      },
      { type: 'instruction',
        text: 'Toss pasta with garlic oil and serve.',
        pos: '6'
      },
      { type: 'tip',
        text: 'Reserve some pasta water to add creaminess if needed.',
        pos: '7'
      }
    ]
  }
]

const users = [
  {
    pk: 1,
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    display_name: "yummyfood",
    email: "yummyfood@gmail.com",
    password: "1234nomnom"
  }
]


/**
 * An array of arrays where each nested array contains 
 * 1 or more sql statements which can be run in parallel.
 * These statements set up the user table.
 */
const UserSeedingStrings = [
  [`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`],
  [`
    CREATE TABLE IF NOT EXISTS users (
      pk serial PRIMARY KEY NOT NULL,
      id UUID DEFAULT UNIQUE uuid_generate_v4(),
      display_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `]
]

/**
 * An array of arrays where each nested array contains 
 * 1 or more sql statements which can be run in parallel.
 * These statements set up the recipe table.
 */
const RecipeSeedingStrings = [
  [
    `CREATE TABLE IF NOT EXISTS "recipes" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "title" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "image_url" TEXT,
    "flavour_text" TEXT,
    "servings" INTEGER NOT NULL,
    "added" DATE NOT NULL,
    "updated" DATE NOT NULL
    );
  `,
  `CREATE TABLE IF NOT EXISTS "ingredients" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" TEXT UNIQUE NOT NULL
    );
  `,
  `CREATE TABLE IF NOT EXISTS "recipe_ingredients" (
    "recipe_id" INTEGER,
    "ingredient_id" INTEGER,
    "quantity" NUMERIC(10,4) NOT NULL,
    "unit" TEXT,
    "pos" INTEGER NOT NULL,
    PRIMARY KEY ("recipe_id", "ingredient_id", "pos")
    );
  `,
  `CREATE TABLE IF NOT EXISTS "steps" (
    "recipe_id" int NOT NULL,
    "type" instruction_type NOT NULL,
    "text" text NOT NULL,
    "pos" integer NOT NULL,
    PRIMARY KEY ("recipe_id", "pos")
    );
    `],
    [`ALTER TABLE "recipes" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");`],
    [`ALTER TABLE "recipe_ingredients" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");`],
    [`ALTER TABLE "recipe_ingredients" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id");`],
    [`ALTER TABLE "steps" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");`]
]

export {recipes, users}