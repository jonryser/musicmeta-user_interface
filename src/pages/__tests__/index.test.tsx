import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import Index from './../index'
import ROLES_QUERY from './../../../graphql/roles.query'

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        graphql_url: process.env.GRAPHQL_URL,
        prod: true,
        root: ``
    }
}));

const mocks = [
    {
        request: { query: ROLES_QUERY },
        result: { data: { roles: [] } }
    }
]

describe(`index page`, () => {
    it(`should have App component`, async () => {
        let subject: ReturnType<typeof mount>

        await act(async () => {
            subject = mount(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <Index root={`/`} />
                </MockedProvider>
            )

            // Allow any pending effects / promises to resolve
            await new Promise((resolve) => setImmediate(resolve))
        })

        subject!.update()
        expect(subject!.find(`MetaMusicIndex`)).toHaveLength(1)
    })
})
