import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { sortBy } from 'lodash/fp'
import { useRouteMatch } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { RecipesList } from './RecipesList'
import { RecipeInformation } from './RecipeInformation'
import { AddRecipe } from './AddRecipe'
import { LinkButton } from '../common/components'
import { EditRecipe } from './EditRecipe'

const RECIPES = gql`
  query AllRecipes {
    recipes {
      id
      name
    }
  }
`

const RecipesPageStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
  height: calc(100% - 48px);
`

const ListSectionStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const RecipeSection = styled.div`
  flex: 4;
  padding-left: 32px;
`

export const RecipesPage: React.FC = () => {
  const { loading, error, data } = useQuery(RECIPES)
  const { path } = useRouteMatch()

  if (loading || error) {
    // TODO Handle loading / error cases
    return <RecipesPageStyled />
  }
  return (
    <RecipesPageStyled>
      <ListSectionStyled>
        <LinkButton to={`${path}/add`}>Add a Recipe!</LinkButton>
        <RecipesList recipes={sortBy('name', data.recipes)} />
      </ListSectionStyled>
      <RecipeSection>
        <Switch>
          <Route path={`${path}/add`} render={() => <AddRecipe />} />
          <Route path={`${path}/:id/edit`} render={() => <EditRecipe />} />
          <Route path={`${path}/:id`} render={() => <RecipeInformation />} />
        </Switch>
      </RecipeSection>
    </RecipesPageStyled>
  )
}
