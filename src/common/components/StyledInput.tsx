import React from 'react'
import styled from 'styled-components'

export type StyledInputProps = {
  label: string
  name: string
  [rest: string]: any
}

const InputWithStyle = styled.input`
  height 24px;
  border-radius: 5px;
  border: 1px solid black;
  margin: 4px 0;
  font-family: arial;
  font-size: 14px;
  padding: 0 4px;
`

const TextAreaWithStyle = styled.textarea`
  border-radius: 5px;
  border: 1px solid black;
  margin: 4px 0;
  font-family: arial;
  font-size: 14px;
  padding: 4px;
`

const LabelWithStyle = styled.label`
  margin: 4px 0;
`

const FormElementDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <FormElementDiv>
      <LabelWithStyle htmlFor={name}>{label}</LabelWithStyle>
      <InputWithStyle id={name} {...rest} />
    </FormElementDiv>
  )
}

export const StyledTextarea: React.FC<StyledInputProps> = ({
  label,
  name,
  ...rest
}) => {
  return (
    <FormElementDiv>
      <LabelWithStyle htmlFor={name}>{label}</LabelWithStyle>
      <TextAreaWithStyle id={name} {...rest} />
    </FormElementDiv>
  )
}
