import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { NavButton } from './common/components'
import { Navbar } from './Navbar'
import { RecipesPage } from './recipes/RecipesPage'

const Main = styled.main`
  height: calc(100vh - 8px);
  font-family: arial;
  margin: -8px;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`

const Section = styled.section`
  flex: 1;
  padding: 16px;
  height: 100%;
`

const App: React.FC = () => {
  return (
    <Main>
      <BrowserRouter>
        <Page>
          <Navbar>
            <NavButton to="/recipes">Recipes</NavButton>
            <NavButton to="/schedule">Schedule</NavButton>
            <NavButton to="/people">People</NavButton>
            <NavButton to="/admin">Admin</NavButton>
          </Navbar>
          <Section>
            <Switch>
              <Route path="/recipes" render={() => <RecipesPage />} />
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
          </Section>
        </Page>
      </BrowserRouter>
    </Main>
  )
}

export default App
