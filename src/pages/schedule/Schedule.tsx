import React from 'react'
import { Box, Button, Stack, VStack } from '@chakra-ui/react'
import { Link, Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { TodayList } from './TodayList'
import { ManageMeals } from './ManageMeals'

const TODAY_PATH = 'todays-meals'
const MANAGE_MEALS = 'manage-meals'

export const Schedule: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="15%" p={2}>
        <VStack spacing={3} align="stretch">
          <Link to={`${path}/${TODAY_PATH}`}>
            <Button style={{ width: '100%' }}>Today's Meals</Button>
          </Link>
          <Link to={`${path}/${MANAGE_MEALS}`}>
            <Button style={{ width: '100%' }}>Manage Meals</Button>
          </Link>
        </VStack>
      </Box>
      <Box w="100%" p={2}>
        <Switch>
          <Route path={`${path}/${TODAY_PATH}`}>
            <TodayList />
          </Route>
          <Route path={`${path}/${MANAGE_MEALS}`}>
            <ManageMeals />
          </Route>
        </Switch>
      </Box>
    </Stack>
  )
}
