export interface Recipe {
  id?: string
  name: string
  source?: string
  prepTime?: string
  cookTime?: string
  ingredients: Ingredient[]
  preparation?: string
  directions?: string
}

export interface RecipeQuery {
  recipes_by_pk: Recipe
}

export interface AllRecipesQuery {
  recipes: Array<RecipeShort>
}

export interface RecipeShort {
  id?: string
  name: string
}

export interface RecipesListProps {
  recipes: RecipeShort[]
  path: string
}

export interface Ingredient {
  id?: number
  quantity?: number
  measurement?: string
  item?: string
}
