import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'

describe('Search tests', () => {
  it('Search', () => {
    const search = shallow(<Search />)

    expect(search.html()).toMatchSnapshot()
  })
})
