import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classes from './Form.css'
import { closeProfileForm, createAnotherProfile } from '../../../../store/actions/auth'

const ProfileForm = (props) => {
  const type = localStorage.getItem('firstProfileType')
  const { createAnotherProfile: add, closeProfileForm: close } = props
  return (
    <div className={classes.Form}>
      <div className="container">
        <h1 className="h3 mb-3 font-weight-normal">
          Do you want to create a
          {type === 'v' ? ' customer ' : ' vendor '}
          profile?
        </h1>
        <button
          type="button"
          onClick={add}
          className="btn btn-lg btn-primary btn-block mt-4"
        >
          Yes
        </button>
        <Link
          to="/profile"
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

ProfileForm.propTypes = {
  closeProfileForm: PropTypes.func.isRequired,
  createAnotherProfile: PropTypes.func.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    closeProfileForm: () => dispatch(closeProfileForm()),
    createAnotherProfile: () => dispatch(createAnotherProfile()),
  }
}

export default connect(null, mapDispatchToProps)(ProfileForm)
