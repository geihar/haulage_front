import React from 'react'
import PropTypes from 'prop-types'

import Menu from './Components/Menu/Menu'

const Profile = (props) => {
  const { children } = props
  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Menu />
        </div>
        <div className="col-md-8">
          {children}
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Profile
