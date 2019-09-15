import React from 'react'
import { Pane, TextInputField, Button } from 'evergreen-ui'
import { RecipeProps } from './recipesInterfaces'
import { testRecipe } from './emptyRecipe'

import API, { graphqlOperation } from '@aws-amplify/api'
import { createRecipe, createIngredient } from '../graphql/mutations'

export const RecipeForm: React.FC = () => {
  const [recipe, setRecipe] = React.useState<RecipeProps>(testRecipe)
  const submitRecipe = async () => {
    const { ingredients = [], ...rest } = recipe
    const {
      data: { createRecipe: newRecipe },
    } = await API.graphql(graphqlOperation(createRecipe, { input: rest }))
    await Promise.all(
      ingredients.map(ingredient =>
        API.graphql(
          graphqlOperation(createIngredient, {
            input: { ...ingredient, ingredientRecipeId: newRecipe.id },
          }),
        ),
      ),
    )
  }

  return (
    <Pane>
      <TextInputField
        label="Name"
        required
        value={recipe.name}
        onChange={(e: any) => setRecipe({ ...recipe, name: e.target.value })}
      />
      <Button onClick={submitRecipe}>Submit!</Button>
    </Pane>
  )
}
