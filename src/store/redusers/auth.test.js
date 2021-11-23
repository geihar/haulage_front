import authReducer, { initialState } from './auth'
import * as t from '../actions/actionTypes'

describe('authReducer', () => {
  it('LOGIN', () => {
    const action = {
      type: t.LOGIN,
      access: '123',
      refresh: '231',
    }
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      accessToken: action.access,
      refreshToken: action.refresh,
      isAuthorized: true,

    })
  })
  it('LOGOUT', () => {
    const stateAfterLogin = {
      ...initialState,
      accessToken: 'test',
      refreshToken: 'test',
      isAuthorized: true,
    }
    const action = {
      type: t.LOGOUT,
      access: '123',
      refresh: '231',
    }
    expect(authReducer(stateAfterLogin, action)).toEqual({
      ...initialState,
      accessToken: null,
      refreshToken: null,
      isAuthorized: false,

    })
  })
  it('SET_USER_INFO', () => {
    const stateAfterLogin = {
      ...initialState,
      accessToken: 'test',
      refreshToken: 'test',
      isAuthorized: true,
    }
    const action = {
      type: t.SET_USER_INFO,
      userId: 'user',
    }
    expect(authReducer(stateAfterLogin, action)).toEqual({
      ...stateAfterLogin,
      userId: 'user',
    })
  })
})
