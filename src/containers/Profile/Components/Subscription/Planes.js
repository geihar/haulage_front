/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react'
import axios from 'axios'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../../../settings'
import PaymentMethod from '../../../PaymentMethod/PaymentMethod'

class Planes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      planes: [],
      plan: null,
    }
  }

  componentDidMount() {
    const id = CurrentProfileId()
    const url = `${HOST_URL}api/stripe/${id}/available_plans/`
    const headers = getHeaders()
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          planes: res.data.available_plans,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  buttonHandler = (plan) => {
    this.setState({
      plan,
    })
  }

  renderCard = () => this.state.planes.map((plan) => (
    <div className="col">
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 fw-normal">{plan.nickname}</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title">
            $
            {plan.unit_amount}
            <small
              className="text-muted"
            >
              /mo
            </small>
          </h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>20 users included</li>
            <li>10 GB of storage</li>
            <li>Priority email support</li>
            <li>Help center access</li>
          </ul>
          <button
            type="button"
            className="w-100 btn btn-lg btn-outline-primary"
            onClick={() => this.buttonHandler(plan)}
          >
            Get
            started
          </button>
        </div>
      </div>
    </div>
  ))

  render() {
    const { plan } = this.state
    return (
      <>
        {plan
          ? (
            <PaymentMethod
              cost={plan.unit_amount}
              planId={plan.id}
            />
          )
          : (
            <main className="container">
              <h1 className="display-4">Pricing</h1>
              <p className="lead">
                Quickly build an effective pricing table for your potential
                customers with this Bootstrap example. It’s built with default Bootstrap
                components and utilities with little customization.
              </p>
              <div className="row">
                {this.renderCard()}
              </div>
            </main>
          )}
      </>

    )
  }
}

export default Planes
