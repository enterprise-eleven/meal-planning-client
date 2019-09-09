import React from 'react'
import { Pane } from 'evergreen-ui'
import { RecipesList } from './RecipesList'
import { RecipeInformation } from './RecipeInformation'
import { RecipeProps } from './recipesInterfaces'

const fakeData = [
  {
    id: '123',
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
  },
  {
    id: '456',
    name: 'Delicious Pork',
    prepTime: '45',
    cookTime: '300',
    ingredients: [
      { quantity: 1, measurement: 'lb', item: 'pork' },
      { quantity: 1, item: 'spices' },
    ],
    preparation: ['Rub pork with spices for way too long'],
    directions: [
      'Preheat grill to 225 degrees',
      'Cook pork for 5 hours',
      'This is really long text just to see how bad it might look on the screen. This is really long text just to see how bad it might look on the screen. This is really long text just to see how bad it might look on the screen. This is really long text just to see how bad it might look on the screen. This is really long text just to see how bad it might look on the screen.',
      'Eat',
    ],
  },
  {
    id: '789',
    name: 'Must Have Meatloaf',
    prepTime: '1 day',
    cookTime: '1 hour',
    ingredients: [{ quantity: 1, item: 'Meatloaf?' }],
    preparation: ['Do nothing'],
    directions: ["Don't eat it, meatloaf is gross"],
  },
]

export const RecipesPage = () => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<RecipeProps>({
    id: '',
    name: '',
    ingredients: [],
  })
  return (
    <Pane clearfix padding={24} display="flex" flexDirectiion="row">
      <Pane flex={1}>
        <RecipesList
          recipes={fakeData}
          selectedRecipe={selectedRecipe}
          setSelectedRecipe={setSelectedRecipe}
        />
      </Pane>
      <Pane flex={4} paddingLeft={32}>
        <RecipeInformation recipe={selectedRecipe} />
      </Pane>
    </Pane>
  )
}
