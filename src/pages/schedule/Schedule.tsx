import React from 'react'
import { Box, Button, Stack, VStack } from '@chakra-ui/react'
import { Link, Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { TodayList } from './TodayList'

const TODAY_PATH = 'todays-meals'

export const Schedule: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Stack direction="row" spacing={4}>
      <Box minW="225px" w="15%" p={2}>
        <VStack spacing={3} align="stretch">
          <Link to={`${path}/${TODAY_PATH}`}>
            <Button style={{ width: '100%' }}>Today's Meals</Button>
          </Link>
          {/*<Link to={`${path}/${FAMILY_PATH}`}>*/}
          {/*  <Button style={{ width: '100%' }}>Manage Family</Button>*/}
          {/*</Link>*/}
          {/*<Link to={`${path}/${SHARE_PATH}`}>*/}
          {/*  <Button style={{ width: '100%' }}>Share with families</Button>*/}
          {/*</Link>*/}
          {/*<Link to={`${path}/${MEALS_PATH}`}>*/}
          {/*  <Button style={{ width: '100%' }}>Manage Default Meals</Button>*/}
          {/*</Link>*/}
        </VStack>
      </Box>
      <Box w="100%" p={2}>
        <Switch>
          <Route path={`${path}/${TODAY_PATH}`}>
            <TodayList />
          </Route>
          {/*<Route path={`${path}/${FAMILY_PATH}`}>*/}
          {/*  <ManageFamily />*/}
          {/*</Route>*/}
          {/*<Route path={`${path}/${SHARE_PATH}`}>*/}
          {/*  <FamilyShare />*/}
          {/*</Route>*/}
          {/*<Route path={`${path}/${MEALS_PATH}`}>*/}
          {/*  <ManageDefaultMeals />*/}
          {/*</Route>*/}
        </Switch>
      </Box>
    </Stack>
  )
}
