import React, { FC, useState } from 'react'
import { validate } from 'uuid'
import { VStack, Button, Input, Text } from '@chakra-ui/react'
import { gql, useMutation, useQuery } from '@apollo/client'

const GET_FAMILY_BY_SECRET = gql`
  query ActiveKeysForFamily($secretKey: String!) {
    familySecretKeys(where: { secretKey: { _eq: $secretKey } }) {
      family
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

export const JoinFamily: FC = () => {
  const [key, setKey] = useState<string>('')
  const [valid, setValid] = useState<boolean>(true)
  const { data } = useQuery(GET_FAMILY_BY_SECRET, {
    variables: { secretKey: key },
  })
  const [updateUserSetFamily] = useMutation(UPDATE_USER_SET_FAMILY)
  const submit = async () => {
    if (!data || data.familySecretKeys.length === 0) {
      setValid(false)
    }
    if (data.familySecretKeys.length === 1) {
      const { family } = data.familySecretKeys[0]
      await updateUserSetFamily({
        variables: { user: { family, isFamilyAdmin: false } },
        refetchQueries: ['GetUser'],
      })
    }
  }
  return (
    <VStack spacing={4} justify="flex-start" w="30%">
      <Input
        value={key}
        onChange={(e) => {
          setKey(e.target.value)
          setValid(true)
        }}
      />
      <Text>Please enter a secret key from the family you want to join</Text>
      <Button disabled={!validate(key)} onClick={submit}>
        Join Family
      </Button>
      {!valid && <Text>THIS IS NOT A VALID KEY</Text>}
    </VStack>
  )
}
