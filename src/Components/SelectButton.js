import React from 'react'
import './SelectButton.css'

function SelectButton({children, selected, onClick}) {
  return (
    <div>
<span 
onClick={onClick}
className='selectbutton'
style={{
    backgroundColor: selected? "gold": "",
    color: selected? "black" : "",

}}
>
    {children}
</span>   
    </div>
  )
}

export default SelectButton