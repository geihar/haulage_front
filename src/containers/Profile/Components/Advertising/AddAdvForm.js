/* eslint-disable  react/no-unused-state */
/* eslint-disable no-console */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Input from '../../../../components/Input/Input'
import { closeCompanyForm } from '../../../../store/actions/company'
import classes from './Advertising.css'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'

class AddAdvForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        description: {
          value: '',
          label: 'Advertising description',
          errorMessage: 'Enter description',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        weight: {
          value: '',
          type: 'numbers',
          label: 'Weight',
          errorMessage: 'Enter weight',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        volume: {
          value: '',
          type: 'numbers',
          label: 'Volume',
          errorMessage: 'Enter volume',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        quantity: {
          value: '',
          type: 'numbers',
          label: 'Quantity',
          errorMessage: 'Enter quantity',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        special_req: {
          value: '',
          label: 'Advertising special req',
          errorMessage: 'Enter special req',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_country: {
          value: '',
          label: 'Advertising start country',
          errorMessage: 'Enter start country',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_city: {
          value: '',
          label: 'Advertising start city',
          errorMessage: 'Enter start city',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_zipcode: {
          value: '',
          label: 'Advertising start zipcode',
          errorMessage: 'Enter start zipcode',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_local_address: {
          value: '',
          label: 'Advertising start local address',
          errorMessage: 'Enter start local address',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_country: {
          value: '',
          label: 'Advertising finish country',
          errorMessage: 'Enter finish country',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_city: {
          value: '',
          label: 'Advertising finish city',
          errorMessage: 'Enter finish city',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_zipcode: {
          value: '',
          label: 'Advertising finish zipcode',
          errorMessage: 'Enter finish zipcode',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_local_address: {
          value: '',
          label: 'Advertising finish local address',
          errorMessage: 'Enter finish local address',
          valid: false,
          touched: false,
          validation: {
            required: true,
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
      const isValid = true

      if (validation.required) {
        // isValid = value.trim() !== '' && isValid
      }
      return isValid
    }

    validateForm() {
      const { formControls } = this.state
      const status = Object.keys(formControls).map((controlName) => {
        const control = formControls[controlName]
        this.validateControl(control.value, control.validation)
        if (this.validateControl(control.value, control.validation)) {
          return true
        }
        return false
      })
      if (status.every((el) => el === true)) {
        this.setState({
          formValid: true,
        })
      }
    }

    createAdv() {
      const { formControls } = this.state
      const profileID = CurrentProfileId()
      const args = Object.keys(formControls).map((controlName) => formControls[controlName].value)
      const reqData = {
        profile: profileID,
        description: args[0],
        weight: args[1],
        volume: args[2],
        quantity: args[3],
        special_req: args[4],
        start_country: args[5],
        start_city: args[6],
        start_zipcode: args[7],
        start_local_address: args[8],
        finish_country: args[9],
        finish_city: args[10],
        finish_zipcode: args[11],
        finish_local_address: args[12],
      }
      const url = `${HOST_URL}api/orders/`
      const headers = getHeaders()
      axios.post(url, reqData, {
        headers,
      })
        .then(() => {
          const { closeCompanyForm: close } = this.props
          const { reRender } = this.props
          reRender()
          close()
        }).catch((error) => console.log(error.message))
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
      const { closeCompanyForm: goBack } = this.props
      return (
        <>
          <div className={classes.Advertising}>
            <h1> Advertising addition form</h1>
            {this.renderInputs()}
            <button
              type="button"
              disabled={!formValid}
              className="btn btn-outline-secondary mr-2"
              onClick={() => {
                this.createAdv()
              }}
            >
              Create Advertising
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary mr-2"
              onClick={() => {
                goBack()
              }}
            >
              Go Back
            </button>
          </div>
        </>
      )
    }
}
function mapDispatchToProps(dispatch) {
  return {
    closeCompanyForm: () => dispatch(closeCompanyForm()),
  }
}
AddAdvForm.propTypes = {
  closeCompanyForm: PropTypes.func.isRequired,
  reRender: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AddAdvForm)
