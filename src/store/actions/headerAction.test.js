import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as t from './actionTypes'
import { cleanState, closeModal, logout, logoutForm, singIn, singUp } from './headerAction'

const middleware = [thunk]
const mockStore = configureStore(middleware)

describe('auth actions', () => {
  it('SING_IN', () => {
    expect(singIn()).toEqual({
      type: t.SING_IN,
    })
  })
  it('SING_UP', () => {
    expect(singUp()).toEqual({
      type: t.SING_UP,
    })
  })
  it('LOGOUT_FORM', () => {
    expect(logoutForm()).toEqual({
      type: t.LOGOUT_FORM,
    })
  })

  it('CLOSE_MODAL', () => {
    expect(closeModal()).toEqual({
      type: t.CLOSE_MODAL,
    })
  })
  it('LOGOUT', () => {
    const store = mockStore({
    })
    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual([closeModal(), cleanState()])
    })
  })
})
