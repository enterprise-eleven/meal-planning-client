import React, { useState, Fragment } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { append, reject, equals } from 'ramda'
import { useGetUser } from '../../common/hooks/useGetUser'
import { DefaultMeal, MealsWithUsers, Member, User } from './adminTypes'
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Checkbox,
} from '@chakra-ui/react'
import { isNil } from 'ramda'

const GET_CURRENT_DEFAULT_MEALS = gql`
  query GetDefaultMeals($familyId: Int!) {
    users(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
    members(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
    defaultMeals(where: { familyId: { _eq: $familyId } }) {
      id
      name
      membersToDefaultMeals {
        member {
          id
          name
        }
      }
      usersToDefaultMeals {
        user {
          id
          name
        }
      }
    }
  }
`

const ADD_DEFAULT_MEAL = gql`
  mutation CreateDefaultMeal($defaultMeal: defaultMeals_insert_input!) {
    insert_defaultMeals_one(object: $defaultMeal) {
      name
    }
  }
`

export const ManageDefaultMeals: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [users, setUsers] = useState<Array<string>>([])
  const [members, setMembers] = useState<Array<number>>([])
  const { familyId } = useGetUser()
  const [addDefaultMeal] = useMutation(ADD_DEFAULT_MEAL)
  const { loading, error, data } = useQuery<MealsWithUsers>(
    GET_CURRENT_DEFAULT_MEALS,
    {
      variables: { familyId },
    },
  )

  let currentUsers: Array<User> = []
  let currentMembers: Array<Member> = []
  let currentMeals: Array<DefaultMeal> = []
  if (!loading && !error && !isNil(data)) {
    currentUsers = data.users
    currentMembers = data.members
    currentMeals = data.defaultMeals
  }

  const addOtherMealInDatabase = async () => {
    await addDefaultMeal({
      variables: {
        defaultMeal: {
          familyId,
          name,
          membersToDefaultMeals: {
            data: members.map((memberId) => ({ memberId })),
          },
          usersToDefaultMeals: { data: users.map((userId) => ({ userId })) },
        },
      },
      refetchQueries: ['GetDefaultMeals'],
    })
    setName('')
  }

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="40%">
        <Stack direction="column" spacing={4}>
          <Heading>Current Default Meals per Day</Heading>
          {currentMeals.map((meal) => (
            <Fragment key={meal.id}>
              <Heading size="md">{meal.name}</Heading>
              {meal.usersToDefaultMeals.map(({ user }) => (
                <Text key={user.id}>{user.name}</Text>
              ))}
              {meal.membersToDefaultMeals.map(({ member }) => (
                <Text key={member.id}>{member.name}</Text>
              ))}
            </Fragment>
          ))}
        </Stack>
      </Box>
      <Box minW="225px" w="40%">
        <Stack direction="column" spacing={4}>
          <Heading>Add Default Meal</Heading>
          {currentUsers.map((user) => (
            <Fragment key={user.id}>
              <Checkbox
                onChange={(e) => {
                  const add = e.target.checked
                  if (add) {
                    setUsers(append(user.id, users))
                  } else {
                    setUsers(reject(equals(user.id), users))
                  }
                }}
              >
                {user.name}
              </Checkbox>
            </Fragment>
          ))}
          {currentMembers.map((member) => (
            <Fragment key={member.id}>
              <Checkbox
                onChange={(e) => {
                  const add = e.target.checked
                  if (add) {
                    setMembers(append(member.id, members))
                  } else {
                    setMembers(reject(equals(member.id), members))
                  }
                }}
              >
                {member.name}
              </Checkbox>
            </Fragment>
          ))}
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <Button onClick={addOtherMealInDatabase}>Add Default Meal</Button>
        </Stack>
      </Box>
    </Stack>
  )
}
