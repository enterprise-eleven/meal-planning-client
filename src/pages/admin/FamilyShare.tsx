import React, { useState } from 'react'
import { validate } from 'uuid'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useGetUser } from '../../common/hooks/useGetUser'
import { Button, Text, VStack, Input } from '@chakra-ui/react'

const GET_FAMILY_BY_SECRET = gql`
  query FamilyIdBySecret($secretKey: uuid!) {
    familySecretKeys(where: { secretKey: { _eq: $secretKey } }) {
      familyId
    }
  }
`

const INSERT_FAMILY_SHARE = gql`
  mutation InsertFamilyShare($familyShare: familyShares_insert_input!) {
    insert_familyShares_one(object: $familyShare) {
      hostId
      guestId
    }
  }
`

export const FamilyShare: React.FC = () => {
  const { familyId: hostId } = useGetUser()
  const [key, setKey] = useState<string>('')
  const [valid, setValid] = useState<boolean>(true)
  const { data } = useQuery(GET_FAMILY_BY_SECRET, {
    variables: { secretKey: key },
  })
  const [insertFamilyShare] = useMutation(INSERT_FAMILY_SHARE)
  const submit = async () => {
    if (!data || data.familySecretKeys.length === 0) {
      setValid(false)
    }
    if (data.familySecretKeys.length === 1) {
      const { familyId: guestId } = data.familySecretKeys[0]
      await insertFamilyShare({
        variables: { familyShare: { hostId, guestId } },
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
      <Text>
        Please enter a secret key from the family you want to share with
      </Text>
      <Text>
        This will NOT share recipes both ways, the other family will have to do
        this to share with you
      </Text>
      <Button disabled={!validate(key)} onClick={submit}>
        Share with Family
      </Button>
      {!valid && <Text>THIS IS NOT A VALID KEY</Text>}
    </VStack>
  )
}
