import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useGetUser } from '../../common/hooks/useGetUser'
import { Box, Button, Stack, Text, Heading } from '@chakra-ui/react'

const CREATE_SECRET_KEY = gql`
  mutation CreateSecretKey($secret: familySecretKeys_insert_input!) {
    insert_familySecretKeys_one(object: $secret) {
      secretKey
    }
  }
`

const GET_ACTIVE_SECRET_KEYS = gql`
  query ActiveKeysForFamily($familyId: Int!) {
    familySecretKeys(where: { familyId: { _eq: $familyId } }) {
      secretKey
    }
  }
`

export const ManageSecretKeys: React.FC = () => {
  const { familyId } = useGetUser()
  const [createSecretKey] = useMutation(CREATE_SECRET_KEY)
  const { loading, error, data } = useQuery(GET_ACTIVE_SECRET_KEYS, {
    variables: { familyId },
  })

  const createSecretKeyInDatabase = async () => {
    await createSecretKey({
      variables: { secret: { familyId } },
      refetchQueries: ['ActiveKeysForFamily'],
    })
  }

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="25%">
        <Stack direction="column" spacing={4}>
          <Button onClick={createSecretKeyInDatabase}>Create Secret Key</Button>
          {!error &&
            !loading &&
            data.familySecretKeys.map(
              (familySecretKey: { secretKey: string }) => (
                <Text key={familySecretKey.secretKey}>
                  {familySecretKey.secretKey}
                </Text>
              ),
            )}
        </Stack>
      </Box>
      <Heading as="h2" size="lg">
        Give one of these active keys to someone when you want to let them join
        your family.
      </Heading>
    </Stack>
  )
}
