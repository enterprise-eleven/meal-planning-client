import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { map, omit } from 'ramda'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { Recipe, RecipeQuery } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'

const RECIPE = gql`
  query GetRecipe($id: Int!) {
    recipes_by_pk(id: $id) {
      cookTime
      directions
      id
      ingredients {
        order
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
  mutation UpdateRecipe(
    $id: Int!
    $recipe: recipes_set_input!
    $ingredients: [ingredients_insert_input!]!
  ) {
    delete_ingredients(where: { recipeId: { _eq: $id } }) {
      affected_rows
    }
    insert_ingredients(objects: $ingredients) {
      affected_rows
    }
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

export const EditRecipe: React.FC = () => {
  // @ts-ignore
  const { id } = useParams()
  const history = useHistory()
  const { url } = useRouteMatch()
  const { loading, error, data } = useQuery<RecipeQuery>(RECIPE, {
    variables: { id },
  })
  const [updateRecipe] = useMutation(UPDATE_RECIPE)

  if (loading || error) {
    // TODO Handle loading / error cases
    return <div>None</div>
  }

  const { recipes_by_pk: recipe } = data!

  const submitRecipe = async (recipe: Recipe) => {
    const { ingredients = [], id, ...rest } = omit(['__typename'], recipe)
    let index = 0

    await updateRecipe({
      variables: {
        id,
        recipe: rest,
        ingredients: map(
          (x) => ({
            ...x,
            recipeId: id,
            order: index++,
          }),
          ingredients,
        ),
      },
      refetchQueries: ['AllRecipes'],
    })
    history.push(url.substring(0, url.lastIndexOf('/edit')))
  }

  return <RecipeForm submitRecipe={submitRecipe} recipe={recipe} />
}
