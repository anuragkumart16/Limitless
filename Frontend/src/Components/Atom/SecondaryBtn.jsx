import React from 'react'

function SecondaryBtn({children,style}) {
    const defaultStyle = {
        padding: '0.5rem 1rem',
        backgroundColor: '#09090B',
        border: 'none',
        boxShadow: '0px 0px 1px 1px #424242',
        borderRadius: '6px',
        color: '#A1A1AA',
        fontSize: '1rem',
        cursor: 'pointer',
        width:'100%'
    }
  return (
    <button style={{...defaultStyle,...style}}>{children}</button>
  )
}

export default SecondaryBtn
