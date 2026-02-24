import { seedUsers, seedRecipes } from './seed'; // split as you like

export async function GET() {
  try {

    await seedUsers();
    await seedRecipes();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}