import React,{useState} from 'react'

function NavText({children,color='#A1A1AA',style,onclick}) {
  const [textcolor,setTextColor] = useState(color)
  const defaultStyle = {
    fontSize:'1rem',color:textcolor
  }
  return (
    <p style={{...defaultStyle,...style}} onClick={onclick} onMouseEnter={()=>setTextColor('#ffffff')} onMouseLeave={()=>setTextColor(color)}>{children}</p>
  )
}

export default NavText
