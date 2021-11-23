import React from 'react'
import { shallow } from 'enzyme'
import TripList from './TripList'

describe('TripList tests', () => {
  it('TripList', () => {
    const search = shallow(<TripList />)

    expect(search.html()).toMatchSnapshot()
  })
})
