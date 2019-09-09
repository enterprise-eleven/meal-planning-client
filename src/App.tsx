import React from 'react'
import { Button, Pane } from 'evergreen-ui'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { Navbar } from './Navbar'
import { RecipesPage } from './recipes/RecipesPage'

const App: React.FC = () => {
  return (
    <Pane height="calc(100vh - 8px)" margin={-8} fontFamily="arial">
      <BrowserRouter>
        <Pane
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
        >
          <Navbar>
            <Button is={Link} to="/recipes" marginRight={16}>
              Recipes
            </Button>
            <Button is={Link} to="/schedule" marginRight={16}>
              Schedule
            </Button>
            <Button is={Link} to="/people" marginRight={16}>
              People
            </Button>
            <Button is={Link} to="/admin">
              Admin
            </Button>
          </Navbar>
          <Pane flex={1} padding={16} height="100%">
            <Switch>
              <Route path="/recipes" render={() => <RecipesPage />} />
              <Route
                path="/schedule"
                render={props => {
                  return <div>Schedule</div>
                }}
              />
              <Route
                path="/people"
                render={props => {
                  return <div>People</div>
                }}
              />
              <Route
                path="/admin"
                render={props => {
                  return <div>Admin</div>
                }}
              />
            </Switch>
          </Pane>
        </Pane>
      </BrowserRouter>
    </Pane>
  )
}

export default App
