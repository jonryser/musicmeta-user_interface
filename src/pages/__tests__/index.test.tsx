import React from 'react'
import { mount } from 'enzyme'
import Index from './../index'

const dev = !(process.env.NODE_ENV
    ? process.env.NODE_ENV.indexOf(`production`) + 1
    : false);

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        graphql_url: process.env.GRAPHQL_URL,
        prod: true,
        root: ``
    }
}));

describe(`index page`, () => {
    it(`should have App component`, () => {
        const subject = mount((<Index root={`/`} />))

        expect(subject.find(`App`)).toHaveLength(1)
    })
})
