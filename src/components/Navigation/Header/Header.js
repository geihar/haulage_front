/* eslint-disable */

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../assets/icons/logo.svg'

import Button from '../../Button/Button'
import Modal from '../../../hoc/Modal/Modal'
import classes from './Header.css'
import { closeModal, logoutForm, singIn, singUp } from '../../../store/actions/headerAction'
import Register from '../../../containers/Authorization/Register/Register'
import Login from '../../../containers/Authorization/Login/Login'
import Logout from '../../../containers/Authorization/Logout/Logout'
import { changeProfile } from '../../../store/actions/auth'

export const Header = (props) => {
  const { isAuthorized, logoutForm: out, singUp: reg, changeProfile: change } = props
  const { singIn: log, showModal: show, form, closeModal: close, currentProfile, count } = props

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="nav">
            <NavLink to="/" className="logo" />
            <ul className="regin">
               {isAuthorized
              ? (
                <>
                  <Button
                    type="button"
                    className="btn btn-outline-secondary mr-2"
                    onClick={out}
                  >
                    Logout
                  </Button>
                  <NavLink
                    className="btn btn-outline-secondary mr-2"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                  {count === '2'
                    ? (
                      <Button
                        type="button"
                        className="btn btn-outline-secondary mr-2"
                        onClick={change}
                      >
                        Change profile to
                        { currentProfile === 'c' ? ' vendor ' : ' customer '}

                      </Button>
                    )
                    : null}
                </>
              )
              : (
                <>
                  <Button
                    type="button"
                    className="btn btn-outline-secondary mr-2"
                    onClick={log}
                  >
                    Sign in
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-outline-secondary mr-2"
                    onClick={reg}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </ul>
             {show
          ? (
            <Modal>
              {form === 'login'
                ? (
                  <Login>
                    <button
                      type="button"
                      className={classes['modal-close']}
                      onClick={close}
                    >
                      X
                    </button>
                  </Login>
                )
                : null}
              {form === 'registration'
                ? (
                  <Register>
                    <button
                      type="button"
                      className={classes['modal-close']}
                      onClick={close}
                    >
                      X
                    </button>
                  </Register>
                )
                : null}
              {form === 'logout'
                ? (
                  <Logout>
                    <button
                      type="button"
                      className={classes['modal-close']}
                      onClick={close}
                    >
                      X
                    </button>
                  </Logout>
                )
                : null}
            </Modal>
          )
          : null}
          </div>
        </div>
      </header>
      {/*<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">*/}
      {/*  <NavLink className="navbar-brand" to="/">Haulage</NavLink>*/}
      {/*  <button*/}
      {/*    className="navbar-toggler"*/}
      {/*    type="button"*/}
      {/*    data-toggle="collapse"*/}
      {/*    data-target="#navbarCollapse"*/}
      {/*    aria-controls="navbarCollapse"*/}
      {/*    aria-expanded="false"*/}
      {/*    aria-label="Toggle navigation"*/}
      {/*  >*/}
      {/*    <span className="navbar-toggler-icon" />*/}
      {/*  </button>*/}
      {/*  <div className="collapse navbar-collapse" id="navbarCollapse">*/}
      {/*    <div className="navbar-nav mr-auto">*/}
      {/*     */}

      {/*    </div>*/}
      {/*  </div>*/}
      {/* */}
      {/*</nav>*/}
    </>
  )
}

Header.propTypes = {
  showModal: PropTypes.bool.isRequired,
  form: PropTypes.string,
  isAuthorized: PropTypes.bool.isRequired,
  singIn: PropTypes.func.isRequired,
  singUp: PropTypes.func.isRequired,
  logoutForm: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  changeProfile: PropTypes.func.isRequired,
  currentProfile: PropTypes.string,
  count: PropTypes.string,
}

Header.defaultProps = {
  form: PropTypes.string,
  currentProfile: null,
  count: null,

}

function mapStateToProps(state) {
  return {
    showModal: state.navbar.showModal,
    form: state.navbar.form,
    isAuthorized: state.auth.isAuthorized,
    currentProfile: localStorage.getItem('currentProfile'),
    count: localStorage.getItem('profileCount'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    singIn: () => dispatch(singIn()),
    singUp: () => dispatch(singUp()),
    logoutForm: () => dispatch(logoutForm()),
    closeModal: () => dispatch(closeModal()),
    changeProfile: () => dispatch(changeProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
