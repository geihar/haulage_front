import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { setToken, setUserInfo, register, refreshToken, autoLogin, login } from './auth'
import * as t from './actionTypes'
import { closeModal } from './headerAction'

const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

const mock = new MockAdapter(axios)
const middleware = [thunk]
const mockStore = configureStore(middleware)

describe('auth actions', () => {
  it('setToken', () => {
    expect(setToken('1', '2')).toEqual({
      type: t.LOGIN,
      access: '1',
      refresh: '2',
    })
  })

  it('setUserInfo', () => {
    expect(setUserInfo('1', 'tom')).toEqual({
      type: t.SET_USER_INFO,
      userId: '1',
      username: 'tom',

    })
  })
})

describe('auth async  actions', () => {
  it('register', () => {
    const store = mockStore({
    })
    mock.onPost('/auth/users/').reply(200)
    return store.dispatch(register()).then(() => {
      expect(store.getActions()).toEqual([closeModal()])
    })
  })

  it('login', () => {
    const reqData = {
      access: 'access',
      refresh: 'refresh',
      userID: 'tom',
    }
    const store = mockStore({
    })
    const expectedAction = [setToken(reqData.access, reqData.refresh), setUserInfo(), closeModal()]
    mock.onPost('/auth/jwt/create/').reply(200, reqData)
    return store.dispatch(login()).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('autoLogin', () => {
    const resData = {
      access: 'access',
      refresh: 'refresh',
    }
    const store = mockStore({
    })
    mock.onPost('/auth/jwt/refresh/').reply(200, resData)
    const expectedAction = [setToken(resData.access, resData.refresh)]
    return store.dispatch(autoLogin()).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('refreshToken', () => {
    const reqData = {
      access: 'access',
      refresh: 'refresh',
      userID: 'tom',

    }
    const store = mockStore({
    })
    mock.onPost('/auth/jwt/refresh/').reply(200, reqData)
    const expectedAction = [setToken(reqData.access, reqData.refresh)]
    return store.dispatch(refreshToken()).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})
