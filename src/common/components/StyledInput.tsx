import React from 'react'
import styled from 'styled-components'

export type StyledInputProps = {
  label: string
  id: string
  [rest: string]: any
}

export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  id,
  ...rest
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
    </>
  )
}

export const StyledTextarea: React.FC<StyledInputProps> = ({
  label,
  id,
  ...rest
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} {...rest} />
    </>
  )
}
