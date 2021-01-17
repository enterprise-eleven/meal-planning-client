import { gql, useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'

const GET_USER = gql`
  query GetUser($id: String!) {
    users_by_pk(id: $id) {
      org
    }
  }
`

export const useGetOrg = () => {
  const { user } = useAuth0()
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user.sub },
  })

  if (loading) {
    // TODO Handle loading / error cases
    console.log('loading')
    return 0
  }
  if (error) {
    // TODO Handle loading / error cases
    console.log('error')
    return 0
  }

  return data.users_by_pk.org
}
