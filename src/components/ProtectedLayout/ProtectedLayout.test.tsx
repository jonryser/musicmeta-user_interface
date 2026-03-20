import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ProtectedLayout } from './ProtectedLayout';

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

jest.mock('../NavBar', () => ({
    NavBar: () => <nav data-testid="navbar">NavBar</nav>,
}));

const mockUseSession = useSession as jest.Mock;
const mockPush = jest.fn();

describe('ProtectedLayout', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        mockPush.mockReset();
    });

    it('shows loading state while session is loading', () => {
        mockUseSession.mockReturnValue({ status: 'loading', data: null });
        render(<ProtectedLayout>Content</ProtectedLayout>);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('redirects to signin when unauthenticated', () => {
        mockUseSession.mockReturnValue({ status: 'unauthenticated', data: null });
        render(<ProtectedLayout>Content</ProtectedLayout>);
        expect(mockPush).toHaveBeenCalledWith('/auth/signin');
    });

    it('returns null when unauthenticated (redirect in progress)', () => {
        mockUseSession.mockReturnValue({ status: 'unauthenticated', data: null });
        const { container } = render(<ProtectedLayout>Content</ProtectedLayout>);
        expect(container.firstChild).toBeNull();
    });

    it('renders navbar and children when authenticated', () => {
        mockUseSession.mockReturnValue({
            status: 'authenticated',
            data: { user: { name: 'Jon Ryser' } },
        });
        render(<ProtectedLayout><p>My Content</p></ProtectedLayout>);
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByText('My Content')).toBeInTheDocument();
    });
});
