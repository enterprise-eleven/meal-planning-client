import React from 'react'

export const ShowIfStringHasData: React.FC<{
  string: string | undefined
  children: any
}> = ({ string, children }) => {
  if (string === '' || string === null || string === undefined) return null

  return children
}
