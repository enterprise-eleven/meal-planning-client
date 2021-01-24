import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { omit, partition } from 'lodash/fp'
import { propOr, map, differenceWith, eqProps } from 'ramda'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { Ingredient, Recipe, RecipeQuery } from './recipesInterfaces'
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
      source
      prepTime
      preparation
    }
  }
`

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: Int!, $recipe: recipes_set_input!) {
    update_recipes_by_pk(pk_columns: { id: $id }, _set: $recipe) {
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
      source
      prepTime
      preparation
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

const DELETE_INGREDIENTS = gql`
  mutation DeleteIngredients($ids: [Int!]!) {
    delete_ingredients(where: { id: { _in: $ids } }) {
      affected_rows
    }
  }
`

export const EditRecipe: React.FC = () => {
  // @ts-ignore
  const { id } = useParams()
  const history = useHistory()
  const { url } = useRouteMatch()
  const { loading, error, data } = useQuery<RecipeQuery>(RECIPE, {
    variables: { id },
  })
  const [updateRecipe] = useMutation(UPDATE_RECIPE)
  const [updateIngredients] = useMutation(UPDATE_INGREDIENT)
  const [addIngredients] = useMutation(ADD_INGREDIENTS)
  const [deleteIngredients] = useMutation(DELETE_INGREDIENTS)

  if (loading || error) {
    // TODO Handle loading / error cases
    return <div>None</div>
  }

  const { recipes_by_pk: recipe } = data!
  const currentIngredients = recipe.ingredients

  const submitRecipe = async (recipe: Recipe) => {
    const { ingredients = [], ...rest } = recipe
    const ingredientsToDelete = differenceWith(
      (x, y) => eqProps('id', x, y),
      currentIngredients,
      ingredients,
    )
    const [ingredientsToUpdate, ingredientsToAdd] = partition(
      (ingredient) => ingredient.id !== undefined,
      ingredients,
    )

    await updateRecipe({
      variables: { id, recipe: omit(['__typename', 'id'], rest) },
    })

    const idsToDelete = map<Ingredient, Number>(
      propOr(0, 'id'),
      ingredientsToDelete,
    )
    await deleteIngredients({ variables: { ids: idsToDelete } })

    await Promise.all(
      ingredientsToUpdate.map((ingredient) =>
        updateIngredients({
          variables: {
            id: ingredient.id,
            ingredient: omit(['__typename', 'id'], ingredient),
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
