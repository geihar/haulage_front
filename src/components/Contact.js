import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const Contact = (props) => {
  const { chatURL, status, picURL, name } = props
  return (
    <NavLink
      to={`${chatURL}`}
      style={{
        color: '#fff',
      }}
    >
      <li className="contact">
        <div className="wrap">
          <span className={`contact-status ${status}`} />
          <img src={picURL} alt="" />
          <div className="meta">
            <p className="name">{name}</p>
          </div>
        </div>
      </li>
    </NavLink>
  )
}
Contact.propTypes = {
  chatURL: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  picURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Contact
