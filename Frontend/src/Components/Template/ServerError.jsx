import React from 'react'
import ScreenDiv from '../Atom/ScreenDiv'
import OutlineDiv from '../Atom/OutlineDiv'
function ServerError() {
  return (
    <ScreenDiv>
      <OutlineDiv>
        <h1 style={{ textAlign: 'center',color:'#FAFAFA' }}>500 Server Error</h1>
        <p style={{ textAlign: 'center',color:'#A1A1AA',marginBottom:'1rem'}}>Something went wrong.<br/> We're working on it!</p>
      </OutlineDiv>
    </ScreenDiv>
  )
}

export default ServerError
