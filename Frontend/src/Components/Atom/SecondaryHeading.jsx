import React from 'react'

function SecondaryHeading({children,textAlign='left',margin='0rem'}) {
  return (
    <h2 style={{fontSize:'1.5rem',color:'#ffffff',fontWeight:'500',textAlign:textAlign,margin:margin}}>{children}</h2>
  )
}

export default SecondaryHeading
