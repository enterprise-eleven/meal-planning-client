import { gql, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

const GET_USER = gql`
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      familyId
      isFamilyAdmin
    }
  }
`

export const useGetUser = () => {
  const {
    user: { sub },
  } = useAuth0()
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: sub },
  })
  console.log(data)

  if (loading) {
    // TODO Handle loading / error cases
    console.log('loading family')
    return { familyId: -1, isFamilyAdmin: false }
  }
  if (error) {
    // TODO Handle loading / error cases
    console.log('error family')
    return { familyId: -2, isFamilyAdmin: false }
  }

  const { users_by_pk: user } = data!

  return user
}
