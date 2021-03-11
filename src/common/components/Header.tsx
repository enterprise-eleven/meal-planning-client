import * as React from 'react'
import { Box } from '@chakra-ui/react'

export const Header: React.FC = ({ children }) => {
  return (
    <Box
      backgroundColor="brand.pewterBlue"
      w="100%"
      p={4}
      d="flex"
      justifyContent="flex-end"
    >
      {children}
    </Box>
  )
}
