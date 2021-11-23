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
import UpdateCompanyForm from './UpdateCompanyForm'

class CompanyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: {
      },
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const url = `${HOST_URL}api/business-units/${id}/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          unit: res.data,
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
        const { unit } = this.state
        return (
          <Profile>
            {form ? (
              <UpdateCompanyForm
                obj={{
                  unit,
                }}
                reRender={this.reRender}
              />
            ) : (
              <>
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                  <h6 className="border-bottom border-gray pb-2 mb-0">Companies assigned to your profile</h6>
                  <div style={{
                    textAlign: 'left',
                  }}
                  >
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      name:&nbsp;
                      {unit.name}
                    </p>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      country:&nbsp;
                      {unit.country}
                    </p>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      city:&nbsp;
                      {unit.city}
                    </p>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      local_address:&nbsp;
                      {unit.local_address}
                    </p>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      unit_code:&nbsp;
                      {unit.unit_code}
                    </p>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      unit_contacts:&nbsp;
                      {unit.unit_contacts}
                    </p>
                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                      zipcode:&nbsp;
                      {unit.zipcode}
                    </p>
                  </div>
                </div>
                <NavLink
                  className="btn btn-outline-secondary mr-2"
                  to="/company"
                >
                  Go Back
                </NavLink>
                <Button
                  type="button"
                  className="btn btn-outline-secondary mr-2"
                  onClick={this.props.addCompany}
                >
                  Update Company
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
CompanyDetail.propTypes = {
  form: PropTypes.bool.isRequired,
  LoadingCompany: PropTypes.func.isRequired,
  match: {
    params: {
      id: PropTypes.string.isRequired,
    },
  }.isRequired,
  addCompany: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail)
