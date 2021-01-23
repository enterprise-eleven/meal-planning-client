import * as React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { LoginButton } from '../../auth/AuthButtons'

export const NotAuthenticated = () => (
  <Box bg="gray.500" w="100%" p={4} d="flex" justifyContent="flex-end">
    <Stack direction="row" spacing={4}>
      <LoginButton />
    </Stack>
  </Box>
)
