/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('Button tests', () => {
  it('Button', () => {
    const props = {
      className: 'btn',
      onClick: jest.fn(),
      type: 'submit',
    }
    const input = shallow(
      <Button {...props}>
        click
      </Button>,
    )
    expect(input.html()).toMatchSnapshot()
  })
  it('Button', () => {
    const props = {
      className: 'btn',
      onClick: jest.fn(),
    }
    const input = shallow(
      <Button {...props}>
        click
      </Button>,
    )
    expect(input.html()).toMatchSnapshot()
  })
})
