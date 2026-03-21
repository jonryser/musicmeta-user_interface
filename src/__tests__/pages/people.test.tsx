import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PeoplePage from '../../pages/people/index';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
    signOut: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/link', () => {
    const MockLink = ({
        href,
        children,
        ...props
    }: {
        href: string;
        children: React.ReactNode;
        [key: string]: unknown;
    }) => (
        <a href={href} {...props}>
            {children}
        </a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

jest.mock('../../graphql/generated/types', () => ({
    usePeopleQuery: jest.fn(),
}));

import { usePeopleQuery } from '../../graphql/generated/types';

const people = [
    {
        guid: 'p1',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        guid: 'p2',
        firstName: 'Bob',
        lastName: 'Jones',
        email: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
        status: 'authenticated',
        data: { user: { name: 'Test User' } },
    });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
});

describe('PeoplePage', () => {
    it('renders People heading', () => {
        (usePeopleQuery as jest.Mock).mockReturnValue({
            data: { people: [] },
            loading: false,
            error: undefined,
        });
        render(<PeoplePage />);
        expect(
            screen.getByRole('heading', { name: 'People' }),
        ).toBeInTheDocument();
    });

    it('renders loading state', () => {
        (usePeopleQuery as jest.Mock).mockReturnValue({
            data: undefined,
            loading: true,
            error: undefined,
        });
        render(<PeoplePage />);
        expect(screen.getByText('Loading…')).toBeInTheDocument();
    });

    it('renders person items', () => {
        (usePeopleQuery as jest.Mock).mockReturnValue({
            data: { people },
            loading: false,
            error: undefined,
        });
        render(<PeoplePage />);
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.getByText('Bob Jones')).toBeInTheDocument();
    });

    it('renders empty state', () => {
        (usePeopleQuery as jest.Mock).mockReturnValue({
            data: { people: [] },
            loading: false,
            error: undefined,
        });
        render(<PeoplePage />);
        expect(screen.getByText(/No people in the directory/)).toBeInTheDocument();
    });

    it('filters people by search query', () => {
        (usePeopleQuery as jest.Mock).mockReturnValue({
            data: { people },
            loading: false,
            error: undefined,
        });
        render(<PeoplePage />);
        fireEvent.change(screen.getByRole('searchbox'), {
            target: { value: 'alice' },
        });
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.queryByText('Bob Jones')).not.toBeInTheDocument();
    });

    it('shows no-results message when search has no matches', () => {
        (usePeopleQuery as jest.Mock).mockReturnValue({
            data: { people },
            loading: false,
            error: undefined,
        });
        render(<PeoplePage />);
        fireEvent.change(screen.getByRole('searchbox'), {
            target: { value: 'zzz' },
        });
        expect(screen.getByText(/No people match/)).toBeInTheDocument();
    });
});
