import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { gql, useQuery } from '@apollo/client'
import { isNil } from 'ramda'
import { SimpleGrid, Heading, VStack, Text, Button } from '@chakra-ui/react'
import { Loading } from '../../common/components/Loading'
import { Error } from '../../common/components/Error'

type TodaysMeals = {
  meals: Array<{
    id: number
    name: string
    recipesToMeals: Array<{
      recipe: {
        id: number
        name: string
      }
    }>
    usersToMeals: Array<{
      user: {
        id: string
        name: string
      }
    }>
  }>
}

const TODAYS_MEALS = gql`
  query TodaysMeals($date: date) {
    meals(where: { date: { _eq: $date } }) {
      id
      name
      recipesToMeals {
        recipe {
          id
          name
        }
      }
      usersToMeals {
        user {
          id
          name
        }
      }
    }
  }
`

export const TodayList: React.FC = () => {
  const { loading, error, data } = useQuery<TodaysMeals>(TODAYS_MEALS, {
    variables: { date: format(new Date(), 'yyyy-MM-dd') },
  })

  if (loading) {
    return <Loading />
  }

  if (error || isNil(data)) {
    return <Error />
  }

  console.log(data)
  return (
    <VStack spacing={4} justify="flex-start" w="70%" alignItems="flex-start">
      <Heading>Today's Meals</Heading>
      <SimpleGrid columns={3} spacing={8}>
        <Heading size="md">Meal</Heading>
        <Heading size="md">People</Heading>
        <Heading size="md">Recipes</Heading>
        {data.meals.map((meal) => (
          <Fragment key={meal.id}>
            <Text size="md">{meal.name}</Text>
            <VStack spacing={4} justify="flex-start" alignItems="flex-start">
              {meal.usersToMeals.map(({ user }) => (
                <Text key={user.id}>{user.name}</Text>
              ))}
            </VStack>
            <VStack spacing={4} justify="flex-start" alignItems="flex-start">
              {meal.recipesToMeals.map(({ recipe }) => (
                <Text key={recipe.id}>
                  {recipe.name}{' '}
                  <Link to={`/recipes/${recipe.id}`}>See Recipe</Link>
                </Text>
              ))}
            </VStack>
          </Fragment>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
