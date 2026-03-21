import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreditsSection } from './CreditsSection';

jest.mock('../../graphql/generated/types', () => ({
    useCreditsByWorkQuery: jest.fn(),
    usePeopleQuery: jest.fn(),
    useCreateCreditMutation: jest.fn(),
    useDeleteCreditMutation: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
    useQuery: jest.fn(),
    gql: jest.fn((strings: TemplateStringsArray) => strings.join('')),
}));

jest.mock('../../../graphql/roles.query', () => ({
    ROLES_QUERY: 'ROLES_QUERY',
}));

import {
    useCreditsByWorkQuery,
    usePeopleQuery,
    useCreateCreditMutation,
    useDeleteCreditMutation,
} from '../../graphql/generated/types';
import { useQuery } from '@apollo/client';

const credits = [
    {
        guid: 'c1',
        instrument: 'guitar',
        notes: 'lead parts',
        person: { guid: 'p1', firstName: 'Alice', lastName: 'Smith' },
        role: { guid: 'r1', name: 'Musician' },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

const people = [
    { guid: 'p1', firstName: 'Alice', lastName: 'Smith', email: null },
];

const roles = [{ guid: 'r1', name: 'Musician', description: null }];

beforeEach(() => {
    (useCreditsByWorkQuery as jest.Mock).mockReturnValue({
        data: { creditsByWork: [] },
        loading: false,
        error: undefined,
        refetch: jest.fn(),
    });
    (usePeopleQuery as jest.Mock).mockReturnValue({
        data: { people },
    });
    (useQuery as jest.Mock).mockReturnValue({
        data: { roles },
    });
    (useCreateCreditMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({}),
        { loading: false },
    ]);
    (useDeleteCreditMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({}),
        { loading: false },
    ]);
});

describe('CreditsSection', () => {
    it('renders Credits section heading', () => {
        render(<CreditsSection workGuid="work-1" />);
        expect(screen.getByText('Credits')).toBeInTheDocument();
    });

    it('renders empty state when no credits', () => {
        render(<CreditsSection workGuid="work-1" />);
        expect(screen.getByText('No credits yet.')).toBeInTheDocument();
    });

    it('renders credit items', () => {
        (useCreditsByWorkQuery as jest.Mock).mockReturnValue({
            data: { creditsByWork: credits },
            loading: false,
            error: undefined,
            refetch: jest.fn(),
        });
        render(<CreditsSection workGuid="work-1" />);
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('Musician')).toBeInTheDocument();
        expect(screen.getByText('guitar')).toBeInTheDocument();
        expect(screen.getByText('lead parts')).toBeInTheDocument();
    });

    it('shows Add Credit form when button clicked', () => {
        render(<CreditsSection workGuid="work-1" />);
        fireEvent.click(screen.getByText('Add Credit'));
        expect(screen.getByTestId('credit-form')).toBeInTheDocument();
    });

    it('shows validation error when person or role is missing', async () => {
        render(<CreditsSection workGuid="work-1" />);
        fireEvent.click(screen.getByText('Add Credit'));
        fireEvent.submit(screen.getByTestId('credit-form'));
        await waitFor(() => {
            expect(
                screen.getByText('Person and Role are required.'),
            ).toBeInTheDocument();
        });
    });

    it('hides form when Cancel is clicked', () => {
        render(<CreditsSection workGuid="work-1" />);
        fireEvent.click(screen.getByText('Add Credit'));
        expect(screen.getByTestId('credit-form')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByTestId('credit-form')).not.toBeInTheDocument();
    });
});
