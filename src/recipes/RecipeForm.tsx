import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
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

const emptyRecipe: RecipeProps = {
  name: '',
  ingredients: [emptyIngredient],
  prepTime: '',
  cookTime: '',
  preparation: '',
  directions: '',
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

  return (
    <Formik
      initialValues={emptyRecipe}
      onSubmit={async (values, { resetForm }) => {
        await submitRecipe(values)
        resetForm()
      }}
      render={({ values, setFieldValue, getFieldProps, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <RecipeFormPage>
              <LeftColumn>
                <StyledInput
                  label="Name"
                  name="name"
                  {...getFieldProps('name')}
                />
                {values.ingredients.map(
                  (ingredient: Ingredient, index: number) => (
                    <IngredientColumn key={index}>
                      <StyledInput
                        label="Number"
                        name={`ingredients[${index}].quantity`}
                        {...getFieldProps(`ingredients[${index}].quantity`)}
                      />
                      <StyledInput
                        label="Measurement"
                        name={`ingredients[${index}].measurement`}
                        {...getFieldProps(`ingredients[${index}].measurement`)}
                      />
                      <StyledInput
                        label="Ingredient"
                        name={`ingredients[${index}].item`}
                        {...getFieldProps(`ingredients[${index}].item`)}
                      />
                    </IngredientColumn>
                  ),
                )}
                <FormButton
                  onClick={() => {
                    setFieldValue('ingredients', [
                      ...values.ingredients,
                      emptyIngredient,
                    ])
                  }}
                >
                  Add another ingredient
                </FormButton>
              </LeftColumn>
              <RightColumn>
                <StyledInput
                  label="Prep Time"
                  name="prepTime"
                  {...getFieldProps('prepTime')}
                />
                <StyledInput
                  label="Cook Time"
                  name="cookTime"
                  {...getFieldProps('cookTime')}
                />
                <StyledTextarea
                  label="Preparation"
                  name="preparation"
                  rows={4}
                  {...getFieldProps('preparation')}
                />
                <StyledTextarea
                  label="Cooking Directions"
                  name="directions"
                  rows={4}
                  {...getFieldProps('directions')}
                />
                <FormButton type="submit">Submit!</FormButton>
              </RightColumn>
            </RecipeFormPage>
          </form>
        )
      }}
    />
  )
}
