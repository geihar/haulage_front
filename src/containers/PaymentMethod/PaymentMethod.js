/* eslint-disable */

import React, { useState } from 'react'
import { CardCvcElement,
  CardExpiryElement, CardNumberElement,
  useElements,
  useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import classes from './PaymentMethod.css'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../settings'

const PaymentMethod = (props) => {
  const stripe = useStripe()
  const elements = useElements()
  const [status, setstatus] = useState(null)
  const { cost } = props || null
  const { planId } = props

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardNumberElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      setstatus(error.message)
      console.log('[error]', error)
    } else {
      setstatus(null)
      const profileId = CurrentProfileId()
      const headers = getHeaders()
      const url = `${HOST_URL}api/stripe/new_subscription/`
      const reqData = {
        profile_id:	profileId,
        payment_method:	paymentMethod.id,
        price_id: planId,
      }
      console.log(reqData)
      await axios.post(url, reqData, {
        headers,
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => console.log(err))
      this.props.history.push('/')
    }
  }
  const perMonth = Math.round(cost / 12)
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          height: '700px',
        }}
      >
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8">
              <h6>Payments method</h6>
              <div className={classes.Pay}>
                <span className={classes.error}>{status || null}</span>
                {/* <CardElement /> */}
                <CardNumberElement
                  id="card_number"
                  style={{
                    borderColor: '1px solid black',
                  }}
                />
                <CardExpiryElement id="card_expiry" />
                <CardCvcElement id="card_cvc" />
                <input id="remember" type="checkbox" />
                <label htmlFor="remember">
                  &nbsp;Remember this cards
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <h6>Order summary</h6>
              <div onSubmit={handleSubmit} className={classes.Pay}>
                <div className={classes.between}>
                  <span>Monthly</span>
                  <span>{perMonth || '???'}</span>
                </div>
                <hr size="2" />
                <div className={classes.between}>
                  <span><b>Total</b></span>
                  <span>
                    <b>
                      USD&nbsp;
                      {cost || '???'}
                    </b>
                  </span>
                </div>
                <span className={classes.sub}>
                  per month before tax
                </span>
              </div>
              <button className={classes.btn} type="submit" disabled={!stripe}>
                Complete payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default PaymentMethod
