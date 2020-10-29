export interface RecipeProps {
  id?: string
  name: string
  prepTime?: string
  cookTime?: string
  ingredients: Ingredient[]
  preparation?: string
  directions?: string
}

export interface RecipeQuery {
  recipes_by_pk: RecipeProps
}

export interface RecipeListProps {
  id?: string
  name: string
}

export interface RecipesListProps {
  recipes: RecipeListProps[]
  path: string
}

export interface Ingredient {
  id?: number
  quantity?: number
  measurement?: string
  item?: string
}
