export interface RecipeProps {
  id: string
  name: string
  prepTime?: string
  cookTime?: string
  ingredients: Ingredient[]
  preparation?: string[]
  directions?: string[]
}

export interface RecipesListProps {
  recipes: RecipeProps[]
  selectedRecipe: RecipeProps
  setSelectedRecipe(recipe: RecipeProps): void
}

export interface RecipeInformationProps {
  recipe: RecipeProps
}

export interface Ingredient {
  quantity?: number
  measurement?: string
  item?: string
}