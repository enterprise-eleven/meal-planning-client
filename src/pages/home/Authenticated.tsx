import * as React from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import { Box, Button, Stack } from '@chakra-ui/react'
import { Recipes } from '../recipes/Recipes'
import { Admin } from '../admin/Admin'
import { LogoutButton } from '../../auth/AuthButtons'
import { useGetUser } from '../../common/hooks/useGetUser'
import { Loading } from '../../common/components/Loading'
import { Error } from '../../common/components/Error'
import { FamilySelection } from './FamilySelection'
import { Schedule } from '../schedule/Schedule'

export const Authenticated = () => {
  const { familyId, isFamilyAdmin } = useGetUser()

  if (familyId === -1) {
    return <Loading />
  }

  if (familyId === -2) {
    return <Error />
  }

  if (familyId === 0) {
    return <FamilySelection />
  }

  return (
    <BrowserRouter>
      <Box bg="gray.500" w="100%" p={4} d="flex" justifyContent="flex-end">
        <Stack direction="row" spacing={4}>
          <Link to="/recipes">
            <Button>Recipes</Button>
          </Link>
          <Link to="/schedule">
            <Button>Schedule</Button>
          </Link>
          {isFamilyAdmin && (
            <Link to="/admin">
              <Button>Admin</Button>
            </Link>
          )}
          <LogoutButton />
        </Stack>
      </Box>
      <Box w="100%" p={2}>
        <Switch>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          {isFamilyAdmin && (
            <Route path="/admin">
              <Admin />
            </Route>
          )}
        </Switch>
      </Box>
    </BrowserRouter>
  )
}
