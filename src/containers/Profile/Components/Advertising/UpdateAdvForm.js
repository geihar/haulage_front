/* eslint-disable  react/no-unused-state */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classes from './Advertising.css'
import Input from '../../../../components/Input/Input'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import { closeCompanyForm } from '../../../../store/actions/company'

class UpdateAdvtForm extends Component {
  constructor(props) {
    super(props)
    const { obj } = this.props
    this.state = {
      formControls: {
        description: {
          value: obj.adv.description,
          label: 'Advertising description',
          errorMessage: 'Enter description',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        weight: {
          value: obj.adv.weight,
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
          value: obj.adv.volume,
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
          value: obj.adv.quantity,
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
          value: obj.adv.special_req,
          label: 'Advertising special req',
          errorMessage: 'Enter special req',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_country: {
          value: obj.adv.start_country,
          label: 'Advertising start country',
          errorMessage: 'Enter start country',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_city: {
          value: obj.adv.start_city,
          label: 'Advertising start city',
          errorMessage: 'Enter start city',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_zipcode: {
          value: obj.adv.start_zipcode,
          label: 'Advertising start zipcode',
          errorMessage: 'Enter start zipcode',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        start_local_address: {
          value: obj.adv.start_local_address,
          label: 'Advertising start local address',
          errorMessage: 'Enter start local address',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_country: {
          value: obj.adv.finish_country,
          label: 'Advertising finish country',
          errorMessage: 'Enter finish country',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_city: {
          value: obj.adv.finish_city,
          label: 'Advertising finish city',
          errorMessage: 'Enter finish city',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_zipcode: {
          value: obj.adv.finish_zipcode,
          label: 'Advertising finish zipcode',
          errorMessage: 'Enter finish zipcode',
          valid: false,
          touched: false,
          validation: {
            required: true,
          },
        },
        finish_local_address: {
          value: obj.adv.finish_local_address,
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

     updateAdv() {
       const { formControls } = this.state
       const { obj, reRender } = this.props
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
       const url = `${HOST_URL}api/orders/${obj.adv.id}/`
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
       const { closeCompanyForm: goBack } = this.props
       return (
         <>
           <div className={classes.Advertising}>
             <h1> Advertising updating form</h1>
             {this.renderInputs()}
             <button
               type="button"
               className="btn btn-outline-secondary mr-2"
               onClick={() => {
                 this.updateAdv()
               }}
             >
               Update Advertising
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
UpdateAdvtForm.propTypes = {
  closeCompanyForm: PropTypes.func.isRequired,
  reRender: PropTypes.func.isRequired,
  obj: PropTypes.shape.isRequired,
}

export default connect(null, mapDispatchToProps)(UpdateAdvtForm)
