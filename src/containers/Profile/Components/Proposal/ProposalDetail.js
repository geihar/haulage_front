/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Profile from '../../Profile'
import classes from './Proposal.css'
import { getHeaders, HOST_URL } from '../../../../settings'

class ProposalDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proposal: '',
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const url = `${HOST_URL}api/proposals/${id}/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          proposal: res.data,
        })
      }).catch((error) => console.log(error.message))
  }

  render() {
    const { proposal } = this.state
    return (
      <Profile>
        <div className={classes.Proposal}>
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">Proposal detail</h6>
            <div style={{
              textAlign: 'left',
            }}
            >
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                text:&nbsp;
                {proposal.text}
              </p>
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                status:&nbsp;
                {proposal.status}
              </p>
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                cargo_adv:&nbsp;
                {proposal.cargo_adv}
              </p>
            </div>
          </div>
          <NavLink
            className="btn btn-outline-secondary mr-2"
            to="/proposal"
          >
            Go Back
          </NavLink>
        </div>
      </Profile>
    )
  }
}

ProposalDetail.propTypes = {
  match: {
    params: {
      id: PropTypes.string.isRequired,
    },
  }.isRequired,

}

export default ProposalDetail
