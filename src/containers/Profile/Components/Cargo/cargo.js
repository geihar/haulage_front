import React from 'react'
import PropTypes from 'prop-types'
import classes from './cargo.css'
import Profile from '../../Profile'

const Cargo = (props) => {
  const { cargoName, readySince, description, weight, routeFrom, routeTo } = props
  const { transportType, requirements, volume, clientName, connectType, connectNo } = props

  return (
    <Profile>
      <div className={classes.cargoItem}>
        <div className={classes.cargoCard}>
          <div className="card-body m-0 p-1">
            <div className="d-flex justify-content-between">
              <div
                className="card-title mb-0 pb-0"
                style={{
                  fontSize: '1rem', fontWeight: 'bold', color: 'black',
                }}
              >
                {cargoName}
              </div>
              <div>
                <span className="badge badge-warning">
                  Ready:
                  {readySince}
                </span>
              </div>
            </div>
            <p className="text-left mb-1"><small>{description}</small></p>
            <div className="row">
              <div className="col-2">
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Cargo weight,kg:</div>
                  <div>{weight}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Cargo volume, cbm: </div>
                  <div>{volume}</div>
                </div>
              </div>
              <div className="col-2">
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Loading place: </div>
                  <div>{routeFrom}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Delivery place: </div>
                  <div>{routeTo}</div>
                </div>
              </div>
              <div className="col-5">
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Transport type: </div>
                  <div>{transportType}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Conditions: </div>
                  <div>{requirements}</div>
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Customer name</div>
                  <div>{clientName}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className={classes.itemLabel}>Connect via: </div>
                  <div>{connectType}</div>
                  :
                  {' '}
                  <div>{connectNo}</div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <a href="/" className="card-link">
                <span className="badge badge-primary">Send a offer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  )
}

Cargo.propTypes = {
  cargoName: PropTypes.string.isRequired,
  readySince: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  routeFrom: PropTypes.string.isRequired,
  routeTo: PropTypes.string.isRequired,
  transportType: PropTypes.string.isRequired,
  requirements: PropTypes.string.isRequired,
  volume: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  connectType: PropTypes.string.isRequired,
  connectNo: PropTypes.string.isRequired,
}

export default Cargo
