import * as React from 'react'
import { LoginButton } from '../../auth/AuthButtons'
import { Header } from '../../common/components/Header'

export const NotAuthenticated = () => (
  <Header>
    <LoginButton />
  </Header>
)
