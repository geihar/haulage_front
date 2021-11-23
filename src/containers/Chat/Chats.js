/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react'
import Profile from '../Profile/Profile'
import Sidepanel from './Sidepanel'

class Chats extends Component {
  render() {
    return (
      <Profile>
        <Sidepanel />
        <div className="messages">
          <ul id="chat-log">
            {/* {this.props.messages && this.renderMessages(this.props.messages)} */}
            <div
              style={{
                float: 'left', clear: 'both',
              }}
              // ref={(el) => {
              //   this.messagesEnd = el
              // }}
            />
          </ul>
        </div>
        <div className="message-input">
          {/* <form onSubmit={this.sendMessageHandler}> */}
          <div className="wrap">
            <input
                // onChange={this.messageChangeHandler}
                // value={this.state.message}
              required
              id="chat-message-input"
              type="text"
              placeholder="Write your message..."
            />
            <i className="fa fa-paperclip attachment" aria-hidden="true" />
            <button id="chat-message-submit" className="submit" type="button">
              <i className="fa fa-paper-plane" aria-hidden="true" />
            </button>
          </div>
          {/* </form> */}
        </div>
      </Profile>
    )
  }
}
export default Chats
