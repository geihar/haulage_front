/* eslint-disable import/no-named-as-default */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from './Layout.css'
import Header from '../../components/Navigation/Header/Header'
import Footer from '../../components/Footer/Footer'
import { autoLogin } from '../../store/actions/auth'

class Layout extends Component {
  componentDidMount() {
    const { autoLogin: login } = this.props
    login()
    setInterval(() => login(),
      290000)
  }

  render() {
    const { children } = this.props

    Layout.propTypes = {
      autoLogin: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
    }
    return (
      <div className={classes.Layout}>
        <Header />
        { children }
        <Footer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  }
}

export default connect(null, mapDispatchToProps)(Layout)
