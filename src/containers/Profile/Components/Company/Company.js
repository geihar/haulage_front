/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Profile from '../../Profile'
import Button from '../../../../components/Button/Button'
import CompanyForm from './CreateCompanyForm'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import { addCompany, LoadingCompany } from '../../../../store/actions/company'

class Company extends Component {
  constructor(props) {
    super(props)
    this.state = {
      unit: [],
    }
  }

  componentDidMount() {
    const id = CurrentProfileId()
    const url = `${HOST_URL}api/profile/${id}/profile-units/`
    const headers = getHeaders()
    return axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          unit: res.data,
        })
        const { LoadingCompany: load } = this.props
        load()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  renderBusinessUnit =() => this.state.unit.map((unit) => {
    const url = `/company/${unit.id}/`
    return (
      <div className="media text-muted pt-3" key={unit}>
        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
          <strong className="d-block text-gray-dark">
            {unit.name}
          </strong>
        </p>
        <NavLink
          className="btn btn-outline-secondary mr-2"
          to={url}
        >
          Detail
        </NavLink>
      </div>
    )
  })

    reRender = () => {
      this.componentDidMount()
    }

    render() {
      const { form } = this.props
      return (
        <Profile>
          {form ? (<CompanyForm reRender={this.reRender} />) : (
            <div className="my-3 p-3 bg-white rounded shadow-sm">
              <h6 className="border-bottom border-gray pb-2 mb-0">Companies assigned to your profile</h6>
              {this.renderBusinessUnit()}
              <Button
                type="button"
                className="btn btn-outline-secondary mr-2"
                onClick={this.props.addCompany}
              >
                Add Company
              </Button>
            </div>
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
    addCompany: () => dispatch(addCompany()),
    LoadingCompany: () => dispatch(LoadingCompany()),
  }
}
Company.propTypes = {
  form: PropTypes.bool.isRequired,
  addCompany: PropTypes.func.isRequired,
  LoadingCompany: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Company)
