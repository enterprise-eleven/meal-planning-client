import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { gql, useMutation } from '@apollo/client'
import { useGetFamily } from '../../common/hooks/useGetFamily'
import { Button } from '@chakra-ui/react'

const CREATE_SECRET_KEY = gql`
  mutation CreateSecretKey($secrets: [familySecretKeys_insert_input!]!) {
    insert_familySecretKeys(objects: $secrets) {
      returning {
        secretKey
      }
    }
  }
`

export const ManageSecretKeys: React.FC = () => {
  const family = useGetFamily()
  const [createSecretKey] = useMutation(CREATE_SECRET_KEY)

  const createSecretKeyInDatabase = async () => {
    const secretKey = uuidv4()
    const {
      data: {
        insert_familySecretKeys: {
          returning: [{ secretKey: createdSecretKey }],
        },
      },
    } = await createSecretKey({
      variables: { secrets: [{ secretKey, family }] },
    })
  }

  return <Button onClick={createSecretKeyInDatabase}>Create Secret Key</Button>
}
