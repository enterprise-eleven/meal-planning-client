import React from 'react'
import { Box, Button, Stack, VStack } from '@chakra-ui/react'
import { Link, Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { ManageSecretKeys } from './ManageSecretKeys'

export const Admin: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="15%" p={2}>
        <VStack spacing={3} align="stretch">
          <Link to={`${path}/manage-secret-keys`}>
            <Button style={{ width: '100%' }}>Manage Secret Keys</Button>
          </Link>
        </VStack>
      </Box>
      <Box w="100%" p={2}>
        <Switch>
          <Route path={`${path}/manage-secret-keys`}>
            <ManageSecretKeys />
          </Route>
        </Switch>
      </Box>
    </Stack>
  )
}
