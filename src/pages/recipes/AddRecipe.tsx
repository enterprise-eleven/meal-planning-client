import React from 'react'
import { Recipe } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'
import { useHistory, useRouteMatch } from 'react-router'
import { gql, useMutation } from '@apollo/client'
import { useGetOrg } from '../../common/hooks/useGetOrg'

const ADD_RECIPE = gql`
  mutation InsertRecipes($recipes: [recipes_insert_input!]!) {
    insert_recipes(objects: $recipes) {
      returning {
        id
      }
    }
  }
`

const ADD_INGREDIENTS = gql`
  mutation InsertIngredients($ingredients: [ingredients_insert_input!]!) {
    insert_ingredients(objects: $ingredients) {
      affected_rows
    }
  }
`

export const AddRecipe: React.FC = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const [addRecipe] = useMutation(ADD_RECIPE)
  const [addIngredients] = useMutation(ADD_INGREDIENTS)
  const org = useGetOrg()

  const submitRecipe = async (recipe: Recipe) => {
    const { ingredients = [], ...rest } = recipe

    const {
      data: {
        insert_recipes: {
          returning: [{ id: recipeId }],
        },
      },
    } = await addRecipe({ variables: { recipes: [{ ...rest, org }] } })
    await addIngredients({
      variables: {
        ingredients: ingredients.map((ingredient) => ({
          ...ingredient,
          recipeId,
        })),
      },
      refetchQueries: ['AllRecipes'],
    })

    history.push(`${url.substring(0, url.lastIndexOf('/add'))}/${recipeId}`)
  }

  return <RecipeForm submitRecipe={submitRecipe} />
}
