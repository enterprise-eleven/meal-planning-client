import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { sortBy, prop, compose, toLower } from 'ramda'
import { Box, Stack } from '@chakra-ui/core'
import { AllRecipesQuery } from './recipesInterfaces'
import { RecipesList } from './RecipesList'
import { RecipeView } from './RecipeView'
import { AddRecipe } from './AddRecipe'
import { EditRecipe } from './EditRecipe'

const RECIPES = gql`
  query AllRecipes {
    recipes {
      id
      name
    }
  }
`

export const Recipes: React.FC = () => {
  const { loading, error, data } = useQuery<AllRecipesQuery>(RECIPES)
  const { path } = useRouteMatch()

  if (loading) {
    // TODO Handle loading / error cases
    return <div>LOADING!</div>
  }
  if (error) {
    // TODO Handle loading / error cases
    return <div>ERROR!</div>
  }

  const sortedRecipes = sortBy(compose(toLower, prop('name')))(data!.recipes)
  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="15%" p={2}>
        <RecipesList path={path} recipes={sortedRecipes} />
      </Box>
      <Box w="100%" p={2}>
        <Switch>
          <Route path={`${path}/add`}>
            <AddRecipe />
          </Route>
          <Route path={`${path}/:id/edit`}>
            <EditRecipe />
          </Route>
          <Route path={`${path}/:id`}>
            <RecipeView />
          </Route>
        </Switch>
      </Box>
    </Stack>
  )
}
