import React from 'react'
import { RecipesListProps } from './recipesInterfaces'
import { Button, VStack } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

export const RecipesList: React.FC<RecipesListProps> = ({ recipes, path }) => {
  return (
    <VStack spacing={3} align="stretch">
      <Link to={`${path}/add`}>
        <Button colorScheme="teal" style={{ width: '100%' }}>
          Add Recipe
        </Button>
      </Link>
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`${path}/${recipe.id}`}>
          <Button style={{ width: '100%' }}>{recipe.name}</Button>
        </Link>
      ))}
    </VStack>
  )
}
