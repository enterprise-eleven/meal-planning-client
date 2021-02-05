import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { sortBy, prop, compose, toLower } from 'ramda'
import { Box, Stack, VStack, Text } from '@chakra-ui/react'
import { Loading } from '../../common/components/Loading'
import { Error } from '../../common/components/Error'

const RECIPES = gql`
  query AllRecipes {
    recipes {
      id
      name
    }
  }
`

export const TodayList: React.FC = () => {
  // const { loading, error, data } = useQuery<AllRecipesQuery>(RECIPES)
  // const { path } = useRouteMatch()
  //
  // if (loading) {
  //   return <Loading />
  // }
  //
  // if (error) {
  //   return <Error />
  // }
  //
  // const sortedRecipes = sortBy(compose(toLower, prop('name')))(data!.recipes)
  return (
    <VStack spacing={4} justify="flex-start" w="70%">
      <Text>Today's stuff</Text>
    </VStack>
  )
}
