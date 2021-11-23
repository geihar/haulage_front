import * as actionTypes from './actionTypes'

export const addMessage = (message) => ({
  type: actionTypes.ADD_MESSAGE,
  message,
})

export const setMessages = (messages) => ({
  type: actionTypes.SET_MESSAGES,
  messages,
})
