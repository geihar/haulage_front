/* eslint-disable no-console */

import axios from 'axios'

import { cleanState, closeModal } from './headerAction'
import { RESET_PASSWORD,
  ACCOUNT_ACTIVE,
  ACCOUNT_CLEAN,
  LOGIN,
  SET_USER_INFO,
  ADD_PROFILE_FORM, CLOSE_PROFILE_FORM, CHANGE_PROFILE } from './actionTypes'
import { getHeaders, HOST_URL } from '../../settings'

export function setToken(access, refresh) {
  return {
    type: LOGIN, access, refresh,
  }
}

export function setUserInfo(
  id,
  username,
  count,
  firstProfileID,
  firstProfileType,
  currentProfile,
  secondProfileID,
  secondProfileType,
) {
  return {
    type: SET_USER_INFO,
    id,
    username,
    count,
    firstProfileID,
    firstProfileType,
    currentProfile,
    secondProfileID,
    secondProfileType,
  }
}
export function accountActive() {
  return {
    type: ACCOUNT_ACTIVE,
  }
}

export function accountClean() {
  return {
    type: ACCOUNT_CLEAN,
  }
}

export function isEmailExist(status) {
  return {
    type: RESET_PASSWORD, status,
  }
}

export function refreshToken() {
  const url = `${HOST_URL}auth/jwt/refresh/`
  const token = localStorage.getItem('refresh')
  if (token) {
    return async (dispatch) => {
      const data = {
        refresh: token,
      }
      await axios.post(url, data)
        .then((res) => {
          localStorage.setItem('access', res.data.access)
          dispatch(setToken(res.data.access, token))
        })
        .catch()
    }
  }
  return null
}

export function login(input, password) {
  return async (dispatch) => {
    const url = `${HOST_URL}auth/jwt/auth/`
    const reqData = {
      username: input, password,
    }
    await axios.post(url, reqData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        localStorage.setItem('userID', res.data.user_id)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('profileCount', res.data.profiles.length)
        localStorage.setItem('firstProfileId', res.data.profiles[0].id)
        localStorage.setItem('firstProfileType', res.data.profiles[0].profile_type)
        if (res.data.profiles[0].subscription) {
          localStorage.setItem('firstProfileSub', res.data.profiles[0].subscription.id)
        }localStorage.setItem('firstProfileSub', res.data.profiles[0].subscription)

        const lastProfile = localStorage.getItem('currentProfile')
        if (!lastProfile) {
          localStorage.setItem('currentProfile', res.data.profiles[0].profile_type)
        } else if (lastProfile !== res.data.profiles[0].profile_type
        && res.data.profiles.length === 1) {
          localStorage.setItem('currentProfile', res.data.profiles[0].profile_type)
        }

        if (res.data.profiles.length === 2) {
          localStorage.setItem('secondProfileId', res.data.profiles[1].id)
          localStorage.setItem('secondProfileType', res.data.profiles[1].profile_type)
          console.log(res.data.profiles[1].subscription.id)
          if (res.data.profiles[1].subscription.id) {
            localStorage.setItem('secondProfileSub', res.data.profiles[1].subscription.id)
          }localStorage.setItem('secondProfileSub', res.data.profiles[1].subscription)
        }
        dispatch(setToken(res.data.access, res.data.refresh))
        dispatch(closeModal())
      }).catch((error) => console.log(error.message))
  }
}

export function restorePassword(emailAddr) {
  return async (dispatch) => {
    // const  url = "https://haulage-291012.uc.r.appspot.com/auth/jwt/create/"
    const url = 'https://haulage-291012.uc.r.appspot.com/auth/users/reset_password/'
    const reqData = {
      email: emailAddr,
    }
    await axios.post(url, reqData)
      .then((res) => {
        dispatch(isEmailExist(res.status))
      }).catch()
  }
}

export function register(username, email, password, profileType) {
  return async (dispatch) => {
    const url = `${HOST_URL}auth/users/`
    const reqData = {
      username, email, password, profile_type: profileType,
    }

    await axios.post(url, reqData)
      .then(dispatch(closeModal()))
      .catch((error) => console.log(error.message))
  }
}

export function autoLogin() {
  const url = `${HOST_URL}auth/jwt/refresh/`
  return async (dispatch) => {
    const token = localStorage.getItem('refresh')
    const id = localStorage.getItem('userID')
    const username = localStorage.getItem('username')
    const count = localStorage.getItem('profileCount')
    const firstProfileID = localStorage.getItem('firstProfileId')
    const firstProfileType = localStorage.getItem('firstProfileType')
    const currentProfile = localStorage.getItem('currentProfile')

    const data = {
      refresh: token,
    }
    if (token) {
      await axios.post(url, data)
        .then((res) => {
          localStorage.setItem('access', res.data.access)
          localStorage.setItem('refresh', res.data.refresh)
          dispatch(setToken(res.data.access, token))
          if (count === '2') {
            const secondProfileID = localStorage.getItem('secondProfileId')
            const secondProfileType = localStorage.getItem('secondProfileType')
            dispatch(setUserInfo(
              id,
              username,
              count,
              firstProfileID,
              firstProfileType,
              currentProfile,
              secondProfileID,
              secondProfileType,
            ))
          } else {
            dispatch(setUserInfo(
              id,
              username,
              count,
              firstProfileID,
              firstProfileType,
              currentProfile,
              null,
              null,
            ))
          }
        })
        .catch((err) => {
          if (err.message.search(/401/)) {
            dispatch(cleanState())
          }
        })
    }
    return null
  }
}

export function activate(uid, token) {
  return async (dispatch) => {
    const url = `${HOST_URL}auth/users/activation/`
    const reqData = {
      uid, token,
    }
    await axios.post(url, reqData)
      .then(() => { dispatch(accountActive()) })
      .catch(() => {
        dispatch(accountClean())
      })
  }
}

export function passReset(uid, token, password) {
  return async () => {
    const url = `${HOST_URL}auth/users/reset_password_confirm/`
    const reqData = {
      uid, token, new_password: password,
    }
    await axios.post(url, reqData)
      .then()
      .catch((err) => console.log(err))
  }
}

export function addProfileForm() {
  return {
    type: ADD_PROFILE_FORM,
  }
}

export function closeProfileForm() {
  return {
    type: CLOSE_PROFILE_FORM,
  }
}

export function createAnotherProfile() {
  return (dispatch) => {
    const type = localStorage.getItem('firstProfileType')
    const url = `${HOST_URL}api/profile/`
    const reqData = {
      profile_type: type === 'c' ? 'v' : 'c',
      bio: '',
    }
    console.log(reqData)
    const headers = getHeaders()
    axios.post(url, reqData, {
      headers,
    })
      .then((res) => {
        localStorage.setItem('profileCount', '2')
        localStorage.setItem('secondProfileId', res.data.id)
        localStorage.setItem('secondProfileType', res.data.profile_type)
        dispatch(closeProfileForm())
      })
      .catch((err) => console.log(err))
  }
}

export function changeProfile() {
  const type = localStorage.getItem('currentProfile')
  const currentType = type === 'c' ? 'v' : 'c'
  localStorage.setItem('currentProfile', currentType)
  return {
    type: CHANGE_PROFILE, currentType,
  }
}
