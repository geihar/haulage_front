import axios from 'axios'
import { CLOSE_MODAL,
  SING_IN,
  SING_UP,
  LOGOUT,
  LOGOUT_FORM,
  ACTIVATE,
  SHOW_RESET_POPUP } from './actionTypes'
import { HOST_URL } from '../../settings'

export function singIn() {
  return {
    type: SING_IN,
  }
}

export function singUp() {
  return {
    type: SING_UP,
  }
}

export function logoutForm() {
  return {
    type: LOGOUT_FORM,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export function cleanState() {
  const lastProfile = localStorage.getItem('currentProfile')
  localStorage.clear()
  localStorage.setItem('currentProfile', lastProfile)

  return {
    type: LOGOUT,
  }
}

export function logout() {
  const url = `${HOST_URL}auth/jwt/blacklist/`
  const reqData = {
    refresh: localStorage.getItem('refresh'),
  }
  return async (dispatch) => {
    await axios.post(url, reqData)
    dispatch(cleanState(),
      dispatch(closeModal()))
  }
}

export function showActivatePopup() {
  return {
    type: ACTIVATE,
  }
}
export function showResetPopup() {
  return {
    type: SHOW_RESET_POPUP,
  }
}
