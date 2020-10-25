import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Toggable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const handleToggle = () => {
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
        <Button onClick={handleToggle}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={handleToggle}>cancel</Button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node
}

Toggable.displayName = 'Toggable'

export default Toggable
