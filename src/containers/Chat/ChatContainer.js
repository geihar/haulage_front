import React from 'react'
import PropTypes from 'prop-types'

import Sidepanel from './Sidepanel'

const ChatContainer = (props) => {
  const { children } = props
  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Sidepanel />
        </div>
        <div className="col-md-8">
          {children}
        </div>
      </div>
    </div>
  )
}

ChatContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ChatContainer
