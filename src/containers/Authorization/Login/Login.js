import React, { Component } from 'react'
import is from 'is_js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from './Login.css'

import Input from '../../../components/Input/Input'
import { login, restorePassword } from '../../../store/actions/auth'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        input: {
          name: 'userEmail',
          value: '',
          type: 'text',
          label: 'Email or username',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        password: {
          name: 'userPassw',
          value: '',
          type: 'password',
          label: 'Password',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 8,
            password: true,
          },
        },
      },
      formValid: false,
    }
  }

    onChangeHandler = (event, controlName) => {
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

      if (validation.email) {
        isValid = is.email(value) && isValid
      }
      // if(validation.password){
      //     isValid = is.alphaNumeric(value) && isValid
      // }
      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
      }
      return isValid
    }

    forgotPassword() {
      const { formControls } = this.state
      const { forgotPass } = this.props
      const { input } = formControls
      const form = {
        ...formControls,
      }
      if (this.validateControl(input.value, input.validation)) {
        // eslint-disable-next-line no-console
        // console.log('dispatch entered Email')
        forgotPass(input.value)
      } else {
        form.input.touched = true
        this.setState({
          formControls: form,
          formValid: false,
        })
      }
    }

    validateForm() {
      const { formControls } = this.state
      const { input } = formControls
      const { password } = formControls
      if (this.validateControl(input.value, input.validation)
            && this.validateControl(password.value, password.validation)) {
        this.setState({
          formValid: true,
        })
      }
    }

    singInUser() {
      const { auth } = this.props
      const { formControls } = this.state
      auth(formControls.input.value, formControls.password.value)
    }

    renderResetPassword() {
      const { isEmailStatus } = this.props
      switch (isEmailStatus) {
        case 204:
          return (
            <div className="text-success">
              <small><b>Instructions for changing password were sent to your EMail</b></small>
            </div>
          )
        case 404:
          return (
            <div className="text-danger">
              <small><b>Indicated EMail is absent in supported list</b></small>
            </div>
          )
        default:
          return (
            <button
              className="btn btn-outline-white"
              style={{
                border: 'None',
              }}
              type="button"
              onClick={() => {
                this.forgotPassword()
              }}
            >
              <small className="text-primary"><b>Forgot password? Press here</b></small>
            </button>
          )
      }
    }

    renderInputs() {
      const { formControls } = this.state
      return Object.keys(formControls).map((controlName) => {
        const control = formControls[controlName]

        return (
          <Input
            key={controlName}
            tname={control.name}
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
      const { children } = this.props
      return (
        <form className={classes.Login} noValidate>
          <div>{children}</div>
          <div className="container">
            <img className="mb-4" src="logo.png" alt="" width="98" height="98" />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            {this.renderInputs()}
            <button
              type="button"
              disabled={!formValid}
              className="btn btn-lg btn-primary"
              onClick={() => {
                this.singInUser(this.state)
              }}
            >
              Sign in
            </button>
            <div className="mt-4">
              {this.renderResetPassword()}
            </div>
            <p className="mt-5 mb-3 text-muted">© 2020</p>
          </div>
        </form>
      )
    }
}

function mapStateToProps(state) {
  return {
    isEmailStatus: state.auth.isEmailStatus,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (input, password) => dispatch(login(input, password)),
    forgotPass: (emailAddr) => dispatch(restorePassword(emailAddr)),
  }
}
Login.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.func.isRequired,
  forgotPass: PropTypes.func.isRequired,
  isEmailStatus: PropTypes.number,
}
Login.defaultProps = {
  isEmailStatus: null,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
