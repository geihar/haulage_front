/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { shallow } from 'enzyme'
import { Home } from './Home'

describe('Home tests', () => {
  it('notAuthorized', () => {
    const props = {
      isAuthorized: false,
    }
    const advertising = 'Тут может быть ваша реклама :)'
    const notAuthorized = shallow(
      <Home {...props} />,
    )
    expect(notAuthorized.find('h1').text()).toEqual(advertising)
    expect(notAuthorized.html()).toMatchSnapshot()
  })
  it('Authorized', () => {
    const props = {
      isAuthorized: true,
    }
    const Authorized = shallow(
      <Home {...props} />,
    )
    const title = 'Haulage'
    expect(Authorized.find('h6').text()).toEqual(title)
    expect(Authorized.html()).toMatchSnapshot()
  })
})
