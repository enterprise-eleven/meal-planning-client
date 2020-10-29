import * as React from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import { Box, Button, ChakraProvider, CSSReset, Stack } from '@chakra-ui/core'
import theme from '@chakra-ui/theme'
import { Recipes } from './pages/recipes/Recipes'

export const App = () => (
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
          <Route
            path="/admin"
            render={(props) => {
              return <div>Admin</div>
            }}
          />
        </Switch>
      </Box>
    </BrowserRouter>
  </ChakraProvider>
)
