import React from 'react'

const Imagen = (props) => {

  return (
      <>
        <a href={props.href} target="_blank">
            <img src={props.url} width="100%" height="100%"/>
        </a>    
    </>
  )
}

export default Imagen