import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { closeModal, logout } from '../../../store/actions/headerAction'
import classes from './Logout.css'

const Logout = (props) => {
  const { children } = props
  const { logout: out } = props
  const { closeModal: close } = props
  return (
    <div className={classes.Logout}>
      <div>{children}</div>
      <div className="container">
        <h1 className="h3 mb-3 font-weight-normal">
          You definitely want to log out of your account
          ?
        </h1>
        <button
          type="button"
          onClick={out}
          className="btn btn-lg btn-primary btn-block mt-4"
        >
          Yes
        </button>
        <Link
          to="/"
          onClick={close}
          className="btn btn-lg btn-primary btn-block mt-4"
        >
          No
        </Link>
        <p className="mt-5 mb-3 text-muted">© 2020</p>
      </div>
    </div>
  )
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal()),
  }
}

export default connect(null, mapDispatchToProps)(Logout)
