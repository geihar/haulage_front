/* eslint-disable  react/button-has-type */

import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const { onClick, className, disabled, children } = props
  // const buttonType = type || 'button'
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
Button.propTypes = {
  // type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,

}

Button.defaultProps = {
  disabled: false,
}

export default Button
