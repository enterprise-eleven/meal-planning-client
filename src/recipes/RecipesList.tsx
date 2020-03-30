import React from 'react'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { RecipesListProps } from './recipesInterfaces'

const ScrollingListSection = styled.div`
  overflow-y: scroll;
`

const List = styled.ul`
  padding: 0;
  margin: 0;
`

interface SelectedProps {
  isSelected?: boolean
}

const ListItem = styled(Link)<SelectedProps>`
  height: 32px;
  padding-left: 16px;
  display: flex;
  justify-content: left;
  align-items: center;
  border: 1px solid black;

  ${(props) =>
    props.isSelected &&
    css`
      background: red;
    `}
`

export const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  let { path } = useRouteMatch()
  return (
    <ScrollingListSection>
      <List>
        {recipes.map((recipe) => {
          return (
            <ListItem key={recipe.id} to={`${path}/${recipe.id}`}>
              {recipe.name}
            </ListItem>
          )
        })}
      </List>
    </ScrollingListSection>
  )
}
