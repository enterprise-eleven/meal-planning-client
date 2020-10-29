import React from 'react'

export const ParagraphTextOrDefault: React.FC<{
  text: string | undefined
  defaultText: string
}> = ({ text, defaultText }) => {
  if (text === '' || text === null || text === undefined)
    return <p>{defaultText}</p>

  return <p>{text}</p>
}
