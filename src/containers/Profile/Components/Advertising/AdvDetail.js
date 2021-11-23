/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import Profile from '../../Profile'
import { getHeaders, HOST_URL } from '../../../../settings'
import { addCompany, LoadingCompany } from '../../../../store/actions/company'
import Button from '../../../../components/Button/Button'
import UpdateAdvForm from './UpdateAdvForm'

class AdvDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adv: {
      },
      error: false,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const url = `${HOST_URL}api/orders/${id}/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          adv: res.data,
        })
        const { LoadingCompany: load } = this.props
        load()
      }).catch(() => this.setState({
        error: true,
      }))
  }

    deleteAdv = () => {
      const { id } = this.props.match.params
      const url = `${HOST_URL}api/orders/${id}/`
      const headers = getHeaders()
      axios.delete(url, {
        headers,
      })
        .then(() => {
          this.props.history.push('/advertising')
        }).catch((error) => {
          this.setState({
            error: error.message,
          })
          this.reRender()
        })
    }

  reRender = () => {
    this.componentDidMount()
  }

  addToFavorite = () => console.log('add to favorite')

  render() {
    const { form, currentProfile } = this.props
    const { adv, error } = this.state
    const { id } = this.props.match.params
    if (error) {
      return (
        <Profile>
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h3 className="border-bottom border-gray pb-2 mb-0">Something went wrong</h3>
          </div>
        </Profile>
      )
    }
    return (
      <Profile>
        {form ? (
          <UpdateAdvForm
            obj={{
              adv,
            }}
            reRender={this.reRender}
          />
        ) : (
          <>
            <div className="my-3 p-3 bg-white rounded shadow-sm">
              {currentProfile === 'v'
                ? (
                  <>
                    <Button
                      type="button"
                      className="btn btn-outline-secondary mr-2 float-right"
                      onClick={this.addToFavorite}
                    >
                      Add to favorite
                    </Button>
                    <NavLink
                      className="btn btn-outline-secondary mr-2 float-right"
                      to={`/proposal/add/${id}`}
                      exact
                    >
                      Make proposal
                    </NavLink>
                  </>
                )
                : null}
              <h6 className="border-bottom border-gray pb-2 mb-0">Advertising detail</h6>
              <div style={{
                textAlign: 'left',
              }}
              >
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  description:&nbsp;
                  {adv.description}
                </p>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  weight:&nbsp;
                  {adv.weight}
                </p>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  start_country:&nbsp;
                  {adv.start_country}
                </p>
                <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                  finish_country:&nbsp;
                  {adv.finish_country}
                </p>
              </div>
            </div>
            <NavLink
              className="btn btn-outline-secondary mr-2"
              to={currentProfile === 'c'
                ? '/advertising'
                : '/'}
              exact
            >
              Go Back
            </NavLink>
            {currentProfile === 'c'
              ? (
                <>
                  <Button
                    type="button"
                    className="btn btn-outline-secondary mr-2"
                    onClick={this.props.addCompany}
                  >
                    Update advertising
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-outline-danger mr-2"
                    onClick={this.deleteAdv}
                  >
                    Delete advertising
                  </Button>
                </>
              )
              : null}
          </>
        )}

      </Profile>
    )
  }
}

function mapStateToProps(state) {
  return {
    form: state.company.form,
    currentProfile: localStorage.getItem('currentProfile'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    LoadingCompany: () => dispatch(LoadingCompany()),
    addCompany: () => dispatch(addCompany()),
  }
}
AdvDetail.propTypes = {
  form: PropTypes.bool.isRequired,
  history: PropTypes.shape.isRequired,
  LoadingCompany: PropTypes.func.isRequired,
  match: {
    params: {
      id: PropTypes.string.isRequired,
    },
  }.isRequired,
  addCompany: PropTypes.func.isRequired,
  currentProfile: PropTypes.string.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdvDetail))
