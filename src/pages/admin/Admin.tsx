import React from 'react'
import { Box, Button, Stack, VStack } from '@chakra-ui/react'
import { Link, Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { ManageSecretKeys } from './ManageSecretKeys'
import { FamilyShare } from './FamilyShare'
import { ManageFamily } from './ManageFamily'

const KEYS_PATH = 'manage-secret-keys'
const FAMILY_PATH = 'manage-family'
const SHARE_PATH = 'family-share'

export const Admin: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="15%" p={2}>
        <VStack spacing={3} align="stretch">
          <Link to={`${path}/${KEYS_PATH}`}>
            <Button style={{ width: '100%' }}>Manage Secret Keys</Button>
          </Link>
          <Link to={`${path}/${FAMILY_PATH}`}>
            <Button style={{ width: '100%' }}>Manage Family</Button>
          </Link>
          <Link to={`${path}/${SHARE_PATH}`}>
            <Button style={{ width: '100%' }}>Share with families</Button>
          </Link>
        </VStack>
      </Box>
      <Box w="100%" p={2}>
        <Switch>
          <Route path={`${path}/${KEYS_PATH}`}>
            <ManageSecretKeys />
          </Route>
          <Route path={`${path}/${FAMILY_PATH}`}>
            <ManageFamily />
          </Route>
          <Route path={`${path}/${SHARE_PATH}`}>
            <FamilyShare />
          </Route>
        </Switch>
      </Box>
    </Stack>
  )
}
