import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { recipes, users, recipeSeedingStrings, userSeedingStrings } from '../lib/example-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Runs sql strings in statements, where each group is run in parallel.
 * @param statements Nested statement list to run
 */
async function runStatements(statements: string[][]) {
  for (const group of statements) {
    await Promise.all(
      group.map(async stmt => {
        return sql`${stmt}`
      })
    )
    for (const stmt of group) {

    }
  }
}

/**
 * Seeds the user database.
 * @returns
 */
async function seedUsers() {
  await runStatements(userSeedingStrings);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, display_name, email, password)
        VALUES (${user.id}, ${user.display_name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

/**
 * Seeds the recipe database.
 */
async function seedRecipes(){
  await runStatements(recipeSeedingStrings);

  const insertedRecipes = await Promise.all(
    recipes.map(async (recipe) => {
      return Promise.all([
        sql`INSERT INTO recipes (id, title, author_id, servings, added, updated)
        VALUES (${recipe.id}, ${recipe.title}, ${recipe.author_id}, ${recipe.servings}, ${recipe.added}, ${recipe.updated})
        ON CONFLICT (id) DO NOTHING;
        `,
        Promise.all(
          recipe.ingredients.map(async (ingredient) => {
            return Promise.all([
              sql`INSERT INTO ingredients (name) VALUES (${ingredient.name})
              ON CONFLICT (name) DO NOTHING`,
              sql`INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit, pos)
              VALUES (${recipe.id}, ${ingredient.id}, ${ingredient.quantity}, ${ingredient.unit}, ${ingredient.pos})
              ON CONFLICT (id) DO NOTHING;
              `
            ])
          })
        )
        ,
        Promise.all(
          recipe.steps.map(async (step) => {
            return sql`INSERT INTO steps (recipe_id, type, text, pos)
            VALUES (${recipe.id}, ${step.type}, ${step.text}, ${step.pos});
            `
        })
        )
      ]
      )
    })
  )

  return insertedRecipes;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedRecipes(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}