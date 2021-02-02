import { gql, useQuery } from '@apollo/client'

const GET_USER = gql`
  query GetUser {
    users {
      familyId
      isFamilyAdmin
    }
  }
`

export const useGetUser = () => {
  const { loading, error, data } = useQuery(GET_USER)

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

  return data.users[0]
}
