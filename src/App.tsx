import * as React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import { HomePage } from './pages/home/HomePage'

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <HomePage />
  </ChakraProvider>
)
