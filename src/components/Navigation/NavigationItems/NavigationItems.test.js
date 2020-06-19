import React from 'react'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItem from './NavigationItem/NavigationItem'
import NavigationItems from './NavigationItems'


configure({adapter: new Adapter()})

let wrapper = null
beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
})
describe('<NavigationItems/>', () => {
    it("Should two <NavigationItem /> item if not Authenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it("Should three <NavigationItem /> item if Authenticated", () => {
        wrapper.setProps( { isAuth: true } )
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it("Should three <NavigationItem /> item if Authenticated", () => {
        wrapper.setProps( { isAuth: true } )
        expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true)
    })
})