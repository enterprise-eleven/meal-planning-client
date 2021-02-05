export type User = {
  id: string
  name: string
}

export type DefaultMeal = {
  id: number
  name: string
  usersToDefaultMeals: Array<{ user: User }>
}

export type GetUsers = {
  users: Array<User>
}

export type MealsWithUsers = GetUsers & {
  defaultMeals: Array<DefaultMeal>
}
