import React, { useState, useImperativeHandle } from 'react'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const handleToggle = e => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      handleToggle
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleToggle}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleToggle}>cancel</button>
      </div>
    </div>
  )
})

export default Toggable
