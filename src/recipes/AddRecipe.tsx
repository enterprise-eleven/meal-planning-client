import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RecipeProps } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'

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
  const [addRecipe] = useMutation(ADD_RECIPE)
  const [addIngredients] = useMutation(ADD_INGREDIENTS)

  const submitRecipe = async (recipe: RecipeProps) => {
    const { ingredients = [], ...rest } = recipe

    const {
      data: {
        insert_recipes: {
          returning: [{ id: recipeId }],
        },
      },
    } = await addRecipe({ variables: { recipes: [rest] } })
    await addIngredients({
      variables: {
        ingredients: ingredients.map((ingredient) => ({
          ...ingredient,
          recipeId,
        })),
      },
      refetchQueries: ['AllRecipes'],
    })
  }

  return <RecipeForm submitRecipe={submitRecipe} />
}
