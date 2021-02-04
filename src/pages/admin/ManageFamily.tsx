import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { isNil } from 'ramda'
import { useGetUser } from '../../common/hooks/useGetUser'
import { Box, Button, Stack, Text, Heading, Input } from '@chakra-ui/react'

const ADD_OTHER_FAMILY_MEMBER = gql`
  mutation CreateNonUserMember($member: otherFamilyMembers_insert_input!) {
    insert_otherFamilyMembers_one(object: $member) {
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
    otherFamilyMembers(where: { familyId: { _eq: $familyId } }) {
      id
      name
    }
  }
`

type User = {
  id: string
  name: string
}

type OtherMember = {
  id: number
  name: string
}

type CurrentMembers = {
  users: Array<User>
  otherFamilyMembers: Array<OtherMember>
}

export const ManageFamily: React.FC = () => {
  const [name, setName] = useState<string>('')
  const { familyId } = useGetUser()
  const [addOtherMember] = useMutation(ADD_OTHER_FAMILY_MEMBER)
  const { loading, error, data } = useQuery<CurrentMembers>(
    GET_CURRENT_MEMBERS,
    {
      variables: { familyId },
    },
  )

  let currentUsers: Array<User> = []
  let currentOtherMembers: Array<OtherMember> = []
  if (!loading && !error && !isNil(data)) {
    currentUsers = data.users
    currentOtherMembers = data.otherFamilyMembers
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
          {currentOtherMembers.map((member) => (
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
