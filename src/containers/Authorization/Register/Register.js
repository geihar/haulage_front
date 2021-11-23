/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react'
import is from 'is_js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from './Register.css'
import Input from '../../../components/Input/Input'
import { register } from '../../../store/actions/auth'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        username: {
          value: '',
          type: 'username',
          label: 'Username',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        email: {
          value: '',
          type: 'email',
          label: 'Email',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
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
            password: true,
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
            password2: true,
          },
        },
      },
      formValid: false,
    }
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

      const reg = /[A-Za-z\d@$!%*#?&]{8,}/
      // const reg2 = /(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}/

      if (validation.required) {
        isValid = value.trim() !== '' && isValid
      }

      if (validation.email) {
        isValid = is.email(value) && isValid
      }

      if (validation.password) {
        isValid = new RegExp(reg).test(value) && isValid
      }
      if (validation.password2) {
        const { formControls } = this.state
        const { password1 } = formControls

        isValid = password1.value === value && isValid
      }

      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid
      }
      return isValid
    }

    validateForm() {
      const { formControls } = this.state
      const { email } = formControls
      const { password1 } = formControls
      const { password2 } = formControls

      if (this.validateControl(email.value, email.validation)
            && this.validateControl(password1.value, password1.validation)) {
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

    createCarrier(profileType = 'c') {
      const { formControls } = this.state
      const { register: reg } = this.props
      const username = formControls.username.value
      const email = formControls.email.value
      const password = formControls.password1.value

      reg(username, email, password, profileType)
    }

    createVendor() {
      this.createCarrier('v')
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
      const { children } = this.props
      const { formValid } = this.state
      return (
        <div className={classes.Register}>
          <div>{children}</div>
          <div className="container">
            <img className="mb-4" src="logo.png" alt="" width="98" height="98" />
            <h1 className="h3 mb-3 font-weight-normal"> Sing Up</h1>
            {this.renderInputs()}
            <div className={classes.between}>
              <button
                type="button"
                disabled={!formValid}
                className="btn btn-secondary mr-2"
                onClick={() => {
                  this.createVendor(this.state)
                }}
              >
                Register as Vendor
              </button>
              <button
                type="button"
                disabled={!formValid}
                className="btn btn-secondary mr-2"
                onClick={() => {
                  this.createCarrier()
                }}
              >
                Register as Carrier
              </button>
            </div>

            <p className="mt-5 mb-3 text-muted">© 2020</p>

          </div>
        </div>
      )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    register: (username, email, password, pType) => {
      dispatch(register(username, email, password, pType))
    },
  }
}
Register.propTypes = {
  children: PropTypes.node.isRequired,
  register: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Register)
