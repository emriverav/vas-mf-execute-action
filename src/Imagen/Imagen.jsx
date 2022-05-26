import React from 'react'

const Imagen = (props) => {

  // var a = document.createElement('a')
  // a.href = props.href
  // a.target = '_blank'
  // document.body.appendChild(a)
  // a.click()
  // document.body.removeChild(a)
  return (
      <>
        <a href={props.href} target="_blank">
            <img src={props.url} width="100%" height="100%"/>
        </a>   
        
    </>
  )
}

export default Imagen