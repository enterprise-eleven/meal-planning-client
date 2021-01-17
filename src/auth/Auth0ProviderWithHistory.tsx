import React, { FC } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory: FC = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_PROVIDER_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH_PROVIDER_CLIENT_ID || ''}
      redirectUri={process.env.REACT_APP_REDIRECT_URI || ''}
      audience={process.env.REACT_APP_AUTH_PROVIDER_AUDIENCE || ''}
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
