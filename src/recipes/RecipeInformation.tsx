import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion'
import '@reach/accordion/styles.css'
import {
  ShowIfArrayHasData,
  ShowIfStringHasData,
  ParagraphTextOrDefault,
} from '../common/components'
import { RecipeProps } from './recipesInterfaces'

export const RecipeInformation: React.FC<{ recipe: RecipeProps | null }> = ({
  recipe,
}) => {
  if (recipe === null) {
    return <h1>Please select a recipe.</h1>
  }

  return (
    <>
      <ShowIfStringHasData string={recipe.id}>
        <h1>{recipe.name}</h1>
        <ShowIfStringHasData string={recipe.prepTime}>
          <div>{`Prep Time - ${recipe.prepTime}`}</div>
        </ShowIfStringHasData>
        <ShowIfStringHasData string={recipe.cookTime}>
          <div>{`Cook Time - ${recipe.cookTime}`}</div>
        </ShowIfStringHasData>
        <Accordion multiple defaultIndex={[0, 1, 2]} translate="no">
          <AccordionItem>
            <AccordionButton as="h3">Ingredients</AccordionButton>
            <AccordionPanel>
              <ShowIfArrayHasData array={recipe.ingredients}>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                    >{`${ingredient.quantity} ${ingredient.measurement} ${ingredient.item}`}</li>
                  ))}
                </ul>
              </ShowIfArrayHasData>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton as="h3">Preparation</AccordionButton>
            <AccordionPanel>
              <ParagraphTextOrDefault
                text={recipe.preparation}
                defaultText="There are no preparation details."
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton as="h3">Cooking Directions</AccordionButton>
            <AccordionPanel>
              <ParagraphTextOrDefault
                text={recipe.directions}
                defaultText="There are no cooking direction details."
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ShowIfStringHasData>
    </>
  )
}
