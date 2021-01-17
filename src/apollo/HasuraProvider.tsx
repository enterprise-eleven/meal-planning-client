import React, { FC } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export const HasuraProvider: FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0()

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
  })

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently()

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
