import React from 'react'
import {
  Pane,
  TextInputField,
  Textarea,
  Button,
  FormField,
  Label,
} from 'evergreen-ui'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Ingredient, RecipeProps } from './recipesInterfaces'

const ADD_RECIPE = gql`
  mutation InsertRecipe($recipe: recipes_insert_input!) {
    insert_recipes(objects: $recipe) {
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

const emptyIngredient: Ingredient = {
  item: '',
  quantity: 0,
  measurement: '',
}

export const RecipeForm: React.FC = () => {
  const [recipe, setRecipe] = React.useState<RecipeProps>({
    name: '',
    ingredients: [emptyIngredient],
  })
  const [addRecipe] = useMutation(ADD_RECIPE)
  const [addIngredients] = useMutation(ADD_INGREDIENTS)

  const submitRecipe = async () => {
    const { ingredients = [], ...rest } = recipe

    const {
      data: {
        insert_recipes: {
          returning: [{ id: recipeId }],
        },
      },
    } = await addRecipe({ variables: { recipe: rest } })
    await addIngredients({
      variables: {
        ingredients: ingredients.map(ingredient => ({
          ...ingredient,
          recipeId,
        })),
      },
    })
  }

  const updateIngredientByIndex = (indexToUpdate: Number, update: any) => {
    const newIngredients = recipe.ingredients.map(
      (ingredient: Ingredient, index: Number) => {
        if (index === indexToUpdate) {
          return { ...ingredient, ...update }
        }

        return ingredient
      },
    )
    setRecipe({ ...recipe, ingredients: newIngredients })
  }

  const appendIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, emptyIngredient],
    })
  }

  return (
    <Pane display="flex" flexDirection="row" justifyContent="space-between">
      <Pane flex={1} margin={24} display="flex" flexDirection="column">
        <TextInputField
          label="Name"
          required
          value={recipe.name}
          onChange={(e: any) => setRecipe({ ...recipe, name: e.target.value })}
        />
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient: Ingredient, index: Number) => (
            <Pane
              flex={1}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <TextInputField
                label="Number"
                value={ingredient.quantity}
                onChange={(e: any) =>
                  updateIngredientByIndex(index, { quantity: e.target.value })
                }
              />
              <TextInputField
                label="Measurement"
                value={ingredient.measurement}
                onChange={(e: any) =>
                  updateIngredientByIndex(index, {
                    measurement: e.target.value,
                  })
                }
              />
              <TextInputField
                label="Ingredient"
                value={ingredient.item}
                onChange={(e: any) =>
                  updateIngredientByIndex(index, { item: e.target.value })
                }
              />
            </Pane>
          ))}
        <Button onClick={appendIngredient}>Add another ingredient</Button>
      </Pane>
      <Pane flex={1} margin={24}>
        <TextInputField
          label="Prep Time"
          value={recipe.prepTime}
          onChange={(e: any) =>
            setRecipe({ ...recipe, prepTime: e.target.value })
          }
        />
        <TextInputField
          label="Cook Time"
          value={recipe.cookTime}
          onChange={(e: any) =>
            setRecipe({ ...recipe, cookTime: e.target.value })
          }
        />
        <FormField>
          <Label htmlFor="preparation" marginBottom={4} display="block">
            Preparation
          </Label>
          <Textarea
            id="preparation"
            value={recipe.preparation}
            onChange={(e: any) =>
              setRecipe({ ...recipe, preparation: e.target.value })
            }
          />
        </FormField>
        <FormField>
          <Label htmlFor="directions" marginBottom={4} display="block">
            Cooking Directions
          </Label>
          <Textarea
            id="directions"
            value={recipe.directions}
            onChange={(e: any) =>
              setRecipe({ ...recipe, directions: e.target.value })
            }
          />
        </FormField>
        <Button onClick={submitRecipe}>Submit!</Button>
      </Pane>
    </Pane>
  )
}
