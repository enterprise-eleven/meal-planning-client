import React from 'react'
import styled, { css } from 'styled-components'
import { RecipesListProps } from './recipesInterfaces'

const List = styled.ul`
  padding: 0;
`

interface SelectedProps {
  isSelected: boolean
}

const ListItem = styled.li<SelectedProps>`
  height: 32px;
  padding-left: 16px;
  display: flex;
  justify-content: left;
  align-items: center;
  border: 1px solid black;

  ${(props) =>
    props.isSelected &&
    css`
      background: red;
    `}
`

export const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  selectedRecipe,
  selectRecipe,
}) => {
  return (
    <List>
      {recipes.map((recipe, index) => {
        const isSelected =
          selectedRecipe !== null && selectedRecipe.id === recipe.id
        return (
          <ListItem
            key={recipe.id}
            onClick={() => {
              selectRecipe(recipe)
            }}
            isSelected={isSelected}
          >
            {recipe.name}
          </ListItem>
        )
      })}
    </List>
  )
}
