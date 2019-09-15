import React from 'react'
import { Pane, Button } from 'evergreen-ui'
import API, { graphqlOperation } from '@aws-amplify/api'
import { RecipesList } from './RecipesList'
import { RecipeInformation } from './RecipeInformation'
import { RecipeProps } from './recipesInterfaces'
import { emptyRecipe } from './emptyRecipe'
import { RecipeForm } from './RecipeForm'
import { listRecipes } from '../graphql/queries'

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
  const [
    selectedRecipe,
    setSelectedRecipe,
  ] = React.useState<RecipeProps | null>(null)
  const [addRecipe, setAddRecipe] = React.useState<Boolean>(false)
  const recipeData = React.useRef<RecipeProps[]>()
  React.useEffect(() => {
    async function getData() {
      const {
        data: {
          listRecipes: { items },
        },
      } = await API.graphql(graphqlOperation(listRecipes))
      if (items !== undefined) {
        recipeData.current = items
      }
    }

    getData()
  }, [])

  const selectRecipe = (recipe: RecipeProps) => {
    setSelectedRecipe(recipe)
    setAddRecipe(false)
  }
  return (
    <Pane clearfix padding={24} display="flex" flexDirection="row">
      <Pane flex={1} display="flex" flexDirection="column">
        <Button
          onClick={() => {
            setSelectedRecipe(emptyRecipe)
            setAddRecipe(true)
          }}
        >
          Add a Recipe!
        </Button>
        <RecipesList
          recipes={recipeData.current || [emptyRecipe]}
          selectedRecipe={selectedRecipe}
          selectRecipe={selectRecipe}
        />
      </Pane>
      <Pane flex={4} paddingLeft={32}>
        {addRecipe ? (
          <RecipeForm />
        ) : (
          <RecipeInformation recipe={selectedRecipe} />
        )}
      </Pane>
    </Pane>
  )
}
