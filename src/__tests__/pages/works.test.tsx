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
    const MockLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
        <a href={href} {...props}>{children}</a>
    );
    MockLink.displayName = 'MockLink';
    return MockLink;
});

describe('WorksPage', () => {
    it('renders works heading when authenticated', () => {
        (useSession as jest.Mock).mockReturnValue({
            status: 'authenticated',
            data: { user: { name: 'Jon Ryser' } },
        });
        (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

        render(<WorksPage />);
        expect(screen.getByRole('heading', { name: 'Works' })).toBeInTheDocument();
    });
});
