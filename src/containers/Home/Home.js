/* eslint-disable no-console */
/* eslint-disable global-require */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CurrentProfileSub } from '../../settings'
import BoardEl from './Board'
import Planes from '../Profile/Components/Subscription/Planes'

export const Home = (props) => {
  const { isAuthorized } = props

  if (isAuthorized) {
    const { subscription } = CurrentProfileSub()
    return (
      <div style={{
        height: 800,
      }}
      >
        { subscription ? <BoardEl /> : <Planes />}
      </div>
    )
  }
  const transport = require('../../assets/img/transport.jpg')
  const cargo = require('../../assets/img/cargo.jpg')
  return (
    <>
      <section className="customer">
        <div className="container">
          <div className="customer-offer">
            <div className="offer-text">
              <h1>Find transport for your cargoes</h1>
              <p>Our transport is waiting for you...</p>
              <p>
                <a href="/" className="btn">FIND TRANSPORT</a>
              </p>
            </div>
            <img src={transport} alt="Truck" />
          </div>
        </div>
      </section>
      <section className="vendor">
        <div className="container">
          <div className="vendor-offer">
            <img src={cargo} alt="Cargo" />
            <div className="offer-text-vendor">
              <h1>
                Find cargoes
                <br />
                for your transport
              </h1>
              <p className="vendor-text">Our cargoes is waiting for you...</p>
              <p>
                <a href="/" className="btn">FIND CARGO</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}
Home.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized,
  }
}

export default connect(mapStateToProps, null)(Home)
