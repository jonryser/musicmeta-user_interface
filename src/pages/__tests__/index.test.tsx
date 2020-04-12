import React from 'react'
import { mount } from 'enzyme'
import Index from './../index'

describe(`index page`, () => {
    it(`should have App component`, () => {
        const subject = mount(<Index root={`/`} />)

        expect(subject.find(`App`)).toHaveLength(1)
    })
})
