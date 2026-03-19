import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Index from './../../pages/index';
import ROLES_QUERY from './../../../graphql/roles.query';

const mocks = [
    {
        request: { query: ROLES_QUERY },
        result: { data: { roles: [] } }
    }
];

describe(`index page`, () => {
    it(`should render the index page`, () => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Index root={`/`} />
            </MockedProvider>
        );
        expect(container).toBeDefined();
        expect(screen.getByText(`Loading...`)).toBeTruthy();
    });
});
