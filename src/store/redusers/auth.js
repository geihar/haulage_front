import { RESET_PASSWORD,
  ACCOUNT_ACTIVE,
  ACCOUNT_CLEAN,
  LOGIN,
  LOGOUT,
  SET_USER_INFO,
  ADD_PROFILE_FORM, CLOSE_PROFILE_FORM, CHANGE_PROFILE } from '../actions/actionTypes'

export const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthorized: false,
  username: null,
  userId: null,
  firstProfileID: null,
  firstProfileType: null,
  secondProfileID: null,
  secondProfileType: null,
  profileCount: null,
  currentProfile: null,
  isEmailStatus: null,
  accountActivation: false,
  loading: false,
  form: false,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthorized: false,
      }
    case LOGIN:
      return {
        ...state,
        accessToken: action.access,
        refreshToken: action.refresh,
        isAuthorized: true,
      }
    case SET_USER_INFO:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        profileCount: action.count,
        firstProfileID: action.firstProfileID,
        firstProfileType: action.firstProfileType,
        currentProfile: action.currentProfile,
        secondProfileID: action.secondProfileID,
        secondProfileType: action.secondProfileType,

      }
    case ACCOUNT_ACTIVE:
      return {
        ...state,
        accountActivation: true,
      }
    case ACCOUNT_CLEAN:
      return {
        ...state,
        accountActivation: false,
      }
    case RESET_PASSWORD:
      return {
        ...state,
        isEmailStatus: action.status,
      }
    case ADD_PROFILE_FORM:
      return {
        ...state,
        form: true,
      }
    case CLOSE_PROFILE_FORM:
      return {
        ...state,
        form: false,
      }
    case CHANGE_PROFILE:
      return {
        ...state,
        currentProfile: action.currentType,
      }
    default:
      return state
  }
}
