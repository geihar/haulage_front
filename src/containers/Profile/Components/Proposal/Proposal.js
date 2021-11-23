/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Profile from '../../Profile'
import { getHeaders, HOST_URL } from '../../../../settings'

class Proposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposals: [],
    }
  }

  componentDidMount() {
    const url = `${HOST_URL}api/proposals/`
    const headers = getHeaders()
    return axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          proposals: res.data.results,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

    renderProposals =() => this.state.proposals.map((prop) => {
      const url = `/proposal/${prop.id}`
      return (
        <div className="media text-muted pt-3" key={prop}>
          <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong className="d-block text-gray-dark">
              orders id &nbsp;
              {prop.cargo_adv}
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

    render() {
      return (
        <Profile>
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Proposals assigned to your profile</h6>
            {this.renderProposals()}
          </div>
        </Profile>
      )
    }
}

export default Proposal
