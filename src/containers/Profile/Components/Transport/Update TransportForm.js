/* eslint-disable  react/no-unused-state */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classes from './Transport.css'
import Input from '../../../../components/Input/Input'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import { closeCompanyForm } from '../../../../store/actions/company'

class UpdateTransportForm extends Component {
  constructor(props) {
    super(props)
    const { obj } = this.props
    this.state = {
      formControls: {
        brand: {
          value: obj.vehicle.brand,
          label: 'Vehicle brand',
          errorMessage: 'Enter vehicle brand',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        model: {
          value: obj.vehicle.model,
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
      businessUnit: obj.vehicle.businessUnit,
      vehicleTypes: obj.vehicle.vehicleTypes,
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

    updateVehicle() {
      const { businessUnit, vehicleTypes } = this.state
      const { formControls } = this.state
      const { obj, reRender } = this.props
      const reqData = {
        business_unit: businessUnit,
        model: formControls.model.value,
        brand: formControls.brand.value,
        vehicle_type_ref: vehicleTypes,
      }
      const url = `${HOST_URL}api/vehicles/${obj.vehicle.id}/`
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
      const { closeCompanyForm: goBack } = this.props
      const { businessUnit, vehicleTypes } = this.state
      return (
        <>
          <div className={classes.Transport}>
            <h1> Vehicle updating form</h1>
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

            <button
              type="button"
              className="btn btn-outline-secondary mr-2"
              onClick={() => {
                this.updateVehicle()
              }}
            >
              Update Vehicle
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
UpdateTransportForm.propTypes = {
  closeCompanyForm: PropTypes.func.isRequired,
  reRender: PropTypes.func.isRequired,
  obj: PropTypes.shape.isRequired,
}

export default connect(null, mapDispatchToProps)(UpdateTransportForm)
