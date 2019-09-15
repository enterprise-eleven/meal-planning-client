import React from 'react'
import {
  Heading,
  Pane,
  Text,
  UnorderedList,
  ListItem,
  Paragraph,
} from 'evergreen-ui'
import { ShowIfArrayHasData, ShowIfStringHasData } from '../common/components'
import { RecipeProps } from './recipesInterfaces'

export const RecipeInformation: React.FC<{ recipe: RecipeProps | null }> = ({
  recipe,
}) => {
  if (recipe === null) {
    return (
      <Pane>
        <Heading size={700} paddingBottom={16}>
          Please select a recipe.
        </Heading>
      </Pane>
    )
  }

  return (
    <Pane>
      <ShowIfStringHasData string={recipe.id}>
        <Heading size={700} paddingBottom={16}>
          {recipe.name}
        </Heading>
        <ShowIfStringHasData string={recipe.prepTime}>
          <div>
            <Text>{`Prep Time - ${recipe.prepTime}`}</Text>
          </div>
        </ShowIfStringHasData>
        <ShowIfStringHasData string={recipe.cookTime}>
          <div>
            <Text>{`Cook Time - ${recipe.cookTime}`}</Text>
          </div>
        </ShowIfStringHasData>
        <Heading size={600} paddingTop={16} paddingBottom={16}>
          Ingredients
        </Heading>
        <ShowIfArrayHasData array={recipe.ingredients}>
          <UnorderedList>
            {recipe.ingredients.map(ingredient => (
              <ListItem>{ingredient.item}</ListItem>
            ))}
          </UnorderedList>
        </ShowIfArrayHasData>
        <Heading size={600} paddingTop={16} paddingBottom={16}>
          Preparation
        </Heading>
        <ShowIfStringHasData string={recipe.preparation}>
          <Paragraph paddingBottom={8}>{recipe.preparation}</Paragraph>
        </ShowIfStringHasData>
        <Heading size={600} paddingTop={16} paddingBottom={16}>
          Cooking Directions
        </Heading>
        <ShowIfStringHasData string={recipe.directions}>
          <Paragraph paddingBottom={8}>{recipe.directions}</Paragraph>
        </ShowIfStringHasData>
      </ShowIfStringHasData>
    </Pane>
  )
}
