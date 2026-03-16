import React from 'react'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import Index from './../index'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        graphql_url: process.env.GRAPHQL_URL,
        prod: true,
        root: ``
    }
}));

describe(`index page`, () => {
    it(`should have App component`, () => {
        const subject = mount(
            <MockedProvider mocks={[]} addTypename={false}>
                <Index root={`/`} />
            </MockedProvider>
        )

        expect(subject.find(`MetaMusicIndex`)).toHaveLength(1)
    })
})
