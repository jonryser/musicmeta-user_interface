import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import WorksPage from '../../pages/works/index';

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
    useWorksQuery: jest.fn(),
}));

import { useWorksQuery } from '../../graphql/generated/types';
const mockUseWorksQuery = useWorksQuery as jest.Mock;

const sessionAuthenticated = {
    status: 'authenticated',
    data: { user: { name: 'Test User' } },
};

describe('WorksPage', () => {
    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue(sessionAuthenticated);
        (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    });

    it('renders works heading when authenticated', () => {
        mockUseWorksQuery.mockReturnValue({
            data: { works: [] },
            loading: false,
            error: undefined,
        });

        render(<WorksPage />);
        expect(
            screen.getByRole('heading', { name: 'Works' }),
        ).toBeInTheDocument();
    });

    it('renders loading state', () => {
        mockUseWorksQuery.mockReturnValue({
            data: undefined,
            loading: true,
            error: undefined,
        });

        render(<WorksPage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        mockUseWorksQuery.mockReturnValue({
            data: undefined,
            loading: false,
            error: { message: 'Network error' },
        });

        render(<WorksPage />);
        expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });

    it('renders empty state when no works', () => {
        mockUseWorksQuery.mockReturnValue({
            data: { works: [] },
            loading: false,
            error: undefined,
        });

        render(<WorksPage />);
        expect(
            screen.getByText(/No works yet/),
        ).toBeInTheDocument();
    });

    it('renders work items', () => {
        mockUseWorksQuery.mockReturnValue({
            data: {
                works: [
                    {
                        guid: 'abc',
                        title: 'My Song',
                        description: 'A great song',
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                    },
                ],
            },
            loading: false,
            error: undefined,
        });

        render(<WorksPage />);
        expect(screen.getByText('My Song')).toBeInTheDocument();
        expect(screen.getByText('A great song')).toBeInTheDocument();
    });

    it('renders New Work button', () => {
        mockUseWorksQuery.mockReturnValue({
            data: { works: [] },
            loading: false,
            error: undefined,
        });

        render(<WorksPage />);
        expect(
            screen.getByRole('button', { name: 'New Work' }),
        ).toBeInTheDocument();
    });

    it('truncates long descriptions', () => {
        const longDesc = 'A'.repeat(150);
        mockUseWorksQuery.mockReturnValue({
            data: {
                works: [
                    {
                        guid: 'abc',
                        title: 'My Song',
                        description: longDesc,
                        createdAt: '2024-01-01T00:00:00Z',
                        updatedAt: '2024-01-01T00:00:00Z',
                    },
                ],
            },
            loading: false,
            error: undefined,
        });

        render(<WorksPage />);
        const desc = screen.getByText(/A{120}…/);
        expect(desc).toBeInTheDocument();
    });
});
