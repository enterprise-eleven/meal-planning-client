import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { omit, partition } from 'lodash/fp'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { RecipeProps, RecipeQuery } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'

const RECIPE = gql`
  query GetRecipe($id: Int!) {
    recipes_by_pk(id: $id) {
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

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: Int!, $recipe: recipes_set_input!) {
    update_recipes(where: { id: { _eq: $id } }, _set: $recipe) {
      returning {
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
  }
`

const UPDATE_INGREDIENT = gql`
  mutation InsertIngredients($id: Int!, $ingredient: ingredients_set_input!) {
    update_ingredients(where: { id: { _eq: $id } }, _set: $ingredient) {
      returning {
        item
        measurement
        quantity
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

export const EditRecipe: React.FC = () => {
  const { id } = useParams()
  const history = useHistory()
  const { url } = useRouteMatch()
  const { loading, error, data } = useQuery<RecipeQuery>(RECIPE, {
    variables: { id },
  })
  const [updateRecipe] = useMutation(UPDATE_RECIPE)
  const [updateIngredients] = useMutation(UPDATE_INGREDIENT)
  const [addIngredients] = useMutation(ADD_INGREDIENTS)

  if (loading || error) {
    // TODO Handle loading / error cases
    return <div>None</div>
  }

  const { recipes_by_pk: recipe } = data!

  const submitRecipe = async (recipe: RecipeProps) => {
    const { ingredients = [], ...rest } = recipe
    const [ingredientsToUpdate, ingredientsToAdd] = partition(
      (ingredient) => ingredient.id !== undefined,
      ingredients,
    )

    await updateRecipe({
      variables: { id, recipe: omit(['__typename'], rest) },
    })

    await Promise.all(
      ingredientsToUpdate.map((ingredient) =>
        updateIngredients({
          variables: {
            id: ingredient.id,
            ingredient: omit(['__typename'], ingredient),
          },
        }),
      ),
    )

    await addIngredients({
      variables: {
        ingredients: ingredientsToAdd.map((ingredient) => ({
          ...ingredient,
          recipeId: id,
        })),
      },
      refetchQueries: [
        {
          query: RECIPE,
          variables: { id },
        },
      ],
    })
    history.push(url.substring(0, url.lastIndexOf('/edit')))
  }

  return <RecipeForm submitRecipe={submitRecipe} recipe={recipe} />
}
