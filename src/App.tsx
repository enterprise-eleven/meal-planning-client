import * as React from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import { Box, Button, ChakraProvider, CSSReset, Stack } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import { Recipes } from './pages/recipes/Recipes'
import { Admin } from './pages/admin/Admin'
import { useAuth0 } from '@auth0/auth0-react'
import { LoginButton, LogoutButton } from './auth/AuthButtons'

export const App = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated ? (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Box bg="gray.500" w="100%" p={4} d="flex" justifyContent="flex-end">
          <Stack direction="row" spacing={4}>
            <Link to="/recipes">
              <Button>Recipes</Button>
            </Link>
            <Link to="/schedule">
              <Button>Schedule</Button>
            </Link>
            <Link to="/people">
              <Button>People</Button>
            </Link>
            <Link to="/admin">
              <Button>Admin</Button>
            </Link>
            <LogoutButton />
          </Stack>
        </Box>
        <Box w="100%" p={2}>
          <Switch>
            <Route path="/recipes" render={() => <Recipes />} />
            <Route
              path="/schedule"
              render={(props) => {
                return <div>Schedule</div>
              }}
            />
            <Route
              path="/people"
              render={(props) => {
                return <div>People</div>
              }}
            />
            <Route path="/admin" render={() => <Admin />} />
          </Switch>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  ) : (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box bg="gray.500" w="100%" p={4} d="flex" justifyContent="flex-end">
        <Stack direction="row" spacing={4}>
          <LoginButton />
        </Stack>
      </Box>
    </ChakraProvider>
  )
}
