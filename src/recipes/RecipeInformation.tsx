import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useParams, useRouteMatch } from 'react-router'
import {
  ShowIfArrayHasData,
  ShowIfStringHasData,
  ParagraphTextOrDefault,
  LinkButton,
} from '../common/components'
import { Ingredient } from './recipesInterfaces'
import '@reach/accordion/styles.css'

const RECIPE = gql`
  query GetRecipe($id: Int!) {
    recipes_by_pk(id: $id) {
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

export const RecipeInformation: React.FC = () => {
  const { id } = useParams()
  const { url } = useRouteMatch()
  const { loading, error, data } = useQuery(RECIPE, {
    variables: { id },
  })

  if (loading || error) {
    // TODO Handle loading / error cases
    return <div>None</div>
  }

  const { recipes_by_pk: recipe } = data

  if (recipe === null) {
    return <h1>Please select a recipe.</h1>
  }

  return (
    <>
      <LinkButton to={`${url}/edit`}>Edit Recipe!</LinkButton>
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
                  {recipe.ingredients.map((ingredient: Ingredient) => (
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
