/* eslint-disable no-console */

import React from 'react'
import { CardElement,
  useElements,
  useStripe } from '@stripe/react-stripe-js'
import Profile from '../../Profile'
import classes from './Pay.css'

const Payment = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
  }
  return (
    <Profile>
      <form onSubmit={handleSubmit} className={classes.Pay}>
        <CardElement
          options={{
            style: {
              display: 'block',
            },
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Profile>
  )
}

export default Payment
