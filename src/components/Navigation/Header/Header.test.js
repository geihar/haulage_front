/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { shallow } from 'enzyme'
import { Header } from './Header'

describe('Header tests', () => {
  it('notAuthorized', () => {
    const props = {
      isAuthorized: false,
      showModal: false,
      form: null,
      singIn: jest.fn(),
      singUp: jest.fn(),
      logoutForm: jest.fn(),
      closeModal: jest.fn(),

    }
    const advertising = 'Тут может быть ваша реклама :)'
    const notAuthorized = shallow(
      <Header {...props} />,
    )
    expect(notAuthorized.find('h1').text()).toEqual(advertising)
    expect(notAuthorized.html()).toMatchSnapshot()
  })
})
