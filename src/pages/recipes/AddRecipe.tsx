import React from 'react'
import { Recipe } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'
import { useHistory, useRouteMatch } from 'react-router'
import { gql, useMutation } from '@apollo/client'
import { useGetUser } from '../../common/hooks/useGetUser'
import { map } from 'ramda'

const ADD_RECIPE = gql`
  mutation InsertRecipe($recipe: recipes_insert_input!) {
    insert_recipes_one(object: $recipe) {
      id
    }
  }
`

export const AddRecipe: React.FC = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const [addRecipe] = useMutation(ADD_RECIPE)
  const { familyId } = useGetUser()

  const submitRecipe = async (recipe: Recipe) => {
    const { ingredients = [], ...rest } = recipe
    let index = 0
    const {
      data: {
        insert_recipes_one: { id: recipeId },
      },
    } = await addRecipe({
      variables: {
        recipe: {
          ...rest,
          familyId,
          ingredients: {
            data: map(
              (x) => ({
                ...x,
                order: index++,
              }),
              ingredients,
            ),
          },
        },
      },
      refetchQueries: ['AllRecipes'],
    })
    console.log(recipeId)

    history.push(`${url.substring(0, url.lastIndexOf('/add'))}/${recipeId}`)
  }

  return <RecipeForm submitRecipe={submitRecipe} />
}
