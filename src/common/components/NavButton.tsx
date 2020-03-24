import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled(Link)`
  border-radius: 5px;
  padding: 5px 5px;
  width: 80px;
  color: white;
  border: 2px solid white;
  font-size: 14px;
  font-weight: 500;
  text-decoration: inherit;
  background-color: blue;
  text-align: center;
`

export const NavButton: React.FC<{ to: string }> = ({ to, children }) => {
  return <Button to={to}>{children}</Button>
}
