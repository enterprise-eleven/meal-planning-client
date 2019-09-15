export interface RecipeProps {
  id?: string
  name: string
  prepTime?: string
  cookTime?: string
  ingredients: Ingredient[]
  preparation?: string
  directions?: string
}

export interface RecipesListProps {
  recipes: RecipeProps[]
  selectedRecipe: RecipeProps | null
  selectRecipe(recipe: RecipeProps): void
}

export interface Ingredient {
  quantity?: number
  measurement?: string
  item?: string
}