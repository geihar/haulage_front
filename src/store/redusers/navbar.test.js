import navReducer, { initialState } from './navbar'
import * as t from '../actions/actionTypes'

describe('navReducer', () => {
  it('SING_IN', () => {
    const action = {
      type: t.SING_IN,
    }
    expect(navReducer(initialState, action)).toEqual({
      ...initialState,
      showModal: true,
      form: 'login',

    })
  })
  it('SING_UP', () => {
    const action = {
      type: t.SING_UP,
    }
    expect(navReducer(initialState, action)).toEqual({
      ...initialState,
      showModal: true,
      form: 'registration',

    })
  })
  it('LOGOUT_FORM', () => {
    const action = {
      type: t.LOGOUT_FORM,
    }
    expect(navReducer(initialState, action)).toEqual({
      ...initialState,
      showModal: true,
      form: 'logout',

    })
  })
  it('CLOSE_MODAL', () => {
    const action = {
      type: t.CLOSE_MODAL,
    }
    expect(navReducer(initialState, action)).toEqual({
      ...initialState,
      showModal: false,
      form: null,

    })
  })
})
