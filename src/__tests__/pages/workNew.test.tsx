import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NewWorkPage from '../../pages/works/new';

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
    useCreateWorkMutation: jest.fn(),
    useWorksQuery: jest.fn(),
}));

import {
    useCreateWorkMutation,
    useWorksQuery,
} from '../../graphql/generated/types';

const mockPush = jest.fn();

beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
        status: 'authenticated',
        data: { user: { name: 'Test User' } },
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useWorksQuery as jest.Mock).mockReturnValue({
        data: { works: [] },
        loading: false,
    });
    (useCreateWorkMutation as jest.Mock).mockReturnValue([
        jest.fn().mockResolvedValue({ data: { createWork: { guid: 'new-guid' } } }),
        { loading: false },
    ]);
});

describe('NewWorkPage', () => {
    it('renders the form with title and description fields', () => {
        render(<NewWorkPage />);
        expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    });

    it('renders Cancel link pointing to /works', () => {
        render(<NewWorkPage />);
        const cancel = screen.getByRole('link', { name: 'Cancel' });
        expect(cancel).toHaveAttribute('href', '/works');
    });

    it('shows validation error when title is empty', async () => {
        render(<NewWorkPage />);
        const form = screen
            .getByRole('button', { name: 'Create Work' })
            .closest('form')!;
        fireEvent.submit(form);
        await waitFor(() => {
            expect(screen.getByText('Title is required.')).toBeInTheDocument();
        });
    });

    it('redirects to work detail on success', async () => {
        render(<NewWorkPage />);
        fireEvent.change(screen.getByLabelText(/Title/), {
            target: { value: 'New Song' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Create Work' }));
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/works/new-guid');
        });
    });

    it('shows error message when mutation fails', async () => {
        (useCreateWorkMutation as jest.Mock).mockReturnValue([
            jest.fn().mockRejectedValue(new Error('Server error')),
            { loading: false },
        ]);

        render(<NewWorkPage />);
        fireEvent.change(screen.getByLabelText(/Title/), {
            target: { value: 'Some Song' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Create Work' }));
        await waitFor(() => {
            expect(screen.getByText('Server error')).toBeInTheDocument();
        });
    });
});
