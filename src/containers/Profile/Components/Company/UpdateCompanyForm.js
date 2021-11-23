/* eslint-disable  react/no-unused-state */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classes from './Company.css'
import Input from '../../../../components/Input/Input'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import { closeCompanyForm } from '../../../../store/actions/company'

class UpdateCompanyForm extends Component {
  constructor(props) {
    super(props)
    const { obj } = this.props
    this.state = {
      formControls: {
        name: {
          value: obj.unit.name,
          label: 'Company name',
          errorMessage: 'Enter company name',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        code: {
          value: obj.unit.unit_code,
          label: 'Company code',
          errorMessage: 'Enter company code',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        country: {
          value: obj.unit.country,
          label: 'Country',
          errorMessage: 'Enter company country',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        city: {
          value: obj.unit.city,
          label: 'City',
          errorMessage: 'Enter company city',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        zip: {
          value: obj.unit.zipcode,
          label: 'Zip',
          errorMessage: 'Enter company zip code',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        local_address: {
          value: obj.unit.local_address,
          label: 'Local address',
          errorMessage: 'Enter company local_address',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        unit_contacts: {
          value: obj.unit.unit_contacts,
          label: 'Company contacts',
          errorMessage: 'Enter company contacts',
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
      let isValid = true

      if (validation.required) {
        isValid = value.trim() !== '' && isValid
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

    updateUnit() {
      const { formControls } = this.state
      const { obj, reRender } = this.props

      const profileID = CurrentProfileId()
      const args = Object.keys(formControls).map((controlName) => formControls[controlName].value)
      const reqData = {
        profile: profileID,
        name: args[0],
        unit_code: args[1],
        country: args[2],
        city: args[3],
        zipcode: args[4],
        local_address: args[5],
        unit_contacts: args[6],
      }
      const url = `${HOST_URL}api/business-units/${obj.unit.id}/`
      const headers = getHeaders()
      axios.put(url, reqData, {
        headers,
      })
        .then(() => {
          const { closeCompanyForm: close } = this.props
          close()
          reRender()
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
        <div className={classes.Company}>
          <h1> Company update form</h1>
          {this.renderInputs()}
          <button
            type="button"
            disabled={!formValid}
            className="btn btn-outline-secondary mr-2"
            onClick={() => {
              this.updateUnit()
            }}
          >
            Update Company
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
      )
    }
}
function mapDispatchToProps(dispatch) {
  return {
    closeCompanyForm: () => dispatch(closeCompanyForm()),
  }
}
UpdateCompanyForm.propTypes = {
  closeCompanyForm: PropTypes.func.isRequired,
  obj: PropTypes.shape.isRequired,
  reRender: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(UpdateCompanyForm)
