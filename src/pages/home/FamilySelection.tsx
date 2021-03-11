import React, { FC } from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { LogoutButton } from '../../auth/AuthButtons'
import { JoinFamily } from '../family/JoinFamily'
import { CreateFamily } from '../family/CreateFamily'
import { Header } from '../../common/components/Header'

export const FamilySelection: FC = () => {
  return (
    <BrowserRouter>
      <Header>
        <Stack direction="row" spacing={4}>
          <Link to="/join-family">
            <Button>Join Family</Button>
          </Link>
          <Link to="/create-family">
            <Button>Create Family</Button>
          </Link>
          <LogoutButton />
        </Stack>
      </Header>
      <Box w="100%" p={2}>
        <Switch>
          <Route path="/join-family" render={() => <JoinFamily />} />
          <Route path="/create-family" render={() => <CreateFamily />} />
        </Switch>
      </Box>
    </BrowserRouter>
  )
}
