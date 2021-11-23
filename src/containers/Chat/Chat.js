import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import WebSocketInstance from '../../websocket'
import ChatContainer from './ChatContainer'
import classes from './Chat.css'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.initialiseChat()
    this.state = {
      message: '',
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps) {
    const { username, match } = this.props
    if (match.params.chatID !== prevProps.match.params.chatID) {
      WebSocketInstance.disconnect()
      this.waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(
          username,
          prevProps.match.params.chatID,
        )
      })
      WebSocketInstance.connect(1)
    }
    this.scrollToBottom()
  }

   messageChangeHandler = (event) => {
     this.setState({
       message: event.target.value,
     })
   };

  sendMessageHandler = (e) => {
    e.preventDefault()
    const { username, match } = this.props
    const { message } = this.state
    const messageObject = {
      from: username,
      content: message,
      chatId: match.params.chatID,
    }
    WebSocketInstance.newChatMessage(messageObject)
    this.setState({
      message: '',
    })
  };

  renderMessages = (messages) => {
    const { username } = this.props
    return messages.map((message, i, arr) => (
      <li
        key={message.id}
        style={{
          marginBottom: arr.length - 1 === i ? '300px' : '15px',
        }}
        className={message.author === username ? 'sent' : 'replies'}
      >
        <img
          src="http://emilcarlsson.se/assets/mikeross.png"
          alt="profile-pic"
        />
        <p>
          {message.content}
          <br />
          <small>{message.timestamp}</small>
        </p>
      </li>
    ))
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: 'smooth',
    })
  };

  waitForSocketConnection() {
    setTimeout(() => {
      if (WebSocketInstance.state() === 1) {
        console.log('Connection is made')
        // WebSocketInstance.callback()
        // return true
      } else {
        console.log('wait for connection...')
        this.waitForSocketConnection()
        // return false
      }
    }, 100)
  }

  initialiseChat() {
    this.waitForSocketConnection()
    const { match } = this.props
    WebSocketInstance.connect(match.params.chatID)
  }

  render() {
    const { message } = this.state
    const { messages } = this.props
    return (
      <ChatContainer>
        <div className={classes.Chat}>
          <div className={classes.ChatLog}>
            <ul id="chat-log">
              {messages && this.renderMessages(messages)}
              <div
                style={{
                  float: 'left', clear: 'both',
                }}
                ref={(el) => {
                  this.messagesEnd = el
                }}
              />
            </ul>
          </div>
          <div className={classes.ChatInput}>
            <form onSubmit={this.sendMessageHandler}>
              <div className="wrap">
                <input
                  onChange={this.messageChangeHandler}
                  value={message}
                  required
                  id="chat-message-input"
                  type="text"
                  placeholder="Write your message..."
                />
                <i className="fa fa-paperclip attachment" aria-hidden="true" />
                <button id="chat-message-submit" className="submit" type="button">
                  Send
                  <i className="fa fa-paper-plane" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </ChatContainer>
    )
  }
}

Chat.propTypes = {
  messages: PropTypes.shape,
  match: PropTypes.shape.isRequired,
  username: PropTypes.string.isRequired,
}
Chat.defaultProps = {
  messages: null,
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  messages: state.message.messages,
})

export default connect(mapStateToProps)(Chat)
