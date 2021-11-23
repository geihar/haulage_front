import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classes from './Modals.css'

const modal = document.getElementById('modal')

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.element = document.createElement('div')
    this.element.className = classes.modal
  }

  componentDidMount() {
    modal.appendChild(this.element)
  }

  componentWillUnmount() {
    modal.removeChild(this.element)
  }

  render() {
    const { children } = this.props
    return createPortal(children, this.element)
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Modal
