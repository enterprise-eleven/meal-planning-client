import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'

const Auth0ProviderWithHistory: FC = ({ children }) => {
  const history = useHistory()

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_PROVIDER_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH_PROVIDER_CLIENT_ID || ''}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={process.env.REACT_APP_AUTH_PROVIDER_AUDIENCE || ''}
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory
