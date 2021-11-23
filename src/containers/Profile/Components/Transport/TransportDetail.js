/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Profile from '../../Profile'
import { getHeaders, HOST_URL } from '../../../../settings'
import { addCompany, LoadingCompany } from '../../../../store/actions/company'
import Button from '../../../../components/Button/Button'
import UpdateTransportForm from './Update TransportForm'

class TransportDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vehicle: {
      },
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const url = `${HOST_URL}api/vehicles/${id}/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          vehicle: res.data,
        })
        const { LoadingCompany: load } = this.props
        load()
      }).catch((error) => console.log(error.message))
  }

  reRender = () => {
    this.componentDidMount()
  }

  render() {
    const { form } = this.props
    const { vehicle } = this.state
    return (
      <Profile>
        {form ? (
          <UpdateTransportForm
            obj={{
              vehicle,
            }}
            reRender={this.reRender}
          />
        ) : (
          <>
            <div className="my-3 p-3 bg-white rounded shadow-sm">
              <h6 className="border-bottom border-gray pb-2 mb-0">Vehicle assigned to your company</h6>
              <div style={{
                textAlign: 'left',
              }}
              >
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  brand:&nbsp;
                  {vehicle.brand}
                </p>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  model:&nbsp;
                  {vehicle.model}
                </p>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  type:&nbsp;
                  {vehicle.vehicle_type_ref}
                </p>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  Company:&nbsp;
                  {vehicle.business_unit}
                </p>
              </div>
            </div>
            <NavLink
              className="btn btn-outline-secondary mr-2"
              to="/transport"
            >
              Go Back
            </NavLink>
            <Button
              type="button"
              className="btn btn-outline-secondary mr-2"
              onClick={this.props.addCompany}
            >
              Update Vehicle
            </Button>
          </>
        )}

      </Profile>
    )
  }
}

function mapStateToProps(state) {
  return {
    form: state.company.form,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    LoadingCompany: () => dispatch(LoadingCompany()),
    addCompany: () => dispatch(addCompany()),
  }
}
TransportDetail.propTypes = {
  form: PropTypes.bool.isRequired,
  LoadingCompany: PropTypes.func.isRequired,
  match: {
    params: {
      id: PropTypes.string.isRequired,
    },
  }.isRequired,
  addCompany: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransportDetail)
