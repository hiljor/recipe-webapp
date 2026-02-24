import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Fetches all recipes from the server.
 * @returns List of recipes
 */
export async function fetchRecipes() {
  const result = sql`
  
  `
  return;
}

/**
 * Fetches a recipe from the server by its ID.
 * @returns The recipe, if it exists.
 */
export async function fetchRecipeById(){
  //TODO
  return;
}