import { prisma } from '../lib/prisma';

const recipes = [
  {
    title: 'Boiled Egg',
    authorId: 1,
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
    authorId: 1,
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
    displayName: "yummyfood",
    email: "yummyfood@gmail.com",
    password: "1234nomnom"
  }
]

async function seedUsers() {
  return prisma.user.createMany({
  data: users,
  skipDuplicates: true,
});
}

async function seedRecipes() { 
  return prisma.recipe.createMany({
    data: recipes,
    skipDuplicates: true
  })
}


export {seedUsers, seedRecipes}