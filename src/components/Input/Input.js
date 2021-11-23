import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const { type } = props
  const inputType = type || 'text'
  const cls = [classes.input]
  const htmlFor = `${inputType} -${cls}`

  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }

  Input.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
  }
  Input.defaultProps = {
    name: '',
    label: '',
    value: '',
    errorMessage: '',
  }
  const { onChange } = props
  const { value } = props
  const { label } = props
  const { errorMessage } = props
  const { name } = props
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        className="form-control"
        name={name}
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      {isInvalid(props) ? <span>{errorMessage}</span> : null}

    </div>
  )
}

export default Input
