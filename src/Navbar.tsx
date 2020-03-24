import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  height: 72px;
  background-color: green;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleDiv = styled.div`
  padding-left: 16px;
  flex: 1;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  flex: 2;
`

export const Navbar: React.FC = ({ children }) => {
  return (
    <Nav>
      <TitleDiv>Meal Planner</TitleDiv>
      <ButtonDiv>{children}</ButtonDiv>
    </Nav>
  )
}
