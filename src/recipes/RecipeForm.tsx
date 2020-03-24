import React from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { StyledInput, StyledTextarea } from '../common/components'
import { Ingredient, RecipeProps } from './recipesInterfaces'

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

const emptyIngredient: Ingredient = {
  item: '',
  quantity: 0,
  measurement: '',
}

const RecipeFormPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 8px;
`

const RightColumn = styled.div`
  flex: 1;
  margin-left: 8px;
`

const IngredientColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const FormButton = styled.button`
  margin: 8px 0;
  width: 100%;
  height: 28px;
  border-radius: 5px;
  font-size: 16px;
  font-family: arial;
  border: 1px solid black;
`

export const RecipeForm: React.FC = () => {
  const [recipe, setRecipe] = React.useState<RecipeProps>({
    name: '',
    ingredients: [emptyIngredient],
  })
  const [addRecipe] = useMutation(ADD_RECIPE)
  const [addIngredients] = useMutation(ADD_INGREDIENTS)
  console.log(recipe)
  const submitRecipe = async () => {
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
    <RecipeFormPage>
      <LeftColumn>
        <StyledInput
          label="Name"
          id="name"
          required
          value={recipe.name}
          onChange={(e: any) => setRecipe({ ...recipe, name: e.target.value })}
        />
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient: Ingredient, index: number) => (
            <IngredientColumn key={index}>
              <StyledInput
                label="Number"
                id={`number-${index}`}
                value={ingredient.quantity}
                onChange={(e: any) =>
                  updateIngredientByIndex(index, { quantity: e.target.value })
                }
              />
              <StyledInput
                label="Measurement"
                id={`measurement-${index}`}
                value={ingredient.measurement}
                onChange={(e: any) =>
                  updateIngredientByIndex(index, {
                    measurement: e.target.value,
                  })
                }
              />
              <StyledInput
                label="Ingredient"
                id={`ingredient-${index}`}
                value={ingredient.item}
                onChange={(e: any) =>
                  updateIngredientByIndex(index, { item: e.target.value })
                }
              />
            </IngredientColumn>
          ))}
        <FormButton onClick={appendIngredient}>
          Add another ingredient
        </FormButton>
      </LeftColumn>
      <RightColumn>
        <StyledInput
          label="Prep Time"
          id="prep-time"
          value={recipe.prepTime}
          onChange={(e: any) =>
            setRecipe({ ...recipe, prepTime: e.target.value })
          }
        />
        <StyledInput
          label="Cook Time"
          id="cook-time"
          value={recipe.cookTime}
          onChange={(e: any) =>
            setRecipe({ ...recipe, cookTime: e.target.value })
          }
        />
        <StyledTextarea
          label="Preparation"
          id="preparation"
          value={recipe.preparation}
          rows={4}
          onChange={(e: any) =>
            setRecipe({ ...recipe, preparation: e.target.value })
          }
        />
        <StyledTextarea
          label="Cooking Directions"
          id="directions"
          value={recipe.directions}
          rows={4}
          onChange={(e: any) =>
            setRecipe({ ...recipe, directions: e.target.value })
          }
        />
        <FormButton onClick={submitRecipe}>Submit!</FormButton>
      </RightColumn>
    </RecipeFormPage>
  )
}
