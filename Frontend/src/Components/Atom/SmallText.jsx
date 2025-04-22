import React from 'react'

function SmallText({children,color='#A1A1AA',style,onclick}) {
  const defaultStyle = {
    fontSize:'1rem',color:color
  }
  return (
    <p style={{...defaultStyle,...style}} onClick={onclick}>{children}</p>
  )
}

export default SmallText
