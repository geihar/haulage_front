import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { BrowserRouter } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import rootReducer from './store/redusers/rootReduser'
import * as serviceWorker from './serviceWorker'
import App from './App'

const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
)
const stripePromise = loadStripe('pk_test_51HZ0tYI5WiRR4y4Gycq506LqFwl6b53i4occQw5B3MmQzq03woEHK7Oa8H0vcd0CrgEslzeilH9YmKdjVXGPN8jo00dNdppLDf')

const Root = () => (
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Elements>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister()
