import React from 'react'
import { Pane, Button } from 'evergreen-ui'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RecipesList } from './RecipesList'
import { RecipeInformation } from './RecipeInformation'
import { RecipeProps } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'

const RECIPES = gql`
  {
    recipes {
      cookTime
      directions
      id
      ingredients {
        item
        measurement
        quantity
        id
      }
      name
      prepTime
      preparation
    }
  }
`

export const RecipesPage = () => {
  const [
    selectedRecipe,
    setSelectedRecipe,
  ] = React.useState<RecipeProps | null>(null)
  const [addRecipe, setAddRecipe] = React.useState<Boolean>(false)
  const { loading, error, data } = useQuery(RECIPES)

  const selectRecipe = (recipe: RecipeProps) => {
    setSelectedRecipe(recipe)
    setAddRecipe(false)
  }

  if (loading || error) {
    // TODO Handle loading / error cases
    return <Pane />
  }
  return (
    <Pane clearfix padding={24} display="flex" flexDirection="row">
      <Pane flex={1} display="flex" flexDirection="column">
        <Button
          onClick={() => {
            setSelectedRecipe(null)
            setAddRecipe(true)
          }}
          marginBottom={16}
        >
          Add a Recipe!
        </Button>
        <RecipesList
          recipes={data.recipes}
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
