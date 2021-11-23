import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classes from './Menu.css'
import Button from '../../../../components/Button/Button'
import { addProfileForm } from '../../../../store/actions/auth'
import Modal from '../../../../hoc/Modal/Modal'
import AddProfileForm from '../Form/AddProfileForm'

const vendorLinks = [
  {
    to: '/public', label: 'Contact Info', exact: true,
  },
  {
    to: '/company', label: 'Company', exact: true,
  },
  {
    to: '/cargoes', label: 'Cargoes', exact: true,
  },
  {
    to: '/transport', label: 'My cars', exact: true,
  },
  {
    to: '/pay', label: 'Payment Method', exact: true,
  },
  {
    to: '/subscription', label: 'Subscription', exact: true,
  },
  {
    to: '/proposal', label: 'Proposal', exact: true,
  },
  {
    to: '/pass&sec', label: 'Password & Security', exact: true,
  },
  {
    to: '/help', label: 'Help', exact: true,
  },
  {
    to: '/chat', label: 'Message', exact: true,
  },

]

const customerLinks = [
  {
    to: '/public', label: 'Contact Info', exact: true,
  },
  {
    to: '/advertising', label: 'Advertising', exact: true,
  },
  {
    to: '/proposal', label: 'Proposal', exact: true,
  },
  {
    to: '/pass&sec', label: 'Password & Security', exact: true,
  },
  {
    to: '/help', label: 'Help', exact: true,
  },
  {
    to: '/chat', label: 'Message', exact: true,
  },

]

class Menu extends Component {
    renderLinks = () => {
      const { currentProfile } = this.props
      const links = currentProfile === 'c' ? customerLinks : vendorLinks
      return (
        links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              exact={link.exact}
              activeClassName={classes.active}
            >
              {link.label}
            </NavLink>
          </li>
        )))
    }

    render() {
      const type = localStorage.getItem('firstProfileType')
      const count = localStorage.getItem('profileCount')
      const { addProfileForm: openForm, form } = this.props
      return (
        <>
          <nav className={classes.Menu}>
            <ul>
              {this.renderLinks()}
            </ul>
            {count !== '2'
              ? (
                <Button
                  type="button"
                  className="btn btn-outline-secondary mr-2"
                  onClick={openForm}
                >
                  Add
                  { type === 'c' ? ' vendor ' : ' customer '}
                  profile
                </Button>
              )
              : null}
          </nav>
          {form
            ? (
              <Modal>
                <AddProfileForm />
              </Modal>
            )
            : null}
        </>
      )
    }
}

function mapStateToProps(state) {
  return {
    form: state.auth.form,
    currentProfile: localStorage.getItem('currentProfile'),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addProfileForm: () => dispatch(addProfileForm()),
  }
}

Menu.propTypes = {
  form: PropTypes.bool.isRequired,
  currentProfile: PropTypes.string.isRequired,
  addProfileForm: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
