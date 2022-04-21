import React from 'react'

export const Form = (props) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.val }}>
    </div>
  )
}
