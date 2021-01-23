import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Authenticated } from './Authenticated'
import { NotAuthenticated } from './NotAuthenticated'

export const HomePage = () => {
  const { isAuthenticated } = useAuth0()

  return isAuthenticated ? <Authenticated /> : <NotAuthenticated />
}
