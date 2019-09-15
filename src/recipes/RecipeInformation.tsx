import React from 'react'
import {
  Heading,
  Pane,
  Text,
  UnorderedList,
  ListItem,
  Paragraph,
} from 'evergreen-ui'
import { RecipeProps } from './recipesInterfaces'
import { ShowIfArrayHasData, ShowIfStringHasData } from '../common/components'

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
  console.log(recipe)
  return (
    <Pane>
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
          {recipe.ingredients &&
            recipe.ingredients.map(ingredient => (
              <ListItem>{ingredient.item}</ListItem>
            ))}
        </UnorderedList>
      </ShowIfArrayHasData>
      <Heading size={600} paddingTop={16} paddingBottom={16}>
        Preparation
      </Heading>
      <ShowIfArrayHasData array={recipe.preparation}>
        {recipe.preparation &&
          recipe.preparation.map(prep => (
            <Paragraph paddingBottom={8}>{prep}</Paragraph>
          ))}
      </ShowIfArrayHasData>
      <Heading size={600} paddingTop={16} paddingBottom={16}>
        Cooking Directions
      </Heading>
      <ShowIfArrayHasData array={recipe.directions}>
        {recipe.directions &&
          recipe.directions.map(direction => (
            <Paragraph paddingBottom={8}>{direction}</Paragraph>
          ))}
      </ShowIfArrayHasData>
    </Pane>
  )
}
