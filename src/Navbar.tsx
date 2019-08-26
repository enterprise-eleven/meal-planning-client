import React from 'react'
import { Heading, Pane } from 'evergreen-ui'

export const Navbar: React.FC = ({ children }) => {
  return (
    <Pane display="flex" padding={16} background="#d2eef3">
      <Pane flex={1} alignItems="center" display="flex">
        <Heading size={600}>Navbar</Heading>
      </Pane>
      <Pane>{children}</Pane>
    </Pane>
  )
}
