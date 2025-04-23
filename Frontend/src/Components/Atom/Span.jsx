import React from 'react'

function Span({children,color="#ffffff",fontSize="1rem",onclick}) {
  return (
    <span style={{color:color,fontSize:fontSize}} onClick={onclick}>{children}</span>
  )
}

export default Span
