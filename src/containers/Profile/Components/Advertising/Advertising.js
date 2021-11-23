/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Profile from '../../Profile'
import Button from '../../../../components/Button/Button'
import { addCompany } from '../../../../store/actions/company'
import AddAdvForm from './AddAdvForm'
import { getHeaders, HOST_URL } from '../../../../settings'

class Advertising extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    const url = `${HOST_URL}api/orders/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          orders: res.data.results,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

    renderAdv =() => this.state.orders.map((adv) => {
      const url = `/advertising/${adv.id}/`
      return (
        <div className="media text-muted pt-3" key={adv}>
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">
              {adv.description}
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
            {form ? (<AddAdvForm reRender={this.reRender} />) : (
              <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">Advertising assigned to your profile</h6>
                {this.renderAdv()}
                <Button
                  type="button"
                  className="btn btn-outline-secondary mr-2"
                  onClick={this.props.addCompany}
                >
                  Add Advertising
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
  }
}
Advertising.propTypes = {
  form: PropTypes.bool.isRequired,
  addCompany: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Advertising)
