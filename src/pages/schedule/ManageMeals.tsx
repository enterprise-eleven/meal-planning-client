import React, { Fragment, useState } from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { gql, useMutation, useQuery } from '@apollo/client'
import { isNil, map } from 'ramda'
import { Error } from '../../common/components/Error'
import { Loading } from '../../common/components/Loading'
import { MealsByDate } from './TodayList'
import { MealsWithUsers } from '../admin/adminTypes'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useGetUser } from '../../common/hooks/useGetUser'

import 'react-datepicker/dist/react-datepicker.css'
import { MealModal } from './MealModal'

export type MealsByDatePlusDefaultAndUsers = MealsByDate & MealsWithUsers

export const MEALS_BY_DATE_PLUS_DEFAULT_AND_USERS = gql`
  query MealsByDatePlusDefaultAndUsers($date: date, $familyId: Int!) {
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
    users(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
    defaultMeals(where: { familyId: { _eq: $familyId } }) {
      id
      name
      usersToDefaultMeals {
        user {
          id
          name
        }
      }
    }
  }
`

const ADD_MEALS = gql`
  mutation CreateMeals($meals: [meals_insert_input!]!) {
    insert_meals(objects: $meals) {
      returning {
        id
        name
      }
    }
  }
`

type AddMealsInput = Array<{
  date: Date
  familyId: number
  name: string
  usersToMeals: { data: Array<{ userId: string }> }
}>

export const ManageMeals: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date())
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { familyId } = useGetUser()
  const [addMeals] = useMutation(ADD_MEALS)
  const { loading, error, data } = useQuery<MealsByDatePlusDefaultAndUsers>(
    MEALS_BY_DATE_PLUS_DEFAULT_AND_USERS,
    {
      variables: { date, familyId },
    },
  )

  if (loading) {
    return <Loading />
  }

  if (error || isNil(data)) {
    return <Error />
  }

  const populateDefaults = async () => {
    const meals: AddMealsInput = map(
      (defaultMeal) => ({
        date,
        familyId,
        name: defaultMeal.name,
        usersToMeals: {
          data: map(
            ({ user: { id } }) => ({ userId: id }),
            defaultMeal.usersToDefaultMeals,
          ),
        },
      }),
      data.defaultMeals,
    )
    await addMeals({
      variables: { meals },
      refetchQueries: ['MealsByDatePlusDefaultAndUsers'],
    })
  }

  return (
    <HStack spacing={4} alignItems="flex-start">
      <VStack
        spacing={3}
        width="15%"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Button style={{ width: '100%' }} onClick={onOpen}>
          Add Meal
        </Button>
        <Button style={{ width: '100%' }} onClick={populateDefaults}>
          Populate with Defaults
        </Button>
        <MealModal isOpen={isOpen} onClose={onClose} />
        <FormControl>
          <FormLabel>Date</FormLabel>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date as Date)}
          />
        </FormControl>
      </VStack>
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
                  <Link as={ReactRouterLink} to={`/recipes/${recipe.id}`}>
                    See Recipe
                  </Link>
                </Text>
              ))}
            </VStack>
          </Fragment>
        ))}
      </SimpleGrid>
    </HStack>
  )
}
