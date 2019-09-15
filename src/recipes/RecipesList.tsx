import React from 'react'
import { Pane, Text } from 'evergreen-ui'
import { RecipesListProps } from './recipesInterfaces'

export const RecipesList: React.FC<RecipesListProps> = ({
  recipes,
  selectedRecipe,
  selectRecipe,
}) => {
  return (
    <>
      {recipes.map((recipe, index) => {
        const isSelected =
          selectedRecipe !== null && selectedRecipe.id === recipe.id
        return (
          <Pane
            key={recipe.id}
            width="100%"
            height={32}
            paddingLeft={16}
            borderLeft
            borderRight
            borderBottom
            borderTop={index === 0}
            background={`${isSelected ? 'red' : 'white'}`}
            display="flex"
            justifyContent="left"
            alignItems="center"
            onClick={() => {
              selectRecipe(recipe)
            }}
          >
            <Text>{recipe.name}</Text>
          </Pane>
        )
      })}
    </>
  )
}
