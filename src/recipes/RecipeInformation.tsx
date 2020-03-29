import React from 'react'
import { ShowIfArrayHasData, ShowIfStringHasData } from '../common/components'
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
        <h2>Ingredients</h2>
        <ShowIfArrayHasData array={recipe.ingredients}>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.item}</li>
            ))}
          </ul>
        </ShowIfArrayHasData>
        <h2>Preparation</h2>
        <ShowIfStringHasData string={recipe.preparation}>
          <p>{recipe.preparation}</p>
        </ShowIfStringHasData>
        <h2>Cooking Directions</h2>
        <ShowIfStringHasData string={recipe.directions}>
          <p>{recipe.directions}</p>
        </ShowIfStringHasData>
      </ShowIfStringHasData>
    </>
  )
}
