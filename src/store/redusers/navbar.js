import { CLOSE_MODAL,
  SING_IN,
  SING_UP,
  LOGOUT_FORM,
  ACTIVATE,
  SHOW_RESET_POPUP } from '../actions/actionTypes'

export const initialState = {
  showModal: false,
  form: null,

}

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case SING_IN:
      return {
        ...state, showModal: true, form: 'login',
      }
    case SING_UP:
      return {
        ...state, showModal: true, form: 'registration',
      }
    case LOGOUT_FORM:
      return {
        ...state, showModal: true, form: 'logout',
      }
    case CLOSE_MODAL:
      return {
        ...state, showModal: false, form: null,
      }
    case ACTIVATE:
      return {
        ...state, showModal: true, form: 'activate',
      }
    case SHOW_RESET_POPUP:
      return {
        ...state, showModal: true, form: 'reset',
      }
    default:
      return state
  }
}
