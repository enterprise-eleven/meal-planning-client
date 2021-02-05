import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { isNil, partition, startsWith } from 'ramda'
import { v4 as uuidv4 } from 'uuid'
import { useGetUser } from '../../common/hooks/useGetUser'
import { Box, Button, Stack, Text, Heading, Input } from '@chakra-ui/react'
import { GetUsers, User } from './adminTypes'

const ADD_OTHER_FAMILY_MEMBER = gql`
  mutation CreateUser($user: users_insert_input!) {
    insert_users_one(object: $user) {
      name
    }
  }
`

const GET_CURRENT_MEMBERS = gql`
  query GetCurrentUsers($familyId: Int!) {
    users(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
  }
`

export const ManageFamily: React.FC = () => {
  const [name, setName] = useState<string>('')
  const { familyId } = useGetUser()
  const [addOtherMember] = useMutation(ADD_OTHER_FAMILY_MEMBER)
  const { loading, error, data } = useQuery<GetUsers>(GET_CURRENT_MEMBERS, {
    variables: { familyId },
  })

  let currentUsers: Array<User> = []
  let currentMembers: Array<User> = []
  if (!loading && !error && !isNil(data)) {
    const [members, users] = partition(
      (user) => startsWith('member', user.id),
      data.users,
    )
    currentUsers = users
    currentMembers = members
  }

  const addOtherMemberInDatabase = async () => {
    await addOtherMember({
      variables: {
        user: {
          familyId,
          name,
          isFamilyAdmin: false,
          id: `member|${uuidv4()}`,
        },
      },
      refetchQueries: ['GetCurrentUsers'],
    })
    setName('')
  }

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="25%">
        <Stack direction="column" spacing={4}>
          <Heading>Users</Heading>
          {currentUsers.map((user) => (
            <Text key={user.id}>{user.name}</Text>
          ))}
        </Stack>
      </Box>
      <Box minW="225px" w="25%">
        <Stack direction="column" spacing={4}>
          <Heading>Non-User Members</Heading>
          {currentMembers.map((member) => (
            <Text key={member.id}>{member.name}</Text>
          ))}
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <Button onClick={addOtherMemberInDatabase}>Add Other Member</Button>
        </Stack>
      </Box>
    </Stack>
  )
}
