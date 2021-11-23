/* eslint-disable import/no-mutable-exports */
const DEBUG = true
let HOST_URL = 'https://haulage-291012.uc.r.appspot.com/'
let SOCKET_URL = 'wss://prod'
if (DEBUG) {
  HOST_URL = 'http://127.0.0.1:8000/'
  SOCKET_URL = 'ws://127.0.0.1:8000/'
}

export const CurrentProfileId = () => {
  const current = localStorage.getItem('currentProfile')
  const firstProfileType = localStorage.getItem('firstProfileType')
  const firstProfileID = localStorage.getItem('firstProfileId')
  const secondProfileID = localStorage.getItem('secondProfileId')
  return firstProfileType === current ? firstProfileID : secondProfileID
}

export const CurrentProfileSub = () => {
  const profile = localStorage.getItem('currentProfile')
  const firstProfileType = localStorage.getItem('firstProfileType')
  const firstProfileSub = localStorage.getItem('firstProfileSub') || null
  const secondProfileSub = localStorage.getItem('secondProfileSub') || null
  return firstProfileType === profile ? firstProfileSub : secondProfileSub
}

export const getHeaders = () => {
  const token = localStorage.getItem('access')
  const Profileid = CurrentProfileId()
  return (
    {
      Authorization: `JWT ${token}`,
      Profileid,
    }
  )
}

export { HOST_URL, SOCKET_URL }
