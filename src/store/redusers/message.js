import * as actionTypes from '../actions/actionTypes'
import updateObject from '../utility'

const initialState = {
  messages: [],
  chats: [],
}

const addMessage = (state, action) => updateObject(state, {
  messages: [...state.messages, action.message],
})

const setMessages = (state, action) => updateObject(state, {
  messages: action.messages.reverse(),
})

const setChats = (state, action) => updateObject(state, {
  chats: action.chats,
})

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return addMessage(state, action)
    case actionTypes.SET_MESSAGES:
      return setMessages(state, action)
    case actionTypes.GET_CHATS_SUCCESS:
      return setChats(state, action)
    default:
      return state
  }
}

export default messageReducer
