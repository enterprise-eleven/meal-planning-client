import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'https://personal-existence.herokuapp.com/v1/graphql',
})

const AppWithApollo: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(<AppWithApollo />, document.getElementById('root'))
