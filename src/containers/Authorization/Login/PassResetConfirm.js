/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import classes from './Login.css'
import Input from '../../../components/Input/Input'

import { passReset } from '../../../store/actions/auth'
import Modal from '../../../hoc/Modal/Modal'
import { closeModal, showResetPopup } from '../../../store/actions/headerAction'
import { Home } from '../../Home/Home'

class Reset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        password1: {
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 8,
          },
        },
        password2: {
          value: '',
          type: 'password',
          errorMessage: 'Пароли не совпадают',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 8,
          },
        },
      },
      formValid: false,
      redirect: false,
    }
  }

  componentDidMount() {
    this.props.showResetPopup()
  }

     onChangeHandler =(event, controlName) => {
       const { formControls } = this.state
       const form = {
         ...formControls,
       }
       const control = {
         ...formControls[controlName],
       }

       control.value = event.target.value
       control.touched = true
       control.valid = this.validateControl(control.value, control.validation)
       formControls[controlName] = control

       this.setState({
         form,
       }, () => {
         this.validateForm()
       })
     }

    validateControl= (value, validation) => {
      if (!validation) {
        return true
      }
      let isValid = true

      if (validation.required) {
        isValid = value.trim() !== '' && isValid
      }
      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
      }
      return isValid
    }

    validateForm() {
      const { formControls } = this.state
      const { password1 } = formControls
      const { password2 } = formControls

      if (this.validateControl(password1.value, password1.validation)) {
        if (password1.value !== password2.value) {
          const Control = {
            ...formControls,
          }
          const password = {
            ...formControls.password2,
          }
          Control.password2 = password
          password.valid = false

          this.setState({
            formValid: false, formControls,
          })
          return
        }
        this.setState({
          formValid: true,
        })
      }
    }

    resetPass() {
      const { formControls } = this.state
      const { passReset: reset } = this.props
      const password = formControls.password1.value
      const { uid, token } = this.props.match.params

      reset(uid, token, password)
      this.props.closeModal()
      this.setState({
        redirect: true,
      })
    }

    renderInputs() {
      const { formControls } = this.state
      return Object.keys(formControls).map((controlName) => {
        const control = formControls[controlName]

        return (
          <Input
            key={controlName}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) => this.onChangeHandler(event, controlName)}
          />
        )
      })
    }

    render() {
      const { formValid } = this.state
      const { closeModal: close } = this.props
      const { showModal } = this.props
      const { redirect } = this.state

      if (redirect) {
        return <Redirect to="/" />
      }
      return (
        <>
          <Home isAuthorized={false} />
          .
          {showModal
            ? (
              <Modal>
                (
                <div className={classes.Reset}>
                  <div className={classes.Reset}>
                    <button
                      type="button"
                      className={classes['modal-close']}
                      onClick={close}
                    >
                      X
                    </button>
                    <div className="container">
                      <img className="mb-4" src="logo.png" alt="" width="98" height="98" />
                      <h1 className="h3 mb-3 font-weight-normal"> Password reset</h1>
                      {this.renderInputs()}
                      <button
                        type="button"
                        disabled={!formValid}
                        className="btn btn-lg btn-primary"
                        onClick={() => {
                          this.resetPass(this.state)
                        }}
                      >
                        Register
                      </button>
                      <p className="mt-5 mb-3 text-muted">© 2020</p>

                    </div>
                  </div>

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
  }
}
function mapDispatchToProps(dispatch) {
  return {
    passReset: (uid, token, password) => dispatch(passReset(uid, token, password)),
    showResetPopup: () => dispatch(showResetPopup()),
    closeModal: () => dispatch(closeModal()),
  }
}
Reset.propTypes = {
  passReset: PropTypes.func.isRequired,
  showResetPopup: PropTypes.func.isRequired,
  match: {
    params: {
      uid: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
    },
  }.isRequired,
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
