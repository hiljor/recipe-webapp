import { text } from "stream/consumers";

const recipes = [
  {
    title: 'Boiled Egg',
    author_id: 1,
    servings: 1,
    added: '1960-06-15',
    updated: '2025-11-14',
    ingredients: [
      {
        name: 'egg', quantity: 1, unit: '', pos: 1
      }
    ],
    steps: [
      { type: 'step',
        text: 'Put egg(s) in a pot of cold water.',
        pos: 1
      },
      { type: 'step',
        text: 'Place the pot on high heat on the stove.',
        pos: 2
      },
      {
        type: 'step',
        text: 'Once water is boiling, put heat on medium and set a timer for 6 minutes. This makes for a perfectly cooked hard-boiled egg.',
        pos: 3
      },
      { type: 'tip',
        text: 'If you would rather have a soft boiled egg, cook for 4 minutes.',
        pos: 4
      },
      {
        type: 'step',
        text: 'Pour the hot water out and add cold water to the pan. Wait 1 minute.',
        pos: 5
      },
      {
        type: 'step',
        text: 'Lightly tap the egg on a hard surface to crack the shell. Peel it off and enjoy your egg.',
        pos: 6
      }
    ]
  },
  {
    title: 'Simple Pasta',
    author_id: 1,
    servings: 2,
    added: '1995-03-20',
    updated: '2025-11-14',
    ingredients: [
      {
        name: 'pasta', quantity: 200, unit: 'g', pos: 1
      },
      {
        name: 'salt', quantity: 1.5, unit: 'tsp', pos: 2
      },
      {
        name: 'olive oil', quantity: 2, unit: 'tbsp', pos: 3
      },
      {
        name: 'garlic', quantity: 2, unit: 'cloves', pos: 4
      }
    ],
    steps: [
      { type: 'step',
        text: 'Fill a large pot with water and bring to a boil.',
        pos: 1
      },
      { type: 'step',
        text: 'Add salt to the boiling water.',
        pos: 2
      },
      { type: 'step',
        text: 'Add pasta and cook for 8-10 minutes until al dente.',
        pos: 3
      },
      { type: 'step',
        text: 'Drain pasta and set aside.',
        pos: 4
      },
      { type: 'step',
        text: 'Heat olive oil in a pan and cook minced garlic until fragrant.',
        pos: 5
      },
      { type: 'step',
        text: 'Toss pasta with garlic oil and serve.',
        pos: 6
      },
      { type: 'tip',
        text: 'Reserve some pasta water to add creaminess if needed.',
        pos: 7
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
const userSeedingStatements = [
  [`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`],
  [`
    CREATE TABLE IF NOT EXISTS users (
      pk serial PRIMARY KEY NOT NULL,
      id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
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
const recipeSeedingStatements = [
  [`DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'instruction_type'
      ) THEN
        CREATE TYPE instruction_type AS ENUM ('step', 'tip', 'note');
      END IF;
    END$$;`
  ],
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
    [`ALTER TABLE "recipes" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("pk");`],
    [`ALTER TABLE "recipe_ingredients" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE;`],
    [`ALTER TABLE "recipe_ingredients" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id");`],
    [`ALTER TABLE "steps" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE;`]
]

const resetStatements = [
  [`DROP TABLE IF EXISTS steps, recipe_ingredients, ingredients, recipes, users CASCADE;`],
  [`DROP TYPE IF EXISTS instruction_type CASCADE;`],
  [`DROP EXTENSION IF EXISTS "uuid-ossp";`]
]

export {recipes, users, recipeSeedingStatements, userSeedingStatements, resetStatements}