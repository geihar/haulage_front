/* eslint-disable no-console */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import classes from '../Profile/Components/Menu/Menu.css'
import { CurrentProfileId, getHeaders, HOST_URL } from '../../settings'
// import classes from './Chat.css'

class Sidepanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chats: [],
    }
  }

  componentDidMount() {
    const id = CurrentProfileId()
    const headers = getHeaders()
    const url = `${HOST_URL}api/chat/${id}/profile-chats/`
    axios.get(url, {
      headers,
    })
      .then((res) => {
        this.setState({
          chats: res.data,
        })
      })
      .catch((error) => console.log(error))
  }

  renderActiveChat =() => {
    const { chats } = this.state
    const username = localStorage.getItem('username')
    return (chats.map((c) => (
      <li key={c.id}>
        <NavLink
          to={`/chat/${c.id}`}
          exact
          activeClassName={classes.active}
        >
          {c.participants.slice(0, 2).map((p) => (
            <>
              {p === username ? null : (p)}
                &nbsp;
            </>
          ))}
        </NavLink>
      </li>
    )))
  }

  render() {
    return (
      <nav className={classes.Menu}>
        <h3>Yor active chats</h3>
        <ul>
          {this.renderActiveChat()}
        </ul>
      </nav>
    )
  }
}

export default Sidepanel
