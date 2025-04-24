import React from 'react'

function Footer({style}) {
    const defaultStyle = {
        backgroundColor: '#000000',
        width: '100%',
        padding:'3rem 0rem',
        borderTop:'1px solid #424242',
        marginTop:'3rem'
    }
  return (
    <footer style={{...defaultStyle,...style}}>
        <div>
            <img src='/Dark-Logo.svg' style={{width:'10%',height:'auto'}}/>
        </div>
        
    </footer>
  )
}

export default Footer
