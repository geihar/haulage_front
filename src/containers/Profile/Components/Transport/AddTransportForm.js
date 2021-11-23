/* eslint-disable  react/no-unused-state */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Input from '../../../../components/Input/Input'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import { closeCompanyForm } from '../../../../store/actions/company'
import classes from './Transport.css'

class AddTransportForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        brand: {
          value: '',
          label: 'Vehicle brand',
          errorMessage: 'Enter vehicle brand',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        model: {
          value: '',
          label: 'Vehicle model',
          errorMessage: 'Enter vehicle model',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
      },
      units: [],
      types: [],
      formValid: false,
      businessUnit: '',
      vehicleTypes: '',
      file: null,
    }
  }

  componentDidMount() {
    const id = CurrentProfileId()
    const url = `${HOST_URL}api/profile/${id}/profile-units/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          units: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
    const urlType = `${HOST_URL}api/vehicles/vehicles_types/`
    axios.get(urlType, {
      headers,
    })
      .then((res) => {
        this.setState({
          types: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
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

     handleChangeImg =(event) => {
       this.setState({
         file: URL.createObjectURL(event.target.files[0]),
       })
     }

     handleChangeUnit =(event) => {
       this.setState({
         businessUnit: event.target.value,
       })
     }

         handleChangeType =(event) => {
           this.setState({
             vehicleTypes: event.target.value,
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

    createUnit() {
      const { businessUnit, vehicleTypes } = this.state
      const { formControls } = this.state
      const { reRender } = this.props
      const reqData = {
        business_unit: businessUnit,
        model: formControls.model.value,
        brand: formControls.brand.value,
        vehicle_type_ref: vehicleTypes,
      }
      const url = `${HOST_URL}api/vehicles/`
      const headers = getHeaders()
      axios.post(url, reqData, {
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

    renderUnits() {
      const { units } = this.state
      return Object.keys(units).map((option) => {
        const control = units[option]
        return (
          <option
            key={option.id + option.name}
            value={control.id}
          >
            {control.name}
          </option>
        )
      })
    }

    renderTypes() {
      const { types } = this.state
      return Object.keys(types).map((option) => {
        const control = types[option]
        return (
          <option
            key={control.key + control.value}
            value={option}
          >
            {control}
          </option>
        )
      })
    }

    render() {
      const { formValid, businessUnit, vehicleTypes, file } = this.state
      const { closeCompanyForm: goBack } = this.props
      return (
        <>
          <div className={classes.Transport}>
            <h1> Vehicle addition form</h1>
            {this.renderInputs()}
            <label htmlFor="unit">
              Choose a company
            </label>
            <select value={businessUnit} onChange={this.handleChangeUnit} id="unit">
              {this.renderUnits()}
            </select>
            <label htmlFor="unit">
              Choose a vehicle type
            </label>
            <select value={vehicleTypes} onChange={this.handleChangeType} id="unit">
              {this.renderTypes()}
            </select>
            <div className="mb-3">
              <input className="mb-3" type="file" onChange={this.handleChangeImg} />
              <img
                alt=""
                src={file}
                style={{
                  maxWidth: '100%',
                }}
              />
            </div>

            <button
              type="button"
              disabled={!formValid}
              className="btn btn-outline-secondary mr-2"
              onClick={() => {
                this.createUnit()
              }}
            >
              Create Company
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
AddTransportForm.propTypes = {
  closeCompanyForm: PropTypes.func.isRequired,
  reRender: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AddTransportForm)
