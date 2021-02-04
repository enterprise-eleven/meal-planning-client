import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { isNil } from 'ramda'
import { useGetUser } from '../../common/hooks/useGetUser'
import { Box, Button, Stack, Text, Heading, Input } from '@chakra-ui/react'
import { UsersAndMembers, Member, User } from './adminTypes'

const ADD_OTHER_FAMILY_MEMBER = gql`
  mutation CreateNonUserMember($member: members_insert_input!) {
    insert_members_one(object: $member) {
      name
    }
  }
`

const GET_CURRENT_MEMBERS = gql`
  query GetCurrentMembers($familyId: Int!) {
    users(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
    members(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
  }
`

export const ManageFamily: React.FC = () => {
  const [name, setName] = useState<string>('')
  const { familyId } = useGetUser()
  const [addOtherMember] = useMutation(ADD_OTHER_FAMILY_MEMBER)
  const { loading, error, data } = useQuery<UsersAndMembers>(
    GET_CURRENT_MEMBERS,
    {
      variables: { familyId },
    },
  )

  let currentUsers: Array<User> = []
  let currentMembers: Array<Member> = []
  if (!loading && !error && !isNil(data)) {
    currentUsers = data.users
    currentMembers = data.members
  }

  const addOtherMemberInDatabase = async () => {
    await addOtherMember({
      variables: { member: { familyId, name } },
      refetchQueries: ['GetCurrentMembers'],
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
