import * as React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { HomePage } from './pages/home/HomePage'
import theme from './theme'

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <HomePage />
  </ChakraProvider>
)
