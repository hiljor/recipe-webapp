import { text } from "stream/consumers";

const recipes = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    title: 'Boiled Egg',
    author_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    creation_date: '1960-06-15',
    add_date: '2025-11-14',
    servings: '1',
    ingredients: [
      {
        name: 'egg', quantity: '1', unit: '',
      }
    ],
    steps: [
      { type: 'instruction',
        text: 'Put egg(s) in a pot of cold water.',
      },
      { type: 'instruction',
        text: 'Place the pot on high heat on the stove.',
      },
      {
        type: 'instruction',
        text: 'Once water is boiling, put heat on medium and set a timer for 6 minutes. This makes for a perfectly cooked hard-boiled egg.'
      },
      { type: 'tip',
        text: 'If you would rather have a soft boiled egg, cook for 4 minutes.'
      },
      {
        type: 'instruction',
        text: 'Pour the hot water out and add cold water to the pan. Wait 1 minute.'
      },
      {
        type: 'instruction',
        text: 'Lightly tap the egg on a hard surface to crack the shell. Peel it off and enjoy your egg.'
      }
    ]
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Simple Pasta',
    author_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    creation_date: '1995-03-20',
    add_date: '2025-11-14',
    servings: '2',
    ingredients: [
      {
        name: 'pasta', quantity: '200', unit: 'g',
      },
      {
        name: 'salt', quantity: '1', unit: 'tsp',
      },
      {
        name: 'olive oil', quantity: '2', unit: 'tbsp',
      },
      {
        name: 'garlic', quantity: '2', unit: 'cloves',
      }
    ],
    steps: [
      { type: 'instruction',
        text: 'Fill a large pot with water and bring to a boil.',
      },
      { type: 'instruction',
        text: 'Add salt to the boiling water.',
      },
      { type: 'instruction',
        text: 'Add pasta and cook for 8-10 minutes until al dente.',
      },
      { type: 'instruction',
        text: 'Drain pasta and set aside.',
      },
      { type: 'instruction',
        text: 'Heat olive oil in a pan and cook minced garlic until fragrant.',
      },
      { type: 'instruction',
        text: 'Toss pasta with garlic oil and serve.'
      },
      { type: 'tip',
        text: 'Reserve some pasta water to add creaminess if needed.'
      }
    ]
  }
]
