/* eslint-disable react/destructuring-assignment */
/* eslint-disable  no-unused-vars */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import classes from './Register.css'

import { activate } from '../../../store/actions/auth'
import { closeModal, showActivatePopup } from '../../../store/actions/headerAction'
import Modal from '../../../hoc/Modal/Modal'
import { Home } from '../../Home/Home'

class Activation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
    }
  }

  componentDidMount() {
    this.props.showActivatePopup()
    const { activate: active } = this.props
    const { uid, token } = this.props.match.params
    active(uid, token)
  }

  close = () => {
    this.props.closeModal()
    this.setState({
      redirect: true,
    })
  }

  render() {
    const { showModal } = this.props
    const { redirect } = this.state
    const { accountActivation } = this.props

    if (redirect) {
      return <Redirect to="/" />
    }
    return (
      <>
        <Home isAuthorized={false} />
        {showModal
          ? (
            <Modal>
              (
              <div className={classes.Activation}>
                <button
                  type="button"
                  className={classes['modal-close']}
                  onClick={this.close}
                >
                  X
                </button>

                {accountActivation
                  ? (
                    <div className="container">
                      <img className="mb-4" src="logo.png" alt="" width="98" height="98" />
                      <h1 className="h3 mb-3 font-weight-normal">
                        You are successfully activated
                      </h1>
                    </div>
                  ) : (
                    <div className="container">
                      <img className="mb-4" src="logo.png" alt="" width="98" height="98" />
                      <h1 className="h3 mb-3 font-weight-normal">
                        Activation attempt failed, please try again
                      </h1>
                    </div>
                  ) }

              </div>
              )
            </Modal>
          ) : null}
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    showModal: state.navbar.showModal,
    accountActivation: state.auth.accountActivation,

  }
}
function mapDispatchToProps(dispatch) {
  return {
    activate: (uid, token) => dispatch(activate(uid, token)),
    closeModal: () => dispatch(closeModal()),
    showActivatePopup: () => dispatch(showActivatePopup()),

  }
}

Activation.propTypes = {
  activate: PropTypes.func.isRequired,
  match: {
    params: {
      uid: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    },
  }.isRequired,
  closeModal: PropTypes.func.isRequired,
  showActivatePopup: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  accountActivation: PropTypes.bool.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activation))
