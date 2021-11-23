import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class TripList extends Component {
  renderLinks = () => {
    const { currentProfile, obj } = this.props
    if (currentProfile === 'v') {
      return (
        obj.orders.map((adv) => {
          const url = `/advertising/${adv.id}/`
          return (
            <div className="media text-muted pt-3" key={adv.id}>
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
        }))
    }
    return null
  }

  render() {
    const { name } = this.props

    return (
      <>
        <div className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="border-bottom border-gray pb-2 mb-0">{name}</h6>
          {this.renderLinks()}
        </div>
      </>
    )
  }
}
TripList.propTypes = {
  obj: PropTypes.shape({
    orders: PropTypes.instanceOf(Array).isRequired,
    map: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  currentProfile: PropTypes.string.isRequired,
}
TripList.defaultProps = {
  obj: {
    map: null,
  },
}

function mapStateToProps(state) {
  return {
    form: state.auth.form,
    currentProfile: localStorage.getItem('currentProfile'),
  }
}

export default connect(mapStateToProps, null)(TripList)
