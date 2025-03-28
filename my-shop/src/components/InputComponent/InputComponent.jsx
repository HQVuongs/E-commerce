import { Input } from 'antd'
import React from 'react'

// tạo ra cái này để tái xử dụng lại sau này

const InputComponent = ({size, placeholder, bordered, style, ...rests}) => {
  const variant = bordered ? 'outlined' : 'plain';
  return (
    <Input 
        size={size}  
        placeholder={placeholder} 
        variant ={variant}
        style={style}
        {...rests} 
    />
  )
}

export default InputComponent
