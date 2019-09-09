import React from 'react'

export const ShowIfArrayHasData: React.FC<{
  array: any[] | undefined
  children: any
}> = ({ array, children }) => {
  if (array === null || array === undefined || array.length === 0) return null

  return children
}
