/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { shallow } from 'enzyme'
import Input from './Input'

describe('Input tests', () => {
  const props = {
    label: 'Email',
    value: 'Email field',
    onChange: jest.fn(),
    errorMessage: '',
  }
  it('Input', () => {
    const input = shallow(
      <Input {...props} />,
    )
    expect(input.html()).toMatchSnapshot()
  })
})
