import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default Toggable
