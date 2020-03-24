import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { RecipesList } from './RecipesList'
import { RecipeInformation } from './RecipeInformation'
import { RecipeProps } from './recipesInterfaces'
import { RecipeForm } from './RecipeForm'

const RECIPES = gql`
  {
    recipes {
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

const RecipesPageStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
`

const ListSectionStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const AddButton = styled.button`
  height: 32px;
`

const RecipeSection = styled.div`
  flex: 4;
  padding-left: 32px;
`

export const RecipesPage = () => {
  const [
    selectedRecipe,
    setSelectedRecipe,
  ] = React.useState<RecipeProps | null>(null)
  const [addRecipe, setAddRecipe] = React.useState<Boolean>(false)
  const { loading, error, data } = useQuery(RECIPES)

  const selectRecipe = (recipe: RecipeProps) => {
    setSelectedRecipe(recipe)
    setAddRecipe(false)
  }

  if (loading || error) {
    // TODO Handle loading / error cases
    return <RecipesPageStyled />
  }
  return (
    <RecipesPageStyled>
      <ListSectionStyled>
        <AddButton
          onClick={() => {
            setSelectedRecipe(null)
            setAddRecipe(true)
          }}
        >
          Add a Recipe!
        </AddButton>
        <RecipesList
          recipes={data.recipes}
          selectedRecipe={selectedRecipe}
          selectRecipe={selectRecipe}
        />
      </ListSectionStyled>
      <RecipeSection>
        {addRecipe ? (
          <RecipeForm />
        ) : (
          <RecipeInformation recipe={selectedRecipe} />
        )}
      </RecipeSection>
    </RecipesPageStyled>
  )
}
