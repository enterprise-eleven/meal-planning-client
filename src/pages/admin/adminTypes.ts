export type User = {
  id: string
  name: string
}

export type Member = {
  id: number
  name: string
}

export type DefaultMeal = {
  id: number
  name: string
  membersToDefaultMeals: Array<{ member: Member }>
  usersToDefaultMeals: Array<{ user: User }>
}

export type UsersAndMembers = {
  users: Array<User>
  members: Array<Member>
}

export type MealsWithUsers = UsersAndMembers & {
  defaultMeals: Array<DefaultMeal>
}
