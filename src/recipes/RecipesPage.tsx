import React from 'react'
import { Pane } from 'evergreen-ui'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RecipesList } from './RecipesList'
import { RecipeInformation } from './RecipeInformation'
import { RecipeProps } from './recipesInterfaces'

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
  const { loading, error, data } = useQuery(RECIPES)
  console.log(data)
  if (loading || error) {
    // TODO Handle loading / error cases
    return <Pane />
  }
  return (
    <Pane clearfix padding={24} display="flex" flexDirection="row">
      <Pane flex={1}>
        <RecipesList
          recipes={data.recipes}
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
