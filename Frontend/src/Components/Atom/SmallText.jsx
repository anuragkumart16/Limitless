import React from 'react'

function SmallText({children,color='#A1A1AA',style}) {
  const defaultStyle = {
    fontSize:'1rem',color:color
  }
  return (
    <p style={{...defaultStyle,...style}}>{children}</p>
  )
}

export default SmallText
