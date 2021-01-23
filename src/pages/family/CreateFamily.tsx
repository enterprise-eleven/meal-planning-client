import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Input, Text, VStack } from '@chakra-ui/react'

const ADD_FAMILY = gql`
  mutation InsertFamily($family: family_insert_input!) {
    insert_family_one(object: $family) {
      id
      name
    }
  }
`

const UPDATE_USER_SET_FAMILY = gql`
  mutation UpdateUser($user: users_set_input!) {
    update_users(where: {}, _set: $user) {
      returning {
        family
      }
    }
  }
`

export const CreateFamily: FC = () => {
  const [name, setName] = useState<string>('')
  const [insertFamily] = useMutation(ADD_FAMILY)
  const [updateUserSetFamily] = useMutation(UPDATE_USER_SET_FAMILY)
  const submit = async () => {
    const {
      data: {
        insert_family_one: { id: family },
      },
    } = await insertFamily({
      variables: { family: { name } },
      refetchQueries: ['GetUser'],
    })

    await updateUserSetFamily({
      variables: { user: { family, isFamilyAdmin: true } },
      refetchQueries: ['GetUser'],
    })
  }
  return (
    <VStack spacing={4} justify="flex-start" w="30%">
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <Text>Please enter a name for your family</Text>
      <Button disabled={name === ''} onClick={submit}>
        Create Family
      </Button>
    </VStack>
  )
}
