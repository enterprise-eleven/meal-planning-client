export const emptyRecipe = {
  id: '',
  name: '',
  prepTime: '',
  cookTime: '',
  ingredients: [],
  preparation: [],
  directions: [],
}

export const testRecipe = {
  // id: '123',
  name: 'Yummy Chicken',
  prepTime: '15',
  cookTime: '30',
  ingredients: [
    { quantity: 1, measurement: 'lb', item: 'chicken breasts' },
    { quantity: 1, item: 'Other yummy stuff' },
    { quantity: 1, item: 'More yummy stuff?' },
  ],
  preparation: [
    'Put the yummy stuff together in a bowl',
    'Put the chicken in the bowl',
    'Put in fridge for 15 minutes for some reason',
  ],
  directions: [
    'Preheat over to 375 degrees',
    'Cook the chicken and stuff for 30 minutes',
    'Eat it',
  ],
}