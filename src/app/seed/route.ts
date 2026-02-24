import postgres from 'postgres';
import bcrypt from 'bcrypt';
import { recipes, users, recipeSeedingStatements, userSeedingStatements, resetStatements } from '../lib/example-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Runs sql strings in statements, where each group is run in parallel.
 * @param statements Nested statement list to run
 */
async function runStatements(statements: string[][]) {
  for (const group of statements) {
    await Promise.all(
      group.map(async stmt => {
        return sql.unsafe(stmt)
      })
    )
  }
}

/**
 * Seeds the user database.
 * @returns
 */
async function seedUsers() {
  await runStatements(userSeedingStatements);

  console.log("inserting users")
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

async function addRecipe(
  recipe: {
    title: string,
    author_id: number,
    servings: number,
    added: string,
    updated: string,
    ingredients: {
      name: string, 
      quantity: number, 
      unit: string, 
      pos: number, 
    }[]
    steps: {
      type: string,
      text: string,
      pos: number
    }[]
  }
){
    // Insert primary recipe information
    const recipeTableInsert = await sql`
      INSERT INTO recipes (title, author_id, servings, added, updated)
      VALUES (${recipe.title}, ${recipe.author_id}, ${recipe.servings}, ${recipe.added}, ${recipe.updated})
      RETURNING id;`;
      
    const recipeId = recipeTableInsert[0]?.id;
    
  
  return Promise.all(
    [
      Promise.all(
        recipe.ingredients.map(async (ingredient) => {

          // insert ingredient if new
          const ingredientTableInsert = await sql`
            INSERT INTO ingredients (name) VALUES (${ingredient.name})
            ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING id;
            `
          const ingredientId = ingredientTableInsert[0]?.id;
          
          // insert recipe ingredients
          return sql`
            INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit, pos)
            VALUES (${recipeId}, ${ingredientId}, ${ingredient.quantity}, ${ingredient.unit}, ${ingredient.pos});
          `
        })
      )
      ,
      Promise.all(
        recipe.steps.map(async (step) => {
          return sql`INSERT INTO steps (recipe_id, type, text, pos)
          VALUES (${recipeId}, ${step.type}, ${step.text}, ${step.pos});
          `
        })
      )
    ]
  )
}

/**
 * Seeds the recipe database.
 */
async function seedRecipes(){
  await runStatements(recipeSeedingStatements);

  return Promise.all(
    recipes.map((recipe => {
      return addRecipe(recipe);
    }))
  )
}

/**
 * Deletes 
 */
async function clearDB() {
  return runStatements(resetStatements);
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      //clearDB(),
      seedUsers(),
      seedRecipes()
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}