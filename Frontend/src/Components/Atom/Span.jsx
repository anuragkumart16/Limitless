import React from 'react'

function Span({children,color="#ffffff",fontSize="1rem"}) {
  return (
    <span style={{color:color,fontSize:fontSize}}>{children}</span>
  )
}

export default Span
